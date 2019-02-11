import { observable, action } from 'mobx';
import io from 'socket.io-client';

class Socket {
  @observable socket = null;

  @observable msgs = [];

  @observable actions = [];

  @action connect = () => {
    this.socket = io('ws://35.221.117.206:8080/');
    this.socket.on('sendMessage', (data) => {
      this.pushMsg(data);
    })
  }

  @action pushMsg = ( data ) => {
    this.msgs.push(data);
  }

  @action sendMessage = ( data ) => {
    this.socket.emit('sendMessage', data);
  }
}

export default Socket;
