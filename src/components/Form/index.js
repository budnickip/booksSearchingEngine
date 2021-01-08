const Form = (props) =>{
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

export default Form