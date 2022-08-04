import { Collapse, Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import chervonDown from "../../assets/images/chevron_down.svg";
import {
  discussion1,
  discussion2,
  session1,
  session2,
} from "../../containers/HomeTemplate/LoginPage/programmeData";

const useStyles = makeStyles((theme) => ({
  text: {
    display: "flex",
    justifyContent: "space-between",
    color: "#00769c",
    lineHeight: "19px",
    fontFamily: "MuseoSansRounded",
    fontSize: 14,
    padding: 16,
    fontWeight: 300,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("md")]: {
      padding: 18,
      fontSize: "1.3rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: 20,
      fontSize: "1.5rem",
    },
  },
  highlight: {
    backgroundColor: "#8a8c8e",
    color: "#ffffff",
    fontWeight: 700,
  },
  title: {
    marginTop: "2.5rem",
    marginBottom: "0.5rem",
    color: "#00769c",
    fontSize: "1.6rem",
    fontWeight: 700,
    width: "90%",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
      textAlign: "start",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.5rem",
    },
  },
  body: {
    width: "90%",
  },
  collapseTitle: {
    cursor: "pointer",
    fontWeight: 700,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
  collapseChervon: {
    height: 20,
    width: 20,
    [theme.breakpoints.up("md")]: {
      height: 25,
      width: 25,
    },
  },
  rotateUp: {
    transform: "rotate(180deg)",
  },
  speaker: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
    },
  },
  speakerInfo: {
    paddingRight: 15,
    paddingLeft: 15,
    fontFamily: "MuseoSansRounded",
    textAlign: "center",
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 20,
    [theme.breakpoints.up("lg")]: {
      flexDirection: "column",
      width: "25%",
      alignItems: "center",
      paddingBottom: 0,
      justifyContent: "flex-start",
    },
    [theme.breakpoints.up("sm")]: {
      alignItems: "center",
    },
  },
  speakerImg: {
    borderRadius: "50%",
    width: "50%",
    width: "120px",
    height: "120px",
    objectFit: "cover",
    [theme.breakpoints.up("lg")]: {
      width: "220px",
      height: "220px",
      objectFit: "cover",
      paddingRight: 0,
    },
    [theme.breakpoints.up("md")]: {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      paddingRight: 0,
    },
  },
  speakerInfoContainer: {
    width: "50%",
    textAlign: "start",
    paddingLeft: 15,
    [theme.breakpoints.up("lg")]: {
      textAlign: "center",
      width: "100%",
      paddingLeft: 0,
    },
  },
  info1: {
    color: "#00789d",
    fontWeight: 700,
    fontSize: "1.0625rem",
    marginBottom: "10px",
    lineHeight: 1,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "10px",
    },
  },
  info2: {
    fontSize: "0.8125rem",
    color: "#00789d",
    fontWeight: 700,
    lineHeight: 1,
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  info3: {
    color: "#015571",
    fontSize: "0.6875rem",
    lineHeight: 1.4,
    marginTop: "0.8rem",
    [theme.breakpoints.up("md")]: {
      fontSize: 14,
    },
  },
  speechDetails: {
    width: "100%",
    fontFamily: "MuseoSansRounded",
    [theme.breakpoints.up("lg")]: {
      paddingRight: 15,
      paddingLeft: 15,
      width: "75%",
    },
  },
  speechDetailTitle: {
    color: "#00789d",
    lineHeight: 1,
    fontWeight: 900,
    marginBottom: 16,
    fontSize: "1.25rem",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      textAlign: "start",
    },
  },
  speechDetailText: {
    color: "#6d6d6d",
    lineHeight: 1.2,
    marginBottom: 16,
    fontSize: "0.8125rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  moderator: {
    
    paddingBottom: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      width: "90%",
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
    },
    [theme.breakpoints.up("l")]: {
      width: "50%",
      paddingBottom: 0,
      paddingRight: 20,
      paddingLeft: 20,
    },
  },
  moderatorImg: {
    //paddingRight: 15,
    //paddingLeft: 15,
    width: "41.667%",
    "& img": {
      width: "100%",
      borderRadius: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
    [theme.breakpoints.up("l")]: {
      width: "50%",
    },
  },
  moderatorInfo: {
    paddingLeft: 15,
    width: "58.333%",
    fontFamily: "MuseoSansRounded",
  },
  moderatorInfo1: {
    fontSize: "1.5rem",
    color: "#00789d",
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
    },
  },
  moderatorInfo2: {
    marginBottom: "8px",
    fontSize: "1rem",
    color: "#00789d",
    fontWeight: 700,
    lineHeight: 1,
    marginTop: "10px",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
  },
  moderatorInfo3: {
    marginBottom: "0.8rem",
    fontSize: "0.9rem",
    color: "#00789d",
    lineHeight: 1,
    fontWeight: 700,
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  moderatorInfo4: {
    color: "#015571",
    fontSize: 12,
    fontWeight: 300,
    lineHeight: 1.4,
    marginTop: "0.8rem",
    marginBottom: 0,
    [theme.breakpoints.up("md")]: {
      fontSize: 14,
    },
  },
  loginSection: {
    width: "90%",
    margin: "2.5rem auto 0",
    [theme.breakpoints.up("md")]: {
      margin: 0,
      position: "absolute",
      bottom: "5%",
      left: "72%",
      width: "50%",
      transform: "translate(-50%)",
    },
  },
  withSpan: {
    width: "90%",
  }
}));

