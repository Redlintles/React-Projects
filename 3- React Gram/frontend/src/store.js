import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"
import userReducer from "./slices/userSlice";
import photoReducer from "./slices/photoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;