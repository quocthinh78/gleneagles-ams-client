import React from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
// import BgImage from "../../../assets/images/motif.png";

export default function CPAgendaContent({ activeTab }) {
  if (!activeTab) return <div style={{ display: "none" }}></div>;
  return (
    <Container>
      <Title>Event Programme</Title>
      <Content>
        <Event>
          <h5>8.30pm</h5>
          <p>Start of Sales Conference</p>
        </Event>
        <Event>
          <h5>8.35pm</h5>
          <p>Speech by Chief Executive</p>
        </Event>
        <Event>
          <h5>8.40pm</h5>
          <p>Consumer Business Unit </p>
        </Event>
        <Event>
          <h5>9.20pm</h5>
          <p>Export Sales Business Unit</p>
        </Event>
        <Event>
          <h5>9.50pm</h5>
          <p>Group Marketing</p>
        </Event>
        <Event>
          <h5>10.20pm</h5>
          <p>Break</p>
        </Event>
        <Event>
          <h5>10.30pm</h5>
          <p>Group Product Management</p>
        </Event>
        <Event>
          <h5>11.00pm</h5>
          <p>Digital Transformation</p>
        </Event>
        <Event>
          <h5>11.30pm</h5>
          <p>Sales Awards</p>
        </Event>
        <Event>
          <h5>12.00pm</h5>
          <p>End of Sales Conference</p>
        </Event>

        {/* <Event>
          <h5 className="opacity">4.50pm</h5>
          <p>- People of Good Awards</p>
        </Event>
        <Event>
          <h5 className="opacity">4.50pm</h5>
          <p>- Leaders of Good Awards</p>
        </Event>
        <Event>
          <h5 className="opacity">4.50pm</h5>
          <p>- Organisations of Good Awards</p>
        </Event>
        <Event>
          <h5 className="opacity">4.50pm</h5>
          <p>- City of Good Award</p>
        </Event> */}
        {/* <Event>
          <h5>5.20pm</h5>
          <p>Closing Speech by Chairman</p>
        </Event>
        <Event style={{ margin: "0 30px 20px 0" }}>
          <h5>5.30pm</h5>
          <p>End of PVPA 2021 Awards Ceremony</p>
        </Event> */}
        <br></br>
      </Content>
      {/* <Motif>
        <img src={BgImage} alt="background" />
      </Motif> */}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox 64 */
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.h3`
  font-family: "GothicB";
  color: #1b3862;
  margin: 20px 0 20px 10px;
  font-size: 20px;
  ${({ theme }) => theme.breakpoints.l} {
    margin: 20px 0 20px 20px;
  }
`;
const Content = styled.div`
  width: 100%;
  padding: 5px 0 0px 10px;
  color: #1b3862;
  ${({ theme }) => theme.breakpoints.l} {
    padding: 10px 25px 10px 20px;
  }
`;
const Motif = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
  width: 200px;
  height: 200px;
  ${({ theme }) => theme.breakpoints.m} {
    width: 250px;
    height: 250px;
    display: block;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    width: 275px;
    height: 275px;
  }
`;

const Event = styled.div`
  display: flex;
  margin-bottom: 12px;
  h5 {
    font-size: 18px;
    font-family: "GothicB";
    margin: 0 30px 0 0;
  }
  p {
    font-size: 18px;
    font-family: "GothicB";
    font-weight: bold;
    margin: 0;
  }
  .opacity {
    opacity: 0;
  }
`;
