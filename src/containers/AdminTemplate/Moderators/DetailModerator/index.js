import { Fragment, useState, useEffect, useReducer } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import CPPaginationBar from "../../../../components/CPAdminMainContent/CPPaginationBar";
import apiInstance from "../../../../services";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import socket from "../../../../services/socket";

const NEW_QUESTION_ADDED = "NEW_QUESTION_ADDED";
const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";
const UPDATE_QUESTION_VOTES = "UPDATE_QUESTION_VOTES";

function reducer(state, action) {
  switch (action.type) {
    case NEW_QUESTION_ADDED:
      return { questions: [...state.questions, action.payload].reverse() };
    case UPDATE_QUESTIONS:
      return { questions: action.payload };
    case UPDATE_QUESTION_VOTES:
      return {
        questions: state.questions.map((qs) => {
          if (qs.id === action.payload.id)
            return {
              ...qs,
              cached_votes_total: action.payload.cached_votes_total,
              cached_votes_up: action.payload.cached_votes_up,
              cached_votes_down: action.payload.cached_votes_down,
            };
          return qs;
        }),
      };
    default:
      return { ...state };
  }
}

function DetailModeratorPage() {
  const [state, dispatch] = useReducer(reducer, { questions: [] });
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const eventId = urlParams.get("event");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [amountData, setAmountData] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log(state.questions);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, [pageIndex, pageSize]);

  useEffect(() => {
    const newQuestionListener = (res) => {
      dispatch({ type: NEW_QUESTION_ADDED, payload: res });
    };
    const updateQuestionVotes = (res) => {
      dispatch({ type: UPDATE_QUESTION_VOTES, payload: res });
    };

    // add new message
    socket.on("sendQuestionToAdmin", newQuestionListener);

    // update totalVote when someone vote successfully
    socket.on(`showVoteQuestion-${eventId}`, updateQuestionVotes);

    return () => {
      socket.removeAllListeners("sendQuestionToAdmin");
      socket.removeAllListeners(`showVoteQuestion-${eventId}`);
      dispatch({ type: UPDATE_QUESTIONS, payload: [] });
    };
    // eslint-disable-next-line
  }, []);

  const getQuestions = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiInstance({
        url: `question/getAllQuestionInEvent/${eventId}`,
        method: "GET",
        params: {
          page: pageIndex,
          size: pageSize,
        },
      });
      // console.log(data.data.questions)
      dispatch({ type: UPDATE_QUESTIONS, payload: data.questions });
      setAmountData(data.count);
      setPageNumber(data.maxPage);
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePageChange = (page) => {
    setPageIndex(page);
  };

  const handlePickQuestion = (id) => {
    socket.emit(`show-question`, { question_id: id });
    const changes = state.questions.map((q) =>
      q.id === id ? { ...q, highlight: !q.highlight } : q
    );
    dispatch({ type: UPDATE_QUESTIONS, payload: changes });
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Panel Moderator's Questions</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All questions for moderators</s.H4>
            <s.RefreshBtn onClick={() => getQuestions()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
        </s.Flex>
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
                  <th>No.</th>
                  <th>Content</th>
                  <th>Ask by</th>
                  <th>Vote</th>
                  <th>Picked</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : state.questions.length !== 0 ? (
                  state.questions.map((q, idx) => (
                    <tr key={q.id} className={q.highlight ? "highlight" : ""}>
                      <td>{idx + 1}</td>
                      <td>{q.content}</td>
                      <td>{q.asked_by}</td>
                      <td>{q.cached_votes_total}</td>
                      <td>
                        <input
                          type="checkbox"
                          name="question_pick"
                          id="question_pick"
                          onChange={() => handlePickQuestion(q.id)}
                          checked={q.highlight}
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
          <s.TableInfo>
            Showing 1 to {amountData < pageSize ? amountData : pageSize} of{" "}
            {amountData} entries
          </s.TableInfo>
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

export default DetailModeratorPage;
