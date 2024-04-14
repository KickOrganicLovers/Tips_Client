import React from "react";
import styled from "styled-components";

const LoginPage: React.FC = () => {
    return (<Wrapper>
        <S_img src={'./img/PageIcon.png'}/>
        <form>
            <S_div>
                <label>email</label>
                <input type={'email'} name={'email'}/>
            </S_div>
            <S_div>
                <label>password</label>
                <input type={'text'} name={'password'}/>
            </S_div>
            <input type={'submit'} value={'submit'}/>
        </form>
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
    background-color: #424242`

const S_img = styled.img`
    width: auto;
    height: 10%`

const S_div = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    height: auto`

