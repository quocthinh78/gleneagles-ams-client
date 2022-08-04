import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import _ from "lodash";
import moment from "moment";

function EditEventPage() {
  const history = useHistory();
  const params = useParams();
  const users = useSelector((state) => state.adminReducer.listUsers);
  const [oldUserIds, setOldUserIds] = useState([]);
  // console.log("oldUserIds", oldUserIds);
  // const [addedIds, setAddedId] = useState([]);
  // console.log("add", addedIds);
  // const [removedIds, setRemovedIds] = useState([]);
  // console.log("remove", removedIds);
  const videotypes = [
    { value: 0, label: "Dacast" },
    { value: 1, label: "Vimeo" },
    { value: 2, label: "Millicast" },
  ];
  console.log(videotypes[0]);

  const [typeoption, setTypeoption] = useState("");

  const [
    {
      title,
      content,
      video_url,
      start_at,
      video_type,
      state,
      is_poll,
      is_question,
      is_moderator,
      is_resolution,
      agenda,
      pin_message_1,
      pin_message_2,
      pin_message_3,
      pause_message_1,
      pause_message_2,
      pause_message_3,
    },
    setForm,
    ,
    setUpdated,
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
    pin_message_1: "",
    pin_message_2: "",
    pin_message_3: "",
    pause_message_1: "",
    pause_message_2: "",
    pause_message_3: "",
  });

  useEffect(() => {
    getEventDetail();
    // eslint-disable-next-line
  }, []);

  const listUserDefault = useCallback(() => {
    const uDefault = users
      ? users.filter((e) => oldUserIds.includes(e.value))
      : [];
    return uDefault;
    // eslint-disable-next-line
  }, [oldUserIds]);

  const listDefaultValue = useCallback(() => {
    const vDefault = videotypes
      ? videotypes.filter((e) => typeoption.includes(e.label))
      : [];
    return vDefault;
    //eslint-disable-next-line
  }, [typeoption]);

  const getFields = (input, field) => {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  };

  const handleUserSelect = (uSelect) => {
    const results = getFields(uSelect, "value");
    setOldUserIds(results);
  };

  const getEventDetail = async () => {
    try {
      const { data } = await apiInstance({
        url: `event/get-event-detail/${params.id}`,
        method: "GET",
      });
      const eventDetails = data.event;

      const list_users = data.users;

      const arr_ids = list_users.map((u) => u.user_id);

      const video_types = data.event.video_type;
      setTypeoption(video_types);
      delete eventDetails.id;
      delete eventDetails.createdAt;
      delete eventDetails.updatedAt;
      setUpdated({ ...eventDetails });
      setOldUserIds(arr_ids);
    } catch (err) {
      console.log(err);
      toast.error("Error when getting event detail");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = {
      event_id: parseInt(params.id),
      title,
      content,
      video_url,
      video_type: typeoption,
      start_at: moment(start_at).utc().format(),
      state,
      is_poll,
      is_question,
      is_moderator,
      is_resolution,
      agenda,
      user_ids: oldUserIds,
      pin_message_1,
      pin_message_2,
      pin_message_3,
      pause_message_1,
      pause_message_2,
      pause_message_3,
      selected_pin_message: 0,
      selected_pause_message: 0,
    };

    try {
      await apiInstance({
        url: "event/edit-event",
        method: "PATCH",
        data: bodyData,
      });
      toast.success("Event updated");
      setTimeout(() => {
        history.push("/admin/events");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleRemoveAllUser = async (e) => {
    if (window.confirm("Are you sure to remove all user?")) {
      e.preventDefault();
      const bodyData = {
        event_id: params.id,
        title,
        content,
        video_url,
        video_type,
        start_at,
        state,
        is_poll,
        is_question,
        is_moderator,
        is_resolution,
        agenda,
        user_ids: [],
        pin_message_1,
        pin_message_2,
        pin_message_3,
        pause_message_1,
        pause_message_2,
        pause_message_3,
      };
      try {
        const { data } = await apiInstance({
          url: "event/edit-event",
          method: "PATCH",
          data: bodyData,
        });
        if (data.status === "ok") {
          toast.success("Event updated");
          setTimeout(() => {
            history.push("/admin/events");
          }, 1500);
        } else if (data.status === "error") {
          toast.error(data.data.error_message.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleOption = (e) => {
    setTypeoption(e.label);
    console.log(e);
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Event</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT EVENT</s.H4>
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
            value={listDefaultValue()}
            id="video_type"
            name="video_type"
            options={videotypes}
            onChange={(e) => handleOption(e)}
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
            value={moment(start_at).format().slice(0, 16)}
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
            value={listUserDefault()}
            onChange={(e) => handleUserSelect(e)}
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
        <s.Button onClick={handleSubmit}>Update</s.Button>
        <s.Button onClick={handleRemoveAllUser}>Remove All User</s.Button>
      </s.MainTable>
    </Fragment>
  );
}

export default EditEventPage;

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
