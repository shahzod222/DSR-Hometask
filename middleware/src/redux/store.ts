import { Middleware, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers";
import logger from "../middleware/logger";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(logger as Middleware),
  reducer: counterReducer,
});

export default store;
