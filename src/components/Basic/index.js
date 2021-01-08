import { useEffect, useState } from 'react';
import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  top: -80px;
`

const Card = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   width: 200px;
   background-color: white;
   color: #333;
   padding: 8px 16px;
   margin: 30px;
   border-radius: 7px;
`
const More = styled(Link)`
  text-decoration: none;
  color: #f65d2c;
  transition: .1s ease-in-out;
  align-self: flex-end;
  &:hover{
    font-weight: 700;
  }
`

const Image = styled.img`
  margin: 10px 0px;
`

const Paragraph = styled.p`
  font-weight: 600;
`

const Basic = (props) =>{
    const [defaultBookJs, setDefaultBookJs] = useState('')
    useEffect(()=>{
        fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=5`)
        .then(response =>{
          if(response.ok){
              return response.json()
          } else {
              return Promise.reject(response)
          }
         })
        .then((result) => {
          setDefaultBookJs(result.items)
        })
        .catch(error => {
          console.error("Błąd pobrania API!")
        })   
    },[])
    /*Pusta tablica jako argument sprawi, że useEffect wywoła się tylko za pierwszym razem */
    return(
      <Container>
        {defaultBookJs ? defaultBookJs.map((book) => 
        <Card key={book.id}>
            <Paragraph>{book.volumeInfo.title}</Paragraph>
            <Image src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
            <More to={`/details/${book.id}`}>Szczegóły</More>
         </Card>) : '' }
      </Container>
    )
  }

export default Basic