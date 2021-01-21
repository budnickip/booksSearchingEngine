import { useEffect, useState } from 'react';
import React from "react";
import Books from '../Books'

const Basic = (props) =>{
    const [defaultBookJs, setDefaultBookJs] = useState('')
    useEffect(()=>{
        fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=10`)
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
        <Books books={defaultBookJs} addFavorite={props.addFavorite}/>     
    )
  }

export default Basic