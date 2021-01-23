import { useEffect, useState } from 'react';
import React from "react";
import Books from '../Books'
import Loader from '../Loader'

const Basic = (props) =>{
    const [defaultBookJs, setDefaultBookJs] = useState('')
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=10`)
        .then(response =>{
          if(response.ok){
              return response.json()
          } else {
              return Promise.reject(response)
          }
         })
        .then((result) => {
          setLoading(false)
          setDefaultBookJs(result.items)
        })
        .catch(error => {
          console.error("Błąd pobrania API!")
        })   
    },[])
    /*Pusta tablica jako argument sprawi, że useEffect wywoła się tylko za pierwszym razem */
    if(loading){
      return(
        <Loader />
      )
    } else{
      return( 
        <Books books={defaultBookJs} addFavorite={props.addFavorite}/>     
    )
    }
  }

export default Basic