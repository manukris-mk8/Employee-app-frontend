// import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import employeeReducer from "./employee/employeeReducer";

// import logger from "redux-logger";

// const store = createStore(
//   employeeReducer,
//   undefined,
//   applyMiddleware(logger)
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employee/employeeReducer";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import baseApi from "../api-services/api";
import departmentReducer from "./department/departmentReducer";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
    ["baseApi"] : baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector