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

function PresentersPage() {
  const eventData = useSelector((state) => state.userReducer.eventData);
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];

  const user = useUser();
  const [presenters, setPresenters] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchOption, setSearchOpt] = useState(0);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPresenters();
    // eslint-disable-next-line
  }, [pageIndex, pageSize, searchOption]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this presenter?")) {
      try {
        const { data } = await apiInstance({
          url: `presenter/delete-presenter/${id}`,
          method: "DELETE",
        });

        toast.success("Delete Success");
        setPresenters(presenters.filter((m) => m.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const getPresenters = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const eventID = user.data.admin ? searchOption : eventData.id;
    try {
      const { data } = await apiInstance({
        url: `presenter/get-presenter/${eventID}`,
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setPresenters(data.presenters);
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          {user.data.admin && (
            <CustomLink to="/admin/presenters/create">
              <s.Button>New Presenter</s.Button>
            </CustomLink>
          )}
        </div>
        <div className="right">Presenters</div>
      </s.TitleBox>

      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All presenters</s.H4>
            <s.RefreshBtn onClick={() => getPresenters()}>
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
        <s.Param>List all latest presenters.</s.Param>
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
                ) : presenters.length !== 0 ? (
                  presenters.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <Link
                          to={`/admin/presenters/${p.id}/detail?event=${p.event_id}`}
                        >
                          {p.uuid}
                        </Link>
                      </td>
                      <td>{p.event_title}</td>
                      {user.data.admin && (
                        <td>
                          <CustomLink
                            to={`/admin/presenters/${p.id}/edit?event=${p.event_id}`}
                          >
                            <Tooltip tooltip="Edit Presenter">
                              <s.EditLink>
                                <i className="fas fa-edit"></i>
                              </s.EditLink>
                            </Tooltip>
                          </CustomLink>
                          <Tooltip tooltip="Delete Presenter">
                            <s.DeleteLink onClick={() => handleDelete(p.id)}>
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
                      There is no presenter
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
            count={presenters.length}
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

export default PresentersPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
