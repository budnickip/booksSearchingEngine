import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
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
  color: #A46877;
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

const CardFooter = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
`

const Icon = styled.span`
   color: #A46877;
   cursor: pointer;
   &:hover{
      color: #E08976;
   }
`


const Books = (props)=>{

    return(
      <Container>
         {props.books ? props.books.map((book) => 
         <Card key={book.id}>
            <Paragraph>{book.volumeInfo.title}</Paragraph>
            <Image src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
            <CardFooter>
               <Icon className="fas fa-heart"></Icon> 
               <More to={`/details/${book.id}`}>Szczegóły</More>
            </CardFooter>
         </Card>) : '' }
      </Container>
    )
}

export default Books