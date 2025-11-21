import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiStateMessage {
  text: string | null;
  status: boolean | null;
}

interface UiStateModal {
  isOpen: boolean;
}

interface UiStateSidebar {
  isVisible: boolean;
}

type ModalKey =
  | "loginModal"
  | "signupModal"
  | "emailConfirmationModal"
  | "postCreateModal";

interface UiState {
  sidebar: UiStateSidebar;
  message: UiStateMessage | null;
  modal: Record<ModalKey, UiStateModal>;
}

export const initialState: UiState = {
  sidebar: { isVisible: false },
  message: {
    text: null,
    status: null,
  },
  modal: {
    loginModal: { isOpen: false },
    signupModal: { isOpen: false },
    emailConfirmationModal: { isOpen: false },
    postCreateModal: { isOpen: false },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<UiStateMessage | null>) {
      state.message = action.payload;
    },
    setSidebar(state, action: PayloadAction<UiStateSidebar>) {
      state.sidebar = action.payload;
    },
    setModal(
      state,
      action: PayloadAction<{ modal: ModalKey; modalState: UiStateModal }>
    ) {
      const { modal, modalState } = action.payload;

      Object.keys(state.modal).forEach((key) => {
        state.modal[key as ModalKey].isOpen = false;
      });

      if (state.modal[modal]) {
        state.modal[modal] = modalState;
      } else {
        console.warn(`Modal "${modal}" not found in state`);
      }
    },
  },
});

export const { setMessage, setModal, setSidebar } = uiSlice.actions;
export default uiSlice.reducer;
