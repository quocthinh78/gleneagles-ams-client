import styled from "styled-components";
import * as s from "../../styles/AdminPage.styles";

function CPPollVoteOption({ vote_id, title, onChange, removeVote }) {
  return (
    <Container>
      <s.FormGroup>
        <label htmlFor={`vote_title_${vote_id}`}>Answer</label>
        <input
          id={`vote_title_${vote_id}`}
          name="title"
          onChange={(e) => onChange(e, vote_id)}
          value={title}
          type="text"
          placeholder="Please enter vote answer"
          required
        />
      </s.FormGroup>
      <s.Button className="removeVote" onClick={() => removeVote(vote_id)}>
        Remove Answer
      </s.Button>
    </Container>
  );
}

export default CPPollVoteOption;

const Container = styled.div`
  margin-bottom: 1rem;
  .removeVote {
    background-color: red;
    border: none;
  }
`;
