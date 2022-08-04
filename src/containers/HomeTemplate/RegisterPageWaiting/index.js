import { useState, useRef } from "react";
import clsx from "clsx";
import Swal from "sweetalert2/dist/sweetalert2.js";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Checkbox,
  Container,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  withStyles,
  //FormControl,
} from "@material-ui/core";
import * as s from "./registerWaiting.styles";
import apiInstance from "../../../services";
import {
  useForm,
  validateEmail,
  validateNumberCharater,
} from "../../../hooks/useForm";
import CPModalPopup from "../../../components/CPModalPopup";
import CPClosingRegister from "../../../components/CPClosingRegister";
import GoldSponsor from "../../../components/GoldSponsor";
import style from "styled-components";

const BlueCheckbox = withStyles({
  root: {
    color: "#00769c",
    marginLeft: "-9px",
    "&checked": {
      color: "#00769c",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Speciality = [
  { value: "Anaesthesiology", label: "Anaesthesiology" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Endocrinology", label: "Endocrinology" },
  {
    value: "Family Medicine / General Practice (GP)",
    label: "Family Medicine / General Practice (GP)",
  },
  { value: "Gastroenterology", label: "Gastroenterology" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Geriatric Medicine", label: "Geriatric Medicine" },
  { value: "Haematology", label: "Haematology" },
  { value: "Hand Surgery", label: "Hand Surgery" },
  { value: "Internal Medicine", label: "Internal Medicine" },
  { value: "Infectious Disease", label: "Infectious Disease" },
  { value: "Medical Oncology", label: "Medical Oncology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Neurosurgery", label: "Neurosurgery" },
  { value: "Obstetrics & Gynaecology", label: "Obstetrics & Gynaecology" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Orthopaedic Surgery", label: "Orthopaedic Surgery" },
  { value: "Otorhinolaryngology", label: "Otorhinolaryngology" },
  { value: "Paediatric Medicine", label: "Paediatric Medicine" },
  { value: "Paediatric Surgery", label: "Paediatric Surgery" },
  { value: "Plastic Surgery", label: "Plastic Surgery" },
  { value: "Psychiatry", label: "Psychiatry" },
  { value: "Radiation Oncology", label: "Radiation Oncology" },
  { value: "Rehabilitation Medicine", label: "Rehabilitation Medicine" },
  { value: "Renal Medicine", label: "Renal Medicine" },
  { value: "Respiratory Medicine", label: "Respiratory Medicine" },
  { value: "Rheumatology", label: "Rheumatology" },
  { value: "Urology", label: "Urology" },
  { value: "Others", label: "Others" },
];

const FormControl = withStyles({
  root: {
    color: "#00769c",
    marginLeft: "-9px",
    marginRight: 0,
  },
  //checked: {},
})((props) => <FormControlLabel {...props} />);

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    position: "relative",
    fontFamily: "MuseoSans",
    fontWeight: 300,
  },
  main: {
    background: "linear-gradient(180deg, #faffff 0, #accbd6)",
    textAlign: "start",
    paddingBottom: "4rem",
  },
  headtitle:{
    marginTop: "2.5rem",
    color: "#00769c",
    fontSize: "1.6rem",
    fontFamily: "MuseoSansRounded",
    fontWeight: 1000,
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "2.6rem",
      textAlign: "start",
      width: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3.8rem",
      lineHeight: "4rem",
    },
  },
  title: {
    marginTop: "1.8rem",
    marginBottom: "0.5rem",
    color: "#00769c",
    fontSize: "1.6rem",
    fontWeight: 700,
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.8rem",
      textAlign: "start",
      width: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.8rem",
    },
  },
  titleSmall: {
    marginBottom: "0.8rem",
    fontFamily: "MuseoSansRounded",
    color: "#00769c",
    fontWeight: 600,
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
      textAlign: "start",
      width: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      lineHeight: "2.5rem",
    },
    "& b" : {
      textDecoration: "underline",
    }
  },

  titleMail: {
    fontFamily: "MuseoSansRounded",
    marginTop: "-1.5rem",
    color: "#00769c",
    fontWeight: 600,
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    textDecoration: "underline",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
      textAlign: "start",
      width: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.1rem",
    },
  },
  body: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
  },
  checkBoxGroup: {
    display: "flex",
    alignItems: "center",
    columnGap: 10,
    rowGap: 5,
    flexDirection: "row",
    "& span": {
      color: "#00769c",
      fontWeight: 400,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "MuseoSansRounded",
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: 5,
      columnGap: 20,
      "& span": {
        fontSize: "1.1rem",
      },
    },
    [theme.breakpoints.up(1600)]: {
      marginBottom: 10,
    },
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: "0.8rem",
    fontFamily: "MuseoSansRounded",
    "& label": {
      color: "#00769c",
      fontWeight: 400,
      fontSize: 14,
      display: "block",
      "&.term": {
        display: "inline-block",
        margin: 0,
        cursor: "pointer",
      },
    },
    "& input": {
      borderRadius: 5,
      padding: 12,
      background: "#ffffff",
      border: "1.5px solid #737373",
      transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      display: "block",
      width: "100%",
      height: "calc(1.5em + 0.75rem + 2px)",
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)",
        outline: "none",
      },
      "&[type='checkbox'], &[type='radio']": {
        display: "inline-block",
        height: "100%",
        width: "100%",
      },
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: 5,
      "& label": {
        fontSize: "1.1rem",
        marginBottom: "0.3rem",
      },
      "& input": {
        fontSize: "1rem",
        padding: 15,
      },
    },
    [theme.breakpoints.up(1600)]: {
      marginBottom: 16,
      "& input": {
        padding: 20,
        borderRadius: 8,
      },
    },
  },
  noteText: {
    color: "#00769c",
    fontSize: 14,
    fontFamily: "MuseoSansRounded",
    fontWeight: 400,
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.1rem",
    },
  },
  submitBtn: {
    marginTop: "0.8rem",
    fontFamily: "MuseoSansRounded",
    fontWeight: 400,
    "& button": {
      background: "#6d6f71",
      color: "#ffffff",
      borderRadius: 5,
      transition: "background-color .2s ease-in",
      lineHeight: 1.5,
      border: "none",
      cursor: "pointer",
      padding: "6px 25px",
      fontSize: 14,
    },
    [theme.breakpoints.up("md")]: {
      "& button": {
        fontSize: 12,
      },
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "0.8rem",
      "& button": {
        fontSize: "1rem",
      },
    },
    [theme.breakpoints.up(1600)]: {
      marginTop: "2rem",
      "& button": {
        padding: "5px 35px",
        fontSize: "1.2rem",
        borderRadius: 8,
      },
    },
  },
  inputError: {
    "& input": {
      border: "1px solid red",
    },
  },
  colorRadio: {
    color: "#00769c",
    "& span": {
      color: "#00769c",
    },
  },
}));

