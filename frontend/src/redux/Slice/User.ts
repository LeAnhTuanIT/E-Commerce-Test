// usersSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: any[] | null; // Kiểu dữ liệu của users
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    loadUsersSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    loadUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.users = null; // Thiết lập users thành null khi xảy ra lỗi
    },
  },
});

export const { loadUsersStart, loadUsersSuccess, loadUsersFailure } =
  usersSlice.actions;

export default usersSlice.reducer;
