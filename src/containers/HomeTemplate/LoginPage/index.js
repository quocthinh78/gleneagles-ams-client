import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Container, makeStyles } from "@material-ui/core";
import { Modal } from "antd";
import { useForm, validateEmail } from "../../../hooks/useForm";
import {
  actLoggingFail,
  actUserLogin,
} from "../../../redux/actions/user/login";
import * as s from "./login.styles";
import useUser from "../../../hooks/useUser";
import GoldSponsor from "../../../components/GoldSponsor";
import banner from "../../../assets/images/Banner For Login.png";
import apiInstance from "../../../services";
import { Swal } from "sweetalert2/dist/sweetalert2";
import ProgrammeTable from "../../../components/ProgrammeTable";

const useStyles = makeStyles((theme) => ({
  bannerWrapper: {
    position: "relative",
    width: "100%",
  },
  loginSection: {
    width: "90%",
    margin: "2.5rem auto 0",
    [theme.breakpoints.up("md")]: {
      margin: 0,
      position: "absolute",
      bottom: "5%",
      left: "72%",
      width: "50%",
      transform: "translate(-50%)",
    },
  },
  loginForm: {},
  formGroup: {
    marginBottom: "0.8rem",
    fontFamily: "MuseoSansRounded",
    "& label": {
      color: "#00769c",
      fontWeight: 400,
      fontSize: 14,
      marginBottom: "0.2rem",
      [theme.breakpoints.up("md")]: {
        color: "#ffffff",
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
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: "0.1rem",
      "& label": {
        fontSize: 12,
        marginBottom: 0,
        marginLeft: 12,
      },
      "& input": {
        fontSize: 12,
        padding: 12,
        borderRadius: 5,
      },
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: 5,
      "& label": {
        fontSize: "1rem",
        marginBottom: "0.5rem",
        marginLeft: 15,
      },
      "& input": {
        fontSize: "1rem",
        padding: 15,
        borderRadius: 10,
      },
    },
    [theme.breakpoints.up(1600)]: {
      marginBottom: 16,
      "& label": {
        fontSize: "1rem",
        marginBottom: "0.5rem",
        marginLeft: 25,
      },
      "& input": {
        fontSize: "1rem",
        padding: 25,
        borderRadius: 10,
      },
    },
  },
  togglePasswordBtn: {
    position: "absolute",
    right: "3%",
    top: "50%",
    transform: "translateY(-50%)",
    width: 20,
    height: 20,
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.up("md")]: {
      width: 25,
      height: 25,
      fontSize: 20,
    },
  },
  submitBtn: {
    marginTop: "0.8rem",
    textAlign: "center",
    fontFamily: "MuseoSansRounded",
    fontWeight: 400,
    "& button": {
      background: "#00769c",
      width: "100%",
      color: "#ffffff",
      borderRadius: 5,
      transition: "background-color .2s ease-in",
      lineHeight: 1.5,
      border: "none",
      cursor: "pointer",
      padding: "4px 0",
      fontSize: 14,
    },
    [theme.breakpoints.up("md")]: {
      "& button": {
        padding: "3px 0",
        fontSize: 12,
        borderRadius: 5,
      },
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "0.8rem",
      "& button": {
        padding: "5px 0",
        fontSize: "1rem",
        borderRadius: 10,
      },
    },
    [theme.breakpoints.up(1600)]: {
      marginTop: "2rem",
      "& button": {
        padding: "10px 0",
        fontSize: "1.25rem",
        borderRadius: 10,
      },
    },
  },
  titleLogin: {
    textAlign: "center",
    fontFamily: "MuseoSansRounded",
    color: "#00769c",
    fontWeight: 700,
    lineHeight: 1.1,
    fontSize: 18,
    [theme.breakpoints.up("md")]: {
      fontSize: 28,
      color: "#fff",
    },
  },
  loginNote: {
    color: "#00769c",
    fontFamily: "MuseoSansRounded",
    fontWeight: 400,
    lineHeight: 1.1,
    fontSize: 13,
    "& button, & a": {
      border: "none",
      background: "transparent",
      padding: 0,
      outline: "none",
      cursor: "pointer",
      textDecoration: "underline",
      transition: "color .2s ease-in",
      // "&:hover": {
      //   color: "#00769c",
      //   filter: "brightness(1.2)",
      // },
      // [theme.breakpoints.up("md")]: {
      //   "&:hover": {
      //     color: "#ffffff",
      //     filter: "brightness(1.2)",
      //   },
      // },
    },
    "&.note1": {
      margin: "0.4rem 0",
    },
    "&.note2": {
      marginBottom: "0.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 11,
      color: "#fff",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 12,
      "&.note1": {
        margin: "0.5rem 0",
      },
      "&.note2": {
        marginBottom: "0.5rem",
      },
    },
    [theme.breakpoints.up(1600)]: {
      fontSize: 13,
      "&.note1": {
        margin: "0.7rem 0",
      },
      "&.note2": {
        marginBottom: "0.7rem",
      },
    },
    [theme.breakpoints.up(1800)]: {
      fontSize: 15,
      "&.note1": {
        margin: "1rem 0",
      },
      "&.note2": {
        marginBottom: "1rem",
      },
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "1rem",
    },
  },
}));

