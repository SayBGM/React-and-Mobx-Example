
import React from 'react';
import ReactDOM from 'react-dom';
import CounterComponent from './Counter';

import { Provider } from 'mobx-react';
import counterStore from '../core/counterStore';

describe('Counter 컴포넌트 테스트', () => {
  const counter = new counterStore();
  const connectApp = <Provider counter={counter}><CounterComponent /></Provider>;
  
  it('컴포넌트 랜더링 테스트', () => {
    const div = document.createElement('div');
    ReactDOM.render(connectApp , div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('초기 값 확인', () => {
    const { counter } = connectApp.props;
    expect(counter.number).toBe(0);
  })

})