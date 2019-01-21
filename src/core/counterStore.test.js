import CounterStore from './counterStore'

describe("TodoStore MobX state 테스트", () => {
  let store;
  beforeEach(() => {
    store = new CounterStore();
  });

  it('초기값 체크', () => {
    expect(store.number).toBe(0);
  })
  it("increase 함수 테스트", () => {
    store.increase();
    expect(store.number).toBe(1);
  })
  it("decrease 함수 테스트", () => {
    store.decrease();
    expect(store.number).toBe(-1);
  })
})
