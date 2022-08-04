import { Fragment, memo, useMemo } from "react";
import Select from "react-select";
import { useForm } from "../../hooks/useForm";
import { Button, FormGroup } from "../../styles/AdminPage.styles";

function CPModalNewUser() {
  const [
    {
      email,
      username,
      firstName,
      lastName,
      usergender,
      mobileNumber,
      organization,
      designation,
      dteUser,
      password,
      isAdmin,
      // eventIds,
      emailAlert,
      smsAlert,
    },
    setForm,
  ] = useForm({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    usergender: "Male",
    mobileNumber: "",
    organization: "",
    designation: "",
    dteUser: "",
    password: "",
    isAdmin: "No",
    eventIds: [1],
    emailAlert: true,
    smsAlert: true,
  });

  const eventOptions = useMemo(
    () => [
      { value: "chocolate", label: "Chocolate", id: 1 },
      { value: "strawberry", label: "Strawberry", id: 2 },
      { value: "vanilla", label: "Vanilla", id: 3 },
    ],
    []
  );

  return (
    <Fragment>
      <FormGroup>
        <label htmlFor="user_email">Email</label>
        <input
          id="user_email"
          name="email"
          onChange={setForm}
          value={email}
          type="email"
          placeholder="User Email"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="user_name">User name</label>
        <input
          id="user_name"
          name="username"
          onChange={setForm}
          value={username}
          type="text"
          placeholder="User name"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="first_name">First name</label>
        <input
          id="first_name"
          name="firstName"
          onChange={setForm}
          value={firstName}
          placeholder="User first name"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="last_name">Last name</label>
        <input
          id="last_name"
          name="lastName"
          onChange={setForm}
          value={lastName}
          placeholder="User last name"
          required
        />
      </FormGroup>
      <FormGroup>
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
      </FormGroup>
      <FormGroup>
        <label htmlFor="user_mobile_number">Mobile number</label>
        <input
          id="user_mobile_number"
          name="mobileNumber"
          onChange={setForm}
          value={mobileNumber}
          placeholder="User mobile number"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="user_organization">Organization</label>
        <input
          id="user_organization"
          name="organization"
          onChange={setForm}
          value={organization}
          placeholder="User organization"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="user_designation">Designation</label>
        <input
          id="user_designation"
          name="designation"
          onChange={setForm}
          value={designation}
          placeholder="User designation"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="Dte_user">Dte user</label>
        <input
          id="Dte_user"
          name="dteUser"
          onChange={setForm}
          value={dteUser}
          placeholder="Dte user"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="user_password">Password</label>
        <input
          id="user_password"
          name="password"
          onChange={setForm}
          value={password}
          placeholder="User password"
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="is_admin">Is Admin</label>
        <select name="isAdmin" id="is_admin" onChange={setForm} value={isAdmin}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label>Events</label>
        <Select
          options={eventOptions}
          isMulti
          defaultValue={[eventOptions[0]]}
          // closeMenuOnSelect={false}
          instanceId
          onChange={(e) =>
            setForm({
              target: { value: e.map(({ id }) => id), name: "eventIds" },
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <label>Email alert</label>
        <br />
        <span className="radios">
          <input
            type="radio"
            value={true}
            defaultChecked={emailAlert}
            id="user_email_alert_enable"
            name="emailAlert"
            onClick={setForm}
          />
          <label htmlFor="user_email_alert_enable">Enable</label>
        </span>
        <span className="radios">
          <input
            type="radio"
            value={false}
            defaultChecked={!emailAlert}
            id="user_email_alert_disable"
            name="emailAlert"
            onClick={setForm}
          />
          <label htmlFor="user_email_alert_disable">Disable</label>
        </span>
      </FormGroup>
      <FormGroup>
        <label>Sms alert</label>
        <br />
        <span className="radios">
          <input
            type="radio"
            value={true}
            defaultChecked={smsAlert}
            id="user_sms_alert_enable"
            name="smsAlert"
            onClick={setForm}
          />
          <label htmlFor="user_sms_alert_enable">Enable</label>
        </span>
        <span className="radios">
          <input
            type="radio"
            value={false}
            defaultChecked={!smsAlert}
            id="user_sms_alert_disable"
            name="smsAlert"
            onClick={setForm}
          />
          <label htmlFor="user_sms_alert_disable">Disable</label>
        </span>
      </FormGroup>
      <Button>Submit</Button>
    </Fragment>
  );
}

export default memo(CPModalNewUser);
