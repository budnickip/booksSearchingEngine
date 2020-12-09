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
  useEffect(()=>{
    if(name){
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`)
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
  }

  const updateDraft = (event) => {
    setDraft(event.target.value)
  }


  return (

  
    <div className="App">   
        
         {/*W volumeInfo w API są informacje typu title, author. Ja wcześniej robiłem 
        books ? books.map((book) => <div>{book.volumeInfo.title} <img src={book.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></div>) : '' 
        i też działało, ale kolega podpowiedział, że book można pominąć*/}
      <Router>
        <div>
        <Link to="/">Home</Link>
        <Switch>
          <Route exact path="/">
             <Main updateDraft={updateDraft} draft={draft} search={search} books={books} />
          </Route>
        {/*<Route path="/details">
            <Details/>
          </Route> */}  
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
        <button onClick={props.search}>Szukaj</button>
    </div>
  )
}

const Books = (props)=>{
  return(
    <div>
       {props.books ? props.books.map((book) => <div key={book.id}>{book.volumeInfo.title} 
          <img src={book.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/>
          <Router>
            <div>
            <Link to={`/details/${book.id}`}>Details</Link>
          <Switch>
          <Route path={`/details/${book.id}`}>
            <Details info={book.volumeInfo.title}/>
          </Route>
          </Switch>
            </div>
          </Router>
       </div>) : '' }
    </div>
  )
}

const Main = (props)=>{
  return(
    <div>
      <Formularz updateDraft={props.updateDraft} draft={props.draft} search={props.search}/>
      <Books books={props.books} />
    </div>
  )
}

const Details = (props) =>{
  return(
    <div>
      Coś tam
      {props.info}
    </div>
  )
}

export default App;
