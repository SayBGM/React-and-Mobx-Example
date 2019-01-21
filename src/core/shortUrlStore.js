import { observable, action } from 'mobx';
import axios from 'axios';

export default class ShortUrlStore{
  @observable shortUrl = '값을 입력하고 변환 버튼을 눌러주세요';
  @observable status = false;

  @action makeShortUrl = (url) => {
    axios.get(`http://34.85.56.122:3000/url?url=${url}`).then((res) => {
      if (res.data.code === "200") {
        this.shortUrl = res.data.result.url;
        this.status = true;
      }
    }).catch((err) => {
      this.shortUrl = 'URL을 확인 후 다시 입력해주세요.'
      this.status = true;
    })
  }
}