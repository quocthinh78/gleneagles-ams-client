import { useEffect, useState } from "react";
import styled from "styled-components";
import apiInstance from "../../../services";
import { toast } from "react-toastify";
import * as s from "../../../styles/AdminPage.styles";

function DashBoardPage() {
  const [useronline, setUseronline] = useState(0);

  useEffect(() => {
    getUserOnline();
  }, [useronline]);

  const getUserOnline = async () => {
    try {
      const { data } = await apiInstance({
        url: `user/get-user-online/0`,
        method: "GET",
      });
      setUseronline(data.onlineCount);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

    // setUseronline(data.data.totalUser);
  };

  return (
    <Container>
      <h1>Total users online: {useronline}</h1>
      <s.RefreshBtn
        style={{ fontSize: "16px" }}
        onClick={() => getUserOnline()}
      >
        <i className="fas fa-redo"></i>
        Refresh
      </s.RefreshBtn>
    </Container>
  );
}

export default DashBoardPage;

const Container = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6c757d;
  text-align: left;
`;
