import { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useParams } from "react-router";
import apiInstance from "../../../services";

function NewPasswordPage() {
  let param = useParams();
  let history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [inputError, setInputError] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  let passwordChecking =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line
  }, []);

  const checkValidInput = () => {
    if (!passwordChecking.test(newPassword)) {
      return {
        ...inputError,
        newPassword:
          "* Password must be at least 6 characters and must contain one number and one special character",
        confirmPassword: "",
      };
    }
    if (newPassword !== confirmPassword) {
      return {
        ...inputError,
        newPassword: "",
        confirmPassword: "* Passwords do not match",
      };
    }
    return null;
  };
  const verifyToken = async () => {
    try {
      const { data } = await apiInstance({
        url: `user/password-reset-request/${param.token}`,
        method: "GET",
      });
      setIsValid(true);
      setUserEmail(data.userEmail);
    } catch (error) {
      console.log(error);
      setIsValid(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const errors = checkValidInput();
    if (errors) {
      console.log(errors);
      setInputError(errors);
      return;
    }
    try {
      setLoading(true);
      await apiInstance({
        url: "user/password-reset-change",
        method: "POST",
        data: {
          token: param.token,
          newPassword: newPassword,
        },
      });
      setLoading(false);
      Swal.fire({
        icon: "success",
        html: "<p>Your password has been reset</p>",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        html: "<p>Something is wrong. Please try again</p>",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };

  const togleHiddenPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };
  return (
    <Fragment>
      <ContentBox>
        {isValid ? (
          <>
            <h2>Reset Password</h2>
            <p>
              Your new password must be at least 8 characters long and contain
              at least one unique characters and one number
            </p>
            <FormBox>
              <Form onSubmit={handleResetPassword}>
                <FormGroup
                  className="form_password"
                  isError={inputError.newPassword !== ""}
                >
                  <label htmlFor="new_password">New Password</label>
                  <div style={{ position: "relative" }}>
                    <Input
                      type={hiddenPassword === true ? "password" : "text"}
                      id="new_password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                      required
                    />
                    <div
                      className="hidden__password"
                      onClick={togleHiddenPassword}
                    >
                      {hiddenPassword === true ? (
                        <ion-icon name="eye-outline"></ion-icon>
                      ) : (
                        <ion-icon name="eye-off-outline"></ion-icon>
                      )}
                    </div>
                  </div>

                  <Error isError={inputError.newPassword !== ""}>
                    {inputError.newPassword}
                  </Error>
                </FormGroup>
                <FormGroup
                  className="form_password"
                  isError={inputError.confirmPassword !== ""}
                >
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <Input
                      type={hiddenPassword === true ? "password" : "text"}
                      id="confirm_password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.currentTarget.value)
                      }
                      required
                    />
                    <div
                      className="hidden__password"
                      onClick={togleHiddenPassword}
                    >
                      {hiddenPassword === true ? (
                        <ion-icon name="eye-outline"></ion-icon>
                      ) : (
                        <ion-icon name="eye-off-outline"></ion-icon>
                      )}
                    </div>
                  </div>

                  <Error isError={inputError.confirmPassword !== ""}>
                    {inputError.confirmPassword}
                  </Error>
                </FormGroup>
                <div>
                  <SubmitBtn
                    disabled={newPassword.trim() === ""}
                    id="reset_btn"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </SubmitBtn>
                </div>
              </Form>
            </FormBox>
          </>
        ) : (
          <>
            <h2>Invalid Token</h2>
            <p>Your link has expired. Please get a new reset link</p>
            <LinkToPage to="/forget-password">Request a new link</LinkToPage>
          </>
        )}
      </ContentBox>
    </Fragment>
  );
}

export default NewPasswordPage;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 75%;
  h2 {
    color: teal;
    font-size: 22px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
  ${({ theme }) => theme.breakpoints.m} {
    h2 {
      font-size: 28px;
    }
    p {
      font-size: 18px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    h2 {
      font-size: 36px;
    }
    p {
      font-size: 22px;
    }
  }
`;

export const SubmitBtn = styled.button`
  margin-top: 15px;
  padding: 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 18px;
  }
`;

export const FormBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Form = styled.form`
  margin-bottom: 5%;
  width: 100%;
  transition: width 0.2s ease;
  ${({ theme }) => theme.breakpoints.m} {
    margin-top: 2%;
    width: 80%;
  }
  ${({ theme }) => theme.breakpoints.xl} {
    width: 60%;
  }
`;

export const Title = styled.h1`
  color: #1f6959;
  font-size: 33px;
  transition: font-size 0.2s ease-in;
  font-family: "GothicB";
  /* ${({ theme }) => theme.breakpoints.xl} {
    font-size: 26px;
  } */
`;

export const FormGroup = styled.div`
  margin-bottom: 1.4rem;
  text-align: start;

  position: relative;

  .hidden__password {
    position: absolute !important;
    right: 5%;
    top: 55%;
    transform: translateY(-55%);
  }

  label {
    color: #1f6959;
    font-size: 14px;
    display: inline-block;
    font-family: "Gothic";
    margin-bottom: 0.5rem;

    ${({ theme }) => theme.breakpoints.m} {
      font-size: 16px;
    }
  }
  input {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #e8f0fe;
    background-clip: padding-box;
    border: none;
    border-color: ${(props) => (props.isError ? "red" : "#ced4da")};
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  &.form_password {
    margin-bottom: 0.8rem;
  }
  ${({ theme }) => theme.breakpoints.m} {
    label {
      font-size: 16px;
    }
  }
`;

export const Input = styled.input`
  && {
    padding: 20px;
    padding-left: 15px;
    border-radius: 20px;
  }
`;

const LinkToPage = styled(Link)`
  font-size: 20px;
  color: teal;
  transition: color 0.2s ease;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    color: #b8851a;
  }
  ${({ theme }) => theme.breakpoints.m} {
    font-size: 22px;
  }
`;

export const Error = styled.p`
  color: red;
  margin: 0.3rem 0;
  font-size: 14px !important;
  display: ${(props) => (props.isError ? "block" : "none")};
`;
