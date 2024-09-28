import * as React from "react";

export interface CategoryScheme {
    title: string
    details: string[]
}

export interface ArticleScheme {
    title: string
    imgLink: string
    sentence: string
    author: string
}

export interface LoginInfoScheme {
    isLoggedIn: boolean
    error?: string
    userStatus: UserScheme
}

export interface LoginItemScheme{
    username?: string
    email?: string
    password?: string
}

export interface UserScheme{
    userNumber?: number
    username?: string
    profileImg?: string
    introduction?: string
}

export interface SignupPageState{
    hasError?: boolean,
    contents?: string
}

export interface CropperStyle {
    containerStyle?: React.CSSProperties;
    mediaStyle?: React.CSSProperties;
    cropAreaStyle?: React.CSSProperties;
}