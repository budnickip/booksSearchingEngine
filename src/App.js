import { useEffect, useState } from 'react';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Details from './components/Details'
import Main from './components/Main'


function App() {
  const [books, setBooks] = useState('')
  const [name, setName] = useState('')
  const [draft, setDraft] = useState('')
  const [errDraft, setErrDraft] = useState('')
  const [searched, setSearched] = useState(false)
  const [dMaxResult, setDMaxResult] = useState('')
  const [maxResult, setMaxResult] = useState('10')
  const [errResult, setErrResult] = useState('')
  useEffect(()=>{
    if(name){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=${maxResult}`)
      .then(response =>{
        if(response.ok){
            return response.json()
        } else {
            return Promise.reject(response)
        }
       })
      .then((result) => {
        setBooks(result.items)
      })
      .catch(error => {
        console.error("Błąd pobrania API!")
      })}
      
  },[name, maxResult])


  const search = () =>{
    if(draft){
      setName(draft)
      dMaxResult ? setMaxResult(dMaxResult) : setMaxResult(10)
      setDraft('')
      setDMaxResult('')
      setSearched(true)
    }else{
      setErrDraft('To pole nie może być puste!')
    }
  }

  const updateDraft = (event) => {
    setDraft(event.target.value)
    setErrDraft('')
  }

  const updateDResult = (event) => {
    if(event.target.value > 40){
      setDMaxResult(40)
      setErrResult('Maksymalna wartość wynosi 40!')
    }else if(event.target.value < 0){
      setDMaxResult(1)
      setErrResult('Minimalna wartość wynosi 0!')
    }else{
      setDMaxResult(event.target.value)
      setErrResult('')
    }
  }
         // eslint-disable-next-line no-lone-blocks
         {/*W volumeInfo w API są informacje typu title, author. Ja wcześniej robiłem 
        books ? books.map((book) => <div>{book.volumeInfo.title} <img src={book.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></div>) : '' 
        i też działało, ale kolega podpowiedział, że book można pominąć*/}

  return (
    <div className="App">   
    {/*Mogę dodać coś takiego, że na początku oprócz wyszukiwarki, wyświelta się też, książki o JavaScript i wyświetlić jakieś 5 książek
    Poniżej książki o HTML i wyświetlić 5 książek, a nad tym wszystkim wyszukiwarka i jak coś wyszukam, no to zastępuje te książki
    tymi z wyszukiwania */}
      <Router>
        <div>
          {/* Na github przy Home muszę dać link do /bookSearchingEngine */}
          <Route exact path="/">
            <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult} errDraft={errDraft} searched={searched}/>
          </Route>
          {/* Dla githubpages, bo tam domyślna ścieżka początkowa jest /booksSearchingEngine */}
          <Route exact path="/booksSearchingEngine">
              <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult} errDraft={errDraft} searched={searched}/>
          </Route>
          <Route path="/details/:bookId">
              <Details />
          </Route>  
        </div>
      </Router>
    </div>
  );
}

export default App;
