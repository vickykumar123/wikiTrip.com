import {createSlice} from "@reduxjs/toolkit";
interface User {
  user: {
    name: string | null;
    email: string | null;
    avatar: string | null;
  };
}

const initialState: User = {
  user: {name: null, email: null, avatar: null},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user.name = null;
      state.user.email = null;
      state.user.avatar = null;
    },
  },
});

export const {signInUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
