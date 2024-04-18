import {configureStore} from "@reduxjs/toolkit";
import {SBS_Reducer} from "./SideBarStatusSlice";
import {PM_Reducer} from "./PageModeSlice";
import {LS_Reducer} from "./LoginStatusSlice";

const store = configureStore({
    reducer: {
        SideBarStatus: SBS_Reducer,
        PageMode: PM_Reducer,
        LoginStatus: LS_Reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
