import React, { useContext, useReducer, useState } from "react";
import useActiveSinkId from "../hooks/useActiveSinkId";
import { initialSettings, twilioReducer } from "../redux/reducer/twilioReducer";

export const StateContext = React.createContext(null);

const TwilioVideoProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  const [settings, dispatchSetting] = useReducer(
    twilioReducer,
    initialSettings
  );

  let contextValue = {
    error,
    setError,
    activeSinkId,
    setActiveSinkId,
    settings,
    dispatchSetting,
  };

  return (
    <StateContext.Provider value={{ ...contextValue }}>
      {children}
    </StateContext.Provider>
  );
};

export default TwilioVideoProvider;

export function useTwilioState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useTwilioState must be used within the AppStateProvider");
  }
  return context;
}
