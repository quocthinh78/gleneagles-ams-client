import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
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
          <h3>Sorry, something went wrong.</h3>
          <div style={{ maxWidth: "400px" }}>
            <p>
              Try reloading the page. We're working hard to fix the website for
              you as soon as possible
            </p>
            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "10px",
                  color: "white",
                  backgroundColor: "#065FD5",
                  border: "none",
                }}
              >
                RELOAD
              </button>
            </div>
          </div>
          <div>
            <details style={{ whiteSpace: "pre-wrap", textAlign: "start" }}>
              <summary style={{ textAlign: "center", marginBottom: "20px" }}>
                Details
              </summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
