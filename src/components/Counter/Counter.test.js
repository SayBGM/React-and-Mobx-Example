
import React from 'react';
import CounterComponent from './Counter';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'mobx-react';
import counterStore from '../../core/counterStore';

configure({ adapter: new Adapter() });

describe('Counter 컴포넌트 테스트', () => {
  const connectApp = () => {
    const counter = new counterStore();
    return <Provider counter={counter}><CounterComponent /></Provider>
  }

  it('컴포넌트 랜더링 테스트', () => {
    const wrapper = mount(connectApp());
    expect(wrapper.length).toBe(1);
  })

  it('초기 값 확인', () => {
    const wrapper = mount(connectApp());
    expect(wrapper.find('h1.value').at(0).text()).toBe("0");
  })

  it('+ 버튼 누르면 값 상승', () => {
    const wrapper = mount(connectApp());
    wrapper.find('button.btn__plus').simulate('click');
    expect(wrapper.find('h1.value').at(0).text()).toBe("1");
  })

  it('- 버튼 누르면 값 하락', () => {
    const wrapper = mount(connectApp());
    wrapper.find('button.btn__minus').simulate('click');
    expect(wrapper.find('h1.value').at(0).text()).toBe("-1");
  })
})

