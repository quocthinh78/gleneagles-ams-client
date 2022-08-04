import { Fragment, useCallback, useEffect } from "react";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useState } from "react";
import apiInstance from "../../../../services";
import CPPollVoteOption from "../../../../components/CPAdminMainContent/CPPollVoteOption";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { ADMIN_POLLS_PAGE } from "../../../../routes/constant";

function EditPollPage() {
  const history = useHistory();
  const params = useParams();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [topic, setTopic] = useState("");
  const [event_id, setEventId] = useState(0);
  const [voteOptions, setVoteOptions] = useState([]);
  const [oldVotesRemoved, setOldVotesRemoved] = useState([]);

  const createPollOption = () => {
    setVoteOptions([...voteOptions, { id: uuidv4(), title: "", vId: null }]);
  };

  const getEventDefault = useCallback(() => {
    const eDefault = events
      ? events.filter((e) => parseInt(e.value) == event_id)
      : [];
    return eDefault[0];
    // eslint-disable-next-line
  }, [event_id]);

  const getPollDetails = async () => {
    const { data: pollDetail } = await apiInstance({
      url: `poll/get-poll-detail/${params.id}`,
      method: "GET",
    });
    const oldVotes =
      pollDetail.vote_option.length !== 0 &&
      pollDetail.vote_option.map((v) => ({
        id: uuidv4(),
        title: v.title,
        vId: v.id,
      }));
    setVoteOptions([...oldVotes]);
    setTopic(pollDetail.poll.topic);
    setEventId(pollDetail.poll.event_id);
  };
  const modifyVoteTitle = (e, id) => {
    const modifiedVoteOptions = [...voteOptions];
    const value = e.currentTarget.value;
    modifiedVoteOptions.forEach((vote) => {
      if (vote.id === id) {
        vote.title = value;
      }
    });
    setVoteOptions(modifiedVoteOptions);
  };

  const removeVote = (id) => {
    const deletedVote = voteOptions.filter((vote) => vote.id === id);
    if (deletedVote[0].vId) {
      setOldVotesRemoved([
        ...oldVotesRemoved,
        { id: deletedVote[0].vId, title: deletedVote[0].title },
      ]);
    }
    setVoteOptions(voteOptions.filter((vote) => vote.id !== id));
  };
  useEffect(() => {
    getPollDetails();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    if (voteOptions.length === 0) {
      return alert("Please add poll options");
    }
    const votesData = voteOptions.map((v) => ({
      id: v.vId,
      title: v.title,
    }));
    const deteleData = oldVotesRemoved;
    const bodyData = {
      id: parseInt(params.id),
      topic,
      event_id,
      vote_options_update: votesData,
      vote_options_delete: deteleData,
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "poll/edit-poll",
        method: "PATCH",
        data: bodyData,
      });

      toast.success("Poll updated");
      setTimeout(() => {
        history.push(ADMIN_POLLS_PAGE);
      }, 1500);
    } catch (err) {
      toast.error("Updating poll has been failed");
      console.log(err);
    }
  };
  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Poll</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT POLL</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="poll_event">Event</label>
            <Select
              options={events}
              value={getEventDefault()}
              instanceId
              onChange={(e) => {
                setEventId(e.value);
                // setEventDefault({ value: e.value, label: e.label });
              }}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="poll_topic">Poll Question</label>
            <input
              id="poll_topic"
              name="topic"
              onChange={(e) => setTopic(e.currentTarget.value)}
              value={topic}
              type="text"
              placeholder="Please enter poll topic"
              required
            />
          </s.FormGroup>

          {voteOptions.map((vote) => (
            <CPPollVoteOption
              key={vote.id}
              title={vote.title}
              vote_id={vote.id}
              onChange={modifyVoteTitle}
              removeVote={removeVote}
            />
          ))}
          <br />
          <s.Button onClick={createPollOption}>Add answer</s.Button>
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default EditPollPage;
