import Form from '../Form'
import Books from '../Books'
import Basic from '../Basic'
import Header from '../Header'


const Main = (props)=>{

    return(
      <div>
        <Header updateDraft={props.updateDraft} draft={props.draft} search={props.search} errResult={props.errResult} updateDResult={props.updateDResult} dMaxResult={props.dMaxResult} errDraft={props.errDraft}/>
        {!props.searched ? <Basic addFavorite={props.addFavorite}/> : ''}
        <Books books={props.books} favoriteList={props.favoriteList} addFavorite={props.addFavorite}/>
        {/*<button onClick={() => props.addFavorite('nowa książka')}>Add</button> */}
      </div>
    )
  }

  export default Main