import React from 'react';
import CounterApp from './components/Counter/Counter';
import Todo from './components/Todo/Todo';

const App = () => {
  return (
    <div className="App">
      <CounterApp />
      <Todo />
    </div>
  );
}

export default App;
