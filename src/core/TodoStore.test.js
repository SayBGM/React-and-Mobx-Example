import TodoStore from './TodoStore';

describe("TodoStore 체크", () => {
  it("스토어 생성 확인", () => {
    const Store = new TodoStore();
    expect(Store.Todo.length).toBe(0);
  })

  it('addTodo 함수 체크', () => {
    const Store = new TodoStore();
    Store.addTodo('Testing');
    expect(Store.Todo[0].context).toBe('Testing');
    expect(Store.Todo[0].finish).toBe(false);
    expect(Store.Todo.length).toBe(1);
  })

  it('removeTodo 함수 체크', () => {
    const Store = new TodoStore();
    Store.addTodo('Testing1');
    Store.addTodo('Testing2');
    expect(Store.Todo[1].context).toBe('Testing2');
    Store.removeTodo(1);
    expect(Store.Todo[0].context).toBe('Testing1');
    expect(Store.Todo.length).toBe(1);
    Store.removeTodo(0);
    expect(Store.Todo.length).toBe(0);
  })

  it('changeFinish 함수 체크', () => {
    const Store = new TodoStore();
    Store.addTodo('Testing1');
    Store.changeFinish(0);
    expect(Store.Todo[0].finish).toBe(true);
    Store.changeFinish(0);
    expect(Store.Todo[0].finish).toBe(false);
  })
})