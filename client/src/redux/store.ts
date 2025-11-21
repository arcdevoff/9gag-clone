import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user/slice";
import ui from "./reducers/ui/slice";
import topic from "./reducers/topic/slice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: { user, ui, topic },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
