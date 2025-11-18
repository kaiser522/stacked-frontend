import { createSlice } from "@reduxjs/toolkit";
import { clearStorage, setStorage } from "../../utils/localStorage";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      const user = action.payload;
      state.user = user;
      // save token in localstorage
      setStorage("__login_user_token__", user?.token);
      setStorage("__user__", user, "object");
    },
    logoutUser : (state, action)=> {
      console.log("clear")
      state.user = null;
      clearStorage();
    }
  },
});

export const { signInSuccess, logoutUser } = userSlice.actions;
export default userSlice.reducer;
