import { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import styled, { css } from "styled-components";
import useUser from "../../../hooks/useUser";
import "react-phone-number-input/style.css";
import apiInstance from "../../../services";
import { AuthContext } from "../../../context/AuthProvider";

const ChangePhoneNumber = () => {
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const user = useUser();
  const { logout } = useContext(AuthContext);
  const [phoneNumberChange, setPhoneNumberChange] = useState(
    user.data.mobile_number_change
  );

  const isBlocked = phoneNumberChange >= 1;

  useEffect(() => {
    let timer;
    if (changeSuccess)
      timer = setTimeout(() => {
        logout();
      }, 3000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [changeSuccess]);

  const handleSubmitChangePhoneNumber = async () => {
    if (loading || isBlocked) return;
    setError(null);
    setLoading(true);
    try {
      const { data } = await apiInstance({
        url: "user/change-phone-number",
        method: "PATCH",
        data: {
          newPhoneNumber,
        },
      });

      setChangeSuccess(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        setPhoneNumberChange(phoneNumberChange + 1);
      }
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
  };
  console.log(error, newPhoneNumber);
  return (
    <Container>
      <LogoutBtn onClick={handleLogout}>Log out</LogoutBtn>
      <ThankBox $loading={loading}>
        <h1>Change Phone Number!</h1>
        {isBlocked && (
          <ContentBox>
            <span style={{ color: "red", fontWeight: "700" }}>
              Sorry, you can change your phone number once. Please contact event
              organiser for assistance.
            </span>
          </ContentBox>
        )}
        {error && (
          <ContentBox>
            <span style={{ color: "red", fontWeight: "700" }}>{error}</span>
          </ContentBox>
        )}

        {changeSuccess && (
          <ContentBox>
            <span style={{ color: "#0dc50d", fontWeight: "700" }}>
              Your phone number was changed successfully. You will be logged out
              in 3s. Please login again.
            </span>
          </ContentBox>
        )}

        <ContentBox>
          <p>Enter your new phone number:</p>
          <PhoneInput
            defaultCountry="SG"
            placeholder="Enter new phone number"
            value={newPhoneNumber}
            onChange={setNewPhoneNumber}
          />
          <span style={{ marginTop: "15px", fontSize: "15px" }}>
            NOTE: You can only change once
          </span>
          <span>
            <Button
              onClick={handleSubmitChangePhoneNumber}
              disabled={isBlocked}
            >
              Submit
            </Button>
          </span>
        </ContentBox>
      </ThankBox>
    </Container>
  );
};

export default ChangePhoneNumber;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
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
  input {
    padding-top: 5px;
    padding-bottom: 5px;
  }
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

// const Input = styled.input`
//   && {
//     width: 75%;
//     padding: 5px 15px;
//     border-radius: 20px;
//     background-color: #e8f0fe;
//   }
// `;

const Button = styled.button`
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
