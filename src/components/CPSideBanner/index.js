import { useState, useRef, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import { NavLink, useLocation } from "react-router-dom";
import { useClickAway, useWindowSize } from "react-use";
import styled, { css } from "styled-components";
import {
  REGISTRATION_PAGE,
  REGISTRATION_PAGE_WAITING,
  REGISTRATION_PAGE_EXPIRED,
} from "../../routes/constant";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import avpdLogo from "../../assets/images/logo_gleneagles.png";
import avpdTagline from "../../assets/images/Title.png";
import avpdTagline2 from "../../assets/images/avpd-tagline.svg";
import fbIcon from "../../assets/images/Facebook.png";
import igIcon from "../../assets/images/Instagram.png";
import ytIcon from "../../assets/images/YoutubeV2.png";
import { Modal } from "antd";
import useUser from "../../hooks/useUser";
import apiInstance from "../../services";
import { HOLDING_PAGE, LIVE_PAGE, LOGIN_PAGE } from "../../routes/constant";
import { isStarted } from "../../helpers/checkStartedDate";
import SplideLogo from "../SplideLogo";

const maxWidthShowHeader = 744;

export default function CPSideBanner() {
  const location = useLocation();
  const [openSideNav, setOpenSideNav] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sideNavRef = useRef(null);
  const { width } = useWindowSize();

  useEffect(() => {
    setOpenSideNav(false);
  }, [location]);

  useClickAway(sideNavRef, () => {
    setOpenSideNav(false);
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      <SideBar>
        <LogoWrapper>
          <div>
            <Logo alt="logo" src={avpdLogo} />
          </div>
          {width < maxWidthShowHeader && (
            <BugerBtn
              className={openSideNav && "change"}
              onClick={() => setOpenSideNav(!openSideNav)}
            >
              <Bar1></Bar1>
              <Bar2></Bar2>
              <Bar3></Bar3>
            </BugerBtn>
          )}
        </LogoWrapper>
        <picture>
          {/* <source
            media={`(min-width:${maxWidthShowHeader}px)`}
            srcSet={avpdTagline2}
          ></source> */}
          <Tagline alt="tagline" src={avpdTagline} />
        </picture>
        {width >= maxWidthShowHeader && <SideBarMenu showModal={showModal} />}
      </SideBar>
      <UnderLayer show={openSideNav && width < maxWidthShowHeader}>
        <SideNav
          ref={sideNavRef}
          show={openSideNav && width < maxWidthShowHeader}
        >
          <div>
            <SideNavLogo alt="logo" src={avpdLogo} />
          </div>
          <picture>
            <source
              media={`(min-width:${maxWidthShowHeader}px)`}
              srcSet={avpdTagline2}
            ></source>
            <SideNavTagline alt="tagline" src={avpdTagline} />
          </picture>
          <SideBarMenu showModal={showModal} />
          <CloseBtn onClick={() => setOpenSideNav(false)}>&times;</CloseBtn>
        </SideNav>
      </UnderLayer>
      <Modal
        title="Contact us"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ textAlign: "center", color: "#015571" }}
      >
        <Fragment>
          <Param>
            <span>
              <MailOutlined /> Email:{" "}
            </span>
            enquiry@gleneagles-seminar.com
          </Param>
          <Param>
            <span>
              <PhoneOutlined rotate={90} /> Hotline:{" "}
            </span>
            +65 8945 8140 / +65 8847 3190
          </Param>
        </Fragment>
      </Modal>
    </Container>
  );
}

const SideBarMenu = ({ showModal }) => {
  const user = useUser();
  const [numberUser, setNumberUser] = useState(0);
  const location = useLocation();


  useEffect(() => {
    async function getUserNumber() {
      const data = await apiInstance({
        url: "user/check-user-num",
      });
      setNumberUser(data.data.numUser);
      if (location.pathname.startsWith("/register")) {
        if (numberUser > 250) {
          return <Redirect to={REGISTRATION_PAGE_WAITING} />;
        } else if (numberUser <= 250) {
          return <Redirect to={REGISTRATION_PAGE} />;
        }
      }
    }
    getUserNumber();

  }, [location, numberUser]);

  return (
    <MenuWrapper>
      <Menu>
        <MenuItem to="/" exact>
          Home
        </MenuItem>
        <MenuItem to="/program" exact>
          Program
        </MenuItem>
        {/* <MenuItem
          to={
            !user.data
              ? LOGIN_PAGE
              : !user.eventData ||
                !user.eventData.state ||
                !isStarted(user.eventData.start_at)
                ? HOLDING_PAGE
                : `${LIVE_PAGE}/${user.eventData.id}`
          }
          exact
        >
          Post Event Video
        </MenuItem> */}
        {!user.data && numberUser <= 250 && (
          <MenuItem to="/register" exact>
            Registration
          </MenuItem>
        )}
        {!user.data && numberUser > 250 && (
          <MenuItem to="/register/waiting" exact>
            Registration
          </MenuItem>
        )}
        <MenuItem to="/message" exact>
          Chairman's Message and Organising Committee
        </MenuItem>
        <MenuItem to="/about" exact>
          About Gleneagles Hospital
        </MenuItem>

        {/* <Banner>
        <Image alt="banner" src={banner} />
      </Banner>  */}
      </Menu>

      <SplideLogo />
      <InfoBox>
        <P>Follow us:</P>
        <SocialIcons>
          <SocialLink
            href="https://www.facebook.com/GleneaglesHospitalSingapore/"
            target="_blank"
          >
            <Image alt="social" src={fbIcon} />
          </SocialLink>
          <SocialLink
            href="https://www.instagram.com/gleneagleshospitalsg/?hl=en"
            target="_blank"
          >
            <Image alt="social" src={igIcon} />
          </SocialLink>
          <SocialLink
            href="https://www.youtube.com/channel/UCfLsM3chUKgSwEpjdqyCZQg"
            target="_blank"
          >
            <Image alt="social" src={ytIcon} />
          </SocialLink>
        </SocialIcons>
        <HelpInfo>
          <p>Need help?</p>
          <p>
            Contact us <button onClick={showModal}>here</button>
          </p>
        </HelpInfo>
      </InfoBox>
      <Copyright>
        Copyright © 2022 Parkway Holdings Limited.
        <br />
        All rights reserved.
        <br />
        Company Registration no. 197400320R
      </Copyright>
    </MenuWrapper>
  );
};

