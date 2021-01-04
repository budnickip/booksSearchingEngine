import { useEffect, useState } from 'react';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,  
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  const [books, setBooks] = useState('')
  const [name, setName] = useState('')
  const [draft, setDraft] = useState('')
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
      
  },[name])


  const search = () =>{
    setName(draft)
    dMaxResult ? setMaxResult(dMaxResult) : setMaxResult(10)
    setDraft('')
    setDMaxResult('')
  }

  const updateDraft = (event) => {
    setDraft(event.target.value)
  }

  const updateDResult = (event) => {
    if(event.target.value > 40){
      setDMaxResult(40)
      setErrResult('Maksymalna wartość wynosi 40!')
    }else{
      setDMaxResult(event.target.value)
      setErrResult('')
    }
  }
         {/*W volumeInfo w API są informacje typu title, author. Ja wcześniej robiłem 
        books ? books.map((book) => <div>{book.volumeInfo.title} <img src={book.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></div>) : '' 
        i też działało, ale kolega podpowiedział, że book można pominąć*/}

  return (
    <div className="App">   
      <Router>
        <div>
        <Link to="/">Home</Link>
        <Switch>
          <Route exact path="/">
            <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult}/>
          </Route>
          {/* Dla githubpages, bo tam domyślna ścieżka początkowa jest /booksSearchingEngine */}
          <Route exact path="/booksSearchingEngine">
              <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult}/>
          </Route>
          <Route path="/details/:bookId">
              <Details books={books}/>
          </Route>  
        </Switch> 
        </div>
      </Router>
    </div>
  );
}

const Formularz = (props) =>{
  return(
    <div>
        <input onChange={props.updateDraft} value={props.draft}/>
        <p>Podaj ile książek chcesz wyszukać:</p>
        <input onChange={props.updateDResult} value={props.dMaxResult}/>
        {props.errResult ? props.errResult : ''}
        <button onClick={props.search}>Szukaj</button>
    </div>
  )
}

const Books = (props)=>{
  return(
    <div>
       {props.books ? props.books.map((book) => <div key={book.id}>{book.volumeInfo.title} 
          <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
          <Link to={`/details/${book.id}`}>Details</Link>
       </div>) : '' }
    </div>
  )
}

const Main = (props)=>{
  return(
    <div>
      <Formularz updateDraft={props.updateDraft} draft={props.draft} search={props.search} errResult={props.errResult} updateDResult={props.updateDResult} dMaxResult={props.dMaxResult}/>
      <Books books={props.books} />
    </div>
  )
}

const Details = (props) =>{
  let match = useRouteMatch("/details/:bookId");
  let myBook = props.books.filter((book) => {
    return book.id === match.params.bookId
  })
  console.log(myBook[0])
  return(
    <div>
      {/*console.log() */}
      {  /*props.books[0].volumeInfo.info */}
  
      {myBook[0].volumeInfo.title ? <p>Tytuł: {myBook[0].volumeInfo.title}</p> : ""}
      {myBook[0].volumeInfo.authors ? <p>Autorzy: {myBook[0].volumeInfo.authors}</p> : ""}
      {myBook[0].volumeInfo.publisher ? <p>Wydawnictwo: {myBook[0].volumeInfo.publisher}</p>: ""}
      {myBook[0].volumeInfo.description ? <p>Opis: {myBook[0].volumeInfo.description}</p> : ""}
      {myBook[0].volumeInfo.publishedDate ? <p>Rok wydania: {myBook[0].volumeInfo.publishedDate}</p> : ""}
      {myBook[0].volumeInfo.avarageRating ? <p>Średnia ocena: {myBook[0].volumeInfo.avarageRating}</p> : ""}
      <img src={myBook[0].volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/>
    
    {/* działa props.books ? props.books.map((book) => <div>{book.id == 'AwVt-Ocw2N8C' ? book.volumeInfo.title : ''} </div>) : '' */}
    </div>
  )
}

export default App;
