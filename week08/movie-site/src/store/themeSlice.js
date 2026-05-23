import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 세팅 (라이트 모드가 기본이므로 false)
const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;