import { Topic } from "@/@types/topic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicState {
  items: Topic[];
}

export const initialState: TopicState = {
  items: [],
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopics(state, action: PayloadAction<Topic[]>) {
      state.items = action.payload;
    },
  },
});

export const { setTopics } = topicSlice.actions;
export default topicSlice.reducer;
