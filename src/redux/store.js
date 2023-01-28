import { ConfigureStore, combineReducers } from "@redux/toolkit";
import { authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
