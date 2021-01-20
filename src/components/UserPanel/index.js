import { useEffect, useState } from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import styled from 'styled-components';
import * as palette from '../../variables'


const UserPanel = (props) =>{
    const [open, setOpen] = useState(false)
    const [iconName, setIconName] = useState(open ? 'fas fa-times' : 'fas fa-user')
    // konsola rzuca błędem
    const Container = styled.div`
        position: fixed;
        top: ${open ? '0px' : '30px'};
        right: ${open ? '0px' : '30px'};
        background-color: ${palette.ornaments};
        color: white;
        z-index: 2;
        width: ${open ? '30%' : '60px'};
        height: ${open ? '100%': '60px'};
        border-radius: ${open ? '0' : '50%'};
        display: flex;
        flex-wrap: wrap;
        justify-content: ${open ? 'unset' : 'center'};
        align-items: ${open ? 'unset' : 'center'};
        cursor: ${open ? 'default' : 'pointer'};
    `

    const User = styled.span`
        font-size: 2em;
    `

    const Panel = styled.div`
        height: 100%;
        width: 30%;
        background-color: ${palette.ornaments};
        margin-top: 2em;
        margin-left: 1em;
        width: 100%;
    `

    const Menu = styled.div`
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `
    const Paragraph = styled.p`
        font-weight: 600;
        font-size: 1.2em;
    `

    const toggleOpen = () =>{
        setOpen(!open)
        setIconName(open ? 'fas fa-user' : 'fas fa-times')
    }
    return(
        <Container>
            <Menu onClick={toggleOpen}>
                <User className={iconName}></User>
            </Menu>
            {open ? 
            <Panel>
                <Paragraph>Lista Twoich ulubionych książek:</Paragraph>
            </Panel> : ''}
        </Container>
    )
}

export default UserPanel