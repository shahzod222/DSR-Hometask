import { Action } from "redux";

const initialState = {
  count: 0,
};

export type RootState = {
  count: number;
};

const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;
