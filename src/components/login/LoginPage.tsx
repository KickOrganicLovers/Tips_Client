import React, {Dispatch, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setErrorMessage, setIsLoggedIn, setUserName} from "../../redux/LoginStatusSlice";
import {disable} from "../../redux/SideBarStatusSlice";
import {Link, useNavigate} from "react-router-dom";
import {setHomeMode} from "../../redux/PageModeSlice";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const LS = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    //　AccountBanner内のlink先を将来的にLSによって変えるので、別になくてもいい

    useEffect(() => {
        if(LS.isLoggedIn){
            navigate('/')
            dispatch(setHomeMode())
        }
    })

    const login = async () => {
        const url = 'http://localhost:5000/login'
        const params = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        }
        try{
            const res = await fetch(url, params)
            const data = await res.json()

            console.log(data)
            return data

        }catch (e){
            throw e
        }
    }

    const submitEventHandler = () => {
        login().then((val) => {
            dispatch(setIsLoggedIn(val.isLoggedIn))
            dispatch(setUserName(val.loginStatus.username))
            dispatch(setErrorMessage(val.loginStatus.error))
        })
    }



    return (<Wrapper>
        <S_div_0>
            <S_img src={'./img/PageIcon.png'}/>
            <S_h1>Tipsにログイン</S_h1>
            <S_div_1>
                <S_input_text type={`email`} name={'email'} placeholder={'e-mail'} onChange={(e) => {setEmail(e.target.value)}}/>
                <S_input_text type={'password'} name= {'password'} placeholder={'password'} onChange={(e) => {setPassword(e.target.value)}}/>
                <S_button onClick={submitEventHandler}>Login</S_button>
            </S_div_1>
            <S_h2>{LS.loginStatus.error}</S_h2>
            <S_Link to={'/signup'}>新規登録</S_Link>
        </S_div_0>
    </Wrapper>)
}

export default LoginPage

const Wrapper = styled.div`
    background-image: url("/img/BackGround0.png");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 100%;
    background-color: white;
    overflow-y: scroll;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }`

const S_div_0 = styled.div`
    height: auto;
    width: 30%;
    min-width: 400px;
    padding: 60px;
    background-color: #424242;
    opacity: 0.98;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
`

const S_img = styled.img`
    width: auto;
    height: 100px;
    min-height: 100px`

const S_h1 = styled.h1`
    margin: 0px;
    color: white`

const S_div_1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 250px;
    gap: 20px`


const S_input_text = styled.input`
    height: 50px;
    min-height: 50px;
    width: 100%;
    padding: 0px 0px 0px 20px;
    font-size: 18px;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: dimgray;
    color: white;
    border: none;
    ::placeholder{
        color: red;
    }
    &:focus{
        outline: 2px solid lightgray;
    };`

const S_button = styled.button`
    width: 100px;
    height: 30px;
    padding: 0px;
    border: none;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: dimgray;
    color: lightgray;
    &:hover{
        color: white;
    }`


const S_h2 = styled.h2`
    color: red;
    font-size: 20px`

const S_Link = styled(Link)`
    color: white;
`