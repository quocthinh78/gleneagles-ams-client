import { useEffect, useState } from "react";
import { Fragment } from "react";
import apiInstance from "../../../../services";
import * as s from "../../../../styles/AdminPage.styles";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

function UpvoteDetailPage() {
  const params = useParams();
  const [details, setDetails] = useState([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUpvoteDetail = async () => {
    setIsLoading(false);
    try {
      const { data } = await apiInstance({
        url: `question/getUpvoteQuestion/${params.id}`,
        method: "GET",
      });
      setDetails(data.list_users);
      setTitle(data.question_title);
      setIsLoading(true);
    } catch (error) {
      toast.error("Loading upvote fail");
    }
  };
  useEffect(() => {
    getUpvoteDetail();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <s.TitleBox>
        <div>
          <CustomLink to="/admin/questions">
            <s.Button>Back To Questions</s.Button>
          </CustomLink>
        </div>
        <div className="right">Upvote Detail</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4>All upvotes</s.H4>
            <s.RefreshBtn onClick={() => getUpvoteDetail()}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
        </s.Flex>
        <s.Param>List all users upvote for the question: {title}</s.Param>
        <s.DataTable>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head>
                <tr>
                  <th>No</th>
                  <th>User ID</th>
                  <th>User Email</th>
                  <th>User name</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {!isLoading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      Processing...
                    </td>
                  </tr>
                ) : details.length !== 0 ? (
                  details.map((p, idx) => (
                    <tr key={p.id + "--" + idx}>
                      <td>{idx + 1}</td>
                      <td>{p.user_id}</td>
                      <td>{p.email}</td>
                      <td>{p.user_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      There is no vote
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

export default UpvoteDetailPage;

const CustomLink = styled(Link)`
  display: inline-block;
`;
