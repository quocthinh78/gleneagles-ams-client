export const isSuperUser = ({ is_moderator, is_presenter, admin, vip }) => {
  if (!is_moderator && !is_presenter && !admin && !vip) return false;
  return true;
};
