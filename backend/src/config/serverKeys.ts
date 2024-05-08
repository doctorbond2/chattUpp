export interface ENV {
  auth_route_LOGIN: string;
  auth_route_TEST_TEST: string;
  auth_route_START_VERIFY_TOKENS: string;
  auth_route_REFRESH_TOKEN: string;

  user_route_CREATE: string;
  user_route_ID_PROFILE: string;
  user_route_LIST: string;
  user_route_UPDATE_ONE_ID: string;
  user_route_PROFILE_DETAILS: string;
  user_route_ADD_FRIEND: string;
  user_route_DELETE_FRIEND: string;

  conv_route_CREATE: string;
  conv_route_GET_LIST: string;
  conv_route_DEACTIVATE: string;
  conv_route_ACTIVATE: string;
  conv_route_DELETE_ONE_CONVERSATION: string;
  conv_route_GET_ONE: string;
  conv_route_CREATE_ONE: string;

  message_route_CREATE: string;
  message_route_GET_LATEST_MESSAGE: string;
}
