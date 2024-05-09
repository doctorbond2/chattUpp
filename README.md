# chattUpp

Work in progress
(DONT) Visit page @ https://chatt-upp-client.vercel.app/

# TILL INLÄMNING
terminal 1: cd frontend npm run dev
terminal 2: cd backend npm run dev
-------------------------------SERVER/BACKEND ENV-------------------------------
DATABASE_PATH =
PORT = 3000
JWT_ACCESS_SECRET =
JWT_REFRESH_SECRET =
ADMIN_API_KEY =

////Routes////-----------------

//AUTH//
auth_route_LOGIN = /login
auth_route_TEST_TEST = /test/test
auth_route_START_VERIFY_TOKENS = /start/verify/tokens
auth_route_REFRESH_TOKEN = /refresh/token

//USER//
user_route_CREATE = /create
user_route_ID_PROFILE = /profile/:id
user_route_LIST = /list
user_route_UPDATE_ONE_ID = /update/user/:id
user_route_PROFILE_DETAILS = /auth/profile
user_route_ADD_FRIEND = /addfriend
user_route_DELETE_FRIEND = /deletefriend
//CONVERSATION//
conv_route_CREATE = /create
conv_route_GET_LIST = /list
conv_route_DEACTIVATE = /deactivate
conv_route_ACTIVATE = /activate
conv_route_DELETE_ONE_CONVERSATION = /delete/one/:id
conv_route_GET_ONE = /get/one/:id
conv_route_CREATE_ONE = /create/one
//MESSAGE//
message_route_CREATE = /create
message_route_GET_LATEST_MESSAGE = /get/latest/message/:id

-------------------------------CLIENT/FRONTEND ENV-----------------------
_OBS_
Viktigt att VITE_BaseUrl slutar med /api/chatupp ifall du ändrar något!

VITE_BaseUrl = http://localhost:3000/api/chatupp
VITE_ServerPort = http://localhost:3000
JWT_ACCESS_SECRET =
JWT_REFRESH_SECRET =
VITE_ADMIN_API_KEY =
VITE_STORAGE_TOKEN_KEY = "STORAGE_TOKEN_KEY"

//AUTH//
VITE_auth_route_LOGIN = /auth/login
VITE_auth_route_TEST_TEST = /auth/test/test
VITE_auth_route_START_VERIFY_TOKENS = /auth/start/verify/tokens
VITE_auth_route_REFRESH_TOKEN = /auth/refresh/token

//USER//
VITE_user_route_CREATE = /user/create
VITE_user_route_ID_PROFILE = /user/profile/:id
VITE_user_route_LIST = /user/list
VITE_user_route_UPDATE_ONE_ID = /user/update/user/:id
VITE_user_route_PROFILE_DETAILS = /user/auth/profile
VITE_user_route_ADD_FRIEND = /user/addfriend
VITE_user_route_DELETE_FRIEND = /user/deletefriend

//CONVERSATION//
VITE_conv_route_CREATE = /convo/create
VITE_conv_route_GET_LIST = /convo/list
VITE_conv_route_DEACTIVATE = /convo/deactivate
VITE_conv_route_ACTIVATE = /convo/activate
VITE_conv_route_DELETE_ONE_CONVERSATION = /convo/delete/one/
VITE_conv_route_GET_ONE = /convo/get/one/
VITE_conv_route_CREATE_ONE = /convo/create/one/

//MESSAGE//
VITE_message_route_CREATE = /message/create
VITE_message_route_GET_LATEST_MESSAGE = /message/get/latest/message/
