import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';          // Provider를 불러오고
import App from './App';
import CounterStore from './core/counterStore'  // store를 불러온 뒤에
import TodoStore from './core/TodoStore';
import ShortUrlStore from './core/shortUrlStore';
import SocketStore from './core/socketStore';

const counter = new CounterStore();             // 스토어 인스턴트를 만든다.
const todo = new TodoStore();
const shortUrl = new ShortUrlStore();
const socket = new SocketStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider counter={counter} todo={todo} shorturl={shortUrl} socket={socket}>{/* Provider에 props로 넣어주면 끝! */}
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'));
