import Form from '../Form'
import Books from '../Books'
import Basic from '../Basic'
import Header from '../Header'


const Main = (props)=>{
    return(
      <div>
        <Header updateDraft={props.updateDraft} draft={props.draft} search={props.search} errResult={props.errResult} updateDResult={props.updateDResult} dMaxResult={props.dMaxResult} errDraft={props.errDraft}/>
        {!props.searched ? <Basic /> : ''}
        <Books books={props.books}/>
      </div>
    )
  }

  export default Main