const ProgrammeTable = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Container className={classes.title}>
        <span>Programme</span>
      </Container>
      <Container className={classes.body}>
        <div className={classes.text + " " + classes.highlight}>
          <span>SESSION 1</span>
          <span>1.20pm to 2.35pm</span>
        </div>
        <div>
          {session1.map((item, index) => (
            <CollapsingBox
              highlight={index % 2 === 0}
              title={item.title}
              key={item.title}
            >
              <div className={classes.speaker}>
                <div className={classes.speakerInfo}>
                  <img
                    src={item.speaker.img}
                    alt="speaker img"
                    className={classes.speakerImg}
                  />
                  <div className={classes.speakerInfoContainer}>
                    <div className={classes.info1}>{item.speaker.name}</div>
                    <div className={classes.info2}>{item.speaker.position}</div>
                    <div className={classes.info3}>{item.speaker.grad}</div>
                  </div>
                </div>
                <div className={classes.speechDetails}>
                  <div className={classes.speechDetailTitle}>Profile</div>
                  <div className={classes.speechDetailText}>
                    {item.details.profile}
                  </div>
                  {item.details.abstract != null ? (
                      <><div className={classes.speechDetailTitle}>Abstract</div><div className={classes.speechDetailText}>
                        {item.details.abstract}
                      </div></>
                    ) : (
                      <></>
                    )
                  }
                </div>
              </div>
            </CollapsingBox>
          ))}
          <CollapsingBox
            highlight={session1.length % 2 === 0}
            title={"Panel Q&A Discussion"}
          >
            <div className={classes.speaker}>
              {discussion1.map((item, index) => (
                <div className={classes.moderator} key={"moderator_" + index}>
                  <div className={classes.moderatorImg}>
                    <img src={item.img} alt="moderator" />
                  </div>
                  <div className={classes.moderatorInfo}>
                    <p className={classes.moderatorInfo1}>Moderator</p>
                    <p className={classes.moderatorInfo2}>{item.name}</p>
                    <p className={classes.moderatorInfo3}>{item.position}</p>
                    <p className={classes.moderatorInfo4}>{item.grad}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsingBox>
        </div>
        <div className={classes.text + " " + classes.highlight}>
          <span>SESSION 2</span>
          <span>2.55pm to 4.10pm</span>
        </div>
        <div>
          {session2.map((item, index) => (
            <CollapsingBox
              highlight={index % 2 === 0}
              title={item.title}
              key={item.title}
            >
              <div className={classes.speaker}>
                <div className={classes.speakerInfo}>
                  <img
                    src={item.speaker.img}
                    alt="speaker img"
                    className={classes.speakerImg}
                  />
                  <div className={classes.speakerInfoContainer}>
                    <div className={classes.info1}>{item.speaker.name}</div>
                    <div className={classes.info2}>{item.speaker.position}</div>
                    <div className={classes.info3}>{item.speaker.grad}</div>
                  </div>
                </div>
                <div className={classes.speechDetails}>
                  <div className={classes.speechDetailTitle}>Profile</div>
                  <div className={classes.speechDetailText}>
                    {item.details.profile}
                  </div>
                  {item.details.abstract != null ? (
                  <><div className={classes.speechDetailTitle}>Abstract</div><div className={classes.speechDetailText}>
                      {item.details.abstract}
                    </div></>
                   ) : (
                    <></>
                  )}
                  
                </div>
              </div>
            </CollapsingBox>
          ))}
          <CollapsingBox
            highlight={session2.length % 2 === 0}
            title={"Panel Q&A Discussion"}
          >
            <div className={classes.speaker}>
              {discussion2.map((item, index) => (
                <div className={classes.moderator} key={"moderator_" + index}>
                  <div className={classes.moderatorImg}>
                    <img src={item.img} alt="moderator" />
                  </div>
                  <div className={classes.moderatorInfo}>
                    <p className={classes.moderatorInfo1}>Moderator</p>
                    <p className={classes.moderatorInfo2}>{item.name}</p>
                    <p className={classes.moderatorInfo3}>{item.position}</p>
                    <p className={classes.moderatorInfo4}>{item.grad}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsingBox>
        </div>
      </Container>
    </Fragment>
  );
};

export default ProgrammeTable;

const CollapsingBox = ({ children, highlight, title = "" }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        className={clsx(classes.text, classes.collapseTitle)}
        onClick={handleToggle}
        style={{ background: highlight ? "#e5f3f4" : "white" }}
      >
        <span className={classes.withSpan}>{title}</span>
        <img
          src={chervonDown}
          className={clsx(classes.collapseChervon, {
            [classes.rotateUp]: open,
          })}
          alt="chervon img"
        />
      </div>
      <Collapse in={open}>{children}</Collapse>
    </div>
  );
};
