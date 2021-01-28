import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import * as palette from '../../variables'


const Container = styled.div `
    position: fixed;
    top: ${props => props.open ? '0px' : '30px'};
    right: ${props => props.open ? '0px' : '30px'};
    background-color: ${palette.ornaments};
    color: white;
    z-index: 2;
    width: ${props => props.open ? '30%' : '60px'};
    height: ${props => props.open ? '100%': '60px'};
    border-radius: ${props => props.open ? '0' : '50%'};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.open ? 'unset' : 'center'};
    align-items: ${props => props.open ? 'unset' : 'center'};
    cursor: ${props => props.open ? 'default' : 'pointer'}; 
    -webkit-box-shadow: ${props => props.open ? 'unset' : '0px 5px 30px 0 rgba(0, 0, 0, 0.1)'};
    -moz-box-shadow: ${props => props.open ? 'unset' : '0px 5px 30px 0 rgba(0, 0, 0, 0.1)'};
    box-shadow: ${props => props.open ? 'unset' : '0px 5px 30px 0 rgba(0, 0, 0, 0.1)'};
    overflow: hidden;
    overflow-y: ${props => props.open ? 'scroll' : 'hidden'}; 
    &::-webkit-scrollbar {
        width: 0px;
    }
    @media (min-width: 1px) and (max-width: 768px){
        width: ${props => props.open ? '100%' : '60px'};
    }
    `

const User = styled.span `
    font-size: 2em;
`

const Panel = styled.div `
    height: 100%;
    width: 30%;
    background-color: ${palette.ornaments};
    margin-top: 2em;
    margin-left: 1em;
    width: 100%;
    `

const Menu = styled.div `
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    `
const Paragraph = styled.p `
    font-weight: 600;
    font-size: 1.2em;
    `

const Item = styled.li`
    padding: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
`

const Title = styled.p`
    width: 100%;
    font-weight: 600;
    display: flex;
    justify-content: center;
    padding-top: 10px;
`

const NavDetails = styled(Link)`
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
    text-decoration: none;
    color: ${palette.baseBackGround};
    width: 80%;
`

const Button = styled.button`
    background-color: ${palette.darkerWhite};
    color: ${palette.ornaments};
    font-weight: 600;
    padding: 8px 18px;
    border-radius: 5px;
    transition: .3s ease-in-out;
    cursor: pointer;
    margin-top: 10px;
    &:hover{
        color: ${palette.lighterOrnaments};
    }
`

const MyCheckBox = styled.input`
    width: 2em;
    height: 2em;
`

const UserPanel = (props) =>{
    const [edit, setEdit] = useState(false)
    const [checkBookDraft, setCheckBookDraft] = useState([])
    const [checkBook, setCheckBook] = useState([])
    const toggleEdit = () =>{
        setEdit(edit => !edit)
        if(edit){
            addBooksToDelete()
        }
    }
    const addBooksToDelete = () =>{
        const array = document.querySelectorAll('.checkFavBooks')
        array.forEach(item => {
            if(item.checked){
                setCheckBookDraft(checkBookDraft => [...checkBookDraft, item.id])
            }})
      }
      useEffect(()=>{
          if(checkBookDraft.length > 0){
            setCheckBook(checkBookDraft)
          }
      },[checkBookDraft])

      useEffect(()=>{
          if(checkBook.length > 0){
              console.log(`checkBook przekazywana do funkcji: ${checkBook}`)
            props.deleteBooks(checkBook)
            setCheckBookDraft([])
          }
      },[checkBook])

    return(
        <Container open={props.open}>
            <Menu onClick={props.toggleOpen}>
                <User className={props.iconName}></User>
            </Menu>
            {props.open && 
            <Panel>
                <div>
                <Paragraph>Lista Twoich ulubionych książek:</Paragraph>
                {edit ? <Button onClick={toggleEdit} >Usuń zaznaczone</Button> : <Button onClick={toggleEdit}>Edytuj</Button>}
                </div>
                
                <ul>{props.favoriteList.map(book => {
                   return <Item key={book.id}>
                       {edit && <MyCheckBox id={book.id} className="checkFavBooks" type='checkbox'/>}
                        <NavDetails to={`/details/${book.id}`} onClick={props.toggleOpen}>
                            <img src={book.img} alt="błąd ładowania obrazka"/>
                            <Title>{book.title}</Title>
                        </NavDetails>
                       </Item>
                })}</ul>
            </Panel>}
        </Container>
    )
}

export default UserPanel