import { createSlice } from "@reduxjs/toolkit";

export interface AddPostIntf {
  showAddPostModal: boolean;
}

const initialState: AddPostIntf = {
  showAddPostModal: false,
};

export const addPostSlice = createSlice({
  name: "addPost",
  initialState,
  reducers: {
    showAddPostModal: (state) => {
      state.showAddPostModal = true;
    },
    hideAddPostModal: (state) => {
      state.showAddPostModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAddPostModal, hideAddPostModal } = addPostSlice.actions;

export default addPostSlice.reducer;
