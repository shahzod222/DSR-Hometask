import { MiddlewareAPI, Dispatch, Action } from "redux";

const logger =
  (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
    console.log("Dispatching:", action);
    const result = next(action);
    console.log("New State:", store.getState());
    return result;
  };

export default logger;
