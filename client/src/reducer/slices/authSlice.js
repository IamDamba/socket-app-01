import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: localStorage.getItem("user_id") || null,
  username: localStorage.getItem("username") || "",
  isConnected: localStorage.getItem("isConnected") || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.username = action.payload.username;
      state.isConnected = action.payload.isConnected;

      localStorage.setItem("user_id", action.payload.user_id);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem(
        "isConnected",
        action.payload.isConnected.toString()
      );
    },
    logout: (state) => {
      state.user_id = null;
      state.username = "";
      state.isConnected = false;

      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("isConnected");
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, logout } = authSlice.actions;

export default authSlice.reducer;
