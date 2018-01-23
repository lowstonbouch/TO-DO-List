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

    if(!category.present[idCategory]){
      return 0
    }

    const completedCount = category.present[idCategory].todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    let widthBlock = 100/category.present[idCategory].todos.length;
      return (
        <MainSections>
            {category.present[idCategory].todos.map(todo =>
            <React.Fragment key ={todo.id}>
                {todo.completed &&
                <Progress  style={ { width: `${widthBlock}%`} } />
                }
            </React.Fragment>            
          )}
            {/* {this.renderProgress(completedCount)}  */}
       </MainSections>    
      )
    }
  }