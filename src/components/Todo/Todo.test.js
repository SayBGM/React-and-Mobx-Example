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

  // it('Todo 추가', () => {
  //   const wrapper = mount(connectApp());
  //   wrapper.instance().setState({ context: 'Test context' }, () => {
  //     wrapper.find('form').simulate('submit');
  //     expect(wrapper.find('div.Todo__List--0__context').at(0).text()).toBe('Test context');
  //   });
  // })

  // it('Todo 제거', () => {
  //   const wrapper = mount(connectApp());
  //   wrapper.instance().setState({ context: 'Test context' }, () => {
  //     wrapper.find('form').simulate('submit');
  //     expect(wrapper.find('div.Todo__List--0__context').at(0).text()).toBe('Test context');
  //     wrapper.find('span.Todo__List--0__delete').simulate('click');
  //     expect(wrapper.props().todo.Todo.length).toBe(0);
  //   });
  // });

  // it('Todo 상태변환', () => {
  //   const wrapper = mount(connectApp());
  //   wrapper.instance().setState({ context: 'Test context' }, () => {
  //     wrapper.find('form').simulate('submit');
  //     expect(wrapper.find('div.Todo__List--0__context').at(0).text()).toBe('Test context');
  //     wrapper.find('div.Todo__List--0__context').simulate('click');
  //     expect(wrapper.find('div.Todo__List--0__context--finish').at(0).text()).toBe('Test context');
  //   });
  // })
})