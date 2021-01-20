import { useEffect, useState } from 'react';
import {Link, useRouteMatch} from "react-router-dom";

const Details = (props) =>{
    let match = useRouteMatch("/details/:bookId");
    const [searchedBook, setSearchedBook] = useState('')
    useEffect(()=>{
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${match.params.bookId}`)
        .then(response =>{
          if(response.ok){
              return response.json()
          } else {
              return Promise.reject(response)
          }
         })
        .then((result) => {
          setSearchedBook(result.items)
        })
        .catch(error => {
          console.error("Błąd pobrania API!")
        })
        },[])
  
    return(
      <div>
        {searchedBook[0]?.volumeInfo.imageLinks.thumbnail ? <img src={searchedBook[0]?.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/> : ""}
        {searchedBook[0]?.volumeInfo.title ? <p>Tytuł: {searchedBook[0]?.volumeInfo.title}</p> : ""}
        {searchedBook[0]?.volumeInfo.authors ? <p>Autorzy: {searchedBook[0]?.volumeInfo.authors}</p> : ""}
        {searchedBook[0]?.volumeInfo.publisher ? <p>Wydawnictwo: {searchedBook[0]?.volumeInfo.publisher}</p>: ""}
        {searchedBook[0]?.volumeInfo.description ? <p>Opis: {searchedBook[0]?.volumeInfo.description}</p> : ""}
        {searchedBook[0]?.volumeInfo.publishedDate ? <p>Rok wydania: {searchedBook[0]?.volumeInfo.publishedDate}</p> : ""}
        {searchedBook[0]?.volumeInfo.avarageRating ? <p>Średnia ocena: {searchedBook[0]?.volumeInfo.avarageRating}</p> : ""}
        <Link to="/booksSearchingEngine">Powrót</Link>
      </div>
    )
  }

export default Details