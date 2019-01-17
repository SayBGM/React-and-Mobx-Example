import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('todo')
@observer
class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      context: '',
    }
  }
  render() {
    const { context } = this.state;
    return (
      <div className="Input">
        <form onSubmit={(e) => this.addTodo(e)}>
          <input className="Input__context" value={context} onChange={(e) => this.setState({context: e.target.value})}/>
          <button type="submit">추가</button>
        </form>
      </div>
    );
  }

  addTodo(e) {
    const { todo } = this.props;
    todo.addTodo(this.state.context);
    this.setState({context: ''})
    e.preventDefault();
  }
}
 
export default TodoInput;