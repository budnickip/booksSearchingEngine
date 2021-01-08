import {Link} from "react-router-dom"
import styled from 'styled-components'

const Card = styled.div`
   display: flex;
   flex-direction: column;
`

const Books = (props)=>{
    return(
      <div>
         {props.books ? props.books.map((book) => 
         <Card key={book.id}>
            <p>{book.volumeInfo.title}</p>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="Błąd ładowania obrazka"/>
            <Link to={`/details/${book.id}`}>Szczegóły</Link>
         </Card>) : '' }
      </div>
    )
}

export default Books