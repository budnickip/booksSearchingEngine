import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import * as palette from '../../variables';
import { ACTIONS } from '../../App';


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
    transition: .5s;
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
    margin: 8px 0px;
    &:hover{
        color: ${palette.lighterOrnaments};
    }
`

const MyCheckBox = styled.input`
    width: 2em;
    height: 2em;
`

const FilterFavorite = styled.input`
    border: none;
    border-radius: 15px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1em;
    line-height: 25px;
    outline: none;
    padding: 4px;
    margin: 8px 0px;
    &:focus{
            -webkit-box-shadow: inset 0px 0px 3px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: inset 0px 0px 3px 0px rgba(0,0,0,0.75);
            box-shadow: inset 0px 0px 3px 0px rgba(0,0,0,0.75);
         }
`

const ButtonsBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 8px 0px;
`

const UserPanel = (props) =>{
    const [edit, setEdit] = useState(false)
    const [checkBook, setCheckBook] = useState([])
    const [draft, setDraft] = useState('')
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
                setCheckBook(checkBook => [...checkBook, item.id])
            }})
      }

      useEffect(()=>{
        if(checkBook.length>0){
            props.dispatch({type: ACTIONS.DELETE_BOOKS, bookIndexes: checkBook})
            setCheckBook([])
        }
      },[checkBook])

      const filterBooks = (e) =>{
        e.target.value ? setDraft(e.target.value) : setDraft('')
      }

    return(
        <Container open={props.open}>
            <Menu onClick={props.toggleOpen}>
                <User className={props.iconName}></User>
            </Menu>
            {props.open && 
            <Panel>
                    <Paragraph>Lista Twoich ulubionych książek:</Paragraph>
                <ButtonsBox>
                    {edit ? <Button onClick={toggleEdit} >Usuń zaznaczone</Button> : <Button onClick={toggleEdit}>Edytuj</Button>}
                    <FilterFavorite placeholder="Szukaj" onChange={filterBooks}/>
                </ButtonsBox>
                <ul>
                    {draft ?  props.favoriteList.filter(item =>{
                        return item.title.toLowerCase().includes(draft)
                    }).map(book=>{
                        return <Item key={book.id}>
                        {edit && <MyCheckBox id={book.id} className="checkFavBooks" type='checkbox'/>}
                         <NavDetails to={`/details/${book.id}`} onClick={props.toggleOpen}>
                             <img src={book.img} alt="błąd ładowania obrazka"/>
                             <Title>{book.title}</Title>
                         </NavDetails>
                        </Item>
                   }) : props.favoriteList.map(book=>{
                         return <Item key={book.id}>
                         {edit && <MyCheckBox id={book.id} className="checkFavBooks" type='checkbox'/>}
                          <NavDetails to={`/details/${book.id}`} onClick={props.toggleOpen}>
                              <img src={book.img} alt="błąd ładowania obrazka"/>
                              <Title>{book.title}</Title>
                          </NavDetails>
                         </Item>
                    })}
                </ul>
            </Panel>}
        </Container>
    )
}

export default UserPanel