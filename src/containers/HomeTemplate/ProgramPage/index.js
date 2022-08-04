import React from "react"; 
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import GoldSponsor from "../../../components/GoldSponsor";
import banner from "../../../assets/images/Banner For Login.png";
import ProgrammeTable from "../../../components/ProgrammeTable";

const useStyles = makeStyles((theme) => ({
  bannerWrapper: {
    position: "relative",
    width: "100%",
  }
}));

function ProgramPage() {
  const classes = useStyles();

  return (
    <MainContainer>
      <Main>
        <div className={classes.bannerWrapper}>
          <Img src={banner} alt="banner" />
        </div>
        <ProgrammeTable />
      </Main>
      <GoldSponsor />
    </MainContainer>
  );
}

export default ProgramPage;

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

const Img = styled.img`
  display: block;
  width: 100%;
`;
const Param = styled.p`
  font-family: MuseoSansRounded;
  font-size: 20px;
  span {
    font-weight: bold;
  }
  input {
    border-radius: 10px;
    padding: 15px;
    background: #ffffff;
    border: 1.5px solid #737373;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    &:focus: {
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
      outline: none;
    }
  }
  button {
    border-radius: 10px;
    background: #6d6f71;
    color: #ffffff;
    font-weight: 400;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background: #ffffff;
      color: #6d6f71;
      transition: all 0.3s;
    }
  }
`;
