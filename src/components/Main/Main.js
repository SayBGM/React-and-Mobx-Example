import React from 'react';
import { Link } from 'react-router-dom';

import './Main.scss';

const Main = () => (
  <div className="Main">
    <h1>React + MobX Example</h1>
    <div className="Main__Link">
      <ui>
        <li><Link to="/shorturl">단축 URL {'('}axios 활용{')'}</Link></li>
        <li><Link to="/counter">카운트</Link></li>
        <li><Link to="/todo">To-do</Link></li>
        <li><Link to="/socket">소켓</Link></li>
      </ui>
    </div>
  </div>
)

export default Main;