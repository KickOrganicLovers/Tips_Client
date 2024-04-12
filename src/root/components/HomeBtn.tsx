import React, {useCallback} from "react";
import {AiOutlineHome} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {clickHomeBtn} from "../../redux/setPageModeSlice";

const HomeBtn: React.FC = () => {
    const SPM = useSelector<RootState, RootState['setPageMode']>((state) => {
        return state.setPageMode
    })
    const dispatch = useDispatch<AppDispatch>()

    const clickEventHandler = useCallback(() => {
        dispatch(clickHomeBtn())
    }, [dispatch])

    return (
        <S_AiOutlineHome pageMode={SPM.pageMode} onClick={clickEventHandler}/>
    )
}

export default HomeBtn

const S_AiOutlineHome = styled(AiOutlineHome)<{ pageMode: string }>`
    font-size: 25px;
    color: ${(props) => {
        return props.pageMode === 'home' ? '#2c8a8a' : 'darkgrey'
    }}`