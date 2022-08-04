import { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LOGIN_PAGE } from "../../../routes/constant";

function ThankYouPage() {
  return (
    <Fragment>
      <ThankBox>
        <h1>Thank you!</h1>
        <p>
          We have received your registration. Please check your spam/junk folder
          if you did not receive the confirmation email.
        </p>

        <LinkToPage to={LOGIN_PAGE}>Back to login</LinkToPage>
      </ThankBox>
    </Fragment>
  );
}

export default ThankYouPage;

const ThankBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 75%;
  h1 {
    color: teal;
    font-size: 26px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
  ${({ theme }) => theme.breakpoints.m} {
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 22px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    h1 {
      font-size: 45px;
    }
    p {
      font-size: 26px;
    }
  }
`;

const LinkToPage = styled(Link)`
  font-size: 20px;
  color: teal;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover {
    color: #b8851a;
  }
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 24px;
  }
`;
