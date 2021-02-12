import styled from 'styled-components'
import backgroundImg from '../../images/header.jpg'
import Form from '../Form'


const Container = styled.header`
    height: 60vh;
    width: 100%;
    background-image: url(${backgroundImg});
    background-size: cover;
    color: white;
    position: relative;
`
const Layer = styled.div`
    background-color: #333333;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const Header = (props) =>{
    return(    
    <Container>
        <Layer></Layer>
        <Form updateDraft={props.updateDraft} draft={props.draft} search={props.search} searchEnter={props.searchEnter} errResult={props.errResult} updateDResult={props.updateDResult} dMaxResult={props.dMaxResult} errDraft={props.errDraft}/>
    </Container>)
}

export default Header