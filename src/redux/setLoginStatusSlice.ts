import {createSlice} from "@reduxjs/toolkit";

const setLoginStatusSlice = createSlice({
    name: 'setLoginStatus',
    initialState: {
        isLoggedIn: false,
        username: ''
    },
    reducers: {
        login: (state) => {state.isLoggedIn = true},
        logout: (state) => {state.isLoggedIn = false}
    }
})

export  const {login, logout} = setLoginStatusSlice.actions

export const SLS_Reducer = setLoginStatusSlice.reducer

export default setLoginStatusSlice