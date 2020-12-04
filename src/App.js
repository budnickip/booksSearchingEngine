
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(()=>{
    const form = document.querySelector(".search-form");
    const input = document.querySelector("#search");

    form.addEventListener("submit", e => {
        e.preventDefault();
        loadBooks(input.value);
    })
  })
  const fetchData = async (name) => {
    var books2 = []
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`)
    .then(response =>{
        if(response.ok){
            return response.json()
        } else {
            return Promise.reject(response)
        }
    })
    .then(response => {
        books2 = response.items
    })
    .catch(error => {
        console.error("Błąd pobrania API!")
        books2 = false;
    })
    console.log(books2)
    return books2
}
const loadBooks = async (name) => {
  const books = await fetchData(name)
  var booksOnSite = document.querySelector('.ksiazki')
  var booksToAdd = ""
  console.log("przed wejsciem do books")
  if(books) {
      console.log(books[1].volumeInfo)
      books.map(item=>booksToAdd = booksToAdd + "<div>" + item.volumeInfo.title +"<div>")
      booksOnSite.innerHTML = booksToAdd
  }
}
  return (
    <div className="App">
      <form className="search-form" id="searchForm">
        <input type="text" id="search"/>
        <button type="submit">Szukaj</button>
      </form>
      <div className="ksiazki">

      </div>
    </div>
  );
}

export default App;
