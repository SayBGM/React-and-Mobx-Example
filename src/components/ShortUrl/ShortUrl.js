import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('shorturl')
@observer
class ShortUrl extends Component {
  state = {
    url: ''
  }
  render() { 
    const { shorturl } = this.props;
    return (
      <div className="shorturl">
        <div>
          <input type="text" value ={this.state.url} onChange={(e) => this.setState({url: e.target.value})}/>
          <button onClick={() => {shorturl.makeShortUrl(this.state.url); this.setState({url: ''})}}>단축 URL 변환</button>
        </div>
        <div>
          {shorturl.status ? <>Result : <a href={shorturl.shortUrl}>{ shorturl.shortUrl }</a></> : null}
        </div>
      </div>
    );
  }
}
 
export default ShortUrl;