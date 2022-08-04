import { useEffect, Fragment, useState } from "react";
import { find, findIndex } from "lodash";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import { Tooltip } from "../../../hooks/useTooltip";
import apiInstance from "../../../services";
import * as s from "../../../styles/AdminPage.styles";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import socket from "../../../services/socket";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";
import { sortBy } from "lodash";
import { ADMIN_CREATE_WORDCLOUD_PAGE } from "../../../routes/constant";
function WordCloudPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];
  const [wordclouds, setWordClouds] = useState([]);
  const [searchOption, setSearchOpt] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getWordClouds();
    // eslint-disable-next-line
  }, [pageIndex, searchOption, pageSize]);

  const handleEndWD = (id) => {
    socket.emit("change-inquiry", { inquiryId: id, status: 0 });
    let changes = wordclouds.map((p) =>
      p.id === id ? { ...p, status: 0 } : p
    );
    setWordClouds(changes);
  };

  const handleToggleWD = (id, status) => {
    let changes = [];
    if (status === 0 || status === 1) {
      socket.emit("change-inquiry", { inquiryId: id, status: 2 });
      changes = wordclouds.map((wd) =>
        wd.id === id ? { ...wd, status: 2 } : wd
      );
    } else {
      socket.emit("change-inquiry", { inquiryId: id, status: 1 });
      changes = wordclouds.map((wd) =>
        wd.id === id ? { ...wd, status: 1 } : wd
      );
    }
    setWordClouds(changes);
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (wc) => {
    if (wc.status === 1 || wc.status === 2) {
      alert("Please end inquiry before delete.");
      return;
    }

    if (window.confirm("Are you sure to delete this question?")) {
      try {
        await apiInstance({
          url: `inquiry/delete/${wc.id}`,
          method: "DELETE",
        });
        toast.success("Delete Success");
        setWordClouds(wordclouds.filter((p) => p.id !== wc.id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getWordClouds = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `inquiry/get-inquiries-by-event/${searchOption}`,
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setWordClouds(sortBy(data.inquiries, ["id"]).reverse());
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (error) {
      console.error("inquiry/get-inquiries-by-event error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <s.CustomLink to={ADMIN_CREATE_WORDCLOUD_PAGE}>
            <s.Button>New Cloud</s.Button>
          </s.CustomLink>
        </div>
        <div className="right">Clouds</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All clouds</s.H4>
            <s.RefreshBtn onClick={() => getWordClouds()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
          <s.Col_6 className="right">
            <div style={{ width: "50%" }}>
              <Select
                width="300px"
                defaultValue={allEventsOptions[0]}
                onChange={(e) => setSearchOpt(e.value)}
                options={allEventsOptions}
              />
            </div>
          </s.Col_6>
        </s.Flex>
        <s.Param>List all latest clouds.</s.Param>
        <s.DataTable>
          <s.TableLength>
            <label>
              Show&nbsp;
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              &nbsp;entries
            </label>
          </s.TableLength>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  <th>ID</th>
                  <th>Cloud Question</th>
                  <th>Status</th>
                  <th>Event</th>
                  <th>Actions</th>
                </tr>
              </s.DataTable_head>

              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="54" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : wordclouds.length !== 0 ? (
                  wordclouds.map((wd) => (
                    <tr key={wd.id}>
                      <td>{wd.id}</td>
                      <td>{wd.content}</td>
                      <td>
                        {find(events, { value: Number(wd.event_id) }).label ||
                          ""}
                      </td>
                      <td>
                        {wd.status === 2
                          ? "Started"
                          : wd.status === 1
                          ? "Paused"
                          : "Stopped"}
                      </td>
                      <td>
                        <s.CustomLink to={`/admin/wordcloud/${wd.id}/edit`}>
                          <Tooltip tooltip="Edit Cloud">
                            <s.EditLink>
                              <i className="fas fa-edit"></i>
                            </s.EditLink>
                          </Tooltip>
                        </s.CustomLink>
                        <Tooltip tooltip="Delete Cloud">
                          <s.DeleteLink onClick={() => handleDelete(wd)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        {wd.status !== 0 && (
                          <Tooltip tooltip="End Cloud">
                            <s.DeleteLink onClick={() => handleEndWD(wd.id)}>
                              <i className="fas fa-square"></i>
                            </s.DeleteLink>
                          </Tooltip>
                        )}
                        <s.TogglePlayButton
                          play={wd.status}
                          tooltip={
                            wd.status === 2
                              ? "Played"
                              : wd.status === 1
                              ? "Paused"
                              : "Stopped"
                          }
                          onClick={() => handleToggleWD(wd.id, wd.status)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      There is no cloud
                    </td>
                  </tr>
                )}
              </s.DataTable_body>
            </s.Table>
          </s.TableWrapper>

          <CPTableEntries
            currentPage={pageIndex}
            pageSize={pageSize}
            totalCount={amountData}
            count={wordclouds.length}
          />

          <CPPaginationBar
            totalPage={pageNumber}
            pageIndex={pageIndex}
            onPageChange={handlePageChange}
          />
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default WordCloudPage;
