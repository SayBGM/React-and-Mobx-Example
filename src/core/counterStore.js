import { observable, action } from 'mobx';

export default class CounterStore{
  @observable number = 0;
  @observable shortUrl = '';

  @action increase = () => {
    this.number++;
  }
  @action decrease = () => {
    this.number--;
  }
}