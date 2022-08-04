import { Container, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import styled from "styled-components";
import committee01 from "../../../assets/images/Dr Amitabh Monga.jpg";
import committee02 from "../../../assets/images/Dr Bernard Lee.jpg";
import committee03 from "../../../assets/images/Dr Ling Li Min.jpg";
import committee04 from "../../../assets/images/Dr Thomas Ho.jpg";
import committee05 from "../../../assets/images/Dr Hee Owen Kim.jpg";
import committee06 from "../../../assets/images/Dr Kenneth Chan.jpg";

import GoldSponsor from "../../../components/GoldSponsor";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "2.5rem",
    marginBottom: "0.5rem",
    color: "#00769c",
    fontSize: "1.6rem",
    fontWeight: 700,
    width: "90%",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.5rem",
    },

    "& a": {
      transition: "none",
    },
    "& a:hover": {
      color: "#36a1c1",
      textDecoration: "underline",
    },
  },
  body: {
    width: "90%",
  },
}));

function createData(img, name, position) {
  return { img, name, position };
}

const row = [
  createData(committee01,
    "Dr Amitabh Monga",
    <Fragment>
      CME Chairman
      <br />
      Gastroenterologist
    </Fragment>
  ),
  createData(committee02, "Dr Bernard Lee", "Orthopaedic Surgeon"),
  createData(committee03, "Dr Ling Li Min", "Infectious Disease Physician"),
  createData(committee04, "Dr Thomas Ho", "General Surgeon"),
  createData(committee05, "Dr Hee Owen Kim", "Ophthalmologist"),
  createData(committee06, "Dr Kenneth Chan", "Respiratory Physician"),

];

const MessagePage = () => {
  const classes = useStyles();

  return (
    <MainContainer>
      <Main>
        <Container className={classes.title}>
          <span>Chairman's Message</span>
        </Container>
        <Container className={classes.body}>
          <Text>
            I would like to extend a warm welcome to all our friends and colleagues, both in general practice as well as specialists in the
            IHH Healthcare group of hospitals to Gleneagles Hospital’s 24th Annual Medical Seminar (AMS). It’s been a challenging last
            couple of years with the raging pandemic and we, at Gleneagles Hospital, are delighted to welcome you all in person to this
            year’s AMS.
            <br />
            <br />
            The theme for this year’s seminar is “Touching Lives Through Advances in Surgical and Medical Treatment” in a variety of
            specialisations. Our panel of speakers will share their knowledge and experience in their respective talks. We will be touching
            on recent advances in cancer treatment, joint diseases, eye and heart diseases.
            <br />
            <br />
            Gleneagles Hospital is a great hospital to work in with numerous specialists from various complementary specialties under
            one roof. Multidisciplinary teams manage patients with complex problems in a congenial and friendly atmosphere.
            <br />
            <br />
            We hope you will find the talks engaging, insightful and may you gain new perspectives to benefit your patients for time to
            come.
          </Text>
          <Sign>
            <span>Dr Amitabh Monga</span>
            <span>CME Chairman,</span>
            <span>Gleneagles&nbsp;Hospital&nbsp;Singapore</span>
          </Sign>
        </Container>
        <Container className={classes.title}>
          <span>Organising Committee</span>
        </Container>
        <Container className={classes.body}>
          <Committee>
            <CommitteeWrapper>
              {row.map((committee) => (
                <CommitteeInfo key={committee.name}>
                  <img src={committee.img} alt="Doctor" />
                  <CommitteeName>{committee.name}</CommitteeName>
                  <CommitteePosition>{committee.position}</CommitteePosition>
                </CommitteeInfo>
              ))}
            </CommitteeWrapper>
          </Committee>
          <Ul>
            <Li>Facilities Management, Gleneagles Hospital</Li>
            <Li>Hospital Operations, Gleneagles Hospital</Li>
            <Li>
              Medical Affairs (CME and Physician Communication), IHH Healthcare
              Singapore
            </Li>
            <Li>Marketing, IHH Healthcare Singapore</Li>
          </Ul>
        </Container>
      </Main>
      <GoldSponsor />
    </MainContainer>
  );
};

export default MessagePage;

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

const Text = styled.div`
  color: #015571;
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 18px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 20px;
  }
`;

const Sign = styled.div`
  margin: 1.5rem 0 3rem;
  color: #015571;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  span {
    line-height: 1.3;
  }
  span:first-child {
    font-size: 22px;
  }
`;

const Ul = styled.ul`
  margin-top: 1.5rem;
  line-height: 1.5;
  padding-left: 20px;
  color: #015571;
  font-weight: 700;
  font-size: 16px;
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 18px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 20px;
  }
`;

const Li = styled.li`
  margin-bottom: 8px;
  ${({ theme }) => theme.breakpoints.xl} {
    margin-bottom: 14px;
  }
`;

const Committee = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommitteeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 850px
`;

const CommitteeInfo = styled.div`
  margin: 0.6rem 1rem;
  text-align: center;

  p {
    color: #00769c;
    font-family: MuseoSans;
    font-weight: 700;
    line-height: 1;
  }
  img {
    width: 160px;
    height: auto;
    object-fit: cover;
    padding-bottom: 0.625rem;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    img {
      width: 100%;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    img {
      width: 180px;
    }
  }
  ${({ theme }) => theme.breakpoints.m} {
    img {
      width: 220px;
    }
  }
`;

const CommitteeName = styled.p`
  margin-bottom: 0.5rem;
  font-size: 18px;

  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 20px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 22px;
  }
`;

const CommitteePosition = styled.p`
  font-size: 13px;

  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 14px;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 16px;
  }
`;
