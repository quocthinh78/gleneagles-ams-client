import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CPPaginationBar from "../../../components/CPAdminMainContent/CPPaginationBar";
import { Tooltip } from "../../../hooks/useTooltip";
import apiInstance from "../../../services";
import * as s from "../../../styles/AdminPage.styles";
import { toast } from "react-toastify";
import Select from "react-select";
import { useSelector } from "react-redux";
import CPTableEntries from "../../../components/CPAdminMainContent/CPTableEntries";

function QuestionsPage() {
  const events = useSelector((state) => state.adminReducer.listEvents);
  const allEventsOptions = [{ value: 0, label: "All Events" }, ...events];
  const [questions, setQuestions] = useState([]);
  const [searchOption, setSearchOpt] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, [pageIndex, pageSize, searchOption]);

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this question?")) {
      try {
        await apiInstance({
          url: `question/deleteQuestion/${id}`,
          method: "DELETE",
        });

        toast.success("Delete Success");
        setQuestions(questions.filter((q) => q.id !== id));
        setAmountData(amountData - 1);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  const handleBlock = async (id) => {
    try {
      const { data } = await apiInstance({
        url: `question/toggleQuestion/${id}`,
        method: "GET",
      });

      if (!data.status) {
        toast.success("Block Success");
      } else {
        toast.success("Unblock Success");
      }

      const changes = questions.map((m) =>
        m.id === id ? { ...m, status: !m.status } : m
      );
      setQuestions(changes);
    } catch (error) {
      toast.error("Error when changing question status");
    }
  };

  const getQuestions = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `question/getAllQuestionInEvent/${searchOption}`,
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      setQuestions(data.questions);
      setAmountData(data.count);
      setPageNumber(data.maxPage);
    } catch (error) {
      console.error("getAllQuestionInEvent error: ", error);
      toast.error("Error when fetching questions data");
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Questions</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All questions</s.H4>
            <s.RefreshBtn onClick={() => getQuestions()}>
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
        <s.Param>List all latest questions.</s.Param>
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
                  <th>Content</th>
                  <th>Status</th>
                  <th>Event</th>
                  <th>Upvote</th>
                  <th>Create At</th>
                  <th>Actions</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : questions.length !== 0 ? (
                  questions.map((q) => (
                    <tr key={q.id}>
                      <td>{q.content}</td>
                      <td>{q.status ? "true" : "false"}</td>
                      <td>{q.event_title}</td>
                      <td>
                        <Link to={`/admin/upvotedetail/${q.id}?`}>
                          Upvote Detail
                        </Link>
                      </td>
                      <td>{q.createdAt}</td>
                      <td>
                        <Tooltip tooltip="Delete Poll">
                          <s.DeleteLink onClick={() => handleDelete(q.id)}>
                            <i className="fas fa-trash"></i>
                          </s.DeleteLink>
                        </Tooltip>
                        <s.ToggleHiddenButton
                          status={q.status}
                          tooltip={q.status ? "Actived" : "Hided"}
                          onClick={() => handleBlock(q.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      There is no question
                    </td>
                  </tr>
                )}
              </s.DataTable_body>
            </s.Table>
          </s.TableWrapper>
          {/* <s.TableInfo>
            Showing 1 to {amountData < pageSize ? amountData : pageSize} of{" "}
            {amountData} entries
          </s.TableInfo> */}

          <CPTableEntries
            currentPage={pageIndex}
            pageSize={pageSize}
            totalCount={amountData}
            count={questions.length}
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

export default QuestionsPage;
