import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import apiInstance from "../../../../services";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useSelector } from "react-redux";

function EditGroupPage() {
  const history = useHistory();
  const params = useParams();
  const users = useSelector((state) => state.adminReducer.listUsers);
  const [userNoGroup, setUserNoGroup] = useState([]);
  const [oldUserIds, setOldUserIds] = useState([]);
  // const [addedIds, setAddedId] = useState([]);
  // const [removedIds, setRemovedIds] = useState([]);
  const [
    { name, event_id, zoom_url, zoom_password, is_vip, announcement },
    setForm,
    ,
    setUpdated,
  ] = useForm({
    name: "",
    event_id: 0,
    zoom_url: "",
    zoom_password: "",
    is_vip: true,
    announcement: "",
    user_ids: [],
  });

  const getUserNoGroup = async () => {
    try {
      const { data } = await apiInstance({
        url: `user/get-user-event-no-group/${event_id}`,
        method: "GET",
      });
      console.log("user no group", data);
      const userOptions = data.map((u) => ({
        value: u.id,
        label: u.email,
      }));
      setUserNoGroup(userOptions);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getEventDefault = useCallback(() => {
  //   const eDefault = events
  //     ? events.filter((e) => e.value === parseInt(event_id))
  //     : [];
  //   return eDefault;
  //   // eslint-disable-next-line
  // }, [event_id]);

  const getUsersDefault = useCallback(() => {
    const uDefault = users
      ? users.filter((e) => oldUserIds.includes(e.value))
      : [];
    console.log("uDefault", uDefault);
    return uDefault;
    // eslint-disable-next-line
  }, [oldUserIds]);

  const getFields = (input, field) => {
    var output = [];
    for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
    return output;
  };

  const handleUserSelect = (uSelect) => {
    const results = getFields(uSelect, "value");
    console.log(results);
    setOldUserIds(results);
  };

  const getGroupDetail = async () => {
    try {
      const { data } = await apiInstance({
        url: `group/get-group-detail/${params.id}`,
        method: "GET",
      });
      console.log(data);
      const groupDetail = data.group;
      const list_users = data.totalUsers;
      const arr_ids = list_users.map((u) => parseInt(u.id));
      delete groupDetail.id;
      delete groupDetail.createdAt;
      delete groupDetail.updatedAt;
      setUpdated({ ...groupDetail });
      setOldUserIds(arr_ids);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event_id === 0) {
      return alert("Please select an event");
    }
    const bodyData = {
      id: parseInt(params.id),
      name,
      event_id: parseInt(event_id),
      zoom_url,
      zoom_password,
      is_vip,
      announcement,
      user_ids: oldUserIds,
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "group/edit-group",
        method: "PATCH",
        data: bodyData,
      });
      toast.success("Group updated");
      setTimeout(() => {
        history.push("/admin/groups");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    getGroupDetail();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getUserNoGroup();
    // eslint-disable-next-line
  }, [event_id]);

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Group</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT GROUP</s.H4>
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
          {/* <s.FormGroup>
            <label htmlFor="group_event">
              Event <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              id="group_event"
              options={events}
              value={getEventDefault()}
              instanceId
              onChange={(e) =>
                setForm({
                  target: { value: e.value, name: "event_id" },
                })
              }
            />
          </s.FormGroup> */}
          <s.FormGroup>
            <label htmlFor="first_name">Audiences</label>
            <Select
              options={userNoGroup}
              value={getUsersDefault()}
              isMulti
              instanceId
              onChange={(e) => handleUserSelect(e)}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="group_name">
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
            <label htmlFor="group_is_vip">Vip</label>
            <ToggleContainer>
              <input
                type="checkbox"
                name="is_vip"
                id="group_is_vip"
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

export default EditGroupPage;

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
