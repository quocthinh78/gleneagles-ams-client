import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CPVoteResultShareHand from "./CPVoteResultShareHand";
import { useForm } from "../../../hooks/useForm";
import apiInstance from "../../../services";
import { useDispatch } from "react-redux";
import { actUpdateSubmitShareHand } from "../../../redux/actions/event/sharehand";

const CPVoteByShare = ({
  id,
  active,
  noshare,
  agreeVal,
  againstVal,
  abstainVal,
  agree_total,
  against_total,
  abstain_total,
}) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userReducer.data);
  const [{ agree, against, abstain }, setForm] = useForm({
    agree: 0,
    against: 0,
    abstain: 0,
  });

  // console.log(agree_total, against_total, abstain_total)

  const handleVoteByShare = async () => {
    try {
      if (
        parseInt(agree) + parseInt(abstain) + parseInt(against) >
        parseInt(noshare)
      ) {
        alert("The number of votes must be less than the specified amount");
      } else {
        // console.log(agree, against, abstain, userData.id, id)

        const { data } = await apiInstance({
          url: "resolution/submit-vote",
          method: "POST",
          data: {
            user_id: userData.id,
            resolution_id: id,
            agree: parseInt(agree),
            against: parseInt(against),
            abstain: parseInt(noshare) - parseInt(agree) - parseInt(against),
          },
        });
        // console.log(data);

        if (data) {
          dispatch(actUpdateSubmitShareHand(data.newVote));
          alert("Vote Successfully");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Container>
      {agreeVal === null || againstVal === null ? (
        <ContentVote>
          {active !== 3 && (
            <Number>No of share hold: {userData?.share_holding}</Number>
          )}

          <div className={active === 3 ? "hide_button" : ""}>
            <label
              htmlFor="shareFor"
              className={active === 3 ? "hide_button" : ""}
            >
              For
            </label>
            <input
              type="number"
              id="shareFor"
              name="agree"
              value={agree}
              onChange={setForm}
              min={0}
              max={noshare}
              className={active === 3 ? "hide_button" : ""}
            />
          </div>
          <div>
            <label
              htmlFor="shareAgainst"
              className={active === 3 ? "hide_button" : ""}
            >
              Against
            </label>
            <input
              type="number"
              id="shareAgainst"
              name="against"
              value={against}
              onChange={setForm}
              min={0}
              max={noshare}
              className={active === 3 ? "hide_button" : ""}
            />
          </div>
          <div className={active === 3 ? "hide_button" : ""}>
            <label htmlFor="shareAbstrain">Abstain</label>
            <input
              type="number"
              id="shareAbstrain"
              name="abstain"
              value={parseInt(noshare) - parseInt(agree) - parseInt(against)}
              disabled
              className={active === 3 ? "hide_button" : ""}
            />
          </div>
        </ContentVote>
      ) : (
        <div
          style={{ fontSize: "18px", textAlign: "center" }}
          className={active === 3 ? "hide_button" : ""}
        >
          This resolution has been voted
        </div>
      )}

      {active === 3 && (
        <CPVoteResultShareHand
          agreeTotal={agree_total}
          againstTotal={against_total}
          abstainTotal={abstain_total}
          active={active}
        />
      )}

      <ButtonGroup>
        {agreeVal === null || againstVal == null ? (
          <button
            onClick={handleVoteByShare}
            className={active === 1 || active === 3 ? "hide_button" : ""}
          >
            Confirm
          </button>
        ) : (
          <div></div>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default CPVoteByShare;

const Container = styled.div`
  .hide_button {
    display: none;
  }
`;

const Number = styled.div`
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
`;

const ContentVote = styled.div`
  width: 70%;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.l} {
    width: 50%;
  }

  div {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  div label {
    /* margin-right: 20px; */
    font-size: 18px;
  }
  div input {
    width: 100px;
    margin-left: auto;
    height: 30px;
    border: 1px solid #000;
  }
`;
const ButtonGroup = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;

  button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
  }
  button:nth-child(1) {
    background-color: rgb(241, 101, 119);
    color: #000;
  }
  button:nth-child(2) {
    margin-left: 10px;
    background-color: #1b3862;
    color: #fff;
  }
`;
