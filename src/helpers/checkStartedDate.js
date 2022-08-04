import moment from "moment";

export const isStarted = (startAt) => {
  if (!startAt) return undefined;
  return moment(moment().format()).isSameOrAfter(startAt);
};
