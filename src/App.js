import React from 'react';
import CounterApp from './components/Counter/Counter';
import Todo from './components/Todo/Todo';
import ShortUrl from './components/ShortUrl/ShortUrl';

const App = () => {
  return (
    <div className="App">
      <CounterApp />
      <Todo />
      <ShortUrl/>
    </div>
  );
}

export default App;
