import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`
const BookSearch = styled.div`
  width: 50%;
  margin: 0px 8px;
  @media (min-width: 1px) and (max-width: 768px){
    width: 70%;
  }
`

const InputName = styled.input`
    border: none;
    border-radius: 15px;
    font-size: 1em;
    line-height: 25px;
    outline: none;
    padding: 10px 40px 10px 10px;
    margin: 8px 8px;
    width: 98%;
    height: 2em;
    align-self: flex-end;
` 

const InputValue = styled.input`
    border: none;
    border-radius: 15px;
    font-size: 1em;
    line-height: 25px;
    outline: none;
    padding: 10px;
    margin: 8px 8px;
    width: 2em;
    height: 2em;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`

const Paragraph = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 600;
`
const Icon = styled.i`
  color: #333333;
  font-size: 1.5em;
  margin-right: .7em;
  position: absolute;
  right: 0;
  cursor: pointer;
`
const FormIcon = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
`

const Form = (props) =>{
    return(
      <Container>
        <BookSearch>
          <Paragraph>Wyszukaj książkę:</Paragraph>
          <FormIcon>
            <InputName onChange={props.updateDraft} value={props.draft} />
            <Icon onClick={props.search} className="fas fa-search" />
          </FormIcon>
          {props.errDraft ? props.errDraft : ''}
        </BookSearch>
          <div>
            <Paragraph>Max:</Paragraph>
            <InputValue type="number" onChange={props.updateDResult} value={props.dMaxResult}/>
            {props.errResult ? props.errResult : ''}
          </div>
      </Container>
    )
  }

export default Form