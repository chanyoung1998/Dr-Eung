import { configureStore, createSlice } from "@reduxjs/toolkit";

let URL = createSlice({
  name: "BASE_URL",
  initialState: "https://www.dreung.duckdns.org/api/",
});

let TOKEN = createSlice({
  name: "TOKEN",
  initialState: "Token 6ea207c7412c800ec623637b51877c483d2f2cdf",

  reducers : {
    changeToken(state,token){
      console.log(state,token)
      return "Token " + String(token.payload)
    }
  }

});

export let {changeToken} = TOKEN.actions

export default configureStore({
  reducer: {
    BASE_URL: URL.reducer,
    TOKEN:TOKEN.reducer,
  },
});
