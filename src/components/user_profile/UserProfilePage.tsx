import styled from "styled-components";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {setPageMode} from "../../redux/PageModeSlice";
import {AiFillPlusCircle, AiOutlineCheck, AiOutlineClose, AiOutlineEdit} from "react-icons/ai";
import Cropper, {Area, CropperProps, Point} from "react-easy-crop";
import {setUserStatus} from "../../redux/LoginStatusSlice";
import {useNavigate} from "react-router-dom";

const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const inputImgRef = useRef<HTMLInputElement>(null)
    const LS = useSelector<RootState, RootState['LoginStatus']>((state) => state.LoginStatus)
    const navigate = useNavigate()


    const [isEditingMode, setEditingMode] = useState(false)
    const [profileImg, setProfileImg] = useState<string>(LS.userStatus.profileImg)
    const [username, setUsername] = useState<string>(LS.userStatus.username)
    const [introduction, setIntroduction] = useState<string>(LS.userStatus.introduction)
    const [isCropperOpen, setCropperMode] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [cropperProps, setCropperProps] = useState<CropperProps>({
        image: '',
        crop: {x: 0, y: 0},
        zoom: 1,
        rotation: 0,
        aspect: 1,
        minZoom: 1,
        maxZoom: 1,
        cropShape: "round",
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
            containerStyle: {width: '100%', aspectRatio: 1, position: "relative"},
            cropAreaStyle: {boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.5'}

        },
        classes: {},
        restrictPosition: false,
        mediaProps: {},
        cropSize: {width: 500, height: 500},
        objectFit: 'cover',
        showGrid: false,
    })

    const toggle = () => {
        setEditingMode(!isEditingMode)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (reader.result) {
                    setCropperProps(state => {
                        return {...state, image: reader.result?.toString()}
                    })
                    setCropperMode(true)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous')
            image.src = url
            //Promiseの引数として渡される関数に戻り値がないことがわからない
        })

    const getRadianAngle = (degreeValue: number) => {
        return (degreeValue * Math.PI) / 180
    }
    const rotateSize = (width: number, height: number, rotation: number) => {
        const rotRad = getRadianAngle(rotation)

        return {
            width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
        }
    }


    const getCroppedImage = async (imageSrc: string, pixelCrop: Area, rotation = 0, flip = {
        horizontal: false,
        verticalL: false
    }): Promise<string | null> => {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        //canvasおよびcanvascontextの挙動がわからない。

        if (!ctx) {
            return null
        }

        const rotRad = getRadianAngle(rotation)
        //getRadianAngleの挙動

        const {width: bBoxWidth, height: bBoxHeight} = rotateSize(image.width, image.height, rotation)
        //width,heightに代入する値であるbBoxWidth,Heightを以降の文でそのまま各パラメータに代入している理由がわからない。

        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.verticalL ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        const croppedCanvas = document.createElement('canvas')

        const croppedCtx = croppedCanvas.getContext('2d')

        if (!croppedCtx) {
            return null
        }

        // Set the size of the cropped canvas
        croppedCanvas.width = pixelCrop.width
        croppedCanvas.height = pixelCrop.height

        // Draw the cropped image onto the new canvas
        croppedCtx.drawImage(
            canvas,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        // As Base64 string
        return croppedCanvas.toDataURL('image/jpeg');

        // As a blob
        // return new Promise((resolve, reject) => {
        //     croppedCanvas.toBlob((file) => {
        //         if(file){
        //             resolve(URL.createObjectURL(file))
        //         }
        //     }, 'image/jpeg')
        // })
    }

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const postImgToServer = async (image: string, email: string) => {
        const url = 'http://localhost:5005/editUserProfile'
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                from: 'postImgToServer',
                data: {
                    img: image,
                    userNumber: LS.userStatus.userNumber,
                }
            })
        }

        return await fetch(url, params)
    }

    const setCroppedImg = () => {
        if (cropperProps.image && croppedAreaPixels) {
            getCroppedImage(cropperProps.image, croppedAreaPixels, cropperProps.rotation).then((imgAsBase64) => {
                if (imgAsBase64) {
                    console.log(imgAsBase64)
                    postImgToServer(imgAsBase64, '').then((res) => {
                        res.json().then((json) => {
                            console.log(json.imgUrl)
                            setProfileImg(json.imgUrl)
                            setCropperMode(false)
                        }).catch((e) => {
                            throw e
                        })
                    }).catch((e) => {
                        throw e
                    })
                } else {
                    console.log('Failed')
                }
            })
        }
    }

    const postUserStatusToServer = async () => {
        console.log('Hello from postUserStatusoServer')
        console.log(LS.userStatus)
        const url = 'http://localhost:5005/editUserProfile'
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                from: 'postUserStatusToServer',
                data: LS.userStatus
            })
        }
        return await fetch(url, params)
    }

    const onEditComplete = () => {
        console.log('Hello from onEditComplete')
        dispatch(setUserStatus({
            userNumber: LS.userStatus.userNumber,
            username: username? username : LS.userStatus.username,
            profileImg: profileImg? profileImg : LS.userStatus.profileImg,
            introduction: introduction? introduction : LS.userStatus.introduction
        }))
        postUserStatusToServer().then((res) => {
            res.json().then((json) => {
                if(json.isUpdated){
                    setEditingMode(false)
                }
            }).catch((e) =>{
                console.log('Error on parse')
            })
        }).catch((e) => {
            console.log('Error on fetch')
        }).catch((e) => {
            console.log('chinpo')
        })
    }



    useEffect(() => {
        if(LS.isLoggedIn){
            dispatch(setPageMode('user_profile'))
        }else {
            navigate('/')
        }
    })

    return (
        <Wrapper>
            <S_div_0>
                <S_div_2>
                    <S_div_3>
                        <ImgWrapper>
                            <S_img src={isEditingMode? profileImg : LS.userStatus.profileImg}/>
                            <S_AiFillPlusCircle isEditMode={isEditingMode} onClick={() => {
                                inputImgRef.current?.click()
                            }}/>
                        </ImgWrapper>
                    </S_div_3>
                    <UserNameWrapper>
                        {(() => isEditingMode ? <S_input_text value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }}/> : <S_h1>{LS.userStatus.username}</S_h1>)()}
                    </UserNameWrapper>
                </S_div_2>
                <IntroductionWrapper>
                    {(() => isEditingMode ? <S_textarea value={introduction} onChange={(e) => {
                        setIntroduction(e.target.value)
                    }}/> : <S_p_0>{LS.userStatus.introduction}</S_p_0>)()}
                </IntroductionWrapper>
                <IconWrapper>
                    {(() => isEditingMode ?
                        <S_div_4><S_AiOutlineCheck onClick={onEditComplete}/><S_AiOutlineClose onClick={toggle}/></S_div_4> :
                        <S_AiOutlineEdit onClick={toggle}/>)()}
                </IconWrapper>
                <S_input_img type={'file'} accept={'image/*'} ref={inputImgRef} onChange={onFileChange}/>
            </S_div_0>
            {isCropperOpen ? (
                <div>
                    <FadeLayer></FadeLayer>
                    <ImgEditCard>
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
                                 showGrid={cropperProps.showGrid}
                                 onCropComplete={onCropComplete}
                        />
                        <ZoomSlider>
                            <S_p_1>
                                Zoom
                            </S_p_1>
                            <S_input_0
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
                        <RotationSlider>
                            <S_p_2>
                                Rotation
                            </S_p_2>
                            <S_input_1
                                type='range'
                                value={cropperProps.rotation}
                                min={-180}
                                max={180}
                                step={1}
                                aria-labelledby='Rotation'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    cropperProps.onRotationChange?.(Number(e.target.value))
                                }}
                            />
                        </RotationSlider>
                        <CheckBox>
                            <S_AiOutlineCheck onClick={setCroppedImg}/>
                            <S_AiOutlineClose onClick={() => {
                                setCropperMode(false)
                            }}/>
                        </CheckBox>

                    </ImgEditCard>
                </div>
            ) : undefined}
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

