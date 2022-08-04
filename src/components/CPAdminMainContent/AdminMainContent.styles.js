import styled from "styled-components";

export const MainContent = styled.div`
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Header = styled.div`
  padding: 0 30px;
  background-color: #fff;
  box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.31);
  height: 70px;
  display: flex;
  justify-content: space-between;
`;
export const Box = styled.div`
  color: #98a6ad;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: left;
  background-color: #fafbfd;
  border: 1px solid #f1f3fa;
`;
export const LogoutBtn = styled.button`
  padding: 23px 44px 23px 81px;
  font-weight: 400;
  color: #6c757d;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  :focus {
    outline: none;
  }
  :hover {
    background-color: #f0f4f7;
    cursor: pointer;
  }
`;

export const Middle = styled.div`
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  min-height: calc(100% - 70px - 59px);
  padding: 0 30px;
`;

export const Footer = styled.div`
  border-top: 1px solid rgba(152, 166, 173, 0.2);
  padding: 19px 30px 20px;
  color: #98a6ad;
  display: flex;
  justify-content: space-between;
  div {
    flex-grow: 1;
    padding: 0 15px;
  }
  div.right {
    text-align: end;
    button {
      margin-left: 1.5rem;
      padding: 0;
      border: 0;
      background: transparent;
      color: #98a6ad;
      transition: all 0.2s;
      :focus {
        outline: none;
      }
      :hover {
        color: #000;
        cursor: pointer;
      }
    }
  }
`;
export const BCWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
