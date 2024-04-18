import {createSlice} from "@reduxjs/toolkit";
import {LoginScheme} from "../typs";

const loginStatusSlice = createSlice({
    name: 'LoginStatus',
    initialState: {
        isLoggedIn: false,
        loginStatus: {
            error: '',
            username: ''
        }
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserName: (state, action) => {
            state.loginStatus.username = action.payload
        }
    }
})

export  const {setIsLoggedIn, setUserName} = loginStatusSlice.actions

export const LS_Reducer = loginStatusSlice.reducer

export default loginStatusSlice