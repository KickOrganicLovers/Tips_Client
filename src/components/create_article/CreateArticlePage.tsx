import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";
import {AiOutlineCheck, AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import Cropper, {CropperProps, Point} from "react-easy-crop";

const CreateArticlePage: React.FC = () => {
    const  [Title, setTitle] = useState<string>('タイトルを入力してください')
    const [tagToAdd, setTagToAdd] = useState<string>('追加するタグを入力してください')
    const [tagArray, setTagArray] = useState<Array<string>>()
    const [category, setCategory] = useState()
    const [illustration, setIllustration] = useState<Array<string>>()
    const [thumbnail, setThumbnail] = useState<string>()

    const [cropperProps, setCropperProps] = useState<CropperProps>({
        image: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        rotation: 0,
        aspect: 4/3,
        minZoom: 1,
        maxZoom: 1,
        cropShape: "rect",
        zoomSpeed: 1,
        onCropChange: (location: Point) => {
            setCropperProps(state => {
                return {...state, crop: location}
            })
        },
        onZoomChange: (zoom: number) => {
            setCropperProps(state => {
                return {...state, zoom: zoom}
            })
        },
        onRotationChange: (rotation: number) => {
            setCropperProps(state => {
                return {...state, rotation: rotation}
            })
        },
        style: {
            containerStyle: {width: '100%', aspectRatio: 4/3, position: "relative"},
            cropAreaStyle: {boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5'}

        },
        classes: {},
        restrictPosition: false,
        mediaProps: {},
        // cropSize: {width: 500, height: 500},
        objectFit: 'cover',
        showGrid: false,
    })
    const [isThumbnailEditorOpen, setIsThumbnailEditorOpen] = useState<boolean>(false)
    const [isCategoryEditorOpen, setIsCategoryEditorOpen] = useState<boolean>(false)
    const [isTagAdderFocused, setIsTagAdderFocused] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(setPageMode('create_article'))
    })

    const inputImgRef = useRef<HTMLInputElement>(null)
    const onThumbnailEditingButtonClicked = () => {
        inputImgRef.current?.click()
    }

    const onInitialThumbnailInputted = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (reader.result) {
                    setCropperProps(state => {
                        return {...state, image: reader.result?.toString()}
                    })
                    setIsThumbnailEditorOpen(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onCategoryEditingButtonClicked = () => {
        setIsCategoryEditorOpen(true)
    }



    return (
        <Wrapper>
            <S_h1>
                記事を新規作成
            </S_h1>
            <S_div_0>
                <S_div_4>
                    <S_input_text_0 type='text'></S_input_text_0>
                    <S_div_6>
                        <S_button_0 onClick={onThumbnailEditingButtonClicked}>サムネイル</S_button_0>
                        <S_input_file type={'file'} accept={'image/*'} ref={inputImgRef} onChange={onInitialThumbnailInputted}/>
                        <S_button_0 onClick={onCategoryEditingButtonClicked}>カテゴリー</S_button_0>
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
            {(() => isThumbnailEditorOpen?
                <ThumbnailEditCard>
                    <Cropper onCropChange={cropperProps.onCropChange}
                             crop={cropperProps.crop}
                             aspect={cropperProps.aspect}
                             zoom={cropperProps.zoom}
                             rotation={cropperProps.rotation}
                             onZoomChange={cropperProps.onZoomChange}
                             onRotationChange={cropperProps.onRotationChange}
                             image={cropperProps.image}
                             style={cropperProps.style}
                             cropShape={cropperProps.cropShape}
                             cropSize={cropperProps.cropSize}
                             objectFit={cropperProps.objectFit}
                             showGrid={cropperProps.showGrid}></Cropper>
                    <ZoomSlider>
                        <S_p_1>
                            Zoom
                        </S_p_1>
                        <S_input_range
                            type='range'
                            value={cropperProps.zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                cropperProps.onZoomChange?.(Number(e.target.value))
                            }}
                        />
                    </ZoomSlider>
                    <CheckBoxWrapper>
                        <S_AiOutlineCheck/>
                        <S_AiOutlineClose/>
                    </CheckBoxWrapper>
                </ThumbnailEditCard>
                : null)()}
            {(() => isCategoryEditorOpen?
                <CategoryEditCard>
                    <S_div_8></S_div_8>
                    <S_div_9></S_div_9>
                    <S_div_10></S_div_10>
                </CategoryEditCard>
                : null)()}
            {(() => isThumbnailEditorOpen || isCategoryEditorOpen? <FadeLayer></FadeLayer> : null)()}
        </Wrapper>
    )
}

export default CreateArticlePage

const Wrapper = styled.div`
    position: relative;
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

const ThumbnailEditCard = styled.div`
    position: absolute;
    z-index: 25;
    width: 700px;
    height: 700px;
    background-color: #424242;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
`

const CategoryEditCard = styled.div`
    position: absolute;
    z-index: 25;
    width: 700px;
    height: 700px;
    background-color: #424242;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
`

const FadeLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`


const S_input_file = styled.input`
    display: none;
`

const ZoomSlider = styled.div`
    position: relative;
    width: 100%;
    height: 10%;
`

const S_p_1 = styled.p`
    position: absolute;
    margin: 0;
    padding: 0 0 0 1vw;
    left: 0;
    width: 25%;
    height: 100%;
    font-size: 1.5vh;
    line-height: 6vh;
    box-sizing: border-box;
    color: white;
`

const S_input_range = styled.input`
    width: 75%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1vw;
    box-sizing: border-box;
`

const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3vw;
    position: relative;
    width: 100%;
    height: 7.5%;
    margin-top: 2vh;
`
const S_AiOutlineCheck = styled(AiOutlineCheck)`
    height: 100%;
    width: auto;
    color: lightgray;

    &:hover {
        transition: 0.2s;
        color: cyan;
    }

`

const S_AiOutlineClose = styled(AiOutlineClose)`
    height: 100%;
    width: auto;
    color: lightgray;

    &:hover {
        transition: 0.2s;
        color: hotpink;
    }
`

const S_div_8 = styled.div`
    width: 100%;
    height: 10%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: solid white 2px;
    box-sizing: border-box;
`

const S_div_9 = styled.div`
    width: 50%;
    height: 90%;
    position: absolute;
    bottom: 0;
    left: 0;
`

const S_div_10 = styled.div`
    width: 50%;
    height: 90%;
    position: absolute;
    bottom: 0;
    right: 0;
`