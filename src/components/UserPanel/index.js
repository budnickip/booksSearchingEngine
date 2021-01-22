import { useEffect, useState, useRef } from 'react';
import {Link, useRouteMatch} from "react-router-dom";
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

const UserPanel = (props) =>{

    return(
        <Container open={props.open}>
            <Menu onClick={props.toggleOpen}>
                <User className={props.iconName}></User>
            </Menu>
            {props.open ? 
            <Panel>
                <Paragraph>Lista Twoich ulubionych książek:</Paragraph>
                <ul>{props.favoriteList.map(book => {
                   return <li key={book.id}><img src={book.img} alt="błąd ładowania obrazka"/>{book.title}</li>
                })}</ul>
            </Panel> : ''}
        </Container>
    )
}

export default UserPanel