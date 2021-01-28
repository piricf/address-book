const INITIAL_STATE = {
  contact: [],
  error: undefined,
};

export const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_CONTACT":
      return {
        ...state,
        contact: [...state.contact, action.payload],
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
