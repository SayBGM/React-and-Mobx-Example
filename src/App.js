import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CounterApp from './components/Counter/Counter';
import Todo from './components/Todo/Todo';
import ShortUrl from './components/ShortUrl/ShortUrl';
import Main from './components/Main/Main';
import { inject, observer } from 'mobx-react';

import './App.scss';
import TestSocket from './components/Socket/TestSocket';

@inject(['socket'])
@observer
class App extends React.PureComponent{
  render() {
    return (
    <div className="App">
      <>
        <Main />
        <div className="App__contents">
          <Switch>
            <Route path="/shorturl" component={ShortUrl} exact/>
            <Route path="/counter" component={CounterApp} exact/>
            <Route path="/todo" component={Todo} exact/>
            <Route path="/socket" component={TestSocket} exact/>
          </Switch>
        </div>
      </>
    </div>
    );
  }
  
  componentDidMount() {
    this.props.socket.connect();
  }
}

export default withRouter(App);
