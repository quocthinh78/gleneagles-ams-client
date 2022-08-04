import { useSelector } from "react-redux";
import {
  ADMIN_ROLE,
  MODERATOR_ROLE,
  PRESENTER_ROLE,
  USER_ROLE,
  VIP_USER_ROLE,
} from "../services/auth";
import { isSuperUser } from "../helpers/checkSuperUser";
import { intersection, isArray } from "lodash";

/**
 * @typedef UserProperties
 * @type {object}
 * @property {(object|null)} data - User data info, get from API.
 * @property {(object|null)} eventData - User event data info, get from API.
 * @property {(object|null)} error - User error when login.
 * @property {boolean} isLoading - User is in login process or not.
 * @property {string[]} userRole - User roles.
 * @property {function} isRoleAccepted - Check if user role is accepted based on provided list of role.
 */

/**
 * All about user utilities
 *
 * @returns {UserProperties} Object user, include data, error, userRole, etc...
 */
const useUser = () => {
  const userData = useSelector((state) => state.userReducer.data);
  const userError = useSelector((state) => state.userReducer.error);
  const userLoading = useSelector((state) => state.userReducer.loading);
  const eventData = useSelector((state) => state.userReducer.eventData);
  const userRole = [];

  if (userData && !isSuperUser(userData)) userRole.push(USER_ROLE);

  if (userData && userData.is_presenter) userRole.push(PRESENTER_ROLE);
  if (userData && userData.is_moderator) userRole.push(MODERATOR_ROLE);
  if (userData && userData.vip) userRole.push(VIP_USER_ROLE);
  if (userData && userData.admin) userRole.push(ADMIN_ROLE);

  // Logout function is no longer serve in this hook.
  // Logout function is now in AuthContext. Use useContext to get logout().
  // Ex:
  // const { logout } = useContext(AuthContext);

  const isRoleAccepted = (routeAllowedRoles = [""]) => {
    if (!isArray(routeAllowedRoles)) return false;
    const roleIntersec = intersection(routeAllowedRoles, userRole);
    return !(routeAllowedRoles.length > 0 && roleIntersec.length === 0);
  };

  return {
    data: userData,
    error: userError,
    isLoading: userLoading,
    eventData,
    userRole,
    isRoleAccepted,
  };
};

export default useUser;
