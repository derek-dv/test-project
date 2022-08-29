export default function (state = { users: [] }, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_USERS":
      return {
        ...state,
        loading: true,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: payload,
      };
    case "GET_USERS_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
