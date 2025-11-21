import type { AccessToken, AuthUser } from "@/@types/user";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accessToken: AccessToken;
  data: AuthUser | null;
  userDataRefresh: boolean;
}

const initialState: UserState = {
  accessToken: "",
  data: null,
  userDataRefresh: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUserData: (state, action: PayloadAction<AuthUser | null>) => {
      state.data = action.payload;
    },
    setUserDataRefresh: (state, action: PayloadAction<boolean>) => {
      state.userDataRefresh = action.payload;
    },
    addTopicFollow: (state, action: PayloadAction<number>) => {
      if (state.data) {
        const exists = state.data.topicFollows.some(
          (f) => f.topicId === action.payload
        );
        if (!exists) {
          state.data.topicFollows.push({ topicId: action.payload });
        }
      }
    },
    removeTopicFollow: (state, action: PayloadAction<number>) => {
      if (state.data) {
        state.data.topicFollows = state.data.topicFollows.filter(
          (f) => f.topicId !== action.payload
        );
      }
    },
  },
});

export const {
  setAccessToken,
  setUserData,
  setUserDataRefresh,
  addTopicFollow,
  removeTopicFollow,
} = user.actions;
export default user.reducer;
