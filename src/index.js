import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';          // Provider를 불러오고
import App from './App';
import CounterStore from './core/counterStore'  // store를 불러온 뒤에

const counter = new CounterStore();             // 스토어 인스턴트를 만든다.

ReactDOM.render(
  <Provider counter={counter}>                 {/* Provider에 props로 넣어주면 끝! */}
    <App />
  </Provider>
  , document.getElementById('root'));
