import React, {useCallback} from "react";
import styled from "styled-components";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {disable as SBS_disable} from "../../redux/SideBarStatusSlice";
import {disable as FLS_disable} from "../../redux/FadeLayerStatusSlice"

const AccountBanner: React.FC = () => {
    const LS = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()



    const clickEventHandler_navigateToLogin = () => {
        navigate('/login')
        dispatch(SBS_disable(), FLS_disable())
    }

    const clickEventHandler_navigateToSignup = () => {
        navigate('/signup')
        dispatch(SBS_disable(), FLS_disable())
    }

    const clickEventHandler_navigateToCreateArticle = () => {
        navigate('/create_article')
        dispatch(SBS_disable(), FLS_disable())
    }

    const clickEventHandler_navigateToUserProfile = () => {
        navigate('/user_profile')
        dispatch(SBS_disable(), FLS_disable())
    }

    return (<Wrapper>
        <Upper_Wrapper>
            <Img_Wrapper><S_img src={'./img/SampleUserImage.png'}/></Img_Wrapper>
            <UserName_Wrapper>{(() => LS.isLoggedIn? <S_p_2 onClick={clickEventHandler_navigateToUserProfile}>Lychee</S_p_2> : <S_p_2 onClick={clickEventHandler_navigateToLogin}>Login</S_p_2>)()}</UserName_Wrapper>
        </Upper_Wrapper>
        <Lower_Wrapper >
            {(() => LS.isLoggedIn? (
                <S_div>
                    <S_AiOutlinePlusCircle onClick={clickEventHandler_navigateToCreateArticle}/>
                    <S_p_1>記事を作成</S_p_1>
                </S_div>
            ) : (
                <S_div>
                    <S_AiOutlinePlusCircle onClick={clickEventHandler_navigateToSignup}/>
                    <S_p_1>アカウントを作成</S_p_1>
                </S_div>
            ))()}
        </Lower_Wrapper>
    </Wrapper>)
}

export default AccountBanner

const Wrapper = styled.div`
    width: 100%;
    height: 8vh;
    background-image: url("/img/BackGround_LowerWrapper.png");
    background-size: 100% 100%;
    box-sizing: border-box;`

const Upper_Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 5vh;`

const Lower_Wrapper = styled.div`
    width: 100%;
    height: 3vh;
    padding: 0px`


const Img_Wrapper = styled.div`
    position: absolute;
    background-color: darkgrey;
    top: 0px;
    left: 0px;
    width: 5vh;
    height: 5vh;`

const UserName_Wrapper = styled.div`
    position: absolute;
    top:0px;
    left: 6vh;
    width: auto;
    height: 100%;
    color: white;
    white-space: nowrap;`

const S_img = styled.img`
    width: 100%;
    height: 100%;`

const S_div = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const S_p_1 = styled.p`
    position: absolute;
    top: 0px;
    left: 3vh;
    height: 100%;
    width: auto;
    line-height: 3vh;
    font-size: 1.5vh;
    color: white;
    margin: 0px;
    padding: 0px;
    white-space: nowrap;`

const S_AiOutlinePlusCircle = styled(AiOutlinePlusCircle)`
    position: absolute;
    top: 0.42vh;
    left: 0.4vh;
    color: white;
    height: 75%;
    width: auto;
    font-size: 1.5vh;

    &:hover {
        color: cyan;
    }`

const S_p_2 = styled.p`
    height: 100%;
    width: auto;
    line-height: 5vh;
    font-size: 2vh;
    padding: 0px;
    margin: 0px;
    color: white;
    &:hover{
        color: cyan;
    }`