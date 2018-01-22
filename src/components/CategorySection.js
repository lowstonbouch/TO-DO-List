import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CategoryList from './CategoryList'


export default class CategorySection extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }


  render() {
    const { category, actions, editTodoText, editIdTodo, buttonEditTodo, editTodoComponent, editTodoCategory, renderEditTodo, idCategory, editTodoId } = this.props;
    let key;
    let mass = [];
    for(key in category){
      mass.push(key);
    }
    return (
        <div>
          {mass.map(function(key) {
          if(category[key].main){
            return(
              <CategoryList key={key} text={category[key].text} id={key} editTodoText={editTodoText} childIds={category[key].childIds} actions={actions} editIdTodo={editIdTodo} buttonEditTodo={buttonEditTodo} editTodoComponent={editTodoComponent} editTodoCategory={editTodoCategory} renderEditTodo={renderEditTodo} editTodoId={editTodoId} idCategory={idCategory} />
            )} 
          })}
        </div>
    )
  }
}
