import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer, // 이제 컴포넌트들에서 state.theme.isDarkMode로 접근 가능
  },
});