import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  photo: null,
  email: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    setLogOut: (state) => {
      state.name = null;
      state.photo = null;
      state.email = null;
      state.uid = null;
    },
  },
});

export const { setLogin, setLogOut } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectPhoto = (state) => state.user.photo;
export const selectEmail = (state) => state.user.email;
export const selectUid = (state) => state.user.uid;

export default userSlice.reducer;