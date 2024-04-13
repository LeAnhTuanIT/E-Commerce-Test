import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { UsersState } from "./Slice/User";
// Import các reducers khác nếu có

// Định nghĩa kiểu dữ liệu cho toàn bộ trạng thái ứng dụng
export interface RootState {
  users: UsersState;
  // Thêm các reducers khác nếu cần
}

const store = configureStore({
  reducer: {
    users: usersReducer,
    // Thêm các reducers khác nếu cần
  },
});

export default store;
