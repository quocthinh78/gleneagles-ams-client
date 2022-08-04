import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_PAGE } from "../../../routes/constant";
import { useParams } from "react-router";
import apiInstance from "../../../services";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Container } from "@material-ui/core";
import GoldSponsor from "../../../components/GoldSponsor";

function VerificationPage() {
  let param = useParams();
  const [resendEmail, setResendEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line
  }, []);

  const verifyToken = async () => {
    try {
      await apiInstance({
        url: `user/verify-user/${param.token}`,
        method: "GET",
      });

      setIsValid(true);
    } catch (error) {
      console.log(error);
      setIsValid(false);
    }
  };

  const getAnotherToken = async () => {
    try {
      const { data } = await apiInstance({
        url: "user/resend-verify-token",
        method: "POST",
        data: {
          email: resendEmail,
          client_url: "https://meetz.biz/verify",
        },
      });
      if (data.status === "ok") {
        Swal.fire({
          icon: "success",
          html: "<br/><p>Token has been sent to your email</p>",
          showConfirmButton: false,
          showCloseButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        html: "<br/><p>Something's wrong</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  return (
    <MainContainer>
      <Main>
        <Container>
          <h1>Verification!</h1>
          {isValid ? (
            <ContentBox>
              <p>You account has been verified. Thank you for registration</p>
              <LinkToPage to={LOGIN_PAGE}>Back to login</LinkToPage>
            </ContentBox>
          ) : (
            <ContentBox>
              <p>
                Your token has expired. Please enter your register email to get
                back token
              </p>
              <Input
                type="text"
                name="resendEmail"
                onChange={(e) => setResendEmail(e.currentTarget.value)}
              />
              <Button onClick={getAnotherToken}>Get Token </Button>
            </ContentBox>
          )}
        </Container>
      </Main>
      <GoldSponsor />
    </MainContainer>
  );
}

export default VerificationPage;

const LinkToPage = styled(Link)`
  font-size: 20px;
  color: #00769c;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover {
    color: #008ab7;
  }
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 24px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Input = styled.input`
  && {
    width: 75%;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #e8f0fe;
  }
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
`;
const MainContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: MuseoSans;
  font-weight: 300;
`;

const Main = styled.div`
  background: linear-gradient(180deg, #faffff 0, #accbd6);
  text-align: start;
  padding-bottom: 5rem;
`;
