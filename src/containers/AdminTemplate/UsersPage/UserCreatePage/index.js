import { Fragment, useState } from "react";
import { useForm, validateEmail } from "../../../../hooks/useForm";
import * as s from "../../../../styles/AdminPage.styles";
import Select from "react-select";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import apiInstance from "../../../../services";
import { useSelector } from "react-redux";
import { ADMIN_USERS_PAGE } from "../../../../routes/constant";
import { foods } from "../constants";
import { Speciality } from "../constants";

function UserCreatePage() {
  const history = useHistory();
  const events = useSelector((state) => state.adminReducer.listEvents);
  const [foodSelection, setFoodSelection] = useState("chicken");
  const [specialty, setSpecialty] = useState("Family Medicine/GP");

  const handleChangeFood = (e) => {
    setFoodSelection(e.value)
  };
  
  const handleChangeSpecialty = (e) => {
    setSpecialty(e.value)
  };
  const [
    {
      email,
      username,
      userNumber,
      firstName,
      lastName,
      usergender,
      mobileNumber,
      organization,
      dteUser,
      shareHolding,
      password,
      is_moderator,
      is_presenter,
      isAdmin,
      eventIds,
      emailAlert,
      smsAlert,
      vip,
      is_judge,
      dietaryRestriction
    },
    setForm,
  ] = useForm({
    email: "",
    username: "",
    userNumber: "",
    firstName: "",
    lastName: "",
    usergender: "Male",
    mobileNumber: "",
    organization: "",
    designation: "",
    dteUser: "",
    shareHolding: 0,
    password: "",
    is_moderator: false,
    is_presenter: false,
    isAdmin: false,
    eventIds: [],
    emailAlert: true,
    smsAlert: true,
    vip: false,
    dietaryRestriction: "",
    is_judge: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Email is not valid");
      return;
    }
    const bodyData = {
      email: email.toLowerCase(),
      password,
      mobile_number: mobileNumber,
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      user_number: userNumber,
      dte_user_id: dteUser,
      gender: usergender,
      email_alert: emailAlert,
      sms_alert: smsAlert,
      admin: isAdmin,
      organization,
      is_moderator: is_moderator,
      is_presenter: is_presenter,
      is_judge,
      share_holding: parseInt(shareHolding),
      vip,
      event_ids: eventIds,
      specialty: specialty,
      food_selection: foodSelection,
      dietary_restriction: dietaryRestriction,
    };
    try {
      await apiInstance({
        url: "user/registerByAdmin",
        method: "POST",
        data: bodyData,
      });
      toast.success("Users created");
      setTimeout(() => {
        history.push(ADMIN_USERS_PAGE);
      }, 1500);
    } catch (err) {
      toast.error("Error when creating user");
      console.log(err);
    }
  };

  return (
    <Fragment>
      <s.TitleBox>
        <div className="right">Create User</div>
      </s.TitleBox>
      <s.MainTable>
        <s.Flex>
          <s.Col_6>
            <s.H4 style={{ marginBottom: 20 }}>CREATE USER</s.H4>
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
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_name">
              User name <span style={{ color: "red" }}></span>
            </label>
            <input
              id="user_name"
              name="username"
              onChange={setForm}
              value={username}
              type="text"
              placeholder="User name"
              // required
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="first_name">First name</label>
            <input
              id="first_name"
              name="firstName"
              onChange={setForm}
              value={firstName}
              placeholder="User first name"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="last_name">Last name</label>
            <input
              id="last_name"
              name="lastName"
              onChange={setForm}
              value={lastName}
              placeholder="User last name"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_gender">Gender</label>
            <select
              name="usergender"
              id="user_gender"
              onChange={setForm}
              value={usergender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_mobile_number">Mobile number</label>
            <input
              id="user_mobile_number"
              name="mobileNumber"
              onChange={setForm}
              value={mobileNumber}
              placeholder="User mobile number"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_number">Passport number</label>
            <input
              id="user_number"
              name="userNumber"
              onChange={setForm}
              value={userNumber}
              placeholder="User passport number"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="share_holding">Share Holding</label>
            <input
              id="share_holding"
              type="number"
              name="shareHolding"
              onChange={setForm}
              value={shareHolding}
              placeholder="user share holding"
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
              name="dteUser"
              onChange={setForm}
              value={dteUser}
              placeholder="Dte user"
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="user_password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="user_password"
              name="password"
              onChange={setForm}
              value={password}
              placeholder="User password"
              required
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
              <label htmlFor="isAdmin">
                Is Admin <span style={{ color: "red" }}>*</span>
              </label>
              <s.ToggleContainer>
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  onChange={(e) =>
                    setForm({
                      target: {
                        value: e.currentTarget.checked,
                        name: "isAdmin",
                      },
                    })
                  }
                  checked={isAdmin}
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
              // closeMenuOnSelect={false}
              instanceId
              onChange={(e) => {
                setForm({
                  target: {
                    value: e.map(({ value }) => value),
                    name: "eventIds",
                  },
                });
              }}
            />
          </s.FormGroup>
          <s.FormGroup>
            <label htmlFor="dietaryRestriction">Dietary Restriction</label>
            <input
              id="dietaryRestriction"
              name="dietaryRestriction"
              onChange={setForm}
              value={dietaryRestriction}
              placeholder="Dietary restriction"
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
                name="emailAlert"
                onChange={(e) =>
                  setForm({
                    target: { value: true, name: "emailAlert" },
                  })
                }
                defaultChecked={true}
              />
              <label htmlFor="user_email_alert_enable">Enable</label>
            </span>
            <span className="radios">
              <input
                type="radio"
                value={false}
                id="user_email_alert_disable"
                name="emailAlert"
                onChange={(e) =>
                  setForm({
                    target: { value: false, name: "emailAlert" },
                  })
                }
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
                name="smsAlert"
                onChange={(e) =>
                  setForm({
                    target: { value: true, name: "smsAlert" },
                  })
                }
                defaultChecked={true}
              />
              <label htmlFor="user_sms_alert_enable">Enable</label>
            </span>
            <span className="radios">
              <input
                type="radio"
                value={false}
                id="user_sms_alert_disable"
                name="smsAlert"
                onChange={(e) =>
                  setForm({
                    target: { value: false, name: "smsAlert" },
                  })
                }
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

export default UserCreatePage;
