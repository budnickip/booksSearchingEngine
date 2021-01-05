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
        <Link to="/">Home</Link>
        <Switch>
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
        </Switch> 
        </div>
      </Router>
    </div>
  );
}

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
      Tu na razie jest ściernisko
      {defaultBookJs ? defaultBookJs.map((book) => <div key={book.id}>{book.volumeInfo.title} 
          <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
          <Link to={`/details/${book.id}`}>Details</Link>
       </div>) : '' }
    </div>
  )
}

const Formularz = (props) =>{
  return(
    <div>
        <input onChange={props.updateDraft} value={props.draft}/>
        {props.errDraft ? props.errDraft : ''}
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
      <Formularz updateDraft={props.updateDraft} draft={props.draft} search={props.search} errResult={props.errResult} updateDResult={props.updateDResult} dMaxResult={props.dMaxResult} errDraft={props.errDraft}/>
      {!props.searched ? <Basic /> : ''}
      <Books books={props.books} />
    </div>
  )
}

const Details = (props) =>{
  let match = useRouteMatch("/details/:bookId");
  const [searchedBook, setSearchedBook] = useState('')
  const [loaded, setLoaded] = useState(false)
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
      
      {searchedBook[0]?.volumeInfo.title ? <p>Tytuł: {searchedBook[0]?.volumeInfo.title}</p> : ""}
      {searchedBook[0]?.volumeInfo.authors ? <p>Autorzy: {searchedBook[0]?.volumeInfo.authors}</p> : ""}
      {searchedBook[0]?.volumeInfo.publisher ? <p>Wydawnictwo: {searchedBook[0]?.volumeInfo.publisher}</p>: ""}
      {searchedBook[0]?.volumeInfo.description ? <p>Opis: {searchedBook[0]?.volumeInfo.description}</p> : ""}
      {searchedBook[0]?.volumeInfo.publishedDate ? <p>Rok wydania: {searchedBook[0]?.volumeInfo.publishedDate}</p> : ""}
      {searchedBook[0]?.volumeInfo.avarageRating ? <p>Średnia ocena: {searchedBook[0]?.volumeInfo.avarageRating}</p> : ""}
      {searchedBook[0]?.volumeInfo.imageLinks.thumbnail ? <img src={searchedBook[0]?.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/> : ""}
    </div>
  )
}

export default App;
