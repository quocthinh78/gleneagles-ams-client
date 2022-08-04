import { Fragment, useState, useEffect } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  actAddQuestionHighlight,
  actFetchQuestionHighlight,
  actFetchQuestionHighlightError,
  actResetAllQuestions,
  actUpdateQuestionHighlight,
} from "../../../../redux/actions/event/questions";
import socket from "../../../../services/socket";
function DetailPresenterPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const eventId = urlParams.get("event");
  const questions = useSelector((state) => state.eventReducer.listQuestions);
  const user = useSelector((state) => state.userReducer.data);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(actFetchQuestionHighlight(eventId, user.id));

    // listen if admin add more question highlight to the question list
    socket.on("showQuestionToUser", (newQuestionHighline) => {
      if (newQuestionHighline.cached_votes_total === null)
        newQuestionHighline.cached_votes_total = 0;
      dispatch(actAddQuestionHighlight({ ...newQuestionHighline }));
      console.log(newQuestionHighline);
    });

    // update totalVote when someone vote successfully
    socket.on(`showVoteQuestion-${eventId}`, (res) => {
      dispatch(actUpdateQuestionHighlight(res));
    });

    return () => {
      dispatch(actFetchQuestionHighlightError(null));
      socket.removeAllListeners("showQuestionToUser");
      socket.removeAllListeners("showVoteQuestion");
    };
    // eslint-disable-next-line
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    dispatch(actResetAllQuestions());
    dispatch(
      actFetchQuestionHighlight(eventId, user.id, () => setIsLoading(false))
    );
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Panel Presenter's Questions</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All questions for presenters</s.H4>
            <s.RefreshBtn onClick={handleRefresh}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
        </s.Flex>
        <s.DataTable>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  <th>No.</th>
                  <th>Content</th>
                  <th>Ask by</th>
                  <th>Vote</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : questions.length !== 0 ? (
                  questions
                    .filter((question) => question.highlight)
                    .map((q, idx) => (
                      <tr key={q.id}>
                        <td>{idx + 1}</td>
                        <td>{q.content}</td>
                        <td>{q.asked_by}</td>
                        <td>{q.cached_votes_total}</td>
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
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default DetailPresenterPage;
