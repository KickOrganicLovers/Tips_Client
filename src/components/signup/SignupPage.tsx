import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {SignupPageState, UserScheme} from "../../typs";
import {useNavigate} from "react-router-dom";


const SignupPage: React.FC = () => {

    const navigate = useNavigate()

    //states

    const [username, setStatus_username] = useState<SignupPageState>({
        contents: undefined,
        hasError: false
    })
    const [email, setStatus_email] = useState<SignupPageState>({
        contents: undefined,
        hasError: false
    })
    const [password, setStatus_password] = useState<SignupPageState>({
        contents: undefined,
        hasError: false
    })
    const [passConf, setStatus_passConf] = useState<SignupPageState>({
        contents: undefined,
        hasError: false
    })

    const [signupBtn_isActive, setStatus_signupBtn] = useState(false)


    //functions
    const changeEventHandler_Username = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkIfItAlreadyExists({
            username: e.target.value,
            email: undefined,
            password: undefined
        }).then((res) => {
            if(!res){
                setStatus_username({hasError: false, contents: e.target.value})
            }else {
                setStatus_username({hasError: true, contents: undefined})
            }
        })
    }

    const changeEventHandler_Email = (e: React.ChangeEvent<HTMLInputElement>) => {
        checkIfItAlreadyExists({
            username: undefined,
            email: e.target.value,
            password: undefined
        }).then((res) => {
            if(!res){
                setStatus_email({hasError: false, contents: e.target.value})
            }else {
                setStatus_email({hasError: true, contents: undefined})
            }
        })
    }

    const changeEventHandler_Password = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(/^[a-zA-Z0-9]+$/.test(e.target.value)){
            setStatus_password({hasError: false, contents: e.target.value})
        }else {
            setStatus_password({hasError: true, contents: undefined})
        }
    }

    const changeEventHandler_PassConf = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === password.contents){
            setStatus_passConf({hasError: false, contents: e.target.value})
        }else {
            setStatus_passConf({hasError: true, contents: undefined})
        }
    }
    
    const clickEventHandler_signupBtn = () => {
        if(signupBtn_isActive){
            signup().then((res) => {
                if(res){
                    navigate('/login')
                }
            })
        }
    }

    const checkIfItAlreadyExists = async (req: UserScheme) => {
        const url = 'http://localhost:5000/signup'
        const params = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                from: 'checkIfItAlreadyExists',
                data: {
                    username: req.username,
                    email: req.email,
                    password: req.password
                }
            })
        }
        try{
            const res = await fetch(url, params)
            const data = await res.json()
            console.log(data)
            return data.isExists

        }catch (e){
            throw e
        }
    }
    
    const signup = async () => {
        const url = 'http://localhost:5000/signup'
        const params = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                from: 'signup',
                data: {
                    username: username.contents,
                    email: email.contents,
                    password: passConf.contents
                }
            })
        }
        try{
            const res = await fetch(url, params)
            const data = await res.json()
            console.log(data)
            return data.isInserted

        }catch (e){
            throw e
        }
        
    }

    useEffect(() => {
        if(!signupBtn_isActive){
            if(!username.hasError && !email.hasError && !password.hasError && !passConf.hasError){
                if(username.contents !== undefined && email.contents !== undefined && password.contents !== undefined && passConf.contents !== undefined){
                    setStatus_signupBtn(true)
                }
            }
        }else{
            if(username.hasError || email.hasError || password.hasError || passConf.hasError){
                setStatus_signupBtn(false)
            }
        }
    })


    return (<Wrapper>
        <S_div_0>
            <S_img src={'./img/PageIcon.png'}/>
            <S_h1>Tipsに登録</S_h1>
            <S_div_1>
                <S_div_2>
                    <S_p>{(() => {return username.hasError? 'This username is already used' : undefined})()}</S_p>
                    <S_input_text placeholder={'username'} name={'username'} onChange={changeEventHandler_Username}/>
                </S_div_2>
                <S_div_2>
                    <S_p>{(() => {return email.hasError? 'This email is already used' : undefined})()}</S_p>
                    <S_input_text placeholder={'email'} name={'email'} onChange={changeEventHandler_Email}/>
                </S_div_2>
                <S_div_2>
                    <S_p>{(() => {return password.hasError? 'This password contains invalid charactors' : undefined})()}</S_p>
                    <S_input_text placeholder={'password'} name={'password'} onChange={changeEventHandler_Password}/>
                </S_div_2>
                <S_div_2>
                    <S_p>{(() => {return passConf.hasError? 'Passwords do not match' : undefined})()}</S_p>
                    <S_input_text placeholder={'password_confirm'} name={'password_confirm'} onChange={changeEventHandler_PassConf}/>
                </S_div_2>
                <S_button onClick={clickEventHandler_signupBtn} isActive={signupBtn_isActive}>Signup</S_button>
            </S_div_1>
        </S_div_0>
    </Wrapper>)
}

export default SignupPage

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 100%;
    background-image: url("/img/BackGround3.png");
    background-size: cover;
    overflow-y: scroll;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }`

const S_div_0 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 30%;
    min-width: 400px;
    height: auto;
    padding: 60px;
    background-color: #424242;
    opacity: 0.98;
    border-radius: 40px;
    
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
    height: 30%;
    min-height:450px;
    gap: 20px`

const S_div_2 = styled.div`
    position: relative;
    width: 100%;
    height: 70px;
    min-height: 70px;
`


const S_input_text = styled.input`
    position: absolute;
    top: 20px;
    left: 0px;
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

const S_button = styled.button<{isActive: boolean}>`
    width: 100px;
    height: 30px;
    padding: 0px;
    margin: 20px 0px 0px 0px;
    border: none;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: ${(props) => props.isActive ? 'lightblue': 'dimgray'};
    color: lightgray;
    &:hover{
        color: white;
    }`


const S_h2 = styled.h2`
    color: red;
    font-size: 20px`


const S_p = styled.p`
    margin: 0px;
    padding: 0px;
    color: red;
    font-size: 15px`