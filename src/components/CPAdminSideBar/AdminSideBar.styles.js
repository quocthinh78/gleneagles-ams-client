import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import navBg from "../../assets/images/nav_bg.jpg";

export const Container = styled.div`
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  height: 100%;
  width: ${(props) => (props.$expanse ? "15rem" : "5rem")};
  min-width: ${(props) => (props.$expanse ? "15rem" : "5rem")};
  /* transition: all 0.3s ease; */
  color: #fff;
  background-image: linear-gradient(
      135deg,
      rgba(0, 128, 128, 0.9),
      rgba(3, 156, 156, 0.9) 60%
    ),
    url(${navBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 15px;
  overflow-y: auto;
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        width: 15rem;
      `}
  }
`;
export const LogoContainer = styled(Link)`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Navbar = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  .navbar-slide--enter {
    opacity: 0 !important;
    transform: translateX(-15px) !important;
  }
  .navbar-slide--enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease !important;
    opacity: 1 !important;
    transform: translateX(0) !important;
  }
  .navbar-slide--exit {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }
  .navbar-slide--exit-active {
    transition: opacity 0.3s ease, transform 0.3s ease !important;
    opacity: 0 !important;
    transform: translateX(-30) !important;
  }
`;
export const PanelBtn = styled.li`
  padding: ${(props) => (props.$expanse ? "12px 30px" : 0)};
  letter-spacing: 0.05em;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #cedce4;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        padding: 12px 30px;
      `}
  }
`;
export const PanelTitle = styled.div`
  display: ${(props) => (props.$expanse ? "block" : "none")};
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        display: block;
      `}
  }
`;
export const CollapseBtn = styled.button`
  border-radius: 0.2rem;
  background-color: inherit;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.1s ease;
  padding: 15px 25px;
  margin: auto;
  color: #fff;
  transform: rotateZ(180deg);
  transition: transform 0.3s ease;

  ${(props) =>
    props.$expanse &&
    css`
      color: #000;
      margin: 0;
      padding: 0;
      height: 1.5rem;
      width: 1.5rem;
      transform: rotateZ(0deg);
    `}

  :hover {
    background-color: teal;
  }
  :focus {
    outline: none;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        color: #000;
        margin: 0;
        padding: 0;
        height: 1.5rem;
        width: 1.5rem;
        transform: rotateZ(0deg);
      `}
  }
`;
export const BtnIcon = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;
export const NavLink = styled.li`
  cursor: pointer;
  margin-bottom: 5px;
  ${(props) =>
    props.active &&
    css`
      background-color: #b3a9b766;
    `}
  :hover > div {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
`;
export const LinkBox = styled(Link)`
  color: ${(props) => (props.active ? "fff" : "#cedce4")};
  display: flex;
  margin: 0 5px;
  font-size: 0.9375rem;
  position: relative;
  margin-bottom: 0;
  padding: 15px 25px;
  border-bottom: ${(props) => (props.active ? "2px solid #fff" : "none")};
  ${(props) =>
    props.$expanse &&
    css`
      margin: 0 30px;
      padding: 15px 0;
    `}
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        margin: 0 30px;
        padding: 15px 0;
      `}
  }
`;
export const Icon = styled.div`
  display: flex;
  margin: ${(props) => (props.$expanse ? "0 15px 0 3px" : 0)};
  text-align: center;
  width: 18px;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        margin: 0 15px 0 3px;
      `}
  }
`;
export const LinkSpan = styled.span`
  display: ${(props) => (props.$expanse ? "inline-block" : "none")};

  ${({ theme }) => theme.breakpoints.xl} {
    ${(props) =>
      !props.$userToggled &&
      props.$expanse &&
      css`
        display: inline-block;
      `}
  }
`;
export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
