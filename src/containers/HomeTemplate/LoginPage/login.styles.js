import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .logo {
    width: 75%;
    height: 100%;
    ${({ theme }) => theme.breakpoints.m} {
      width: 300px;
      height: 200px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export const Error = styled.p`
  color: red;
  margin: 0.3rem 0;
  font-size: 14px;
  display: ${(props) => (props.isError ? "block" : "none")};
`;

export const Form = styled.form`
  margin-bottom: 5%;
  width: 85%;
  transition: width 0.2s ease;
  ${({ theme }) => theme.breakpoints.m} {
    margin-top: 2%;
    width: 80%;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    width: 60%;
  }
`;

export const Title = styled.h1`
  color: #1f6959;
  font-size: 33px;
  transition: font-size 0.2s ease-in;
  font-family: "GothicB";
  /* ${({ theme }) => theme.breakpoints.xl} {
    font-size: 26px;
  } */
`;

export const FormGroup = styled.div`
  margin-bottom: 1.4rem;
  text-align: start;

  position: relative;

  .hidden__password {
    position: absolute !important;
    right: 5%;
    top: 55%;
    transform: translateY(-55%);
  }

  label {
    color: #1f6959;
    font-size: 14px;
    display: inline-block;
    font-family: "Gothic";
    margin-bottom: 0.5rem;

    ${({ theme }) => theme.breakpoints.m} {
      font-size: 16px;
    }
  }
  input {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #e8f0fe;
    background-clip: padding-box;
    border: none;
    border-color: ${(props) => (props.isError ? "red" : "#ced4da")};
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  &.form_password {
    margin-bottom: 0.8rem;
  }
  ${({ theme }) => theme.breakpoints.m} {
    label {
      font-size: 16px;
    }
  }
`;

export const Input = styled.input`
  && {
    padding: 20px;
    padding-left: 15px;
    border-radius: 20px;
  }
`;

export const ModalButton = styled.button.attrs({ type: "button" })`
  padding: 0;
  color: #1b3862;
  font-weight: 600;
  border: none;
  font-size: 14px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitBtn = styled.button.attrs({ type: "submit" })`
  background-color: #1f6959;
  font-family: "GoThic";
  border-radius: 20px;
  padding: 6px 50px;
  border: 2px solid;
  font-size: 18px;
  width: 100%;
  color: #fff;
  margin: 1rem 0 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    cursor: default;
  }
  ${({ theme }) => theme.breakpoints.m} {
    padding: 7px 50px;
    font-size: 20px;
  }
`;

export const LinkToPage = styled(Link)`
  font-size: 16px;
  color: teal;
  transition: color 0.2s ease;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    color: teal;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 18px;
  }
`;
export const HorizonLine = styled.h5`
  display: block;
  text-align: center;
  position: relative;
  margin-top: 0.6rem;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    left: 0px;
    top: calc(50% - 1px);
    border: 1px solid rgb(229, 232, 237);
    z-index: -1;
  }
  span {
    color: rgb(91, 105, 135);
    background: rgb(255, 255, 255);
    padding: 0px 1rem;
    text-transform: uppercase;
  }
`;

export const ForgotPass = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  a {
    color: teal;
    font-size: 15px;
    font-weight: bold;
  }
`;
