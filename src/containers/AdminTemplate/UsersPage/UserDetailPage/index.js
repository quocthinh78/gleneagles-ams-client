import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import apiInstance from "../../../../services";
import * as s from "../../../../styles/AdminPage.styles";

function UserDetailPage() {
  const [user, setUser] = useState([]);
  const [number, setNumber] = useState(10);
  let params = useParams();
  const getUserDetails = async () => {
    const { data } = await apiInstance({
      url: `user/get-user-history/${params.id}`,
      method: "GET",
      params: {
        page: "1",
        size: number,
      },
    });
    setUser(data.userHistory);
  };
  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, [number]);

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Login Histories</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <label>Show history: </label>
            <select onChange={(e) => setNumber(e.target.value)} value={number}>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
              <option>200</option>
            </select>
            <s.RefreshBtn style={{ marginBottom: 20 }}>
              <i className="fas fa-redo"></i>
              Refresh
            </s.RefreshBtn>
          </s.Col_6>
        </s.Flex>
        <s.DataTable>
          <s.TableWrapper>
            <s.Table cellSpacing={0} fullwidth>
              <s.DataTable_head noArrow>
                <tr>
                  <th>No</th>
                  <th>Login at</th>
                  <th>Logout at</th>
                  <th>Ip Address</th>
                </tr>
              </s.DataTable_head>
              <s.DataTable_body>
                {user?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id || "Not Found"}</td>
                      <td>
                        {moment(item.login_at).format("DD-MM-YYYY h:mm:ss A") ||
                          "Not Found"}
                      </td>
                      <td>
                        {moment(item.logout_at).format(
                          "DD-MM-YYYY h:mm:ss A"
                        ) || "Not Found"}
                      </td>
                      <td>{item.IP || "Not Found"}</td>
                    </tr>
                  );
                })}
              </s.DataTable_body>
            </s.Table>
          </s.TableWrapper>
        </s.DataTable>
      </s.MainTable>
    </Fragment>
  );
}

export default UserDetailPage;
