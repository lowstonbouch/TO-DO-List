import React, { Component } from 'react'
import styled from 'styled-components'

const MainSections = styled.div `
width: 1100px;
margin: 5px auto;
border: 2px solid #00000052;
height: 3px;
border-radius: 30px;
display:flex;
`;

const Progress = styled.div`
    height: 4px;
    background: #0000ff82;
`;


export default class ProgressBar extends Component {

    renderProgress(completedCount) {
        const { category, idCategory } = this.props
        const activeCount = category.present[idCategory].todos.length - completedCount
      }
    
    render() {
    const { category, idCategory } = this.props
    console.log(this.props);

    if(!category.present[idCategory]){
      return 0
    }

    let key;
    let mass = [];
    for(key in category.present){
      mass.push(key);
    }

    const completedCount = category.present[idCategory].todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    

    let widthBlock = 100/mass.length;
      return (
        <MainSections>
           {mass.map(function(key) {
        if(category.present[key].completed){
          return(
            <Progress  style={ { width: `${widthBlock}%`} } />)} 
        })}
       </MainSections>    
      )
    }
  }