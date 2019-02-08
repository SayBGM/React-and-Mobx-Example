import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CounterApp from './components/Counter/Counter';
import Todo from './components/Todo/Todo';
import ShortUrl from './components/ShortUrl/ShortUrl';
import Main from './components/Main/Main';

import './App.scss';


const App = () => {
  return (
    <div className="App">
      <>
        <Main />
        <div className="App__contents">
          <Switch>
            <Route path="/shorturl" component={ShortUrl} exact/>
            <Route path="/counter" component={CounterApp} exact/>
            <Route path="/todo" component={Todo} exact/>
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(App);
