import React from "react";
import styled from "styled-components";
import bannerTop from "../../assets/images/RSVPbanner.png";
import bannerBottom from "../../assets/images/bannerbottom.jpg";

import logo1 from "../../assets/images/logo4.png";
import logo2 from "../../assets/images/logo3.png";
import logo3 from "../../assets/images/logo2.png";
import logo4 from "../../assets/images/logo1.png";

export default function CPMiddleContent() {
  return (
    <MiddleSideContent>
      <MiddleTopContent>
        <ImageTop src={bannerTop} />
      </MiddleTopContent>
      <MiddleMain>
        <LeftSide>
          <h4>PRESIDENT’S VOLUNTEERISM & PHILANTHROPY AWARDS 2021</h4>
          <p>
            A City of Good is made up of people who care for one another, and
            take action to make society better for all.
          </p>
          <br />
          <p>
            We warmly invite you to join us for the{" "}
            <span style={{ fontWeight: "bold", fontFamily: "GoThicB" }}>
              President’s Volunteerism & Philanthropy Awards (PVPA) 2021
              ceremony
            </span>{" "}
            to celebrate and recognise individuals, leaders, organisations, and
            cross-sector partnerships that have achieved excellence in giving.
          </p>
          <br />
          <p>
            Come celebrate with our winners and be inspired by their stories to
            be more other-centred in giving your best for others in our City of
            Good!
          </p>
          <br />
        </LeftSide>
        <RightSide>
          <h5>GUEST-OF-HONOUR</h5>
          <p>Mdm Halimah Yacob</p>
          <br />
          <h5>DATE & TIME</h5>
          <p>Monday, 11th October 2021</p>
          <p>4.30pm – 5.30pm</p>
          <br />
          <h5>VENUE</h5>
          <h5>Virtual Awards Ceremony Event</h5>
          <p>
            (Access to the private stream platform will be shared to your email
            after you have RSVP-ed for the virtual event)
          </p>
          <br />
          <h5>DRESS CODE</h5>
          <p>Smart Casual</p>
        </RightSide>
      </MiddleMain>
      <MiddleBottomContent>
        <ImageBottom src={bannerBottom} />
      </MiddleBottomContent>

      <GroupIconMobile>
        <img src={logo1} alt="img"></img>
        <img src={logo2} alt="img"></img>
        <img src={logo3} alt="img"></img>
        <img src={logo4} alt="img"></img>
      </GroupIconMobile>
    </MiddleSideContent>
  );
}

const MiddleSideContent = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.l} {
    display: flex;
    flex-direction: column;
    width: 85%;
    height: auto;
  }
`;
const MiddleTopContent = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: auto;
`;
const ImageTop = styled.img`
  width: 100%;
  height: 100%;
`;
const MiddleMain = styled.div`
  ${({ theme }) => theme.breakpoints.l} {
    display: flex;
    align-items: center;
    height: 50%;
  }
`;
const LeftSide = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;

  ${({ theme }) => theme.breakpoints.l} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  h4 {
    color: #1b3862;
    text-align: center;
    font-size: 16px;
    font-family: "GoThicB";
    ${({ theme }) => theme.breakpoints.l} {
      font-size: 18px;
    }
  }
  p {
    color: #1b3862;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.l} {
      margin: 0px !important;
      font-size: 14px;
    }
  }
`;

const RightSide = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  ${({ theme }) => theme.breakpoints.l} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  ${({ theme }) => theme.breakpoints.l} {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h5 {
    color: #1b3862;
    font-size: 14px;
    font-family: "GoThicB";
    margin: 0px !important;
    ${({ theme }) => theme.breakpoints.l} {
      margin: 0px !important;
    }
    ${({ theme }) => theme.breakpoints.xl} {
      font-size: 16px;
    }
  }

  p {
    color: #1b3862;
    font-size: 12px;
    ${({ theme }) => theme.breakpoints.l} {
      margin: 0px !important;
    }
    ${({ theme }) => theme.breakpoints.xl} {
      font-size: 14px;
    }
    ${({ theme }) => theme.breakpoints.sl} {
      line-height: 1.5;
    }
  }
`;

const MiddleBottomContent = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.l} {
    width: 100%;
    margin-top: auto;
  }
`;
const ImageBottom = styled.img`
  width: 100%;
  height: 100%;
`;

const GroupIconMobile = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  img {
    width: 25%;
    flex-shrink: 0;
  }
  ${({ theme }) => theme.breakpoints.l} {
    display: none;
  }
`;