function Registration() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [modalTerm, setModalTerm] = useState(false);
  const [popupTerm, setPopupTerm] = useState(false);
  const [openImagePopup, setOpenImagePopup] = useState(false);
  const [phoneNumber, setPhoneNumnber] = useState("");
  const [foodSelection, setFoodSelection] = useState("chicken");
  const inputRefs = useRef([])
  const [inputError, setInputError] = useState({
    email: "",
    agreeTerm: "",
    phoneNumber: "",
    userName: "",
    mcrNumber: "",
    specialDietaryRestrictions: "",
  });
  const [
    { email, userName, mcrNumber, specialDietaryRestrictions, useSpeciality },
    setForm,
    setInitialState,
  ] = useForm({
    email: "",
    userName: "",
    mcrNumber: "",
    specialDietaryRestrictions: "",
    useSpeciality: "Family Medicine / General Practice (GP)",
  });
  const isRegisterDisabled = false;

  const checkValidInput = () => {
    const objInput = {
      email,
      agreeTerm,
      userName,
      mcrNumber,
      useSpeciality,
    };
    const tempObj = {};
    const isValid = validateEmail(email);
    const isMcrNumber = validateNumberCharater(mcrNumber);

    const res = Object.keys(objInput).filter((key) => {
      if (!objInput[key]) {
        tempObj[key] = `* Invalid ${key}`;
        return true;
      }
      return false;
    });
    if (mcrNumber.trim() === "") {
      inputRefs.current["mcrNumber"]?.focus()
      return {
        ...inputError,
        mcrNumber: "* MCR Number required",
      };
    }
    if (!isMcrNumber) {
      inputRefs.current["mcrNumber"]?.focus()
      return {
        ...inputError,
        mcrNumber: "* Invalid MCR Number",
      };
    }
    if (userName === "") {
      inputRefs.current["userName"]?.focus()
      return { ...inputError, userName: "* Username required" };
    }
    if (email === "") {
      inputRefs.current["email"]?.focus()
      return { ...inputError, email: "* Email required" };
    }
    if (!isValid) {
      inputRefs.current["email"]?.focus()
      return { ...inputError, email: "* Invalid email" };
    }
    if (phoneNumber === "") {
      inputRefs.current["phoneNumber"]?.focus()
      return {
        ...inputError,
        phoneNumber: "* Phone number required",
      };
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      inputRefs.current["phoneNumber"]?.focus()
      return {
        ...inputError,
        phoneNumber: "* Invalid phone number",
      };
    }
    if (useSpeciality === "") {
      return {
        ...inputError,
        useSpeciality: "* Choose speciality",
      };
    }
    if (!agreeTerm) {
      Swal.fire({
        html: "<br/><p>Please accept Terms & Conditions in order to continue</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
      return { ...inputError, agreeTerm: "* This field is required" };
    }
    if (res.length > 0) return { ...inputError, ...tempObj };
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = checkValidInput();
    if (errors) {
      setInputError(errors);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await apiInstance({
        url: "user/register",
        method: "POST",
        data: {
          attend_virtual_event: true,
          email: email.toLowerCase(),
          password: "gehams2022",
          mobile_number: phoneNumber,
          first_name: userName,
          user_name: "",
          last_name: "",
          user_number: mcrNumber,
          organization: "",
          gender: "male",
          is_moderator: true,
          is_presenter: true,
          share_holding: 0,
          specialty: useSpeciality,
          food_selection: foodSelection,
          dietary_restriction: specialDietaryRestrictions,
          client_url: "https://avpd.meetz.biz/verify",
        },
      });

      setModalTerm(true)
      setInitialState();
      setPhoneNumnber("");
      setAgreeTerm(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setInputError({
          ...inputError,
          email: err.response.data.message,
        });
      } else {
        Swal.fire({
          title: "Opps!! ",
          text: "Something wrong...",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
    setIsLoading(false);
  };

  const handleOnChangeInput = (e) => {
    setInputError({ ...inputError, [e.target.name]: "" });
    setForm(e);
  };

  const handleOnChangeRadio = (e) => {
    setFoodSelection(e.target.value);
    setForm(e);
  };

  const handleKeyDown = (event) => {
    // if (event.key === 'Enter') {
    //   console.log("enter")
    // }
};

  return isRegisterDisabled ? (
    <CPClosingRegister />
  ) : (
    <div className={classes.mainContainer}>
      <div className={classes.main}>
      <Container className={clsx(classes.headtitle)}>
          <span>
            Registration for the seminar at Shangri-la Hotel is Closed.
          </span>
        </Container>
        
        <Container className={classes.titleSmall}>
          <span>
          Please fill up your particulars if you would like to be on the waiting list.<br></br>
          If you have registered but yet to receive your confirmation email, please email :
          </span>
        </Container>
        <Container className={classes.titleMail}>
          <span>
          <b>enquiry@gleneagles-seminar.com</b>
          </span>
        </Container>
        <Container className={classes.title}>
          <span>Waiting List</span>
        </Container>
        <Container className={classes.body}>
          <form onSubmit={handleSubmit}>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.email !== "",
              })}
            >
              <label htmlFor="MCR_DCR_Number">MCR / DCR Number</label>
              <input
                type="text"
                id="MCR_DCR_Number"
                name="mcrNumber"
                ref={(element) => { inputRefs.current["mcrNumber"] = element }}
                maxLength={6}
                value={mcrNumber}
                onChange={handleOnChangeInput}
                placeholder="Last 6 characters; ie 5 digits + 1 alphabet (no space in between) eg 12345A"
              />
              <s.Error isError={inputError.mcrNumber !== ""}>
                {inputError.mcrNumber}
              </s.Error>
            </div>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.useSpeciality !== "",
              })}
            >
              <label htmlFor="use_Speciality">Speciality</label>
              <ComboboxInput>
                <select
                  id="use_Speciality"
                  name="useSpeciality"
                  value={useSpeciality}
                  onChange={handleOnChangeInput}
                >
                  {/* <option value="Family Medicine/GP" selected hidden>Family Medicine / General Practice (GP)</option> */}
                  {Speciality.map((Speciality, index) => (
                    <option key={index} value={Speciality.value}>
                      {Speciality.label}
                    </option>
                  ))}
                </select>
                {/* <s.Error isError={inputError.useSpeciality !== ""}>
                  * Choose speciality
                </s.Error> */}
              </ComboboxInput>
            </div>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.userName !== "",
              })}
            >
              <label htmlFor="user_first_name">Full Name</label>
              <input
                type="text"
                id="user_first_name"
                ref={(element) => { inputRefs.current["userName"] = element }}
                name="userName"
                value={userName}
                // onKeyDown={handleKeyDown}
                onChange={handleOnChangeInput}
                placeholder="Enter your full name (as registered with SMC / SDC)"
              />
              <s.Error isError={inputError.userName !== ""}>
                {inputError.userName}
              </s.Error>
            </div>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.email !== "",
              })}
            >
              <label htmlFor="user_email">Email Address</label>
              <input
                type="text"
                id="user_email"
                name="email"
                ref={(element) => { inputRefs.current["email"] = element }}
                value={email}
                onChange={handleOnChangeInput}
                placeholder="Enter your email"
              />
              <s.Error isError={inputError.email !== ""}>
                {inputError.email}
              </s.Error>
            </div>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.phoneNumber !== "",
              })}
            >
              <label htmlFor="user_mobile_number">Mobile Number</label>
              <PhoneInput
                defaultCountry="SG"
                placeholder="Enter phone number"
                name={phoneNumber}
                ref={(element) => { inputRefs.current["phoneNumber"] = element }}
                value={phoneNumber}
                onChange={(val) => {
                  setPhoneNumnber(val || "")
                  setInputError({ ...inputError, phoneNumber: "" })
                }}

              />
              <s.Error isError={inputError.phoneNumber !== ""}>
                {inputError.phoneNumber}
              </s.Error>
            </div>

            <div className={clsx(classes.formGroup)}>
              <label htmlFor="food_selection">
                Food Selection (Lunch will cease at 2pm)
              </label>
              <RadioGroup
                aria-label="food_selection"
                name="foodselection"
                defaultValue="chicken"
                value={foodSelection}
                onChange={handleOnChangeRadio}
                className={classes.checkBoxGroup}
              >
                <FormControl
                  value="chicken"
                  name="chicken"
                  control={<Radio />}
                  label="Chicken"
                />
                <FormControl
                  value="fish"
                  name="fish"
                  control={<Radio />}
                  label="Fish"
                />
                <FormControl
                  value="vegetarian"
                  name="vegetarian"
                  control={<Radio />}
                  label="Vegetarian"
                />
              </RadioGroup>
            </div>
            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]:
                  inputError.specialDietaryRestrictions !== "",
              })}
            >
              <label htmlFor="pecial_dietary_restrictions">
                Any Special Dietary Restrictions
              </label>
              <input
                type="text"
                id="special_dietary_restrictions"
                name="specialDietaryRestrictions"
                placeholder="Optional"
                value={specialDietaryRestrictions}
                onChange={handleOnChangeInput}
              />
              <s.Error isError={inputError.specialDietaryRestrictions !== ""}>
                * Invalid Special Dietary Restrictions
              </s.Error>
            </div>

            <div
              className={clsx(classes.formGroup, {
                [classes.inputError]: inputError.agreeTerm !== "",
              })}
            >
              <div className={classes.checkboxWrapper}>
                <BlueCheckbox
                  size="small"
                  disableRipple
                  id="Term"
                  name="acceptTerm"
                  checked={agreeTerm}
                  //color="#00769c"
                  onChange={(e) => {
                    setAgreeTerm(e.target.checked);
                    if (!agreeTerm)
                      setInputError({ ...inputError, agreeTerm: "" });
                  }}
                />
                <label htmlFor="Term" className="term">
                  I have read and agree to the{" "}
                  <span onClick={() => setPopupTerm(true)}>
                    <b>Terms and Conditions</b>
                  </span>
                </label>
              </div>

              <s.Error isError={inputError.agreeTerm !== ""}>
                {inputError.agreeTerm}
              </s.Error>
            </div>
            <div className={classes.noteText}>
              CME points pending SMC's approval. Terms and conditions apply.
            </div>
            <div className={classes.submitBtn}>
              <button type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </Container>
        
        <CPModalPopup modalState={popupTerm} onBlur={() => setPopupTerm(false)} bgColor="#0A7598">
          <BoxContent>
            <h1>TERMS &amp; CONDITIONS</h1>
            <p>
              You are not allowed to record and/or distribute
              any recordings of the seminar. Please click the checkbox if
              you understand and agree to these terms. Thank you!
            </p>
          </BoxContent>
        </CPModalPopup>
        <CPModalPopup modalState={modalTerm} onBlur={() => setModalTerm(false)} bgColor="#0A7598">
          <BoxContent>
            <h1>Thank You!</h1>
            <p>
              We have received your registration.
              <br />
              You will receive a confirmation email.
            </p>
            <p>
              Kindly check your spam/junk folder if you did not receive the
              confirmation email.
            </p>
          </BoxContent>
        </CPModalPopup>
      </div>
      <GoldSponsor />
    </div>
  );
}

