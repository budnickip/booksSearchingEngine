import { useEffect, useState } from 'react';
import React from "react";
import {Link} from "react-router-dom";

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
      <div>
        {defaultBookJs ? defaultBookJs.map((book) => <div key={book.id}>{book.volumeInfo.title} 
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
            <Link to={`/details/${book.id}`}>Details</Link>
         </div>) : '' }
      </div>
    )
  }

export default Basic