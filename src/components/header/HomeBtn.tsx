import React, {useCallback} from "react";
import {AiOutlineHome} from "react-icons/ai";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {useNavigate} from "react-router-dom";

const HomeBtn: React.FC = () => {

    const navigate = useNavigate()

    const PM = useSelector<RootState, RootState['PageMode']>((state) => {
        return state.PageMode
    })
    const dispatch = useDispatch<AppDispatch>()

    const clickEventHandler = () => {
        navigate('/')
    }

    return (
        <S_AiOutlineHome pageMode={PM.pageMode} onClick={clickEventHandler}/>
    )
}

export default HomeBtn

const S_AiOutlineHome = styled(AiOutlineHome)<{ pageMode: string }>`
    width: auto;
    height: 3vh;
    color: ${(props) => {
        return props.pageMode === 'home' ? 'white' : 'darkgrey'
    }}`