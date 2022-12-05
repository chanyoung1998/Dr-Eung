import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "BASE_URL",
  initialState: "https://www.dreung.duckdns.org/",
});



export default configureStore({
  reducer: {
    BASE_URL: URL.reducer,
    
  },
});
