import apiInstance from ".";

export const TOKEN_KEY = "token";

// Roles
export const ADMIN_ROLE = "admin";
export const USER_ROLE = "user";
export const VIP_USER_ROLE = "vip_user";
export const PRESENTER_ROLE = "presenter";
export const MODERATOR_ROLE = "moderator";

export const setAPIHeader = (token = localStorage.getItem(TOKEN_KEY)) => {
  if (token)
    apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
};