export default Registration;

const ComboboxInput = style.div`
  position: relative;
  display: inline-block;
  width: 100%;
  &:after {
    content: " ";
    position: absolute;
    right: 15px;
    top: 46%;
    margin-top: -3px;
    z-index: 2;
    pointer-events: none;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6.9px 4px 0 4px;
    border-color: #aaa transparent transparent transparent;
    pointer-events: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0 30px 0 10px;
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    line-height: $height + px;
    height: $height + px;
    background: #ffffff;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    font-weight: 400;
    line-height: 1.5;
    border: 1.5px solid #737373;
    font-size: 14px;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 12px,
    ${({ theme }) => theme.breakpoints.l} {
      fontSize: "1rem",
      padding: 15,
    }
    ${({ theme }) => theme.breakpoints.xl} {
      padding: 20,
      borderRadius: 8,
    }
  }
  select::-ms-expand {
    display: none;
  }
`;

const BoxContent = style.div`
  display: flex;
  flex-direction: column;
  justify-content : center;
  align-items : center;
  text-align: center;
  padding: 0 10%;
  h1 {
    color: #fff;
    font-weight : 900;
  }
  p {
    color: #fff;
    font-weight : 500;
    max-width : 350px;
    ${({ theme }) => theme.breakpoints.xl} {
      max-width : 600px;
    }
  }
`;
