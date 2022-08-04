import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const Logo = styled.div`
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
`;

export const Form = styled.form`
  width: 80%;
  transition: width 0.2s ease;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #1f6959;
  font-size: 33px;
  transition: font-size 0.2s ease-in;
  font-family: "GothicB";
  margin-bottom: 0px !important;
`;

export const FormGroup = styled.div`
  text-align: start;

  select {
    /* appearance: none; */
    border: none;
    background-color: #e8f0fe;
    padding: 5px 10px;
    border-radius: 5px;
    &:focus {
      border: none;
      outline: none;
    }
    &.select__mr {
      display: none;
      border-radius: 20px !important;
      ${({ theme }) => theme.breakpoints.l} {
        margin-top: 30px;
        display: inline-block;
      }
    }
    &.select__mobile {
      margin-top: 10px;
      margin-bottom: 10px;
      ${({ theme }) => theme.breakpoints.l} {
        display: none;
      }
    }
  }
  .will_text {
    display: inline-block;
    font-size: 14px;
  }
  .select__will {
    display: block;
    ${({ theme }) => theme.breakpoints.l} {
      margin-left: 20px;
      display: inline-block;
    }
  }
  .term {
    font-family: "GoThicB";
  }

  label {
    ${(props) =>
      props.checkBox
        ? css`
            margin-left: 5px;
          `
        : css`
            margin-bottom: 0.5rem;
          `}
    color: #1F6959;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    ${({ theme }) => theme.breakpoints.m} {
      font-size: 16px;
    }
  }

  ${(props) =>
    !props.checkBox &&
    css`
      input {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        height: 35px;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: none;
        &:focus {
          outline: none;
          box-shadow: none;
        }
      }
    `}

  &.user_name {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.m} {
    label {
      font-size: 14px;
    }
    &.user_name {
      width: 100%;
      ${({ theme }) => theme.breakpoints.l} {
        width: 45%;
      }
    }
  }
  .underlineLink {
    color: #1f6959;
    font-family: "GoThicB";
  }

  .underlineLink:hover {
    text-decoration: underline;
  }
`;

export const Error = styled.p`
  color: red;
  margin: 0.3rem 0;
  font-size: 14px;
  display: ${(props) => (props.isError ? "block" : "none")};
`;

export const Input = styled.input`
  && {
    padding-left: 15px;
    border-radius: 10px;
    background-color: #e8f0fe;
  }
`;

export const GroupName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.m} {
    flex-direction: row;
  }
`;

export const ModalButton = styled.button.attrs({ type: "button" })`
  padding: 0;
  color: teal;
  font-weight: 500;
  border: none;
  font-size: 16px;
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitBtn = styled.button.attrs((props) => ({
  type: props.typeSubmit ? "submit" : "button",
}))`
  outline: none;
  background-color: #1f6959;
  border-radius: 20px;
  padding: 6px 50px;
  border: 2px solid;
  font-size: 16px;
  font-weight: "GoThic";
  width: 100%;
  color: #fff;
  margin: 1rem 0;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #1f6959;
    cursor: default;
  }
  &:focus {
    outline: none;
  }
  ${({ theme }) => theme.breakpoints.m} {
    padding: 7px 50px;
  }
`;

export const LinkToPage = styled(Link)`
  font-size: 16px;
  color: #1b3862;
  transition: color 0.2s ease;
  cursor: pointer;
  &:hover {
    color: #072c5f;
  }
`;
export const TextCenter = styled.p`
  margin: 0px !important;
  color: #1b3862;
`;

export const HorizonLine = styled.h5`
  display: block;
  text-align: center;
  position: relative;
  margin-top: 1rem;
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

export const textBold = styled.p`
  font-family: "GoThicBI";
  display: inline-block;
  margin-bottom: 0px !important;
`;
