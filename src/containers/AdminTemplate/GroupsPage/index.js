import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import { Tooltip } from "../../../hooks/useTooltip";
import apiInstance from "../../../services";
import * as s from "../../../styles/AdminPage.styles";
import { toast } from "react-toastify";
import Select from "react-select";
import ImportUserGroupsPage from "./ImportUserGroupsPage";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";

function GroupsPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];

  const [groups, setGroups] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchOption, setSearchOpt] = useState(0);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showimport, setShowimport] = useState(0);

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line
  }, [pageIndex, pageSize, searchOption]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this group?")) {
      try {
        await apiInstance({
          url: `group/delete-group/${id}`,
          method: "DELETE",
        });

        toast.success("Delete Success");
        setGroups(groups.filter((g) => g.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleCreateVipToken = async (groupId) => {
    if (window.confirm("Do you want to create a new panelist room?")) {
      try {
        await apiInstance({
          url: "group/create-vip-video",
          method: "POST",
          data: {
            groupId,
          },
        });
        toast.success("Create Panelist Room Successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleDeleteVipToken = async (groupId) => {
    if (
      window.confirm("Do you really want to delete the existing panelist room?")
    ) {
      try {
        await apiInstance({
          url: `group/delete-vip-video/${groupId}`,
          method: "DELETE",
        });
        toast.success("Room has been deleted");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleCreateStream = async (eventId) => {
    if (window.confirm("Do you want to create a new live stream?")) {
      try {
        await apiInstance({
          url: "event/create-live-stream",
          method: "POST",
          data: {
            eventId,
          },
        });
        toast.success("Stream created");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleDeleteStream = async (eventId) => {
    if (window.confirm("Are you sure to delete this stream?")) {
      try {
        await apiInstance({
          url: `event/delete-live-stream/${eventId}`,
          method: "DELETE",
        });
        toast.success("Delete stream successfully");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getGroups = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `group/get-group/${searchOption}`,
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setGroups(data.groups);
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (error) {
      console.error("get-group error: ", error);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <CustomLink to="/admin/groups/create">
            <s.Button>New Group</s.Button>
          </CustomLink>
        </div>
        <div className="right">Groups</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All groups</s.H4>
            <s.RefreshBtn onClick={() => getGroups()}>
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
        <s.Param>List all latest groups.</s.Param>
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
                  <th>Group name</th>
                  <th>Event</th>
                  {/* <th>Stream URL</th> */}
                  <th style={{ textAlign: "center" }}>Audiences</th>
                  {/* <th>Zoom URL</th>
                  <th>Zoom Password</th> */}
                  <th>Announcement</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                  <th>Import user by Excel</th>
                  <th>For Panelist</th>
                </tr>
              </s.DataTable_head>

              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : groups.length !== 0 ? (
                  groups.map((g) => (
                    <tr key={g.id}>
                      <td>{g.id}</td>
                      <td>{g.name}</td>
                      <td>{g.event_title}</td>
                      <td style={{ textAlign: "center" }}>{g.total_user}</td>
                      {/* <td>{g.zoom_url}</td>
                      <td>{g.zoom_password}</td> */}
                      <td>{g.announcement}</td>
                      <td style={{ textAlign: "center" }}>
                        <CustomLink to={`/admin/groups/${g.id}/edit`}>
                          <Tooltip tooltip="Edit Event">
                            <s.EditLink>
                              <i className="fas fa-edit"></i>
                            </s.EditLink>
                          </Tooltip>
                        </CustomLink>
                        <CustomLink to={`/admin/groups/${g.id}/slides`}>
                          <Tooltip tooltip="Slides">
                            <s.EditLink>
                              <i className="fas fa-desktop"></i>
                            </s.EditLink>
                          </Tooltip>
                        </CustomLink>
                        <Tooltip tooltip="Delete Event">
                          <s.DeleteLink onClick={() => handleDelete(g.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                      </td>
                      <td>
                        {showimport === g.id ? (
                          <ImportUserGroupsPage
                            groupId={g.id}
                          ></ImportUserGroupsPage>
                        ) : (
                          <s.Button onClick={() => setShowimport(g.id)}>
                            Import by Excel
                          </s.Button>
                        )}
                      </td>
                      <td>
                        {g.is_vip === true && (
                          <Panelist>
                            <PanelistBtn>
                              <s.Button
                                onClick={() => handleCreateVipToken(g.id)}
                              >
                                Create Room
                              </s.Button>
                              <s.DeleteButton
                                onClick={() => handleDeleteVipToken(g.id)}
                              >
                                Delete Room
                              </s.DeleteButton>
                            </PanelistBtn>
                            <PanelistBtn>
                              <s.Button
                                onClick={() => handleCreateStream(g.event_id)}
                              >
                                Create Stream
                              </s.Button>
                              <s.DeleteButton
                                onClick={() => handleDeleteStream(g.event_id)}
                              >
                                Delete Stream
                              </s.DeleteButton>
                            </PanelistBtn>
                          </Panelist>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      There is no group
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
            count={groups.length}
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

export default GroupsPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
const Panelist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PanelistBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 15px;
`;
