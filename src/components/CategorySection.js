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
    console.log(this.props);
    let key;
    let mass = [];
    for(key in category.present){
      mass.push(key);
    }
    return (
        <React.Fragment>
          {mass.map(function(key) {
          if(category.present[key].main){
            return(
              <CategoryList key={key} text={category.present[key].text} id={key} editTodoText={editTodoText} childIds={category.present[key].childIds} actions={actions} editIdTodo={editIdTodo} buttonEditTodo={buttonEditTodo} editTodoComponent={editTodoComponent} editTodoCategory={editTodoCategory} renderEditTodo={renderEditTodo} editTodoId={editTodoId} idCategory={idCategory} />
            )} 
          })}
        </React.Fragment>
    )
  }
}
