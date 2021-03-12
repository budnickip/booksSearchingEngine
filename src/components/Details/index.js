import { useEffect, useState } from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import styled from 'styled-components';
import * as palette from '../../variables';
import Loader from '../Loader'
import { ACTIONS } from '../../App'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 2em;
  line-height: 1.2em;
`
const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Title = styled.h2`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 600;
  margin: 1em;
`

const Paragraph = styled.p`
  margin: 0.8em;
  width: 100%;
`

const Distinction = styled.span`
  display: block;
  color: ${palette.darkerWhite};
  font-weight: 700;
`

const More = styled(Link)`
  text-decoration: none;
  background-color: ${palette.ornaments};
  color: ${palette.darkerWhite};
  font-size: 1.2em;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 5px;
  transition: .3s ease-in-out;
  margin-right: 15px;
  &:hover{
    background-color: ${palette.darkerWhite};
    color: ${palette.ornaments};
  }
`

const Icon = styled.span`
  background-color: ${palette.ornaments};
  color: ${palette.darkerWhite};
  font-size: 1.2em;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 5px;
  transition: .3s ease-in-out;
  cursor: pointer;
  margin-left: 15px;
  &:hover{
    background-color: ${palette.darkerWhite};
    color: ${palette.ornaments};
  }
`

const BookDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BookInformation = styled.div`
  min-width: 200px;
  flex: 1;
`

const BookDescription = styled.div`
  min-width: 350px;
  flex: 3;
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Details = (props) =>{
    let match = useRouteMatch("/details/:bookId");
    const [searchedBook, setSearchedBook] = useState('')
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${match.params.bookId}`)
        .then(response =>{
          if(response.ok){
              return response.json()
          } else {
              return Promise.reject(response)
          }
         })
        .then((result) => {
          setLoading(false)
          setSearchedBook(result.items)
        })
        .catch(error => {
          console.error("Błąd pobrania API!")
        })
        },[])
    if(loading){
      return(
        <Loader />
      )
    } else{
      return(
        <Container>
          {searchedBook[0]?.volumeInfo.imageLinks.thumbnail ? <Image><img src={searchedBook[0]?.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></Image> : ""}
          {searchedBook[0]?.volumeInfo.title ? <Title>{searchedBook[0]?.volumeInfo.title}</Title> : ""}
          <BookDetails>
            <BookInformation>
              {searchedBook[0]?.volumeInfo.authors ? <Paragraph><Distinction>Autorzy:</Distinction> {searchedBook[0]?.volumeInfo.authors}</Paragraph> : ""}
              {searchedBook[0]?.volumeInfo.publisher ? <Paragraph><Distinction>Wydawnictwo:</Distinction> {searchedBook[0]?.volumeInfo.publisher}</Paragraph>: ""}
              {searchedBook[0]?.volumeInfo.publishedDate ? <Paragraph><Distinction>Rok wydania:</Distinction> {searchedBook[0]?.volumeInfo.publishedDate}</Paragraph> : ""}
              {searchedBook[0]?.volumeInfo.avarageRating ? <Paragraph><Distinction>Średnia ocena:</Distinction> {searchedBook[0]?.volumeInfo.avarageRating}</Paragraph> : ""}
            </BookInformation>
            <BookDescription>
              {searchedBook[0]?.volumeInfo.description ? <Paragraph><Distinction>Opis:</Distinction> {searchedBook[0]?.volumeInfo.description}</Paragraph> : ""}
            </BookDescription>
          </BookDetails>
          <Buttons>
            <More to="/booksSearchingEngine">Powrót</More>
            {/*<Icon className="fas fa-heart" onClick={() => props.addFavorite({title: searchedBook[0]?.volumeInfo.title, img: searchedBook[0]?.volumeInfo.imageLinks.smallThumbnail, id: searchedBook[0]?.id})}> Dodaj do ulubionych</Icon> */}
            {/*<Icon className="fas fa-heart" onClick={() => props.dispatch({type: ACTIONS.ADD_BOOK, book: {title: searchedBook[0]?.volumeInfo.title, img: searchedBook[0]?.volumeInfo.imageLinks.smallThumbnail, id: searchedBook[0]?.id}})}> Dodaj do ulubionych</Icon>*/}
            <Icon className="fas fa-heart" onClick={() => props.dispatch({type: ACTIONS.ADD_BOOK, book: {title: searchedBook[0]?.volumeInfo.title, img: searchedBook[0]?.volumeInfo.imageLinks.smallThumbnail, id: searchedBook[0]?.id}})}> Dodaj do ulubionych</Icon>
          </Buttons>
        </Container>
      )
    }
  }

export default Details