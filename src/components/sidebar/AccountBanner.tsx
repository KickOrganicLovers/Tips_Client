import React, {useCallback} from "react";
import styled from "styled-components";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {clickLoginBtn} from "../../redux/setPageModeSlice";
import {disable, enable, toggle} from "../../redux/setSideBarStatusSlice";

const AccountBanner: React.FC = () => {
    const SLS = useSelector<RootState, RootState['setLoginStatus']>((state) => state.setLoginStatus)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const launchDispatch  = useCallback(() => {
        dispatch(clickLoginBtn())
        dispatch(disable())
    }, [dispatch])


    const clickEventHandler = () => {
        navigate('/login')
        launchDispatch()
    }

    return (<Wrapper>
        <Upper_Wrapper>
            <Img_Wrapper><S_img src={'./img/SampleUserImage.png'}/></Img_Wrapper>
            <UserName_Wrapper>{(() => SLS.isLoggedIn? SLS.username : <S_p_2 onClick={clickEventHandler}>Login</S_p_2>)()}</UserName_Wrapper>
        </Upper_Wrapper>
        <Lower_Wrapper>
            <S_AiOutlinePlusCircle/>
            <S_p_1>記事を作成</S_p_1>
        </Lower_Wrapper>
    </Wrapper>)
}

export default AccountBanner

const Wrapper = styled.div`
    width: 100%;
    height: 70px;
    box-sizing: border-box;`

const Upper_Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #383838;`

const Lower_Wrapper = styled.div`
    position: relative;
    background-color: lightgray;
    width: 100%;
    height: 30px;
    font-size: 15px;
    color: #2d2d2d;
    padding: 0px`

const Img_Wrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: darkgrey;
    width: 40px;
    height: 40px`

const UserName_Wrapper = styled.div`
    position: absolute;
    top: 6px;
    left: 50px;
    color: white;
    white-space: nowrap;`

const S_img = styled.img`
    width: 100%;
    height: 100%;`

const S_p_1 = styled.p`
    position: absolute;
    top: 4px;
    left: 30px;
    font-size: 15px;
    color: #3b3b3b;
    margin: 0px;
    white-space: nowrap;`

const S_AiOutlinePlusCircle = styled(AiOutlinePlusCircle)`
    position: absolute;
    top: 8px;
    left: 10px;
    font-size: 15px;
    color: #3b3b3b;

    &:hover {
        color: #2c8a8a;
    }`

const S_p_2 = styled.p`
    padding: 0px;
    margin: 0px;
    color: lightgray;
    &:hover{
        color: white;
    }`