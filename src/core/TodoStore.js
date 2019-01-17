import { observable, action } from 'mobx';

export default class TodoStore {
  @observable
  Todo = [];

  @action addTodo = (context) => {
    this.Todo.push({context, finish: false});
  }
  @action removeTodo = (index) => {
    if(this.Todo[index] === undefined) {
      return;
    }
    this.Todo.splice(index, 1);
  }

  @action changeFinish = (index) => {
    if(this.Todo[index] === undefined) {
      return;
    }
    const tempFinish = !this.Todo[index].finish;
    this.Todo[index].finish = tempFinish;
  }
}