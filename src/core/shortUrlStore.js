import { observable, action } from 'mobx';
import axios from 'axios';

export default class ShortUrlStore{
  @observable shortUrl = '값을 입력하고 변환 버튼을 눌러주세요';
  @observable status = false;

  @action makeShortUrl = (url) => {
    axios.get(`http://34.85.56.122:3000/url?url=${url}`).then((res) => {
      if (res.status === 200) {
        this.shortUrl = res.data.result.url;
        this.status = true;
      } else {
        this.shortUrl = ''
        this.status = false;
      }
    }).catch((err) => {
      this.shortUrl = ''
      this.status = false;
    })
  }
}