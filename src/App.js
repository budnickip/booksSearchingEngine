
import { useEffect, useState } from 'react';
import './App.css';

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
        <input onChange={updateDraft} value={draft}/>
        <button onClick={search}>Szukaj</button>
      <div className="ksiazki">
         {/*W volumeInfo w API są informacje typu title, author. Ja wcześniej robiłem 
        books ? books.map((book) => <div>{book.volumeInfo.title} <img src={book.volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></div>) : '' 
        i też działało, ale kolega podpowiedział, że book można pominąć*/}
      {books ? books.map(({volumeInfo}) => <div key={volumeInfo.title}>{volumeInfo.title} <img src={volumeInfo.imageLinks.thumbnail} alt="Błąd ładowania obrazka"/></div>) : '' }
      </div>
    </div>
  );
}

export default App;
