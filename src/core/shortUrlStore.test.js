import shortUrlStore from './shortUrlStore';

let shortUrl;
describe('shortUrlStore 테스트', () => {
  beforeEach(() => {
    shortUrl = new shortUrlStore();
  });

  it('shartUrl 초기 상태 체크', () => {
    expect(shortUrl.shortUrl).toBe('값을 입력하고 변환 버튼을 눌러주세요');
    expect(shortUrl.status).toBeFalsy();
  })

  it('단축 URL 테스트', () => {
    shortUrl.makeShortUrl('www.naver.com');
    setTimeout(() => {
      expect(shortUrl.shortUrl).toBe('http://me2.do/GsSf4sYL');
    }, 0);
  })
})