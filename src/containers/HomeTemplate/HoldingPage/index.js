import { Fragment, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router";
import styled from "styled-components";
import { AuthContext } from "../../../context/AuthProvider";
import { isStarted } from "../../../helpers/checkStartedDate";
import useUser from "../../../hooks/useUser";
import { actToggleEventUpdateState } from "../../../redux/actions/user/event";
import { LIVE_PAGE } from "../../../routes/constant";
import socket from "../../../services/socket";

function HoldingPage() {
  const eventData = useSelector((state) => state.userReducer.eventData);
  const user = useUser();
  const { logout } = useContext(AuthContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (eventData) {
      socket.on(`toggle-event-${eventData.id}`, (state) => {
        dispatch(actToggleEventUpdateState(state));

        if (isStarted(eventData.start_at) && state)
          history.push(`${LIVE_PAGE}/${eventData.id}`);
      });
    }

    return () => {
      eventData && socket.removeAllListeners(`toggle-event-${eventData.id}`);
    };
    // eslint-disable-next-line
  }, [eventData]);

  useEffect(() => {
    // console.log(user.data);
    const checkStartTime = setInterval(liveTimer, 1000);

    function liveTimer() {
      if (isStarted(eventData?.start_at) && eventData?.state)
        history.push(`${LIVE_PAGE}/${eventData?.id}`);
    }

    return () => {
      clearInterval(checkStartTime);
    };
    // eslint-disable-next-line
  }, []);

  const handleSignOut = () => {
    logout();
  };

  if (isStarted(eventData?.start_at) && eventData?.state)
    return <Redirect to={`${LIVE_PAGE}/${eventData.id}`} />;

  return (
    <Fragment>
      <UserInfo>
        <p>{user.data.first_name + " " + user.data.last_name}</p>
        <button onClick={handleSignOut}>Sign out</button>
      </UserInfo>
      <HoldingContent>
        <h1>Welcom to the 2nd AGM of ACME Corporate Limited</h1>
        <p>You will be directed to the meeting hall when meeting commence</p>
        <Video>
          <iframe
            width="971"
            height="546"
            src="https://www.youtube.com/embed/BHACKCNDMW8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Video>
      </HoldingContent>
    </Fragment>
  );
}

export default HoldingPage;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  p {
    font-size: 16px;
    margin-right: 1rem;
    font-weight: 600;
    color: #1b3862;
  }
  button {
    background: transparent;
    border: 1px solid #1b3862;
    border-radius: 8px;
    /* border: none; */
    color: #1b3862;
    font-weight: 600;
    cursor: pointer;
    height: 35px;
  }
  ${({ theme }) => theme.breakpoints.l} {
    position: absolute;
    top: 10px;
    right: 10px;
    width: fit-content;
    p {
      margin-bottom: 0;
    }
  }
`;

const HoldingContent = styled.div`
  text-align: center;
  width: 85%;
  margin: 0 auto;
  h1 {
    color: #1f6959;
    font-family: "GoThicB";
    font-size: 36px;
  }
  p {
    font-size: 18px;
    font-family: "GoThic";
    color: #1f6959;
    margin-bottom: 50px;
  }
`;

const Video = styled.div`
  iframe {
    width: 100%;
    height: 300px;
    ${({ theme }) => theme.breakpoints.l} {
      width: 400px;
      height: 300px;
    }
  }
`;
