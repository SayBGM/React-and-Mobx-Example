import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';

@inject(['socket'])
@observer
class TestSocket extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
    }
  }

  render() { 
    const { sendMessage } = this.props.socket;
    return (
      <div className="socket">
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={this.state.msg} onChange={e => this.setState({msg: e.target.value})}/>
          <button type="submit" onClick={() => {this.setState({msg: ''}); sendMessage(this.state.msg)}}>보내기</button>
        </form>
        <div className="socket__msgs">
          {this.renderMessage()}
        </div>
      </div>
    );
  }

  renderMessage() {
    const { msgs } = this.props.socket;
    
    return msgs.map((msg, index) => (
      <div className="socket__msgs__msg" key={index}>
        {msg}
      </div>
    ))
  }
}
 
export default TestSocket;