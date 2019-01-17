import React, { Component } from 'react';
import { observer , inject} from 'mobx-react';
import TodoInput from './TodoInput';

@inject('todo')
@observer
class Todo extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div className="Todo">
        <TodoInput />
        <TodoList />
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
      <div className={`Todo__List--${index}__context${item.finish ? '--finish' : ''}`} key={index} onClick={() => todo.changeFinish(index)}>
        {item.context} <span className={`Todo__List--${index}__context__delete`} onClick={() => todo.removeTodo(index)}>X</span>
      </div>)
    })
  }
}