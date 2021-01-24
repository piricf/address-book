const INITIAL_STATE = {
  user: undefined,
  error: undefined,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        user: action.payload,
        error: undefined,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: action.payload,
        error: undefined,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state || INITIAL_STATE;
  }
};
