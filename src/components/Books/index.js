import {Link} from "react-router-dom";

const Books = (props)=>{
    return(
      <div>
         {props.books ? props.books.map((book) => <div key={book.id}>{book.volumeInfo.title} 
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
            <Link to={`/details/${book.id}`}>Szczegóły</Link>
         </div>) : '' }
      </div>
    )
}

export default Books