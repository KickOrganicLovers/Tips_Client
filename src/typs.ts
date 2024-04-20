export interface CategoryScheme {
    title: string
    details: string[]
}

export interface ArticleScheme {
    title: string
    img_link: string
    sentence: string
    author: string
}

export interface LoginScheme {
    isLoggedIn: boolean
    loginStatus: {
        err: string
        username: string
    }
}

export interface UserScheme{
    username?: string
    email?: string
    password?: string
}

export interface SignupPageState{
    hasError?: boolean,
    contents?: string
}