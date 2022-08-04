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
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";
import useUser from "../../../hooks/useUser";

function ModeratorsPage() {
  const eventData = useSelector((state) => state.userReducer.eventData);
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];

  const user = useUser();
  const [moderators, setModerators] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchOption, setSearchOpt] = useState(0);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getModerators();
    // eslint-disable-next-line
  }, [pageIndex, pageSize, searchOption]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this moderator?")) {
      try {
        await apiInstance({
          url: `moderator/delete-moderator/${id}`,
          method: "DELETE",
        });
        toast.success("Delete Successfully");
        setModerators(moderators.filter((m) => m.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getModerators = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: "moderator/get-moderator",
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
          event: user.data.admin ? searchOption : eventData.id,
        },
      });
      setModerators(data.moderators);
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          {user.data.admin && (
            <CustomLink to="/admin/moderators/create">
              <s.Button>New Moderator</s.Button>
            </CustomLink>
          )}
        </div>
        <div className="right">Moderators</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All moderators</s.H4>
            <s.RefreshBtn onClick={() => getModerators()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
          <s.Col_6 className="right">
            <div style={{ width: "50%" }}>
              {user.data.admin && (
                <Select
                  width="300px"
                  defaultValue={allEventsOptions[0]}
                  onChange={(e) => setSearchOpt(e.value)}
                  options={allEventsOptions}
                />
              )}
            </div>
          </s.Col_6>
        </s.Flex>
        <s.Param>List all latest moderators.</s.Param>
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
                  <th>UUID</th>
                  <th>Event</th>
                  {user.data.admin && <th>Action</th>}
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : moderators.length !== 0 ? (
                  moderators.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <Link
                          to={`/admin/moderators/${m.id}/detail?event=${m.event_id}`}
                        >
                          {m.uuid}
                        </Link>
                      </td>
                      <td>{m.event_title}</td>
                      {user.data.admin && (
                        <td>
                          <CustomLink
                            to={`/admin/moderators/${m.id}/edit?event=${m.event_id}`}
                          >
                            <Tooltip tooltip="Edit Moderator">
                              <s.EditLink>
                                <i className="fas fa-edit"></i>
                              </s.EditLink>
                            </Tooltip>
                          </CustomLink>
                          <Tooltip tooltip="Delete Moderator">
                            <s.DeleteLink onClick={() => handleDelete(m.id)}>
                              <i className="fas fa-trash"></i>
                            </s.DeleteLink>
                          </Tooltip>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      There is no moderator
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
            count={moderators.length}
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

export default ModeratorsPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
