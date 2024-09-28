import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";
import {AiOutlinePlus} from "react-icons/ai";

const CreateArticlePage: React.FC = () => {
    const  [Title, setTitle] = useState<string>('タイトルを入力してください')
    const [tagToAdd, setTagToAdd] = useState<string>('追加するタグを入力してください')
    const [tagArray, setTagArray] = useState<Array<string>>()
    const [category, setCategory] = useState()
    const [illustration, setIllustration] = useState<Array<string>>()
    const [thumbnail, setThumbnail] = useState<string>()





    const [isTagAdderFocused, setIsTagAdderFocused] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(setPageMode('create_article'))
    })
    return (
        <Wrapper>
            <S_h1>
                記事を新規作成
            </S_h1>
            <S_div_0>
                <S_div_4>
                    <S_input_text_0 type='text'></S_input_text_0>
                    <S_div_6>
                        <S_button_0>サムネイル</S_button_0>
                        <S_button_0>カテゴリー</S_button_0>
                    </S_div_6>
                </S_div_4>
                <S_div_5>
                    <TagAdderWrapper isFocused={isTagAdderFocused}>
                        <S_input_text_1 type='text' onFocus={() => {setIsTagAdderFocused(true)}}></S_input_text_1>
                        <S_AiOutlinePlus></S_AiOutlinePlus>
                    </TagAdderWrapper>
                </S_div_5>
            </S_div_0>
            <S_div_1>
                <S_p_0>記事本文</S_p_0>
                <S_textarea></S_textarea>
            </S_div_1>
            <S_div_2>
                <EditToolWrapper></EditToolWrapper>
                <S_div_7>
                    <S_button_1>保存</S_button_1>
                    <S_button_2>中止</S_button_2>
                </S_div_7>
            </S_div_2>
        </Wrapper>
    )
}

export default CreateArticlePage

const Wrapper = styled.div`
    width: 80%;
    height: 100%;
    background-color: #424242;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
    box-sizing: border-box;
    padding: 2vh 2vh 2vh 2vh;
`

const S_h1 = styled.h1`
    height: 5%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.5vw;
    margin: 0;
    color: white;
`

const S_div_0 = styled.div`
    width: 100%;
    height: 15%;
`

const S_div_1 = styled.div`
    width: 100%;
    height: 72.5%;
    box-sizing: border-box;
    padding: 1vh 0 1vh 0;
`

const S_div_2 = styled.div`
    width: 100%;
    height: 7.5%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const S_div_4 = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const S_div_5 = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
`


const S_input_text_0 = styled.input`
    width: 50%;
    height: 75%;
    box-sizing: border-box;
    margin: 0 4vh 0 0;
    padding: 0 0 0 1vw;
    border-radius: 100vh;
    background-color: dimgray;
    border: none;
    color: white;
    font-size: 2vh;
    &:focus{
        outline: 3px solid lightgray;
    };
`

const TagAdderWrapper = styled.div<{isFocused: boolean}>`
    position: relative;
    width: 50%;
    height: 75%;
    background-color: grey;
    border-radius: 100vh;
`
const S_input_text_1 = styled.input`
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    left: 0;
    box-sizing: border-box;
    padding: 0 0 0 1vw;
    margin: 0;
    background-color: dimgray;
    border: none;
    border-radius: 100vh;
    color: white;
    font-size: 2vh;
    &:focus{
        outline: 3px solid lightgray;
    };
`
const S_AiOutlinePlus = styled(AiOutlinePlus)`
    position: absolute;
    right: 0;
    z-index: 1;
    color: lightgray;
    background-color: grey;
    height: 100%;
    width: auto;
    //border-top-right-radius: 100vh;
    //border-bottom-right-radius: 100vh;
    border-radius: 100vh;
`

const S_textarea = styled.textarea`
    width: 100%;
    height: 92.5%;
    margin: 0;
    padding: 1.5vh 1.5vw 1.5vh 1.5vw;
    box-sizing: border-box;
    border-radius: 4vh;
    resize: none;
    background-color: dimgray;
    border: none;
    color: white;
    font-size: 2vh;
    &:focus{
        outline: 3px solid lightgray;
    };
`

const EditToolWrapper = styled.div`
    width: 75%;
    height: 100%;
`

const S_div_6 = styled.div`
    display: flex;
    justify-content: space-between;
    height: 75%;
    width: 25%;
`
const S_div_7 = styled.div`
    display: flex;
    justify-content: space-between;
    height: 75%;
    width: 25%;
`

const S_p_0 = styled.p`
    margin: 0;
    padding: 0 0 0 0.5vw;
    color: white;
    height: 7.5%;
    font-size: 2vh;
`

const S_button = styled.button`
    color: lightgray;
    width: 47.5%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border-radius: 100vh;
    overflow: hidden;
    border: none;
`

const S_button_0 = styled(S_button)`
    background-color: dimgray;
    &:hover{
        color: white;
    }
`

const S_button_1 = styled(S_button)`
    background-color: dimgray;
    &:hover{
        color: cyan;
    }
`

const S_button_2 = styled(S_button)`
    background-color: dimgray;
    &:hover{
        color: hotpink;
    }
`