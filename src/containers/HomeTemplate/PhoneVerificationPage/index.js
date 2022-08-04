import { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import apiInstance from "../../../services";
import useUser from "../../../hooks/useUser";
import { useHistory } from "react-router";
import { CHANGE_PHONE_NUMBER_PAGE } from "../../../routes/constant";
import { AuthContext } from "../../../context/AuthProvider";

function PhoneVerificationPage() {
  const [pinCode, setPinCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const [verifySuccess, setVerifySuccess] = useState(false);
  const user = useUser();
  const { logout } = useContext(AuthContext);
  const [numPhoneVerify, setNumPhoneVerify] = useState(
    user.data.num_phone_verify
  );

  const isBlocked = numPhoneVerify > 2;

  useEffect(() => {
    if (!isBlocked) handGetPinCode();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let timer;
    if (verifySuccess)
      timer = setTimeout(() => {
        window.location.reload();
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [verifySuccess]);

  const handGetPinCode = async () => {
    if (loading) return;
    setSmsSent(false);
    setError(null);
    setLoading(true);
    try {
      await apiInstance({
        url: "user/get-sms-verification",
        method: "GET",
      });

      setSmsSent(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  const handleSubmitPinCode = async () => {
    if (loading) return;
    setError(null);
    setSmsSent(false);
    setLoading(true);
    try {
      await apiInstance({
        url: `user/verify-mobile-code/${pinCode}`,
        method: "GET",
      });
      setVerifySuccess(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        setNumPhoneVerify(numPhoneVerify + 1);
      } else {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  const handleChangeMobileNumber = () => {
    history.push(CHANGE_PHONE_NUMBER_PAGE);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Container>
      <LogoutBtn onClick={handleLogout}>Log out</LogoutBtn>
      <ThankBox $loading={loading}>
        <h1>Phone Verification!</h1>
        {!isBlocked && smsSent && (
          <ContentBox>
            <span style={{ color: "#0dc50d", fontWeight: "700" }}>
              PIN code was sent to {user.data.mobile_number} !
            </span>
          </ContentBox>
        )}
        {isBlocked && (
          <ContentBox>
            <span style={{ color: "red", fontWeight: "700" }}>
              Your account has been blocked. Please contact event organiser for
              assistance
            </span>
          </ContentBox>
        )}
        {error && (
          <ContentBox>
            <span style={{ color: "red", fontWeight: "700" }}>{error}</span>
          </ContentBox>
        )}

        {verifySuccess && (
          <ContentBox>
            <span style={{ color: "#0dc50d", fontWeight: "700" }}>
              Verified successfully. Redirecting...
            </span>
          </ContentBox>
        )}

        <ContentBox>
          <p>Enter your PIN code:</p>
          <Input
            type="text"
            name="resendEmail"
            placeholder="PIN code ..."
            value={pinCode}
            disabled={isBlocked}
            onChange={(e) => setPinCode(e.currentTarget.value)}
          />
          <span>
            <Button onClick={handleSubmitPinCode} disabled={isBlocked}>
              Check
            </Button>
            <Button
              onClick={handGetPinCode}
              style={{ marginLeft: "10px" }}
              disabled={isBlocked}
            >
              Resend PIN code
            </Button>
          </span>
          <span style={{ marginTop: "20px" }}>
            Your current phone number: <b>{user.data.mobile_number}</b>
          </span>
          {user.data.mobile_number_change < 1 && (
            <Button onClick={handleChangeMobileNumber}>
              Change mobile number
            </Button>
          )}
        </ContentBox>
      </ThankBox>
    </Container>
  );
}

export default PhoneVerificationPage;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoints.l} {
    margin-top: 0;
  }
`;

const ThankBox = styled.div`
  ${(props) =>
    props.$loading &&
    css`
      cursor: progress;
    `}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 75%;
  height: 100%;
  align-items: center;
  h1 {
    color: teal;
    font-size: 26px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
  ${({ theme }) => theme.breakpoints.m} {
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 22px;
    }
  }
  ${({ theme }) => theme.breakpoints.l} {
    align-items: flex-start;
    h1 {
      font-size: 45px;
    }
    p {
      font-size: 26px;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-items: center;
  ${({ theme }) => theme.breakpoints.l} {
    align-items: flex-start;
  }
`;

export const Input = styled.input`
  && {
    width: 75%;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #e8f0fe;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: teal;
  color: white;
  :hover {
    filter: invert(0.1);
  }
  :disabled {
    cursor: not-allowed;
    background-color: gray;
  }
  :disabled:hover {
    filter: none;
  }
`;

const LogoutBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: 0;
  background-color: transparent;
  color: teal;
  /* border: 1px solid teal; */
  ${({ theme }) => theme.breakpoints.l} {
    top: 20px;
    right: 20px;
    background-color: teal;
    margin-top: 0;
    color: white;
  }
`;
