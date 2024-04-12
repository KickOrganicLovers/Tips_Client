import {configureStore} from "@reduxjs/toolkit";
import {SSOCB_Reducer} from "./setStatusOfCategoryBtnSlice";
import {SPM_Reducer} from "./setPageModeSlice";

const store = configureStore({
    reducer: {
        setStatusOfCategoryBtn: SSOCB_Reducer,
        setPageMode: SPM_Reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
