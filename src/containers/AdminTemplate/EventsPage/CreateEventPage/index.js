import { Fragment, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSelector } from "react-redux";

function CreateEventPage() {
  const history = useHistory();
  const users = useSelector((state) => state.adminReducer.listUsers);
  const videotypes = [
    { value: 0, label: "Dacast" },
    { value: 1, label: "Vimeo" },
    { value: 2, label: "Millicast" },
  ];
  const [typeoption, setTypeoption] = useState();
  const [
    {
      title,
      content,
      video_url,
      // video_type,
      start_at,
      state,
      is_poll,
      is_question,
      is_moderator,
      is_resolution,
      agenda,
      user_ids,
      pin_message_1,
      pin_message_2,
      pin_message_3,
      selected_pin_message,
      pause_message_1,
      pause_message_2,
      pause_message_3,
      selected_pause_message,
    },
    setForm,
  ] = useForm({
    title: "",
    content: "",
    video_url: "",
    video_type: "",
    start_at: "",
    state: false,
    is_poll: false,
    is_question: false,
    is_moderator: false,
    is_resolution: false,
    agenda: "",
    user_ids: [],
    pin_message_1: "",
    pin_message_2: "",
    pin_message_3: "",
    selected_pin_message: 0,
    pause_message_1: "",
    pause_message_2: "",
    pause_message_3: "",
    selected_pause_message: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = {
      title,
      content,
      video_url,
      video_type: typeoption,
      start_at,
      state,
      is_poll,
      is_question,
      is_moderator,
      is_resolution,
      agenda,
      user_ids,
      pin_message_1,
      pin_message_2,
      pin_message_3,
      selected_pin_message,
      pause_message_1,
      pause_message_2,
      pause_message_3,
      selected_pause_message,
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "event/create-event",
        method: "POST",
        data: bodyData,
      });
      toast.success("Event created");
      setTimeout(() => {
        history.push("/admin/events");
      }, 1500);
    } catch (err) {
      toast.error("Error when creating event");
    }
  };

  const handleOption = (e) => {
    setTypeoption(e.label);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Create Event</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE EVENT</s.H4>
          </s.Col_6>
        </s.Flex>
        <s.FormGroup>
          <label htmlFor="event_title">
            Title <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="event_title"
            name="title"
            onChange={setForm}
            value={title}
            type="title"
            placeholder="Event title"
            required
          />
        </s.FormGroup>
        {/* <s.FormGroup>
          <label htmlFor="event_content">
            Content <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="event_content"
            name="content"
            onChange={setForm}
            value={content}
            type="text"
            placeholder="Event content"
            required
          />
        </s.FormGroup> */}
        <s.FormGroup>
          <label htmlFor="event_video">
            Video url <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="event_video"
            name="video_url"
            onChange={setForm}
            value={video_url}
            placeholder="Video url"
            required
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="video_type">Video Type</label>
          <Select
            defaultValue={videotypes[0]}
            isClearable
            isSearchable
            id="video_type"
            name="video_type"
            options={videotypes}
            // getOptionValue={(option) => `${option["id"]}`}
            getOptionValue={(e) => handleOption(e)}
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="event_start">
            Start at <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="event_start"
            name="start_at"
            onChange={setForm}
            value={start_at}
            type="datetime-local"
            placeholder="Event start time"
            required
          />
        </s.FormGroup>
        <s.FormGroup
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <s.FormGroup>
            <label htmlFor="event_state">State</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="state"
                id="event_state"
                onChange={(e) =>
                  setForm({
                    target: { value: e.currentTarget.checked, name: "state" },
                  })
                }
                checked={state}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="event_poll">Poll</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_poll"
                id="event_poll"
                onChange={(e) =>
                  setForm({
                    target: { value: e.currentTarget.checked, name: "is_poll" },
                  })
                }
                checked={is_poll}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="event_question">Q&A</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_question"
                id="event_question"
                onChange={(e) =>
                  setForm({
                    target: {
                      value: e.currentTarget.checked,
                      name: "is_question",
                    },
                  })
                }
                checked={is_question}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="event_moderator">Moderator</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_moderator"
                id="event_moderator"
                onChange={(e) =>
                  setForm({
                    target: {
                      value: e.currentTarget.checked,
                      name: "is_moderator",
                    },
                  })
                }
                checked={is_moderator}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="event_resolution">Resolution</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_resolution"
                id="event_resolution"
                onChange={(e) =>
                  setForm({
                    target: {
                      value: e.currentTarget.checked,
                      name: "is_resolution",
                    },
                  })
                }
                checked={is_resolution}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="event_agenda">Agenda</label>
          <textarea
            id="event_agenda"
            name="agenda"
            onChange={setForm}
            value={agenda}
            placeholder="Event agenda"
            rows={8}
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="event_users">Users</label>
          <Select
            options={users}
            isMulti
            instanceId
            onChange={(e) =>
              setForm({
                target: {
                  value: e.map(({ value }) => value),
                  name: "user_ids",
                },
              })
            }
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="pin_message_1">
            Pin message 1 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pin_message_1"
            name="pin_message_1"
            onChange={setForm}
            value={pin_message_1}
            type="text"
            placeholder="Pin Message 1"
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="pin_message_2">
            Pin message 2 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pin_message_2"
            name="pin_message_2"
            onChange={setForm}
            value={pin_message_2}
            type="text"
            placeholder="Pin Message 2"
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="pin_message_3">
            Pin Message 3 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pin_message_3"
            name="pin_message_3"
            onChange={setForm}
            value={pin_message_3}
            type="text"
            placeholder="Pin Message 3"
          />
        </s.FormGroup>
        {/* <s.FormGroup>
          <label htmlFor="selected_pin_message">
            Selected Pin Message <span style={{ color: "red" }}></span>
          </label>
          <input
            id="selected_pin_message"
            name="selected_pin_message"
            onChange={setForm}
            value={selected_pin_message}
            type="text"
            placeholder="Selected Pin Message"
          />
        </s.FormGroup> */}
        <s.FormGroup>
          <label htmlFor="pause_message_1">
            Pause Message 1 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pause_message_1"
            name="pause_message_1"
            onChange={setForm}
            value={pause_message_1}
            type="text"
            placeholder="Pause Message 1"
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="pause_message_2">
            Pause Message 2 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pause_message_2"
            name="pause_message_2"
            onChange={setForm}
            value={pause_message_2}
            type="text"
            placeholder="Pause Message 2"
          />
        </s.FormGroup>
        <s.FormGroup>
          <label htmlFor="pause_message_3">
            Pause Message 3 <span style={{ color: "red" }}></span>
          </label>
          <input
            id="pause_message_3"
            name="pause_message_3"
            onChange={setForm}
            value={pause_message_3}
            type="text"
            placeholder="Pause Message 3"
          />
        </s.FormGroup>
        {/* <s.FormGroup>
          <label htmlFor="selected_pause_message">
            Selected Pause Message <span style={{ color: "red" }}></span>
          </label>
          <input
            id="selected_pause_message"
            name="selected_pause_message"
            onChange={setForm}
            value={selected_pause_message}
            type="text"
            placeholder="Selected Pause message"
          />
        </s.FormGroup> */}
        <s.Button onClick={handleSubmit}>Create Event</s.Button>
      </s.MainTable>
    </Fragment>
  );
}

export default CreateEventPage;

const ToggleContainer = styled.label`
  position: relative;
  display: block !important;
  width: 45px;
  height: 25px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  input:checked + .switch {
    background-color: teal;
  }

  input:focus + .switch {
    box-shadow: 0 0 1px teal;
  }

  input:checked + .switch:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
`;
