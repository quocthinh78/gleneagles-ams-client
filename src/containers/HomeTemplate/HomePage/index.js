import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import bg from "../../../assets/images/background-desktop.png";
import regisClosed from "../../../assets/images/RSVP Button V2.png";
import sponsorImg from "../../../assets/images/Sponsor Logo.png";
import GoldSponsor from "../../../components/GoldSponsor";
import ProgressiveImage from "../../../components/ProgressiveImage";
import { REGISTRATION_PAGE } from "../../../routes/constant";
import { Fragment } from "react";
import { useMedia } from "react-use";


const useStyles = makeStyles((theme) => ({
  text: {
    color: "#00769c",
    lineHeight: "19px",
    fontFamily: "MuseoSansRounded",
    fontSize: 12,
    padding: "0.7rem 5px",
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      padding: "0.5rem 5px",
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0.7rem 0.4rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "1rem",
      fontSize: "1.5vw",
      lineHeight: "2rem",
    },
  },
  table: {
    marginBottom: "14px",
    backgroundColor: "#fff",
    color: "#00769c",
    fontWeight: 700,
    boxShadow: "0 5px 30px -5px rgb(0 0 0 / 35%)",
    borderRadius: "unset",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "1.5rem",
    },
  },
  header: {
    backgroundColor: "#00769c",
  },
  tableHead: {
    color: "#ffffff",
    fontWeight: 700,
  },
  highlight: {
    backgroundColor: "#8a8c8e",
    color: "#ffffff",
    fontWeight: 700,
  },
  highlightOddRow: {
    backgroundColor: "#e3f5f5",
  },
  time: {
    width: "16.667%",
  },
  highlightTime: {
    color: "#eb4034",
  },
  topic: {
    width: "auto",
    fontWeight: 700,
    // [theme.breakpoints.up("sm")]: {
    //   width: "58.333%",
    // },
  },
  speaker: {
    width: "33.333%",
  },
  sectionRow: {
    color: "#ffffff",
    fontWeight: 700,
  },
  sectionColoum1: {
    width: "16.667%",
    borderBottom: "none",
  },
  sectionColoum2: {
    width: "auto",
    fontFamily: "MuseoSansRounded",
    fontWeight: "300 !important",
    borderBottom: "none",
  },
  sectionColoum3: {
    width: "33.333%",
    borderBottom: "none",
  }
}));

function createData(time, topic, speaker) {
  return { time, topic, speaker };
}

const rows = [
  [
    createData(
      "1.20 pm",
      "Personalised and Chemotherapy Free Treatment in Chronic Lymphocytic Leukaemia (CLL)",
      <Fragment>
        Dr Lee Yuh Shan
        <br />
        Haematologist
      </Fragment>
    ),
    createData(
      "1.35 pm",
      "Utility of the Comprehensive Geriatric Assessment (CGA) and Predictive Tools in Older Adults with Cancer",
      <Fragment>
        Dr Angela Pang
        <br />
        Medical Oncologist
      </Fragment>
    ),
    createData(
      "1.50 pm",
      "How to Diagnose and Manage Angina Without Obstructive Coronary Artery Disease?",
      <Fragment>
        Dr Saurabh Rastogi
        <br />
        Cardiologist
      </Fragment>
    ),
    createData(
      "2.05 pm",
      "Cytokine Inhibition, Beyond the Anti TNFs – Dousing the Fire of Inflammation",
      <Fragment>
        Dr Anita Lim
        <br />
        Rheumatologist
      </Fragment>
    ),
    createData(
      "2.20 pm",
      "Panel Q&A Discussion",
    ),
    createData(
      "2.35 pm",
      "Tea & Coffee Break",
    ),
  ],
  [
    createData(
      "2.55 pm",
      "Updates in Cataract Surgery – Where we are in the 2020s?",
      <Fragment>
        Dr Don Pek
        <br />
        Ophthalmologist
      </Fragment>
    ),
    createData(
      "3.10 pm",
      "Embolotherapy – New Approaches to Old Diseases",
      <Fragment>
        Dr Benjamin Chua
        <br />
        General Surgeon
      </Fragment>
    ),
    createData(
      "3.25 pm",
      "Cartilage Regeneration – An Option to Knee Replacement?",
      <Fragment>
        Dr Tho Kam San
        <br />
        Orthopaedic Surgeon
      </Fragment>
    ),
    createData(
      "3.40 pm",
      "Advancing the Care of Prostate Cancer",
      <Fragment>
        Dr Wong Siew Wei
        <br />
        Medical Oncologist
      </Fragment>
    ),
    createData("3.55 pm", "Panel Q&A Discussion", ""),
    createData("4.10 pm", "End of Session", ""),
  ],
];

