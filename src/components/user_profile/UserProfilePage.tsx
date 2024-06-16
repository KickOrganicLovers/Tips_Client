import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";
import {Link} from "react-router-dom";
import {AiFillPlusCircle, AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import Cropper from "react-easy-crop";

const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const LS = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)


    const [isEditMode, setMode] = useState(false)
    const text = '趣味で二年間ほど独学でwebプログラミングを学んできました。 Lycheeです。\n' +
        '                        扱う言語はtypescript、javascript、インタプリンタ系言語、少しですがjava等も触ります。\n' +
        '                        お仕事のご依頼は下記のメールアドレスまで。\n' +
        '                        ukyo21owls@icloud.com'

    const [username, setUsername] = useState('lychee')
    const [introduction, setIntroduction] = useState('')
    const [isCropperOpen, setCropperMode] = useState(false)
    const [img, setImg] = useState<string>()
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const inputImgRef = useRef<HTMLInputElement>(null)

    const toggle = () => {
        setMode(!isEditMode)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if(reader.result){
                    setImg(reader.result.toString())
                    setCropperMode(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }


    useEffect(() => {
        dispatch(setPageMode('user_profile'))
        if(isCropperOpen){
            console.log('fuckyou chinpo')
        }
    })



    return (
        <Wrapper>
            <S_div_0>
                <S_div_2>
                    <S_div_3>
                        <ImgWrapper>
                            <S_img src={'./img/SampleUserImage.png'}/>
                            <S_AiFillPlusCircle isEditMode={isEditMode} onClick={()=> {inputImgRef.current?.click()}}/>
                        </ImgWrapper>
                    </S_div_3>
                    <UserNameWrapper>
                        {(() => isEditMode? <S_input_text value={username} onChange={(e) => {setUsername(e.target.value)}}/> : <S_h1>Lychee</S_h1>)()}
                    </UserNameWrapper>
                </S_div_2>
                <IntroductionWrapper>
                    {(() => isEditMode? <S_textarea value={introduction} onChange={(e) => {setIntroduction(e.target.value)}}/> : <S_p>{text}</S_p>)()}
                </IntroductionWrapper>
                <IconWrapper>
                    {(() => isEditMode? <S_div_4><S_AiOutlineCheck onClick={toggle}/><S_AiOutlineClose onClick={toggle}/></S_div_4>: <S_AiOutlineEdit onClick={toggle}/> )()}
                </IconWrapper>
                <S_input_img type={'file'} accept={'image/*'} ref={inputImgRef} onChange={onFileChange}/>
            </S_div_0>
            {isCropperOpen? (<Cropper onCropChange={setCrop} crop={crop} aspect={3/4} zoom={zoom} onZoomChange={setZoom} image={img}/>) : undefined}
            <S_div_1></S_div_1>
        </Wrapper>
    )
}

export default UserProfilePage

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    background-color: #424242;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }`

const S_div_0 = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5vh;
    background-color: #343434;
`

const S_div_1 = styled.div`
    width: 70%;
    height: 100%;
`

const S_div_2 = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
`

const S_div_3 = styled.div`
`

const ImgWrapper = styled.div`
    position: relative;
    width: 15vw;
    height: 15vw;
    
`

const UserNameWrapper = styled.div`
    width: 75%;
`

const IntroductionWrapper = styled.div`
    width: 75%;
    height: auto;
    
`

const S_img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%`

const S_h1 = styled.h1`
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    color: white;
`

const S_p = styled.p`
    color: white;
    padding: 0;
    margin: 0;
`
const S_AiOutlineEdit = styled(AiOutlineEdit)`
    color: lightgray;
    border-radius: 50%;
    height: 100%;
    width: auto;
    &:hover {
        color: white;
    }
`

const IconWrapper = styled.div`
    height: 4%;
`

const S_AiFillPlusCircle = styled(AiFillPlusCircle)<{isEditMode: boolean}>`
    display: ${(props) => props.isEditMode ? '' : 'none'};
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    color: grey;
    background-color: white;
    border-radius: 50%;
    width: 22%;
    height: auto;
`

const S_input_text = styled.input`
    margin: 0;
    padding: 0;
    text-align: center;
    height: 5vh;
    width: 100%;
    color: white;
    font-size: 3vh;
    background-color: #343434;
    box-sizing: border-box;
    border-width: 0 0 2px 0;
    border-color: lightgray;
    &:focus{
        transition: 0.2s;
        outline: none;
        border-color: white;
    }
`

const S_textarea = styled.textarea`
    margin: 0;
    padding: 12px 8px 12px 8px;
    width: 100%;
    font-size: 1.5vh;
    height: 20vh;
    color: white;
    background-color: #343434;
    box-sizing: border-box;
    border-width: 2px 0 2px 0;
    resize: none;
    border-color: lightgray;
    &:focus{
        transition: 0.2s;
        outline: none;
        border-color: white;
    }
`

const S_div_4 = styled.div`
    display: flex;
    gap: 2vw;
    height: 100%;
    width: auto;
`

const S_AiOutlineCheck = styled(AiOutlineCheck)`
    height: 100%;
    width: auto;
    color: lightgray;
    &:hover{
        transition: 0.2s;
        color: cyan;
    }
    
`

const S_AiOutlineClose = styled(AiOutlineClose)`
    height: 100%;
    width: auto;
    color: lightgray;
    &:hover{
        transition: 0.2s;
        color: hotpink;
    }
`

const S_input_img = styled.input`
    display: none;
`

const CropperContainer = styled.div<{isCropperOpen: boolean}>`
    display: ${(props) => props.isCropperOpen ? '' : 'none'};
`