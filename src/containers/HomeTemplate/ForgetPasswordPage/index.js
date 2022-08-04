import { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { LOGIN_PAGE } from "../../../routes/constant";
import apiInstance from "../../../services";

function ForgetPasswordPage() {
  let history = useHistory();
  const [emailRegisted, setEmailRegisted] = useState("");
  const requestNewPassword = async () => {
    try {
      await apiInstance({
        url: `user/password-reset-request`,
        method: "POST",
        data: {
          email: emailRegisted,
          client_url: "https://meetz.biz/change_password",
        },
      });
      Swal.fire({
        icon: "success",
        html: "<p>We have emailed you a link to reset your password</p>",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        html: "<p>Something is wrong. Please try again</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };
  return (
    <Fragment>
      <ContentBox>
        <h2>Forget password?</h2>
        <p>
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </p>
        <Input
          type="text"
          name="emailRegisted"
          placeholder="Enter your registed email"
          onChange={(e) => setEmailRegisted(e.currentTarget.value)}
        />
        <Button onClick={requestNewPassword}>Request Password Reset </Button>
        <LinkToPage to={LOGIN_PAGE}>Back to login</LinkToPage>
      </ContentBox>
    </Fragment>
  );
}

export default ForgetPasswordPage;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 75%;
  h2 {
    color: teal;
    font-size: 22px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
  ${({ theme }) => theme.breakpoints.m} {
    h2 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    h2 {
      font-size: 36px;
    }
    p {
      font-size: 22px;
    }
  }
`;

const LinkToPage = styled(Link)`
  font-size: 14px;
  color: teal;
  transition: color 0.2s ease;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    color: #b8851a;
  }
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  && {
    width: 75%;
    padding: 10px 15px;
    border-radius: 20px;
    background-color: #e8f0fe;
  }
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  cursor: pointer;
  color: white;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 18px;
  }
`;
