import {configureStore} from "@reduxjs/toolkit";
import {SSBS_Reducer} from "./setSideBarStatusSlice";
import {SPM_Reducer} from "./setPageModeSlice";
import {SLS_Reducer} from "./setLoginStatusSlice";

const store = configureStore({
    reducer: {
        setSideBarStatus: SSBS_Reducer,
        setPageMode: SPM_Reducer,
        setLoginStatus: SLS_Reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
