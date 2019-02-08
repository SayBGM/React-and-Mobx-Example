import React, { Component } from 'react';
import { observer , inject} from 'mobx-react';
import TodoInput from './TodoInput';

@inject('todo')
@observer
class Todo extends Component {
  render() {
    return (
      <div className="Todo">
        <TodoInput />
        <ul>
          <TodoList />
        </ul>
      </div>
    );
  }
}
 
export default Todo;

@inject('todo')
@observer
class TodoList extends Component{
  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
  renderList() {
    const { todo } = this.props;
    return todo.Todo.map((item, index) => {
      return (
      <li className={`Todo__List__context${item.finish ? '--finish' : ''}`} key={index} onClick={() => todo.changeFinish(index)}>
        {item.context} <span className={`Todo__List__context__delete`} onClick={() => todo.removeTodo(index)}>X</span>
      </li>)
    })
  }
}