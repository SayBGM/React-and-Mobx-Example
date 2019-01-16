import CounterStore from './counterStore'

describe("TodoStore MobX state 테스트", () => {
  it('number를 5로 설정', () => {
    const store = new CounterStore();
    store.number = 5;
    expect(store.number).toBe(5);
  })
  it("increase 함수 테스트", () => {
    const store = new CounterStore();
    store.increase();
    expect(store.number).toBe(1);
  })
  it("decrease 함수 테스트", () => {
    const store = new CounterStore();
    store.decrease();
    expect(store.number).toBe(-1);
  })
})
