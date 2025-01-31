import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TUserInfo = {
  avatar: string;
  phone: unknown;
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  address: string;
};

interface UserDetailsState {
  lastLogin?: string | null;
  userInfo: TUserInfo | null;
}

const initialState: UserDetailsState = {
  userInfo:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo") || "null")
      : null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userDetailsSlice.actions;

export const selectUserInfo = (state: RootState) => state.userDetails.userInfo;

export default userDetailsSlice.reducer;
