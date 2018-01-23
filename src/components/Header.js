import React, { Component } from 'react'
import styled from 'styled-components'

const MainSections = styled.div `
  width: 100%;
  background: #d8d6d6;
  height: 70px;
`;

const Header = styled.div `
    width: 1100px;
    height: 70px;
    display flex;
    align-items: center;
    justify-content: space-between;
    margin 0 auto;
`;

const Logo = styled.p`
  font-size: 35px;
  margin: 0;
`;

const Search = styled.input`
border: none;
font-size: 20px;
height: 35px;
background: rgba(255, 255, 255, 0.95);
box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.36);
`;


export default class Haeder extends Component {
    
    render() {
      return (
        <MainSections>
            <Header>
                <Logo> To-DO List </Logo>  
                <div>
                  <Search type="text" placeholder="Search" />
                </div>  
            </Header>
       </MainSections>    
      )
    }
  }