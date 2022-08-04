import { find, findIndex } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { sortBy } from "lodash";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";
import { Tooltip } from "../../../hooks/useTooltip";
import { ADMIN_CREATE_RESOLUTION_PAGE } from "../../../routes/constant";
import apiInstance from "../../../services";
import socket from "../../../services/socket";
import * as s from "../../../styles/AdminPage.styles";

const ResolutionPage = () => {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];
  const [resolutions, setResolutions] = useState([]);
  const [searchOption, setSearchOpt] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newResoFromSocket, setNewResoFromSocket] = useState(null);

  useEffect(() => {
    getResolutions();
    // eslint-disable-next-line
  }, [pageIndex, searchOption, pageSize]);

  useEffect(() => {
    socket.on("change-reso-status", (newReso) => {
      setNewResoFromSocket(newReso);
    });
    return () => {
      socket.removeAllListeners("change-reso-status");
    };
  }, []);

  useEffect(() => {
    if (newResoFromSocket) {
      handleUpdateResoStatusFromSocket(newResoFromSocket);
      setNewResoFromSocket(null);
    }
    // eslint-disable-next-line
  }, [newResoFromSocket]);

  const handleUpdateResoStatusFromSocket = (payload) => {
    const foundedShareHandIndex = findIndex(resolutions, (sharehand) => {
      return Number(sharehand.id) === Number(payload.id);
    });

    if (foundedShareHandIndex !== -1) {
      resolutions[foundedShareHandIndex].status = payload.status;
      setResolutions([...resolutions]);
    }
  };

  const handleToggleShowResult = (id, status) => {
    let changes = [];

    if (status !== 3) {
      socket.emit("change-reso-status", { resolution_id: id, status: 3 });
      changes = resolutions.map((p) => (p.id === id ? { ...p, status: 3 } : p));
    } else {
      socket.emit("change-reso-status", { resolution_id: id, status: 1 });
      changes = resolutions.map((p) => (p.id === id ? { ...p, status: 1 } : p));
    }

    setResolutions(changes);
  };

  const handleEndResolution = (id) => {
    socket.emit("change-reso-status", { resolution_id: id, status: 0 });
    let changes = resolutions.map((p) =>
      p.id === id ? { ...p, status: 0 } : p
    );
    setResolutions(changes);
  };

  const handleToggleResolution = (id, status) => {
    let changes = [];
    if (status === 0 || status === 1) {
      socket.emit("change-reso-status", { resolution_id: id, status: 2 });
      changes = resolutions.map((p) => (p.id === id ? { ...p, status: 2 } : p));
    } else {
      socket.emit("change-reso-status", { resolution_id: id, status: 1 });
      changes = resolutions.map((p) => (p.id === id ? { ...p, status: 1 } : p));
    }
    setResolutions(changes);
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this resolution?")) {
      try {
        await apiInstance({
          url: `resolution/${id}`,
          method: "DELETE",
        });
        toast.success("Delete Success");
        setResolutions(resolutions.filter((p) => p.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      }
    }
  };

  const getResolutions = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `resolution/all/${searchOption}?page=${pageIndex}&limit=${pageSize}`,
        method: "GET",
      });
      setResolutions(data.allRes);
      setAmountData(data.totalItem);
      setPageNumber(data.maxPage);
    } catch (error) {
      console.error(
        `resolution/all/${searchOption}?page=${pageIndex}&limit=${pageSize} error:`,
        error
      );
    }
    setIsLoading(false);
  };

  const renderForAndAgainstCol = (type, forTotal, againstTotal) => {
    const persentage =
      type === "for"
        ? ((parseInt(forTotal) / (parseInt(forTotal) + parseInt(againstTotal))) * 100).toFixed(2)
        : ((parseInt(againstTotal) / (parseInt(forTotal) + parseInt(againstTotal))) * 100).toFixed(2);
    return (
      <Fragment>
        {type === "for" ? forTotal : againstTotal}
        <br />
        {persentage}%
      </Fragment>
    );
  };

  const sortedResolutionList = sortBy(resolutions, ["number", "event_id"]);
  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <s.CustomLink to={ADMIN_CREATE_RESOLUTION_PAGE}>
            <s.Button>New Resolution</s.Button>
          </s.CustomLink>
        </div>
        <div className="right">Resolution</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All Resolutions</s.H4>
            <s.RefreshBtn onClick={() => getResolutions()}>
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
        <s.Param>List all latest Resolutions.</s.Param>
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
                  <th>No</th>
                  <th>Resulution</th>
                  <th>Majority</th>
                  <th>Status</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Returns</th>
                  <th>Total</th>
                  <th style={{ textAlign: "center" }}>For</th>
                  <th style={{ textAlign: "center" }}>Against</th>
                  <th style={{ textAlign: "center" }}>Abstain</th>
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
                ) : resolutions.length !== 0 ? (
                  sortedResolutionList.map((p) => (
                    <tr key={p.id}>
                      <td>{p.number}</td>
                      <td
                        style={{
                          maxWidth: "270px",
                          width: "270px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.content}
                      </td>
                      <td>{p.majority}</td>
                      <td>
                        {p.status === 2
                          ? "Started"
                          : p.status === 1
                            ? "Paused"
                            : "Stopped"}
                      </td>
                      <td>
                        {find(events, { value: Number(p.event_id) }).label ||
                          ""}
                      </td>
                      <td>{p.method === 0 ? "Shares" : "Hand"}</td>
                      <td>{p.return}</td>
                      <td>{parseInt(p.agree_total) + parseInt(p.against_total) || 0}</td>
                      <td style={{ textAlign: "center" }}>
                        {p.agree_total + p.against_total !== 0 &&
                          renderForAndAgainstCol(
                            "for",
                            p.agree_total,
                            p.against_total
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {p.agree_total + p.against_total !== 0 &&
                          renderForAndAgainstCol(
                            "against",
                            p.agree_total,
                            p.against_total
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>{p.abstain_total}</td>

                      <td>
                        <s.CustomLink to={`/admin/resolution/${p.id}/edit`}>
                          <Tooltip tooltip="Edit Resolution">
                            <s.EditLink>
                              <i className="fas fa-edit"></i>
                            </s.EditLink>
                          </Tooltip>
                        </s.CustomLink>
                        <Tooltip tooltip="Delete Resolution">
                          <s.DeleteLink onClick={() => handleDelete(p.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        <s.TogglePlayButton
                          play={p.status}
                          tooltip={
                            p.status === 2
                              ? "Played"
                              : p.status === 1
                                ? "Paused"
                                : "Stopped"
                          }
                          onClick={() => handleToggleResolution(p.id, p.status)}
                        />
                        {/* nếu status = 0, không hiện nút end */}
                        {p.status !== 0 && (
                          <Tooltip tooltip="End Resolution">
                            <s.DeleteLink
                              onClick={() => handleEndResolution(p.id)}
                            >
                              <i className="fas fa-square"></i>
                            </s.DeleteLink>
                          </Tooltip>
                        )}
                        {(p.status === 1 ||
                          p.status === 2 ||
                          p.status === 3) && (
                            <s.ToggleHiddenButton
                              status={p.status === 3}
                              tooltip={
                                p.status === 3 ? "Showing Result" : "Hided Result"
                              }
                              onClick={() =>
                                handleToggleShowResult(p.id, p.status)
                              }
                            />
                          )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      There is no resolution
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
            count={resolutions.length}
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
};

export default ResolutionPage;
