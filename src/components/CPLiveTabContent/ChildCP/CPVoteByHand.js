import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actUpdateSubmitShareHand } from "../../../redux/actions/event/sharehand"
import CPVoteResultShareHand from "./CPVoteResultShareHand";
import styled from "styled-components";
import apiInstance from "../../../services";

const CPVoteByHand = ({ id, active, noshare, agreeVal, againstVal, abstainVal, agree_total, against_total, abstain_total }) => {

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer.data);
  const [result, setResult] = useState("agree");
  const handleVoteByHand = async () => {
    try {
      const { data } = await apiInstance({
        url: "resolution/submit-vote",
        method: "POST",
        data: {
          user_id: userData.id,
          resolution_id: id,
          agree: result === "agree" ? 1 : 0,
          against: result === "against" ? 1 : 0,
          abstain: result === "abstain" ? 1 : 0,
        },
      });
      if (data) {
        dispatch(actUpdateSubmitShareHand(data.newVote))
        alert("Vote successfully")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {agreeVal === null || againstVal === null ? (<ContentVote>
        <VoteItem>
          <label htmlFor="voteFor" className={active === 3 ? "hide_button" : ""}>For</label>
          <input
            type="radio"
            id="voteFor"
            name="resolution"
            value="agree"
            checked={result === "agree"}
            onChange={() => setResult("agree")}
            className={active === 3 ? "hide_button" : ""}
          />
        </VoteItem>
        <VoteItem>
          <label htmlFor="voteAgainst" className={active === 3 ? "hide_button" : ""}>Against</label>
          <input
            type="radio"
            id="voteAgainst"
            name="resolution"
            value="against"
            checked={result === "against"}
            onChange={() => setResult("against")}
            className={active === 3 ? "hide_button" : ""}
          />
        </VoteItem>
        <VoteItem>
          <label htmlFor="voteAbstain" className={active === 3 ? "hide_button" : ""}>Abstain</label>
          <input
            type="radio"
            id="voteAbstain"
            name="resolution"
            value="abstain"
            checked={result === "abstain"}
            onChange={() => setResult("abstain")}
            className={active === 3 ? "hide_button" : ""}
          />
        </VoteItem>
      </ContentVote>) : (<div style={{ fontSize: "18px", textAlign: "center" }} className={active === 3 ? "hide_button" : ""}>This resolution has been voted</div>)}
      {active === 3 && (<CPVoteResultShareHand agreeTotal={agree_total} againstTotal={against_total} abstainTotal={abstain_total} active={active} />)}
      <ButtonGroup>
        {agreeVal === null || againstVal === null ? <button onClick={handleVoteByHand} className={active === 1 || active == 3 ? "hide_button" : ""}>Confirm</button> : (<div></div>)}
      </ButtonGroup>
    </Container>
  );
};

export default CPVoteByHand;

const Container = styled.div`
  .hide_button{
    display: none;
  }
`;

const ContentVote = styled.div`
  width: 50%;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.l} {
    width: 30%;
  }
  div {
    display: flex;
    align-items: center;
  }
  div label {
    font-size: 18px;
  }
  div input {
    width: 30px;
    margin-left: auto;
    height: 30px;
  }
`;

const VoteItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
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
