import React, {createContext, useCallback, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {toggle} from "../../redux/setStatusOfCategoryBtnSlice";
import {AiOutlineMenu} from "react-icons/ai";


const CategoryBtn: React.FC = () => {

    const SSOCB = useSelector<RootState, RootState['setStatusOfCategoryBtn']>((state) => {
        return state.setStatusOfCategoryBtn
    })
    const dispatch = useDispatch<AppDispatch>()


    const clickEventHandler = useCallback(() => {
        dispatch(toggle())
    }, [dispatch])

    return (
        <S_AiOutlineMenu isActive={SSOCB.isActive} onClick={clickEventHandler}/>
    )
}

export default CategoryBtn


const S_AiOutlineMenu = styled(AiOutlineMenu)<{ isActive: boolean }>`
    color: ${(props) => {
    return props.isActive ? 'white' : 'darkgrey'
}};
    font-size: 25px;`