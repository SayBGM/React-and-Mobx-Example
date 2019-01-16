import React, { Component } from 'react';
import { observer , inject} from 'mobx-react';

@inject('counter')
@observer
class CounterApp extends Component {
  render() { 
    const { counter } = this.props;
    return (
      <div>
        <h1 className='value'>{counter.number}</h1>
        <button className='btn__plus' onClick={counter.increase}>+</button>
        <button className='btn__minus' onClick={counter.decrease}>-</button>
      </div>
    );
  }
}
 
export default CounterApp;
