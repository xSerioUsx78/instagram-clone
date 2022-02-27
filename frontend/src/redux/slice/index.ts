import { authSlice } from "./auth";
import { addPostSlice } from "./addPost";

const allReducers = {
  [authSlice.name]: authSlice.reducer,
  [addPostSlice.name]: addPostSlice.reducer,
};

export default allReducers;
