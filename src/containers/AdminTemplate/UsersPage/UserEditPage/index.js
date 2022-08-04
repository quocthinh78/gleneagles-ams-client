import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useHistory, useParams } from "react-router";
import apiInstance from "../../../../services";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import _ from "lodash";
import { ADMIN_USERS_PAGE } from "../../../../routes/constant";
import { foods } from "../constants";
import { Speciality } from "../constants";
function UserEditPage() {
  const history = useHistory();
  const params = useParams();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [oldEventIds, setOldEventIds] = useState([]);
  const [addedIds, setAddedId] = useState([]);
  const [removedIds, setRemovedIds] = useState([]);
  const [foodSelection, setFoodSelection] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [
    {
      email,
      user_name,
      user_number,
      first_name,
      last_name,
      gender,
      mobile_number,
      share_holding,
      organization,
      dte_user_id,
      is_moderator,
      is_presenter,
      admin,
      vip,
      email_alert,
      sms_alert,
      dietary_restriction
    },
    setForm,
    ,
    setUpdated,
  ] = useForm({
    email: "",
    user_name: "",
    user_number: "",
    first_name: "",
    last_name: "",
    gender: "Male",
    mobile_number: "",
    share_holding: 0,
    organization: "",
    dte_user_id: "",
    is_moderator: false,
    is_presenter: false,
    admin: false,
    vip: false,
    email_alert: true,
    sms_alert: true,
    dietary_restriction: ""
  });

  const listEventDefault = useCallback(() => {
    const eOptions = events.filter((e) => oldEventIds.includes(e.value));
    return eOptions;
    // eslint-disable-next-line
  }, [oldEventIds]);

  const handleChangeFood = (e) => {
    setFoodSelection(e.value)
  };
  
  const handleChangeSpecialty = (e) => {
    setSpecialty(e.value)
  };
  const handleEventSelect = (eSelect) => {
    const eSelectIds = eSelect.map((e) => e.value);
    if (eSelectIds.length > oldEventIds.length) {
      const diff = _.difference(eSelectIds, oldEventIds);
      const intersect = _.intersection(removedIds, diff);
      if (intersect.length !== 0) {
        let newRemove = [...removedIds];
        const index = newRemove.indexOf(diff[0]);
        newRemove.splice(index, 1);
        setRemovedIds(newRemove);
      } else {
        setAddedId([...addedIds, diff[0]]);
      }
    } else if (eSelectIds.length < oldEventIds.length) {
      const diff = _.difference(oldEventIds, eSelectIds);
      const intersect = _.intersection(addedIds, diff);
      if (intersect.length !== 0) {
        let newAdd = [...addedIds];
        const index = newAdd.indexOf(diff[0]);
        newAdd.splice(index, 1);
        setAddedId(newAdd);
      } else {
        setRemovedIds([...removedIds, diff[0]]);
      }
    }
    setOldEventIds(eSelectIds);
  };

  const getUserDetails = async () => {
    try {
      const { data } = await apiInstance({
        url: `user/getUserDetail/${params.id}`,
        method: "GET",
      });
      const userDetail = data.user;
      const arr_events = data.event.map((e) => parseInt(e.event_id));
      const userPicked = _.pick(userDetail, [
        "email",
        "user_name",
        "user_name",
        "first_name",
        "last_name",
        "gender",
        "mobile_number",
        "share_holding",
        "organization",
        "dte_user_id",
        "is_moderator",
        "is_presenter",
        "admin",
        "vip",
        "email_alert",
        "sms_alert",
        "dietary_restriction",
        "food_selection",
        "specialty",
      ]);
      setFoodSelection(userPicked.food_selection);
      setSpecialty(userPicked.specialty)
      setUpdated({ ...userPicked });
      setOldEventIds(arr_events);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = {
      user_id: parseInt(params.id),
      email,
      user_name: user_name ? user_name : "",
      user_number: user_number ? user_number : "",
      first_name,
      last_name,
      gender,
      mobile_number,
      share_holding,
      organization,
      dte_user_id,
      is_moderator,
      is_presenter,
      admin,
      vip,
      email_alert: email_alert ? email_alert : false,
      sms_alert: sms_alert ? sms_alert : false,
      add_eventId_arr: addedIds,
      remove_eventId_arr: removedIds,
      specialty: specialty,
      food_selection: foodSelection,
      dietary_restriction: dietary_restriction ? dietary_restriction : "",
    };
    console.log(bodyData);
    try {
      await apiInstance({
        url: "user/editUser",
        method: "PATCH",
        data: bodyData,
      });

      toast.success("Users updated");
      setTimeout(() => {
        history.push(ADMIN_USERS_PAGE);
      }, 1500);
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        toast.error(err.response.data.message[0]);
      }
      console.log(err.response);
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Edit Users</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>EDIT USER</s.H4>
          </s.Col_6>
        </s.Flex>
        <form onSubmit={handleSubmit}>
          <s.FormGroup>
            <label htmlFor="user_email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="user_email"
              name="email"
              onChange={setForm}
              value={email}
              type="email"
              placeholder="User Email"
              required
              disabled
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_name">
              User name <span style={{ color: "red" }}></span>
            </label>
            <input
              id="user_name"
              name="user_name"
              onChange={setForm}
              value={user_name ? user_name : ""}
              type="text"
              placeholder="User name"
              // required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              name="first_name"
              onChange={setForm}
              value={first_name ? first_name : ""}
              placeholder="User first name"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              name="last_name"
              onChange={setForm}
              value={last_name ? last_name : ""}
              placeholder="User last name"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_gender">Gender</label>
            <select
              name="usergender"
              id="gender"
              onChange={setForm}
              value={gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_mobile_number">Mobile number</label>
            <input
              id="user_mobile_number"
              name="mobile_number"
              onChange={setForm}
              value={mobile_number}
              placeholder="User mobile number"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_share_holding">Share Holding</label>
            <input
              id="user_share_holding"
              type="number"
              name="share_holding"
              onChange={setForm}
              value={share_holding}
              placeholder="User Share Holding"
              required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_number">Passport Number</label>
            <input
              id="user_number"
              type="text"
              name="user_number"
              onChange={setForm}
              value={user_number}
              placeholder="Passport Number"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_organization">Organization</label>
            <input
              id="user_organization"
              name="organization"
              onChange={setForm}
              value={organization}
              placeholder="User organization"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="Dte_user">Dte user</label>
            <input
              id="Dte_user"
              name="dte_user_id"
              onChange={setForm}
              value={dte_user_id ? dte_user_id : ""}
            />
          </s.FormGroup>
          <s.FormGroup
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <s.FormGroup>
              <label htmlFor="is_moderator">
                Is Moderator <span style={{ color: "red" }}>*</span>
              </label>
              <s.ToggleContainer>
                <input
                  type="checkbox"
                  name="is_moderator"
                  id="is_moderator"
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
              </s.ToggleContainer>
            </s.FormGroup>
            <s.FormGroup>
              <label htmlFor="is_presenter">
                Is Presenter <span style={{ color: "red" }}>*</span>
              </label>
              <s.ToggleContainer>
                <input
                  type="checkbox"
                  name="is_presenter"
                  id="is_presenter"
                  onChange={(e) =>
                    setForm({
                      target: {
                        value: e.currentTarget.checked,
                        name: "is_presenter",
                      },
                    })
                  }
                  checked={is_presenter}
                />
                <span className="switch"></span>
              </s.ToggleContainer>
            </s.FormGroup>
            <s.FormGroup>
              <label htmlFor="is_admin">
                Is Admin <span style={{ color: "red" }}>*</span>
              </label>
              <s.ToggleContainer>
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="is_admin"
                  onChange={(e) =>
                    setForm({
                      target: {
                        value: e.currentTarget.checked,
                        name: "admin",
                      },
                    })
                  }
                  checked={admin}
                />
                <span className="switch"></span>
              </s.ToggleContainer>
            </s.FormGroup>
            <s.FormGroup>
              <label htmlFor="is_vip">
                Is Panelist <span style={{ color: "red" }}>*</span>
              </label>
              <s.ToggleContainer>
                <input
                  type="checkbox"
                  name="vip"
                  id="is_vip"
                  onChange={(e) =>
                    setForm({
                      target: {
                        value: e.currentTarget.checked,
                        name: "vip",
                      },
                    })
                  }
                  checked={vip}
                />
                <span className="switch"></span>
              </s.ToggleContainer>
            </s.FormGroup>
          </s.FormGroup>
          <s.FormGroup>
            <label>Events</label>
            <Select
              options={events}
              isMulti
              value={listEventDefault()}
              instanceId
              onChange={(e) => handleEventSelect(e)}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="dietaryRestriction">Dietary Restriction</label>
            <input
              id="dietaryRestriction"
              name="dietary_restriction"
              onChange={setForm}
              value={dietary_restriction ? dietary_restriction : ""}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="food_selection">Food Selection</label>
            <Select
               name="foodSelection"
               searchable={false}
               value={foods.find(item => item.value === foodSelection)}
               onChange={handleChangeFood}
               options={foods}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="specialty">Speciality</label>
            <Select
               name="specialty"
               searchable={false}
               value={Speciality.find(item => item.value === specialty)}
               onChange={handleChangeSpecialty}
               options={Speciality}
            />
          </s.FormGroup>
          {/* <s.FormGroup>
            <label>Email alert</label>
            <br />
            <span className="radios">
              <input
                type="radio"
                value={true}
                id="user_email_alert_enable"
                name="email_alert"
                onChange={(e) =>
                  setForm({
                    target: { value: true, name: "email_alert" },
                  })
                }
                checked={email_alert}
              />
              <label htmlFor="user_email_alert_enable">Enable</label>
            </span>
            <span className="radios">
              <input
                type="radio"
                value={false}
                id="user_email_alert_disable"
                name="email_alert"
                onChange={(e) =>
                  setForm({
                    target: { value: false, name: "email_alert" },
                  })
                }
                checked={!email_alert}
              />
              <label htmlFor="user_email_alert_disable">Disable</label>
            </span>
          </s.FormGroup>
          <s.FormGroup>
            <label>Sms alert</label>
            <br />
            <span className="radios">
              <input
                type="radio"
                value={true}
                id="user_sms_alert_enable"
                name="sms_alert"
                onChange={(e) =>
                  setForm({
                    target: { value: true, name: "sms_alert" },
                  })
                }
                checked={sms_alert}
              />
              <label htmlFor="user_sms_alert_enable">Enable</label>
            </span>
            <span className="radios">
              <input
                type="radio"
                value={false}
                id="user_sms_alert_disable"
                name="sms_alert"
                onChange={(e) =>
                  setForm({
                    target: { value: false, name: "sms_alert" },
                  })
                }
                checked={!sms_alert}
              />
              <label htmlFor="user_sms_alert_disable">Disable</label>
            </span>
          </s.FormGroup> */}
          <s.Button type="submit">Submit</s.Button>
        </form>
      </s.MainTable>
    </Fragment>
  );
}

export default UserEditPage;
