import { useEffect, useState, useRef} from 'react';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Details from './components/Details'
import Main from './components/Main'
import UserPanel from './components/UserPanel'
import Loader from './components/Loader'

function App() {
  const [books, setBooks] = useState('')
  const [name, setName] = useState('')
  const [draft, setDraft] = useState('')
  const [errDraft, setErrDraft] = useState('')
  const [searched, setSearched] = useState(false)
  const [dMaxResult, setDMaxResult] = useState('')
  const [maxResult, setMaxResult] = useState('10')
  const [errResult, setErrResult] = useState('')
  const [open, setOpen] = useState(false)
  const [iconName, setIconName] = useState(open ? 'fas fa-times' : 'fas fa-user')
  const [favoriteList, setFavoriteList] = useState([])
  const [bookToAdd, setBookToAdd] = useState({})
  const [duplicate, setDuplicate] = useState(false)
  const [testItem, setTestItem] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  const [loading, setLoading] = useState(false)
  //const modalRef = useRef()
  //const appRef = useRef()
  useEffect(()=>{
    if(name){
      setLoading(true)
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=${maxResult}`)
      .then(response =>{
        if(response.ok){
            return response.json()
        } else {
            return Promise.reject(response)
        }
       })
      .then((result) => {
        setLoading(false)
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
  const toggleOpen = () =>{
      setOpen(open => !open)
      setIconName(open ? 'fas fa-user' : 'fas fa-times')
  }

  const addFavorite = (newbook) =>{
    favoriteList.forEach(bookid => {if(bookid.id===newbook.id){
      setDuplicate(true)
    }
    })
    setBookToAdd(newbook)
    setTestItem(testItem => !testItem)
  }

  useEffect(()=>{
    if(!firstLoad){
      if(duplicate){
        alert("Posiadasz już ten przedmiot w ulubionych")
      }else{
        setFavoriteList(prevFavoriteList => [...prevFavoriteList, bookToAdd])
      }
      setDuplicate(false)
    }
    setFirstLoad(false)
  },[testItem])

  const deleteBooks = (booksToDelete) =>{
    const indexes = []
    booksToDelete.forEach(book => {
      favoriteList.forEach((favorite, index) => {
        console.log(`book: ${book}`)
        console.log(`favorite.id: ${favorite.id}`)
        if(favorite.id === book){
          indexes.push(index)
        }
      })
    })
    console.log(`indexes: ${indexes}`)
    indexes.forEach = (item => {
  //   setFavoriteList(favoriteList => [...favoriteList.slice(0,item).concat(...favoriteList(item+1))])
      setFavoriteList(favoriteList => favoriteList.filter((item2, index)=>{
        return item !== index;
      }))
      // tutaj nie działa, kij wie dlaczego
      //updateList(list.filter(item => item.name !== name));
    })
    console.log(favoriteList)
  }
  if(loading){
    return (
      <Loader />
    )
  }else{

  
  return (
    <div className="App" >
      
      <Router>
        <div>
        <UserPanel toggleOpen={()=>toggleOpen()} open={open} iconName={iconName} setOpen={setOpen} favoriteList={favoriteList}  deleteBooks={deleteBooks}/>
          {/* Na github przy Home muszę dać link do /bookSearchingEngine */}
          <Route exact path="/">
            <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult} errDraft={errDraft} searched={searched} addFavorite={addFavorite}/>
          </Route>
          {/* Dla githubpages, bo tam domyślna ścieżka początkowa jest /booksSearchingEngine */}
          <Route exact path="/booksSearchingEngine">
              <Main updateDraft={updateDraft} draft={draft} search={search} books={books} errResult={errResult} updateDResult={updateDResult} dMaxResult={dMaxResult} errDraft={errDraft} searched={searched} addFavorite={addFavorite}/>
          </Route>
          <Route path="/details/:bookId">
              <Details addFavorite={addFavorite} />
          </Route>  
        </div>
      </Router>
    </div>
  );
  }
}

export default App;