const HomePage = () => {
  const classes = useStyles();
  const isMobile = useMedia("(max-width: 480px)");

  return (
    <MainContainer>
      {/* {!isMobile ? (
        <ProgressiveImage
          src={bg}
          placeholder={bgSmall}
          alt="background"
          style={{ width: "100%" }}
        />
      ) : (
        <Img src={bg} alt="background" />
      )} */}
      <ProgressiveImage
        src={bg}
        placeholder={bg}
        alt="background"
        style={{ width: "100%" }}
      />
      <RegisBtn to={REGISTRATION_PAGE}>
        <Img src={regisClosed} alt="register" />
      </RegisBtn>
      <Programme>
        {/* <ProgrammeTime>
          <p>15 May 2021, Saturday</p>
          <p>1.00pm to 3.20pm</p>
        </ProgrammeTime>
        <Dots>.......................................</Dots> */}
        <TitleHeader>
          Touching lives<br />through advances in surgical and medical treatment
        </TitleHeader>
        <Title>
          <span>Programme</span>
        </Title>
        <SubTitle>
          <span>Registration will be closed on 12 Aug 2022 or when all seats are filled.</span>
        </SubTitle>
        <ProgrammeContainer>
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="Programme table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell className={`${classes.text} ${classes.tableHead}`}>
                    Time
                  </TableCell>
                  <TableCell className={`${classes.text} ${classes.tableHead}`}>
                    Topic
                  </TableCell>
                  <TableCell className={`${classes.text} ${classes.tableHead}`}>
                    Speaker
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.highlightOddRow}>
                  <TableCell className={classes.text + " " + classes.time}>
                    12.00 pm –<br />
                    1.00 pm
                  </TableCell>
                  <TableCell className={classes.text + " " + classes.topic}>
                    Registration and Lunch*
                  </TableCell>
                  <TableCell className={classes.text + " " + classes.speaker}>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.text + " " + classes.time}>
                    1.15 pm
                  </TableCell>
                  <TableCell className={classes.text + " " + classes.topic}>
                    Welcome Address
                  </TableCell>
                  <TableCell className={classes.text + " " + classes.speaker}>
                    Dr Melvin Heng<br />
                    Chief Executive Officer<br />
                    Gleneagles Hospital Singapore
                  </TableCell>
                </TableRow>
                {rows.map((section, index) => (
                  <Fragment key={"section_" + index}>
                    <TableRow name={"section_" + index}>
                      <TableCell
                        // colSpan={3}
                        // component="th"
                        // scope="rowgroup"
                        className={`${classes.text} ${classes.highlight} ${classes.sectionColoum1}`}
                      >
                        Session {index + 1}
                      </TableCell>
                      {index == 0 ? (
                        <><TableCell className={`${classes.text} ${classes.highlight} ${classes.sectionColoum2}`}>
                          Moderators:<br />
                          Dr Amitabh Monga, Gastroenterologist<br />
                          Dr Richard Quek, Medical Oncologist
                        </TableCell></>
                      ) : (
                        <>
                          <TableCell className={`${classes.text} ${classes.highlight} ${classes.sectionColoum2}`}>
                            Moderators:<br />
                            Dr Amitabh Monga, Gastroenterologist<br />
                            Dr Thomas Ho, General Surgeon
                          </TableCell></>
                      )
                      }

                      <TableCell className={`${classes.highlight} ${classes.sectionColoum3}`}></TableCell>
                    </TableRow>
                    {section.map((row, idx) => (
                      <TableRow
                        key={row.time}
                        className={idx % 2 === 0 ? classes.highlightOddRow : ""}
                      >
                        <TableCell
                          className={classes.text + " " + classes.time}
                        >
                          {row.time}
                        </TableCell>
                        <TableCell
                          className={classes.text + " " + classes.topic}
                        >
                          {row.topic}
                        </TableCell>
                        <TableCell
                          className={classes.text + " " + classes.speaker}
                        >
                          {row.speaker}
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ProgrammeContainer>
        <Container>
          <Param>
            The above programme is subject to change without prior notice.<br />
            This event will be accredited with CME points.
          </Param>
          <ParamNote>
            *Serving of lunch will cease at 2:00 pm.
          </ParamNote>
        </Container>
        {/* <Sponsor2>
          <p>Gold Sponsor</p>
          <div>
            <img src={sponsorImg} alt="sponsor" />
          </div>
        </Sponsor2> */}
        {/* <Sponsor1>
          <p>Silver Sponsor</p>
          <div>
            <img src={sponsorImg} alt="sponsor" />
          </div>
        </Sponsor1> */}
        <GoldSponsor />
      </Programme>
      {/* <Sponsor1>
        <p>Silver Sponsor</p>
        <div>
          <img src={sponsorImg} alt="sponsor" />
        </div>
      </Sponsor1> */}
    </MainContainer>
  );
};

export default HomePage;

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: MuseoSansRounded;
  font-weight: 500;
`;

const Programme = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  @media (min-width: 481px) {
    top: 30%;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  //transition: all 0.5s;
  // &:hover {
  //   transform: scale(1.05);
  // }
`;

const RegisBtn = styled(Link)`
  position: absolute;
  top: 0;
  right: 10%;
  width: 150px;
  margin-top: 40%;
  @media (min-width: 481px) {
    width: 25vw;
  }
  ${({ theme }) => theme.breakpoints.m} {
    width: 23vw;
  }
`;

const ProgrammeTime = styled.div`
  p {
    font-weight: 700;
    color: #fff;
    font-size: 24px;
    text-align: center;
    font-family: MuseoSansRounded;
    line-height: 1;
    margin-bottom: 16px;
  }
  @media (min-width: 481px) {
    display: none;
  }
`;

const Dots = styled.div`
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 16px;
  color: white;
  @media (min-width: 481px) {
    display: none;
  }
`;

const Title = styled.div`
  font-family: MuseoSans;
  font-weight: 700;
  text-align: center;
  color: white;
  font-size: 22px;
  @media (min-width: 481px) {
    font-size: 1.6rem;
  }
  @media (min-width: 600px) {
    padding: 0 26px;
  }
  ${({ theme }) => theme.breakpoints.m} {
    text-align: start;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 1.8rem;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 2rem;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 2.5rem;
    max-width: 1440px;
    margin: 0 auto;
  }
`;

const SubTitle = styled.div`
font-family: MuseoSans;
  font-weight: 500;
  text-align: center;
  color: white;
  font-size: 16px;
  width: 85%;
  margin : 0 auto 1.5rem;
  @media (min-width: 481px) {
    font-size: 1.2rem;
  }
  @media (min-width: 600px) {
    padding: 0 26px;
  }
  ${({ theme }) => theme.breakpoints.m} {
    text-align: start;
    width: 100%;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 1.2rem;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 1.4rem;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 1.6rem;
    max-width: 1440px;
  }
`

const ProgrammeContainer = styled(Container)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1440px !important;
  @media (max-width: 768px) {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
`;

const Param = styled.p`
  font-family: MuseoSansRounded;
  font-weight: 500;
  color: #015571;
  font-size: 14px;
  margin-bottom: 1rem;
  ${({ theme }) => theme.breakpoints.m} {
    text-align: start;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    margin-left: 0.625rem;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    max-width: 1440px !important;
  }
`;
const ParamNote = styled.p`
  font-family: MuseoSansRounded;
  font-weight: 500;
  color: #8a8c8e;
  font-size: 14px;
  margin-bottom: 1rem;
  padding-bottom: 0.825rem;
  ${({ theme }) => theme.breakpoints.m} {
    text-align: start;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    margin-left: 0.625rem;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    max-width: 1440px !important;
  }
`;

const Sponsor = styled.div`
  font-weight: 700;
  color: #00769c;
  padding: 1.5rem 0 1.5rem;
  p {
    font-family: MuseoSansRounded;
    font-weight: 700;
    font-size: 1.3rem;
    color: #00769c;
    margin-bottom: 10px;
  }
  img {
    max-width: 130px;
  }
`;
const Sponsor1 = styled(Sponsor)`
  @media (min-width: 1650px) {
    display: block;
  }
`;
const Sponsor2 = styled(Sponsor)`
  display: none;
  padding-top: 0;
  @media (min-width: 1650px) {
    display: none;
  }
`;
const TitleHeader = styled.h1`
  color: #00769c;
  font-size: 22px;
  font-weight: 900;
  text-align: initial;
  line-height: 1.5rem;
  @media (max-width: 744px) {
    text-align: center;
    font-weight: 700;
    text-align: center;
    font-size: 22px;
    line-height: 1.5rem;
  }
  @media (min-width: 600px) {
    padding: 0 26px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    font-size: 1.8rem;
    line-height: 2.5rem;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    font-size: 2rem;
  }
  ${({ theme }) => theme.breakpoints.sl} {
    font-size: 2.5rem;
    max-width: 1440px;
    margin: 0 auto;
  }
`;
