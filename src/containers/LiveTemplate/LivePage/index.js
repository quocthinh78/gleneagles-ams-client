import { Container, makeStyles } from "@material-ui/core";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import styled from "styled-components";
import CPLiveLeft from "../../../components/CPLiveLeft";
// import CPLiveRight from "../../../components/CPLiveRight";
import GoldSponsor from "../../../components/GoldSponsor";
import ProgrammeTable from "../../../components/ProgrammeTable";
import { actWipeOffEventReducer } from "../../../redux/actions/actRootReducer";
import { actToggleEventUpdateState } from "../../../redux/actions/user/event";
import { HOLDING_PAGE, LIVE_PAGE } from "../../../routes/constant";
import socket from "../../../services/socket";
import LivePageResourcesWrapper from "./LivePageResources";
import { AuthContext } from "../../../context/AuthProvider";
import CPQuestionContent from "../../../components/CPLiveTabContent/CPQuestionContent";
import banerAfterLogin from "../../../assets/images/After Login Banner.png";

const useStyles = makeStyles((theme) => ({
  survey: {
    marginTop: "1.5rem",
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
  },
  surveyText: {
    color: "#00769c",
    fontFamily: "MuseoSansRounded",
    fontWeight: 400,
    lineHeight: 1.1,
    fontSize: 14,
    width: "90%",
    "& button, & a": {
      border: "none",
      background: "transparent",
      padding: 0,
      outline: "none",
      cursor: "pointer",
      color: "#007bff",
      transition: "color .2s ease-in",
      textDecoration: "underline",
      "&:hover": {
        color: "#0056b3",
      },
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
    },
  },
  postEventNotice: {
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
    color: "#00769c",
    fontSize: "1.4rem",
    fontWeight: 700,
    width: "90%",
    lineHeight: 1,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem",
    },
  },
  postText: {
    marginTop: "1.2rem",
    width: "90%",
    fontFamily: "MuseoSansRounded",
    "& p": {
      fontSize: 16,
      lineHeight: "20px",
      color: "#00789d",
      marginBottom: "1rem",
      fontWeight: 500,
    },
  },
  takeNote: {
    width: "90%",
    marginTop: "1.2rem",
    fontSize: 14,
    color: "#00789d",
    fontFamily: "MuseoSans",
    fontWeight: 700,
    lineHeight: 1,
    [theme.breakpoints.up(480)]: {
      fontSize: 16,
    },
  },
  signOut: {
    color: "#00769c",
    position: "absolute",
    top: 0,
    right: 20,
    fontWeight: 500,
    fontSize: "1rem",
    border: "none",
    outline: "none",
    background: "transparent",
    cursor: "pointer",
    "&:hover": {
      color: "#007bff",
    },
  },
  questionSection: {
    width: "90%",
  },
}));

function LivePage() {
  const classes = useStyles();
  const params = useParams();
  const eventData = useSelector((state) => state.userReducer.eventData);
  const history = useHistory();
  const dispatch = useDispatch();
  const routeParamErr = eventData.state && eventData.id !== Number(params.id);
  const { logout } = useContext(AuthContext);
  const questionSectionOpened = useSelector(
    (state) => state.userReducer.eventData.is_question
  );

  useEffect(() => {
    if (eventData)
      // Listen to the event to be toggle (whether event is started or not)
      socket.on(`toggle-event-${eventData.id}`, (state) => {
        dispatch(actToggleEventUpdateState(state));

        if (!state) {
          dispatch(actWipeOffEventReducer());
          history.push(HOLDING_PAGE);
        }
      });

    return () => {
      eventData && socket.removeAllListeners(`toggle-event-${eventData.id}`);
    };
    // eslint-disable-next-line
  }, []);

  const handleSignOut = () => {
    logout();
  };

  if (routeParamErr) return <Redirect to={`${LIVE_PAGE}/${eventData.id}`} />;

  return (
    <MainContainer>
      <LivePageResourcesWrapper>
        <Main>
          {/* <CPLiveLeft /> */}
          {/* <CPLiveRight /> */}
          <Image alt="banerAfterLogin" src={banerAfterLogin} />
          <div style={{ position: "relative" }}>
            <button className={classes.signOut} onClick={handleSignOut}>
              Sign out
            </button>
            {/* {questionSectionOpened ? (
              <div>
                <Container className={classes.survey}>
                  <span>Q&amp;A</span>
                </Container>
                <Container className={classes.questionSection}>
                  <CPQuestionContent />
                </Container>
              </div>
            ) : (
              <div>
                <Container className={classes.survey}>
                  <span>Survey</span>
                </Container>
                <Container className={classes.surveyText}>
                  Let us know how the seminar was! Click{" "}
                  <a
                    href="https://www.surveymonkey.com/r/gehams2021"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>{" "}
                  to do a survey.
                </Container>
                <Container className={classes.postEventNotice}>
                  <span>IMPORTANT: Claiming your CME points</span>
                </Container>
                <Container className={classes.postText}>
                  <p>
                    For doctors who have logged in to their registed account to
                    watch the live stream on 15th May 2021, Gleneagles Hospital
                    will assist to submit their attendance to SMC.
                  </p>
                  <p>
                    Doctors who missed the live webinar on 15 May 2021 but have
                    watched the recorded videos may login to SMC website to
                    claim their CME points.
                    <br />
                    Please claim under Cat 3A and indicate the approved event ID{" "}
                    <b>(SMC20210325-1B-0003) </b>under 'Additional Remark'.
                  </p>
                </Container>
                <Container className={classes.takeNote}>
                  Take note: Video is available for your viewing on our website
                  until 31 May 2021
                </Container>
              </div>
            )} */}
          </div>

          <ProgrammeTable />
        </Main>
        <GoldSponsor />
      </LivePageResourcesWrapper>
    </MainContainer>
  );
}

export default LivePage;

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

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
