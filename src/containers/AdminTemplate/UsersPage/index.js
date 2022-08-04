import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CPAdminTableRow from "../../../components/CPAdminMainContent/CPAdminTableRow";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import * as s from "../../../styles/AdminPage.styles";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  actBlockAndUnblockUser,
  actDeleteUser,
  actGetUsersByEvent,
  actUsersByEventReset,
} from "../../../redux/actions/adminByEvent/users";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";

function UsersPage() {
  const dispatch = useDispatch();
  const allEventsOptions = useSelector(
    (state) => state.adminReducer.listEvents
  );
  const users = useSelector((state) => state.adminByEventReducer.users.data);
  const isLoading = useSelector(
    (state) => state.adminByEventReducer.users.loading
  );
  const totalPage = useSelector(
    (state) => state.adminByEventReducer.users.totalPage
  );
  const totalCount = useSelector(
    (state) => state.adminByEventReducer.users.totalCount
  );

  // States which will re-fetch the list of users
  const [idEventSelected, setIdEventSelected] = useState(0);
  const [searchKey, setSearchKey] = useState(""); // Chưa làm chức năng searchKey này
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      actGetUsersByEvent(currentPage, pageSize, idEventSelected, searchKey)
    );
    // eslint-disable-next-line
  }, [currentPage, idEventSelected, pageSize, searchKey]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRefreshListUser = () => {
    if (isLoading) return;
    dispatch(actUsersByEventReset());
    dispatch(
      actGetUsersByEvent(currentPage, pageSize, idEventSelected, searchKey)
    );
  };

  const handleDelete = (id) => {
    if (isLoading) return;
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(actDeleteUser(id));
    }
  };

  const handleBlock = (id) => {
    // if (isLoading) return;
    dispatch(actBlockAndUnblockUser(id));
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <CustomLink to="/admin/users/create">
            <s.Button>Create user</s.Button>
          </CustomLink>
          <CustomLink to="/admin/users/import">
            <s.Button>Import user</s.Button>
          </CustomLink>
        </div>
        <div className="right">Users</div>
      </s.TitleBox>

      <s.MainTable isLoading={isLoading}>
        <s.Flex>
          <s.Col_6>
            <s.H4>All users {isLoading && "(Fetching...)"}</s.H4>
            <s.RefreshBtn onClick={() => handleRefreshListUser()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
          <s.Col_6 className="right">
            <div style={{ width: "50%" }}>
              <Select
                width="300px"
                defaultValue={allEventsOptions[0]}
                onChange={(e) => setIdEventSelected(e.value)}
                options={allEventsOptions}
              />
            </div>
          </s.Col_6>
          {/* <s.Col_12 className="right">
            <s.FuncBtn>Show logged in users</s.FuncBtn>
            <span>&nbsp;|&nbsp;</span>
            <s.FuncBtn>Show not logged in users</s.FuncBtn>
          </s.Col_12> */}
        </s.Flex>
        <s.Param>List all latest users.</s.Param>
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
            <s.SearchBox>
              Search:&nbsp;
              <input
                type="text"
                value={searchKey}
                placeholder="Type something"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </s.SearchBox>
          </s.TableLength>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  {/* <th>User name</th> */}
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Mobile</th>
                  <th>Organization</th>
                  {/* <th>Role</th> */}
                  <th>Logged-in?</th>
                  <th>Will attend</th>
                  {/* <th>User active?</th> */}
                  <th>Login history detail</th>
                  <th>Actions</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading && users.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : users.length !== 0 ? (
                  users.map((u) => (
                    <CPAdminTableRow
                      key={u.id}
                      userId={u.id}
                      username={u.user_name}
                      email={u.email}
                      firstName={u.first_name}
                      lastName={u.last_name}
                      mobile={u.mobile_number}
                      organization={u.organization}
                      role={u.is_admin ? "Admin" : "Audience"}
                      isAttended={u.attend_virtual_event}
                      isLoggedIn={u.login_status}
                      isActive={u.active}
                      handleBlock={handleBlock}
                      handleDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: "center" }}>
                      There is no users
                    </td>
                  </tr>
                )}
              </s.DataTable_body>
            </s.Table>
          </s.TableWrapper>
          <CPTableEntries
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            count={users.length}
          />

          <CPPaginationBar
            totalPage={totalPage}
            pageIndex={currentPage}
            onPageChange={handlePageChange}
          />
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default UsersPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
