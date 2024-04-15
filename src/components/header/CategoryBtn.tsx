import React, {createContext, useCallback, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {toggle} from "../../redux/setSideBarStatusSlice";
import {AiOutlineMenu} from "react-icons/ai";


const CategoryBtn: React.FC = () => {

    const SSBS = useSelector<RootState, RootState['setSideBarStatus']>((state) => {
        return state.setSideBarStatus
    })
    const dispatch = useDispatch<AppDispatch>()


    const launchDispatch = useCallback(() => {
        dispatch(toggle())
    }, [dispatch])

    const clickEventHandler = () => {
        launchDispatch()
    }

    return (
        <S_AiOutlineMenu isActive={SSBS.isActive} onClick={clickEventHandler}/>
    )
}

export default CategoryBtn


const S_AiOutlineMenu = styled(AiOutlineMenu)<{ isActive: boolean }>`
    color: ${(props) => {
        return props.isActive ? 'white' : 'darkgrey'
    }};
    font-size: 25px;`