import { useEffect, Fragment, useState } from "react";
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

function PollsPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];
  const [polls, setPolls] = useState([]);
  const [searchOption, setSearchOpt] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPolls();
    // eslint-disable-next-line
  }, [pageIndex, searchOption, pageSize]);

  const handleEndPoll = (id) => {
    socket.emit("change-poll", { poll_id: id, status: 0 });
    let changes = polls.map((p) => (p.id === id ? { ...p, status: 0 } : p));
    setPolls(changes);
  };

  const handleTogglePoll = (id, status) => {
    let changes = [];
    if (status === 0 || status === 1) {
      socket.emit("change-poll", { poll_id: id, status: 2 });
      changes = polls.map((p) => (p.id === id ? { ...p, status: 2 } : p));
    } else {
      socket.emit("change-poll", { poll_id: id, status: 1 });
      changes = polls.map((p) => (p.id === id ? { ...p, status: 1 } : p));
    }
    setPolls(changes);
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this poll?")) {
      try {
        const { data } = await apiInstance({
          url: `poll/delete-poll/${id}`,
          method: "DELETE",
        });

        toast.success("Delete Success");
        setPolls(polls.filter((p) => p.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getPolls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `poll/get-poll-by-event/${searchOption}`,
        method: "GET",
        data: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setPolls(sortBy(data.polls, ["id"]).reverse());
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (error) {
      console.error("poll/get-poll-by-event error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <s.CustomLink to="/admin/polls/create">
            <s.Button>New Poll</s.Button>
          </s.CustomLink>
        </div>
        <div className="right">Polls</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All polls</s.H4>
            <s.RefreshBtn onClick={() => getPolls()}>
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
        <s.Param>List all latest polls.</s.Param>
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
                  <th>Poll Question</th>
                  <th>Status</th>
                  <th>Event</th>
                  {/* <th>Created At</th> */}
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
                ) : polls.length !== 0 ? (
                  polls.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.topic}</td>
                      <td>
                        {p.status === 2
                          ? "Started"
                          : p.status === 1
                          ? "Paused"
                          : "Stopped"}
                      </td>
                      <td>{p.title}</td>
                      {/* <td>{p.created_at}</td> */}

                      <td>
                        <s.CustomLink to={`/admin/polls/${p.id}/edit`}>
                          <Tooltip tooltip="Edit Poll">
                            <s.EditLink>
                              <i className="fas fa-edit"></i>
                            </s.EditLink>
                          </Tooltip>
                        </s.CustomLink>
                        <Tooltip tooltip="Delete Poll">
                          <s.DeleteLink onClick={() => handleDelete(p.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        {/* nếu status = 0, không hiện nút end */}
                        {p.status !== 0 && (
                          <Tooltip tooltip="End Poll">
                            <s.DeleteLink onClick={() => handleEndPoll(p.id)}>
                              <i className="fas fa-square"></i>
                            </s.DeleteLink>
                          </Tooltip>
                        )}
                        <s.TogglePlayButton
                          play={p.status}
                          tooltip={
                            p.status === 2
                              ? "Played"
                              : p.status === 1
                              ? "Paused"
                              : "Stopped"
                          }
                          onClick={() => handleTogglePoll(p.id, p.status)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      There is no poll
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
            count={polls.length}
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

export default PollsPage;
