import React from 'react';
import TodoComponent from './Todo';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'mobx-react';
import TodoStore from '../../core/TodoStore';

configure({ adapter: new Adapter() });

describe('Todo 컴포넌트 테스트', () => {
  const connectApp = () => {
    const Todo = new TodoStore();
    return <Provider todo={Todo}><TodoComponent /></Provider>
  }

  it('컴포넌트 랜더링 테스트', () => {
    const wrapper = mount(connectApp());
    expect(wrapper.length).toBe(1);
  })

  it('초기 값 확인', () => {
    const wrapper = mount(connectApp());
    expect(wrapper.props().todo.Todo.length).toBe(0);
  }) 

  it('Todo 추가', () => {
    const wrapper = mount(connectApp());
    wrapper.props().todo.addTodo('Test context');
    expect(wrapper.props().todo.Todo[0].context).toBe('Test context');
  })

  it('Todo 제거', () => {
    const wrapper = mount(connectApp());
    wrapper.props().todo.addTodo('Test context');
    expect(wrapper.props().todo.Todo[0].context).toBe('Test context');
    expect(wrapper.props().todo.Todo.length).toBe(1);
    wrapper.props().todo.removeTodo(0);
    expect(wrapper.props().todo.Todo.length).toBe(0);
  });

  it('Todo 상태변환', () => {
    const wrapper = mount(connectApp());
    wrapper.props().todo.addTodo('Test context');
    expect(wrapper.props().todo.Todo[0].context).toBe('Test context');
    expect(wrapper.props().todo.Todo.length).toBe(1);
    wrapper.props().todo.changeFinish(0);
    expect(wrapper.props().todo.Todo[0].finish).toBeTruthy();
  })
})
