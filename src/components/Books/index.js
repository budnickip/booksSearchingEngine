import { useContext } from "react";
import {Link} from "react-router-dom"
import styled from 'styled-components'
import * as palette from '../../variables/index'
import {FavoriteContext, ACTIONS} from '../FavoriteContext'

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
   background-color: ${palette.baseWhite};
   color: ${palette.baseBackGround};
   padding: 8px 16px;
   margin: 30px;
   border-radius: 7px;
`

const More = styled(Link)`
  text-decoration: none;
  color: ${palette.ornaments};
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
   color: ${palette.ornaments};
   cursor: pointer;
   &:hover{
      color: ${palette.lighterOrnaments};
   }
`

const Books = (props)=>{
   const [favoriteList, dispatch] = useContext(FavoriteContext)
    return(
      <Container>
         {props.books ? props.books.map((book) => 
         <Card key={book.id}>
            {book?.volumeInfo.title ? <Paragraph>{book?.volumeInfo.title}</Paragraph> : ''}
            {book?.volumeInfo.imageLinks.smallThumbnail && <Image src={book?.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>}
            <CardFooter>
               <Icon className="fas fa-heart" onClick={() => dispatch({type: ACTIONS.ADD_BOOK, book: {title: book.volumeInfo.title, img: book.volumeInfo.imageLinks.smallThumbnail, id: book.id}})}></Icon>
               {/*<Icon className= "fas fa-heart" onClick={() => props.addFavorite({title: book.volumeInfo.title, img: book.volumeInfo.imageLinks.smallThumbnail, id: book.id})}></Icon> */}
               <More to={`/details/${book.id}`}>Szczegóły</More>
            </CardFooter>
         </Card>) : '' }
      </Container>
    )
}

export default Books