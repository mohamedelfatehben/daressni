// reducers.js
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_INFO = "GET_INFO";

const initialState = {
  id: "",
  token: window.localStorage.getItem("token") || "",
  name: "",
  email: window.localStorage.getItem("email") || "",
  role: window.localStorage.getItem("role") || "",
  userId: "",
};

export const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const setUserInfo = (payload) => {
  const { name, id, userId } = payload;
  return {
    type: GET_INFO,
    payload: {
      name,
      id,
      userId,
    },
  };
};

export const logoutUser = (payload) => ({
  type: LOGOUT_USER,
  payload,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        role: action.payload.role,
      };
    case LOGOUT_USER:
      return action.payload;
    case GET_INFO:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
