import React, {useState} from "react";
import styled from "styled-components";
import {CategoryScheme} from "../../typs";

const CategoryList: React.FC<CategoryScheme> = (props: CategoryScheme) => {
    const [isActive, setIsActive] = useState(false)

    const clickEventHandler = () => {
        setIsActive(!isActive)
    }

    const addList = (arg0: string[]) => {
        const Items = []
        for (const str of arg0) {
            Items.push(<S_li><S_p_1>{str}</S_p_1></S_li>)
        }
        return Items
    }


    return (
        <Wrapper>
            <S_div isActive={isActive}>
                <S_p_0 onClick={clickEventHandler}>{props.title}</S_p_0>
            </S_div>
            <S_ul isActive={isActive} detail_length={props.details.length}>
                {addList(props.details)}
            </S_ul>
        </Wrapper>
    )
}

const Wrapper = styled.div``

const S_div = styled.div<{ isActive: boolean }>`
    background-color: ${(props) => {
        return props.isActive ? '#3b3b3b' : '#2d2d2d'
    }};
    height: 40px;

    &:hover {
        background-color: #484848;
    }`

const S_p_0 = styled.p`
    margin: 0px 0px 0px 12px;
    height: 100%;
    line-height: 40px;
    color: white`

const S_ul = styled.ul<{ isActive: boolean, detail_length: number }>`
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    height: ${(props) => {
        return props.isActive ? (props.detail_length * 40) + 'px' : '0px'
    }};
    transition: height 0.5s ease-out;
    overflow: hidden;
`

const S_li = styled.li`
    height: 40px;
    list-style: none;
    background-color: #424242;

    &:hover {
        background-color: #484848;
    }`

const S_p_1 = styled.p`
    margin: 0px 0px 0px 14px;
    line-height: 40px;
    height: 100%;
    color: white`


export default CategoryList
