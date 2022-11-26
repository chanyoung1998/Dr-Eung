import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "BASE_URL",
  initialState: "http://3.38.215.109:/",
});

// let MAX_CHAPTERS = createSlice({
//   name: "MAX_CHAPTERS",
//   initialState: 1,
//   reducers : {
//     changeMAXCHAPTERS(state,a){
      
//       return a;
//     }
//   }
// });

// export let {changeMAXCHAPTERS} = MAX_CHAPTERS.actions

export default configureStore({
  reducer: {
    BASE_URL: URL.reducer,
    // MAX_CHAPTERS:MAX_CHAPTERS.reducer
  },
});
