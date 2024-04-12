import React from "react";
import styled from "styled-components";
import CategoryBtn from "./CategoryBtn";
import HomeBtn from "./HomeBtn";
import SearchBtn from "./SearchBtn";

export default class Header extends React.Component<any, any> {
    render() {
        return <S_header>
            <S_img src={'./../public/img/PageTitle.png'}>

            </S_img>
            <S_ul>
                <S_li_0><HomeBtn/></S_li_0>
                <S_li_1><SearchBtn/></S_li_1>
                <S_li_2><CategoryBtn/></S_li_2>
            </S_ul>
        </S_header>
    }
}

const S_header = styled.header`
    width: 100vw;
    height: 8vh;
    min-height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #2d2d2d;`

const S_img = styled.img`
    height: 80%;
    width: auto`

const S_ul = styled.ul`
    display: flex;
    justify-content: flex-end;
    gap: 30px;
    align-items: center;
    width: 20%;
    min-width: 200px;
    height: 100%;
    margin: 0px 20px 0px 0px;
    padding: 0px;
`

const S_li_0 = styled.li`
    width: auto;
    list-style: none;
    font-family: 'Poppins', sans-serif;
`
const S_li_1 = styled.li`
    width: auto;
    list-style: none;
    font-family: 'Poppins', sans-serif;
`
const S_li_2 = styled.li`
    width: auto;
    list-style: none;
    display: none;
    @media screen and (max-width: 1024px) {
        display: list-item;
    }
`