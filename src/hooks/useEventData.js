/**
 * @typedef EventDataProperties
 * @type {object}
 * @property {(object|null)} data
 * @property {number|undefined} pauseMessageId
 * @property {number|undefined} pinMessageId
 * @property {boolean|undefined} isNetworking
 * @property {string} zoomUrl
 * @property {string} zoomPassword
 * @property {string} announcement
 */

import { useSelector } from "react-redux";

/**
 * All about event data
 *
 * @returns {EventDataProperties} Object eventData, include event info data...
 */
const useEventData = () => {
  const eventData = useSelector((state) => state.userReducer.eventData);
  const pauseMessageId =
    useSelector(
      (state) => state.userReducer.eventData.selected_pause_message
    ) || 0;
  const pinMessageId =
    useSelector((state) => state.userReducer.eventData.selected_pin_message) ||
    0;
  const isNetworking =
    useSelector((state) => state.userReducer.eventData.is_networking) || false;
  const groupId =
    useSelector((state) => state.userReducer.networkingData.groupId) || 0;
  const videoToken =
    useSelector((state) => state.userReducer.data.video_token) || "";
  const zoomUrl =
    useSelector((state) => state.userReducer.networkingData.zoomUrl) || "";
  const zoomPassword =
    useSelector((state) => state.userReducer.networkingData.zoomPassword) || "";
  const announcement =
    useSelector((state) => state.userReducer.networkingData.announcement) || "";

  return {
    data: eventData,
    pauseMessageId,
    pinMessageId,
    isNetworking,
    groupId,
    videoToken,
    zoomUrl,
    zoomPassword,
    announcement,
  };
};
export default useEventData;
