import { Fragment } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useState } from "react";
import apiInstance from "../../../../services";
import CPPollVoteOption from "../../../../components/CPAdminMainContent/CPPollVoteOption";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import socket from "../../../../services/socket";
import { ADMIN_POLLS_PAGE } from "../../../../routes/constant";
function CreatePollPage() {
  const history = useHistory();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [{ topic, event_id }, setForm] = useForm({
    topic: "",
    event_id: 0,
  });
  const [voteOptions, setVoteOption] = useState([]);
  const [loading, setLoading] = useState(false);

  const createPollOption = () => {
    setVoteOption([...voteOptions, { id: uuidv4(), title: "" }]);
  };

  const modifyVoteTitle = (e, id) => {
    const modifiedVoteOptions = [...voteOptions];
    const value = e.currentTarget.value;
    modifiedVoteOptions.forEach((vote) => {
      if (vote.id === id) {
        vote.title = value;
      }
    });
    setVoteOption(modifiedVoteOptions);
  };

  const removeVote = (id) => {
    setVoteOption(voteOptions.filter((vote) => vote.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    if (voteOptions.length === 0) {
      return alert("Please add poll options");
    }
    setLoading(true);
    const bodyData = {
      topic,
      event_id,
      status: 0,
      vote_options: voteOptions.map((vote) => vote.title),
    };
    console.log(bodyData);
    try {
      const { data } = await apiInstance({
        url: "poll/create-poll",
        method: "POST",
        data: bodyData,
      });

      socket.emit("new-poll", {
        event_id: event_id,
        poll_id: data.poll.id,
      });
      toast.success("Poll created");
      setLoading(false);
      setTimeout(() => {
        history.push(ADMIN_POLLS_PAGE);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error("Creating poll has been failed");
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">New Poll</div>
      </s.TitleBox>
      <s.MainTable isLoading={loading}>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE POLL</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="poll_event">Event</label>
            <Select
              options={events}
              instanceId
              onChange={(e) =>
                setForm({
                  target: { value: e.value, name: "event_id" },
                })
              }
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="poll_topic">Poll Question</label>
            <input
              id="poll_topic"
              name="topic"
              onChange={setForm}
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

export default CreatePollPage;
