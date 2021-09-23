export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
