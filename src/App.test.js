import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'mobx-react';
import counterStore from './core/counterStore';
import TodoStore from './core/TodoStore';
import ShortUrlStore from './core/shortUrlStore';

describe("App 컴포넌트 테스트", () => {
  const counter = new counterStore();
  const Todo = new TodoStore();
  const shortUrl = new ShortUrlStore();
  const connectApp = <Provider counter={counter} todo={Todo} shorturl={shortUrl}><App /></Provider>;
  
  it('컴포넌트 랜더링 테스트', () => {
    const div = document.createElement('div');
    ReactDOM.render(connectApp, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})