const Container = styled.div`
  width: 100%;
  color: #fff;
  background-color: #36a1c1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  height: auto;
  ${({ theme }) => theme.breakpoints.m} {
    width: 25%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    :hover::-webkit-scrollbar-thumb {
      background-color: #00769c9e;
    }
    /* Works on Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 20px;
    }
  }
`;

const SideBar = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  height: 100%;
  ${({ theme }) => theme.breakpoints.m} {
    height: unset;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const BugerBtn = styled.div`
  cursor: pointer;
  margin: 25px;
`;

const Bar = styled.div`
  width: 25px;
  height: 4px;
  background-color: white;
  margin-bottom: 5px;
  transition: 0.4s;
`;

const Bar1 = styled(Bar)`
  .change & {
    transform: rotate(-45deg) translate(-6px, 6px);
  }
`;

const Bar2 = styled(Bar)`
  .change & {
    opacity: 0;
  }
`;

const Bar3 = styled(Bar)`
  .change & {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-7px, -7px);
  }
`;

const UnderLayer = styled.div`
  width: 0;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(31, 41, 55, 0.6);
  overflow: hidden;
  transition: opacity 0.25s;
  opacity: 0;
  ${({ show }) =>
    show &&
    css`
      width: 100vw;
      opacity: 1;
    `}
`;

const SideNav = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  background-color: #36a1c1;
  overflow-x: hidden;
  transition: 0.25s;
  cursor: default;
  display: flex;
  flex-direction: column;
  ${({ show }) =>
    show &&
    css`
      width: 70%;
    `}
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 40px;
  color: white;
  font-weight: 600;
  border: none;
  background: transparent;
  line-height: 1;
  height: 25px;
  width: 25px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Image = styled.img`
  display: block;
  width: auto;
  height: 100%;
  object-fit: cover;
`;

const Logo = styled.img`
  display: block;
  width: 100%;
  padding: 5% 30% 5% 5%;
  ${({ theme }) => theme.breakpoints.m} {
    padding: 7% 25% 7% 15%;
  }
`;
const Tagline = styled(Image)`
  padding-bottom: 5%;
  width: 60%;
  margin: auto;
  height: auto;
  object-fit: cover;
`;
const SideNavLogo = styled(Logo)`
  padding: 5% 20% 5% 5%;
`;
const SideNavTagline = styled(Tagline)`
  width: 80%;
  margin: 0 auto;
  padding: 5% 0;
`;
const MenuWrapper = styled.div`
  width: 100%;
  padding: 0 5%;
  margin-top: 20px;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  :hover::-webkit-scrollbar-thumb {
    background-color: #00769c9e;
  }
  /* Works on Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
  }
  ${({ theme }) => theme.breakpoints.m} {
    padding: 0 0 0 13%;
  }
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled(NavLink)`
  padding: 18px;
  font-size: 17px;
  border-top: 2px solid white;
  :last-child {
    border-bottom: 2px solid white;
  }
  :hover {
    background: #00556f;
    color: white;
  }
  &.active {
    background: #00769c !important;
  }
`;

const Banner = styled.div`
  margin: 40px auto;
  width: 80%;
`;

const InfoBox = styled.div`
  width: 80%;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.m} {
    width: 100%;
  }
`;
const P = styled.p`
  font-weight: 300;
  font-size: 16px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  ${({ theme }) => theme.breakpoints.m} {
    justify-content: flex-start;
    gap: 20px;
  }
`;
const SocialLink = styled.a`
  display: block;
  height: 40px;
  width: 40px;
  @media (min-width: 992px) and (max-width: 1128px) {
    height: 30px;
    width: 30px;
  }
  @media (min-width: 744px) and (max-width: 992px) {
    height: 25px;
    width: 25px;
  }
`;

const HelpInfo = styled.div`
  margin-bottom: 25px;
  p {
    margin-bottom: 0.4rem;
    font-size: 16px;
    font-family: MuseoSansRounded;
    font-weight: 500;
  }
  button {
    text-decoration: underline;
    background: transparent;
    border: none;
    display: inline-block;
    cursor: pointer;
    padding: 0;
  }
`;

const Copyright = styled.div`
  padding: 8% 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 100;
  width: 95%;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.m} {
    margin: 0;
  }
`;
const Param = styled.p`
  font-family: MuseoSansRounded;
  font-size: 20px;
  span {
    font-weight: bold;
  }
`;
