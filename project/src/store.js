import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "BASE_URL",
  initialState: "http://3.38.215.109:/",
});



export default configureStore({
  reducer: {
    BASE_URL: URL.reducer,
    
  },
});