function LoginPage() {
  const classes = useStyles();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recoverPasswordEmail, setRecoverPasswordEmail] = useState(null);
  const [isModalPasswordVisible, setIsModalPasswordVisible] = useState(false);
  const { error: userError, isLoading: userLoading, data } = useUser();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [{ email, password }, setForm] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLoading || data) return;
    const isValid = validateEmail(email);
    if (!isValid) {
      setError(true);
      return;
    }

    dispatch(actUserLogin({ email: email.toLowerCase(), password }));
  };

  const handleOnChangeInput = (e) => {
    setError(false);
    dispatch(actLoggingFail(null));
    setForm(e);
  };

  const togleHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const requestNewPassword = async () => {
    if (!recoverPasswordEmail) return;
    try {
      await apiInstance({
        url: `user/password-reset-request`,
        method: "POST",
        data: {
          email: recoverPasswordEmail,
          client_url: "https://avpd.meetz.biz/change_password",
        },
      });
      Swal.fire({
        icon: "success",
        html: "<p>We have emailed you a link to reset your password</p>",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      setRecoverPasswordEmail(null);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        html: "<p>Something is wrong. Please try again</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };
  return (
    <MainContainer>
      <Main>
        <div className={classes.bannerWrapper}>
          <Img src={banner} alt="banner" />
          <div className={classes.loginSection}>
            <Container>
              <h1 className={classes.titleLogin}>Login for post event video from 22 August 2022 until 30 September 2022</h1>
              <form className={classes.loginForm} onSubmit={handleSubmit}>
                <s.Error isError={typeof userError?.error_code !== "undefined"}>
                  * {userError?.message}
                </s.Error>
                <div className={classes.formGroup}>
                  <label htmlFor="user_email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="user_email"
                    placeholder="Enter your email address"
                    onChange={handleOnChangeInput}
                    value={email}
                    required
                  />
                  <s.Error isError={error}>* Email is not valid</s.Error>
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor="user_password">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={hiddenPassword === true ? "password" : "text"}
                      name="password"
                      id="user_password"
                      placeholder="Enter your password"
                      onChange={handleOnChangeInput}
                      value={password}
                      required
                    />
                    <div
                      className={classes.togglePasswordBtn}
                      onClick={togleHiddenPassword}
                    >
                      {hiddenPassword === true ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.submitBtn}>
                  <button
                    disabled={email.trim() === "" || password.trim() === ""}
                  >
                    {userLoading ? "Loading..." : "Sign In"}
                  </button>
                </div>
              </form>
              <div className={classes.loginNote + " note1"}>
                {/* <button onClick={() => setIsModalPasswordVisible(true)}>
                  Forgot password?
                </button> */}
                {/* &nbsp;&nbsp; */}
                <button onClick={showModal}>Contact us.</button>
              </div>
              <div className={classes.loginNote + " note2"}>
                By signing in, I understand and agree to provide my personal
                data according to{" "}
                <a
                  href="https://www.parkwaypantai.com/privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                >
                  IHH Data Privacy Policy.
                </a>
              </div>
            </Container>
          </div>
        </div>
        <ProgrammeTable />
      </Main>
      <GoldSponsor />
      <Modal
        title="Contact us"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ textAlign: "center", color: "#015571" }}
      >
        <Fragment>
          <Param>
            <span>
              <MailOutlined /> Email:{" "}
            </span>
            enquiry@gleneagles-seminar.com
          </Param>
          <Param>
            <span>
              <PhoneOutlined rotate={90} /> Hotline:{" "}
            </span>
            +65 8945 8140 / +65 8847 3190
          </Param>
        </Fragment>
      </Modal>
      <Modal
        title="Forgot password"
        visible={isModalPasswordVisible}
        onCancel={() => setIsModalPasswordVisible(false)}
        footer={null}
        style={{ color: "#015571" }}
      >
        <Fragment>
          <Param>
            <span>Email: </span>
            <input
              type="email"
              onChange={(e) => setRecoverPasswordEmail(e.target.value)}
              value={recoverPasswordEmail}
              placeholder="Enter your email here"
            />
          </Param>
          <Param>
            <button
              onClick={requestNewPassword}
              disabled={!recoverPasswordEmail}
            >
              Submit
            </button>
          </Param>
        </Fragment>
      </Modal>
    </MainContainer>
  );
}

export default LoginPage;

const MainContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: MuseoSans;
  font-weight: 300;
`;

const Main = styled.div`
  background: linear-gradient(180deg, #faffff 0, #accbd6);
  text-align: start;
  padding-bottom: 5rem;
`;

const Img = styled.img`
  display: block;
  width: 100%;
`;
const Param = styled.p`
  font-family: MuseoSansRounded;
  font-size: 20px;
  span {
    font-weight: bold;
  }
  input {
    border-radius: 10px;
    padding: 15px;
    background: #ffffff;
    border: 1.5px solid #737373;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    &:focus: {
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
      outline: none;
    }
  }
  button {
    border-radius: 10px;
    background: #6d6f71;
    color: #ffffff;
    font-weight: 400;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background: #ffffff;
      color: #6d6f71;
      transition: all 0.3s;
    }
  }
`;
