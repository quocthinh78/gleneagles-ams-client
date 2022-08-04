import React from "react";
import ReactDOM from "react-dom";
import "sweetalert2/src/sweetalert2.scss";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "antd/dist/antd.css";
import "./scss/globals.scss";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import AuthProvider from "./context/AuthProvider";
import TwilioVideoProvider from "./context/TwilioVideoProvider";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <TwilioVideoProvider>
            <App />
          </TwilioVideoProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