const S_p_0 = styled.p`
    color: white;
    padding: 0;
    margin: 0;
    text-align: center;
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

const S_AiFillPlusCircle = styled(AiFillPlusCircle)<{ isEditMode: boolean }>`
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

    &:focus {
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

    &:focus {
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

const S_input_img = styled.input`
    display: none;
`

const CropperContainer = styled.div<{ isCropperOpen: boolean }>`
    display: ${(props) => props.isCropperOpen ? '' : 'none'};
`

const ImgEditCard = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    z-index: 3;
    height: 750px;
    width: 500px;
    background-color: #424242;
`
const ZoomSlider = styled.div`
    position: relative;
    width: 100%;
    height: 10%;
`

const RotationSlider = styled.div`
    position: relative;
    width: 100%;
    height: 10%;
`

const S_input_0 = styled.input`
    width: 75%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1vw;
    box-sizing: border-box;
`
const S_input_1 = styled.input`
    width: 75%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 1vw;
    box-sizing: border-box;
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
const S_p_2 = styled.p`
    position: absolute;
    margin: 0 auto;
    padding: 0 0 0 1vw;
    left: 0;
    width: 25%;
    height: 100%;
    font-size: 1.5vh;
    line-height: 6vh;
    box-sizing: border-box;
    color: white;
`

const CheckBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3vw;
    position: relative;
    width: 100%;
    height: 7.5%;
    margin-top: 2vh;
`

const FadeLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`