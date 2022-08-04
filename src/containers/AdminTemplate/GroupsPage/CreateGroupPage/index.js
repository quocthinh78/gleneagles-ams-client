import { Fragment } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useSelector } from "react-redux";

function CreateGroupPage() {
  const history = useHistory();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const users = useSelector((state) => state.adminReducer.listUsers);
  const [
    { name, event_id, user_ids, zoom_url, zoom_password, is_vip, announcement },
    setForm,
  ] = useForm({
    name: "",
    event_id: 0,
    user_ids: [],
    zoom_url: "",
    zoom_password: "",
    is_vip: false,
    announcement: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    const bodyData = {
      name,
      event_id,
      user_ids,
      zoom_url,
      zoom_password,
      is_vip,
      announcement,
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "group/create-group",
        method: "POST",
        data: bodyData,
      });
      toast.success("Group created");
      setTimeout(() => {
        history.push("/admin/groups");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Create Group</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE GROUP</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="group_name">
              Group name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="group_name"
              name="name"
              onChange={setForm}
              value={name}
              type="text"
              placeholder="Group name"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="group_event">
              Event <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              id="group_event"
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
            <label htmlFor="first_name">Audiences</label>
            <Select
              options={users}
              isMulti
              instanceId
              onChange={(e) => {
                console.log(e);
                setForm({
                  target: {
                    value: e.map(({ value }) => value),
                    name: "user_ids",
                  },
                });
              }}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="zoom_url">
              Zoom URL <span style={{ color: "red" }}></span>
            </label>
            <input
              id="zoom_url"
              name="zoom_url"
              onChange={setForm}
              value={zoom_url}
              type="text"
              placeholder="Zoom URL"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="zoom_password">
              Zoom Password <span style={{ color: "red" }}></span>
            </label>
            <input
              id="zoom_password"
              name="zoom_password"
              onChange={setForm}
              value={zoom_password}
              type="text"
              placeholder="Zoom Password"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="is_vip">Vip</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_vip"
                id="is_vip"
                onChange={(e) =>
                  setForm({
                    target: { value: e.currentTarget.checked, name: "is_vip" },
                  })
                }
                checked={is_vip}
              />
              <span className="switch"></span>
            </ToggleContainer>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="announcement">
              Announcement <span style={{ color: "red" }}></span>
            </label>
            <input
              id="announcement"
              name="announcement"
              onChange={setForm}
              value={announcement}
              type="text"
              placeholder="announcement"
            />
          </s.FormGroup>
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default CreateGroupPage;

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
