import React from "react";
import { useHistory } from "react-router";
import { LOGIN_PAGE } from "../../../routes/constant";

function PageNotFound() {
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        textAlign: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>
        <b>404</b>
      </h1>
      <h3>Page Not Found</h3>
      <div style={{ maxWidth: "400px" }}>
        <p>The Page you are looking for doesn't exist or is not allowed</p>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => history.push(LOGIN_PAGE)}
            style={{
              padding: "10px",
              color: "white",
              backgroundColor: "#065FD5",
              border: "none",
            }}
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
