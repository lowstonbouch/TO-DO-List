import React, { Component } from 'react'
import styled from 'styled-components'

const MainSections = styled.div `
width: 1100px;
margin: 5px auto;
border: 2px solid #00000052;
height: 4px;
border-radius: 30px;
display:flex;
`;

const Progress = styled.div`
    height: 5px;
    background: #7b7b7b82;
`;


export default class ProgressBar extends Component {
    
    render() {
    const { category, idCategory } = this.props

    if(!category.present){
      return null
    }

    let key;
    let mass = [];
    for(key in category.present){
      mass.push(key);
    }

      let widthBlock = 100 / mass.length;
      console.log(widthBlock, this.props.category.present);
      return (
        <MainSections>
          { mass.map(key => category.present[key].completed && <Progress key={key} style={{ width: `${widthBlock}%` }} />) }
        </MainSections>
      )
    }
  }