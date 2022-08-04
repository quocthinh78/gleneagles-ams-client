//-------------- General Pages--------------
export const LOGIN_PAGE = "/login";
export const PROGRAM_PAGE = "/program";
export const REGISTRATION_PAGE = "/register";
export const REGISTRATION_PAGE_WAITING = "/register/waiting";
export const REGISTRATION_PAGE_EXPIRED = "/register/expired";
export const HOLDING_PAGE = "/holding";
export const THANK_YOU_PAGE = "/thankyou";
export const VERIFICATION_PAGE = "/verify/:token";
export const FORGET_PASSWORD_PAGE = "/forget-password";
export const RESET_PASSWORD_PAGE = "/change_password/:token";
export const PHONE_VERIFY_PAGE = "/phone_verify";
export const CHANGE_PHONE_NUMBER_PAGE = "/change_phone_number";
export const HOME_PAGE = "/";
export const ABOUT_PAGE = "/about";
export const MESSAGE_PAGE = "/message";

//-------------- Normal User Pages ---------
export const LIVE_PAGE = "/live";
export const LIVE_DETAIL_PAGE = "/live/:id";

//-------------- Admin Pages ---------------
export const ADMIN_PAGE = "/admin";
export const ADMIN_DASHBOARD_PAGE = "/admin/dashboard";

// Users
export const ADMIN_USERS_PAGE = "/admin/users";
export const ADMIN_CREATE_USERS_PAGE = "/admin/users/create";
export const ADMIN_IMPORT_USERS_PAGE = "/admin/users/import";
export const ADMIN_USER_DETAIL_PAGE = "/admin/users/:id/detail";
export const ADMIN_EDIT_USER_PAGE = "/admin/users/:id/edit";

// Polls
export const ADMIN_POLLS_PAGE = "/admin/polls";
export const ADMIN_CREATE_POLLS_PAGE = "/admin/polls/create";
export const ADMIN_EDIT_POLLS_PAGE = "/admin/polls/:id/edit";

// Questions
export const ADMIN_QUESTIONS_PAGE = "/admin/questions";
export const ADMIN_QUESTIONS_UPVOTE_DETAIL_PAGE = "/admin/upvotedetail/:id";

// Messages
export const ADMIN_MESSAGES_PAGE = "/admin/messages";

// Events
export const ADMIN_EVENTS_PAGE = "/admin/events";
export const ADMIN_CREATE_EVENTS_PAGE = "/admin/events/create";
export const ADMIN_EDIT_EVENTS_PAGE = "/admin/events/:id/edit";
export const ADMIN_IMPORT_EVENTS_PAGE = "/admin/events/import";

// Groups
export const ADMIN_GROUPS_PAGE = "/admin/groups";
export const ADMIN_CREATE_GROUPS_PAGE = "/admin/groups/create";
export const ADMIN_EDIT_GROUPS_PAGE = "/admin/groups/:id/edit";
export const ADMIN_GROUP_SLIDES_PAGE = "/admin/groups/:id/slides";

// Download
export const ADMIN_DOWNLOAD_PAGE = "/admin/download";

// Moderators
export const ADMIN_MODERATORS_PAGE = "/admin/moderators";
export const ADMIN_MODERATOR_DETAIL_PAGE = "/admin/moderators/:id/detail";
export const ADMIN_CREATE_MODERATORS_PAGE = "/admin/moderators/create";
export const ADMIN_EDIT_MODERATORS_PAGE = "/admin/moderators/:id/edit/";

// Presenters
export const ADMIN_PRESENTERS_PAGE = "/admin/presenters";
export const ADMIN_PRESENTER_DETAIL_PAGE = "/admin/presenters/:id/detail";
export const ADMIN_CREATE_PRESENTERS_PAGE = "/admin/presenters/create";
export const ADMIN_EDIT_PRESENTERS_PAGE = "/admin/presenters/:id/edit";

// Resolution
export const ADMIN_RESOLUTION_PAGE = "/admin/resolution";
export const ADMIN_CREATE_RESOLUTION_PAGE = "/admin/resolution/create";
export const ADMIN_EDIT_RESOLUTION_PAGE = "/admin/resolution/:id/edit";

//Word Cloud
export const ADMIN_WORDCLOUD_PAGE = "/admin/wordcloud";
export const ADMIN_CREATE_WORDCLOUD_PAGE = "/admin/wordcloud/create";
export const ADMIN_EDIT_WORDCLOUD_PAGE = "/admin/wordcloud/:id/edit";

//-------------- Twillio Pages ---------
export const NETWORKING_PAGE = "/networking";
export const NETWORKING_VIDEO_CHAT_PAGE = "/networking/:groudId";
// export const NETWORKING_SLIDES_PAGE = "/slides";

//-------------- Vip Pages ---------
export const VIP_PAGE = "/vip";
export const VIP_VIDEO_CHAT_PAGE = "/vip/:groupId";

export const TWILLIO_STREAM = "/twillio-stream";
