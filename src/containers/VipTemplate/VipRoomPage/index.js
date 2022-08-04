import React from "react";
import { Redirect } from "react-router";
import CPVipVideoChat from "../../../components/CPVipVideoChat";
import PreJoinScreens from "../../../components/PreJoinScreens";
import useRoomState from "../../../hooks/useRoomState";
import useUser from "../../../hooks/useUser";
import { VIP_PAGE } from "../../../routes/constant";

const VipRoomPage = () => {
  const user = useUser();
  const roomState = useRoomState();

  if (!user.data.video_token) return <Redirect to={VIP_PAGE} />;

  return roomState === "disconnected" ? <PreJoinScreens /> : <CPVipVideoChat />;
};

export default VipRoomPage;
