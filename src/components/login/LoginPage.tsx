import React from "react";
import styled from "styled-components";

const LoginPage: React.FC = () => {
    return (<Wrapper>
        <S_img src={'./img/PageIcon.png'}/>
        <S_h1>Tipsにログイン</S_h1>
        <S_form action={'http://localhost:5000/fuck'} method={'POST'}>
            <S_input_text type={`email`} placeholder={'e-mail'}/>
            <S_input_text type={'password'} placeholder={'password'}/>
            <S_input_submit type={'submit'} value={'login'}/>
        </S_form>
    </Wrapper>)
}

export default LoginPage

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 80%;
    height: 100%;
    background-color: #424242;
    overflow-y: scroll;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }`

const S_img = styled.img`
    width: auto;
    height: 10%;
    min-height: 75px`

const S_h1 = styled.h1`
    margin: 0px;
    color: white`

const S_form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 30%;
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

const S_input_submit = styled.input`
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