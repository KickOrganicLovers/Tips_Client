import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ArticleContainer from "./ArticleContainer";
import {ArticleScheme} from "../../typs";


const ArticleWrapper: React.FC = () => {
    const [articleArr, setArticleArray] = useState<ArticleScheme[]>([])

    useEffect(() => {
        fetchData().then((val) => {
            if (val !== undefined) {
                setArticleArray(val)
            }
        })
    }, [])

    async function fetchData() {
        const res = await fetch('http://localhost:5000/get')
        const data = await res.json()
        console.log(data)
        if (Array.isArray(data)) {
            return data
        }
    }


    return (
        <Wrapper>
            {(() => {
                const items = []
                for (let i = 0; i < articleArr.length; i++) {
                    if (articleArr[i] === undefined) {
                        items.push(<ArticleContainer title={''} img_link={''} sentence={''} author={''}/>)
                    } else {
                        items.push(<ArticleContainer title={articleArr[i].title} img_link={articleArr[i].img_link}
                                                     sentence={articleArr[i].sentence} author={articleArr[i].author}/>)
                    }
                }
                return items
            })()}
        </Wrapper>
    )
}


export default ArticleWrapper

const Wrapper = styled.div`
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
    gap: 15px;
    width: 80%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: #424242;
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`

