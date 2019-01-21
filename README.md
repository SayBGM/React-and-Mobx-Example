# 크리니티 MobX 스터디 [![Build Status](https://travis-ci.com/SayBGM/React-and-Mobx-Example.svg?branch=master)](https://travis-ci.com/SayBGM/React-and-Mobx-Example)
크리니티 플랫폼개발팀 - 인턴 백광민

## MobX란?
[Github](https://github.com/mobxjs/mobx)<br/>
```Simple, scalable state management``` 간단하고 확장 가능한 상태관리 라이브러리라고 함. 기본적으로 **객체지향 느낌**이 강하며 Component와 State를 연결하는 번잡한 보일러플레이트 코드를 **Decorator**를 사용하여 깔끔하게 해결함.

## Decorator란?
[자세한 설명 - ZOYI 우아한 설계의 첫걸음, ES7의 decorator](https://blog-kr.zoyi.co/channel-frontend-decorator/)

선언된 클래스와 그 프로퍼티들을 디자인 시간에 변경할 수 있는 편리한 문법이라 칭함.

![Stage 2에 있는 Decorator](https://user-images.githubusercontent.com/28648915/51454706-68f32100-1d89-11e9-93fe-788edf7e9008.png)
ES7에 새로 제안된 문법으로 현재 stage 2, 초고 단계에 있다. (TypeScript에서는 기본으로 제공하는 문법이다.)


Decorator는 Java의 Annotation과 문법이 유사하여 Java Spring Framework를 주로 하던 사람이더라도 쉽게 배울 수 있어 러닝커브를 줄일 수 있는 효과를 가진다. 아래 코드를 보면 무슨 말을 하는지 쉽게 이해할 수 있다.

***

### JavaScript Decorator
```javascript
@withSuperEngine
class Car {  
  ...
  @readOnly
  manufacturer = 'Crinity'
  ...
}
```
### Java Annotation
```java
@Transactional
@Service
public class RiderServiceeImpl implements RiderService {
    @Override
    public List<RiderDto> findAll(RiderSearchRequest request) {
      ...
    }
}
```

하지만 현재 공식적인 문법이 아니기 때문에 babel설정을 해주어야한다.


### CRA를 통해 만든 앱일 경우
#### 터미널
```
npm eject
npm install @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

yarn eject
yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```
#### package.json
```json
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  },
```

### .babelrc로 설정을 할 경우

#### 터미널
```
npm install @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

#### .babelrc (babel설정을 통해 만든 앱일 경우)
```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators"
  ]
}
```


vscode에서는 Decorator 문법을 오류라고 나올 경우가 있다. 그럴 때에는 프로젝트의 최상위 디렉토리에 ```jsconfig.json```이라는 파일을 만들고 아래와 같이 작성해주자.
```json
{
  "compilerOptions": {
      "experimentalDecorators": true,
  }
}
```

***

## 왜 MobX인가?
기존 Redux의 경우에는 보일러플레이트 코드가 굉장히 많았으며 Redux action을 위함 ```mapDispatchToProps```와 state를 연결하기 위한 ```mapStateToProps```, ```bindActionCrators```등 다양한 코드를 짜야했지만 MobX에서는 Decorator가 이를 처리한다.

**객체지향적**이며 (Class를 이용하여 객체지향적으로 사용하는 것을 권장) **캡슐화하기 용이**하며 Redux처럼 ImmutableJs를 사용하여 **불변성 유지를 위한 노력이 불필요**하다. 또한 redux-saga, redux-thunk처럼 **비동기 처리를 위한 라이브러리가 필요하지 않다**는 점이 MobX를 사용하는 이유가 될 듯하다.

## MobX Data Flow
![MobX Data Flow](https://user-images.githubusercontent.com/28648915/51456047-8f1bbf80-1d8f-11e9-9a07-f0d3c96aee69.png)
출처 - [우아한형제들 기술블로그 | React에서 Mobx 경험기 (Redux와 비교기)](http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html)

MobX의 데이터 흐름은 위 사진과 같다.

props로 받은 함수를 실행하게 되면 ajax를 통하여 값을 받아오거나 값을 변화시킨 후 컴포넌트를 랜더링시킨다.

***

## MobX의 주요 개념
### 1.	Observable State (관찰 받고 있는 상태)
MobX를 사용하는 앱의 상태는 Observable하다. 즉 관찰 받고 있는 상태인데 앱에서 사용하고 있는 상태는 변할 수 있으며, 만약 특정 부분이 변한다면, MobX는 정확히 어디서 어떤 부분이 바뀌었는지 알 수 있다.
참고로Observable은 Reactivex(Rxjs, RxJava, etc…)에서 중요한 개념이다.


### 2.	Computed Value (연산된 값)
연산된 값은, 기존 상태 값과 다른 연산된 값에 기반하여 만들어 질 수 있는 값이다. 주로 성능 최적화를 위하여 많이 사용되는데 어떤 값을 연산해야 할 때, 연산에 기반되는 값이 바뀔때만 새로 연산하게 하고 바뀌지 않았다면 기존의 값을 사용할 수 있게 한다. 
Vue.js에서도 MobX와 비슷한 개념인 Computed 속성을 지니고 있다.

### 3.	Reactions (반응)
Reactions는 Computed Value와 비슷하다.  Computed Value는 특정 값을 연산해야 할 때에만 처리되는 반면 Reactions는 값이 바뀌면 실행한다. Observable State의 내부의 값이 바뀔 때 필요한 함수나 명령을 실행 할 수 있다.

### 4.	Actions (액션, 행동)
액션은 상태에 변화를 일으키는 것을 말한다. Observable State에 변화를 일으키는 코드를 호출한다고 하면 그것은 하나의 액션이다.
하지만 Redux의 액션처럼 객체형태의 액션은 아니다. 

***

### Observable
Observable 함수는 observable state를 만들어준다.
```javascript
import { observable } from 'mobx';

const calculator = observable({
  a: 1,
  b: 2
});
```
이런 식으로 Observable State를 만들고 나면 MobX가 이 객체를 “관찰할 수”있어서 변화가 일어나면 바로 탐지해 낼 수 있다.

***

#### Reaction
Reaction은 앞에서 말했듯 특정 값이 바뀔 때 어떤 작업을 하고 싶다면 Reaction 함수를 사용한다.
아래 코드를 보자.
```javascript
// 특정 값이 바뀔 때 특정 작업을 한다.
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀜`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀜`);
  }
);

calculator.a = 10;
calculator.b = 20;
```
calculator 안에 있는 a와 b라는 변수를 바꾸었을 때 console를 보면
```
a 값이 10로 바뀜
b 값이 20로 바뀜
```
이런 식으로 console이 찍히는 것을 볼 수 있다.

***

### computed
computed 함수는 연산된 값을 사용해야 할 때 사용된다. Vue.js를 한 개발자에게는 조금 익숙한 함수일 것이다.
특징으로는 이 값을 조회할 때 마다 특정 작업을 처리하는것이 아니라, 이 값에서 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회 할 때는 캐싱된 데이터를 사용한다는 점 입니다.

```javascript
import { observable, computed } from 'mobx';

const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const passwordReg = /^[A-Za-z0-9]{6,12}$/;

const Register = observable({
  email: '',
  password: '',
});

const emailRegResult = computed(() => {
  console.log('이메일 검증중 입니다.');
  return emailReg.test(email);
});

const passwordRegResult = computed(() => {
  console.log('비밀번호 검증중 입니다.');
  return passwordReg.test(password);
});
```

***

### autorun
autorun은 reaction이나 computed의 observe 대신에 사용할 수 있는데, autorun으로 전달해주는 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시하여 그 값이 바뀔 때 마다 함수가 실행되도록 한다. 

만약 computed로 만든 값의 .get() 함수를 호출해 주면, 하나하나 observe 해주지 않아도 되어 편리하게 코드를 작성할 수 있다.
```javascript
import { decorate, observable , computed, autorun } from 'mobx';

// Observable State 만들기
const calculator = observable({
  a: 1,
  b: 2
});

// computed 로 특정 값 캐싱
const sum = computed(() => {
  console.log('계산중이예요!');
  return calculator.a + calculator.b;
});

// **** autorun 은 함수 내에서 조회하는 값을 자동으로 주시함
autorun(() => console.log(`a 값이 ${calculator.a} 로 바뀌었네요!`));
autorun(() => console.log(`b 값이 ${calculator.b} 로 바뀌었네요!`));
autorun(() => sum.get()); // su

calculator.a = 10;
calculator.b = 20;

// 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);

calculator.a = 20;

// 내부의 값이 바뀌면 다시 호출 함
console.log(sum.value);
```

***

### Class 문법을 사용한 MobX

ES6의 class 문법을 사용하게 되면 조금 더 깔끔하게 코드 작성이 가능하다.

Class를 사용하여 작성할 시에는 decorate이용하여 MobX를 적용해야된다.

```javascript
import { decorate, observable , computed, autorun } from 'mobx';

class calculator {
  a = 1;
  b = 2;

  get sum() {
    console.log('계산중이예요!');
    return this.a + this.b;
  }

  setA(newA) {
    this.a = newA;
  }

  setB(newB) {
    this.b = newB;
  }
}

decorate(calculator, {
  a: observable,
  b: observable,
  sum: computed,
});

const calc = new calculator();
autorun(() => calc.sum);
calc.setA(10);
calc.setB(20);

console.log(calc.sum.value);
console.log(calc.sum.value);

calc.setA(20);
console.log(calc.sum.value);

```

***

### action
상태변화를 일으키는 것을 action이라 부른다. 그럼 앞서 본 코드에서 action은 무엇일까? 바로 setA와 setB 함수이다.

이 두 함수에 MobX의 action을 적용하게 되면 추후 **개발자도구에서 변화의 세부 정보를 볼 수 있고**, **변화를 한꺼번에 일으켜서** 변화가 일어날 때 마다 reaction들이 나타나는 것이 아닌 **모든 액션이 끝나고 난 다음에서야 reaction이 나타나게끔 할 수 있다.**

```javascript
import { decorate, observable, action, computed, autorun } from 'mobx';

class calculator {
  a = 1;
  b = 2;

  get sum() {
    console.log('계산중이예요!');
    return this.a + this.b;
  }

  setA(newA) {
    this.a = newA;
  }

  setB(newB) {
    this.b = newB;
  }
}

decorate(calculator, {
  a: observable,
  b: observable,
sum: computed
setA: action,
setB: action,
});

const calc = new calculator();
autorun(() => calc.sum);
calc.setA(10);
calc.setB(20);

console.log(calc.sum.value);
console.log(calc.sum.value);

calc.setA(20);
console.log(calc.sum.value);
```

***

### transaction
앞에서 action을 사용하게 되면 변화의 세부정보를 보는 것 말고도 모든 액션이 끝나고 난 다음에 reaction이 나타나게끔 할 수 있다고 하였다.

모든 액션이 끝나고 reaction이 나타나게 하기 위해서는 transaction이라는 함수를 통해 할 수 있다.
```javascript
import { decorate, observable , action, computed, autorun, transaction } from 'mobx';

class calculator {
  a = 1;
  b = 2;

  get sum() {
    console.log('계산중이예요!');
    return this.a + this.b;
  }

  setA(newA) {
    this.a = newA;
  }

  setB(newB) {
    this.b = newB;
  }
}

decorate(calculator, {
  a: observable,
  b: observable,
sum: computed
setA: action,
setB: action,
});

const calc = new calculator();
autorun(() => calc.sum);
transaction(() => {
  calc.setA(10);
  calc.setB(20);
})
```
기존 setA 혹은 setB를 할 때 마다 나오던 ‘계산중이에요’ 라는 로그가 맨 처음에 한번 transaction을 수행할 때 한번, 총 2번만 나오게 된다.

액션을 사용하게 되면 이런 식으로 성능개선도 이루어 낼 수 있고 추후 MobX 개발자 도구를 사용할 때 변화에 대한 자세한 정보를 얻을 수 있게 한다.

***

### Decorator
class 방식에서 observable, computed, action을 지정하기 위해서는 decorate함수와 Decorator(ES2016)를 사용하는 방식이 있다

```javascript
import { decorate, observable , action, computed, autorun, transaction } from 'mobx';

class calculator {
  @observable a = 1;
  @observable b = 2;

  @computed get sum() {
    console.log('계산중이예요!');
    return this.a + this.b;
  }


  @action setA(newA) {
    this.a = newA;
  }

  @action setB(newB) {
    this.b = newB;
  }
}

const calc = new calculator();
autorun(() => calc.sum);
transaction(() => {
  calc.setA(10);
  calc.setB(20);
})
```

***

### React와의 결합
간단한 Counter 앱을 React + MobX를 이용하여 만들어 보았다.

Decoreator를 쓰지 않고 MobX에서 제공하는 decorate 함수를 이용하면 아래와 같은 코드가 나온다.

Redux에서 mapStateToProps, mapDispatchToProps처럼 decorate로 만든 뒤 HOC를 이용하여 값을 전달한다.

```jsx
import React, { Component } from 'react';
import { decorate, observable, action } from 'mobx';
import { observer } from 'mobx-react';

class Counter extends Component {
  number = 0;

  increase = () => {
    this.number++;
  }

  decrease = () => {
    this.number--;
  }

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    );
  }
}

decorate(Counter, {
  number: observable,
  increase: action,
  decrease: action
})

export default observer(Counter);
```

***

### 그럼 Decorator를 사용한 React Counter 앱의 코드를 보자.
```jsx
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Counter extends Component {
  @observable number = 0;

  @action
  increase = () => {
    this.number++;
  }

  @action
  decrease = () => {
    this.number --;
  }

  render() { 
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    );
  }
}
 
export default Counter;
```

조금 더 보기 편해진 것을 볼 수 있다.

Decorator를 이용하여 HOC를 이용한 것을 한눈에 볼 수 있고 observable state인지 action function인지 알 수 있어 기존 코드에 비해 읽기 편해진다.

하지만 functional component는 반드시 HOC형식으로 적용해야된다.

***

### Store 두고 관리하기

Redux에서는 store라는 개념이 있듯이 MobX에도 store가 있다. 

이 두 라이브러리의 차이점은 Redux에서는 한 애플리케이션에 하나의 store가 들어있었다면 MobX는 여러 개의 store를 작성하여도 된다는 것이다.


#### *stores/counter.js*
```javascript
import { observable, action } from 'mobx';

export default class CounterStore{
  @observable number = 0;

  @action increase = () => {
    this.number++;
  }
  @action decrease = () => {
    this.number--;
  }
}
```
Store를 만들었다면 react에 적용을 해야된다.

이 때 Redux에서 자주 볼 수 있는 Provider라는 컴포넌트를 사용한다.

#### *index.js*
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';          // Provider를 불러오고
import App from './App';
import CounterStore from './core/counterStore'  // store를 불러온 뒤에

const counter = new CounterStore();             // 스토어 인스턴트를 만든다.
                                                // Provider에 props로 넣어주면 끝!
ReactDOM.render(
  <Provider counter={counter}> 
    <App />
  </Provider>
, document.getElementById('root')
);
```

#### *Components/Counter.js*
```jsx
import React, { Component } from 'react';
import { observer , inject} from 'mobx-react';

@inject('counter')
@observer
class CounterApp extends Component {
  render() { 
    const { counter } = this.props;
    return (
      <div>
        <h1>{counter.number}</h1>
        <button onClick={counter.increase}>+</button>
        <button onClick={counter.decrease}>-</button>
      </div>
    );
  }
}
 
export default CounterApp;
```
inject를 사용하여 counter store를 props로 전달받아 사용할 수 있다.

만약 Redux의 mapStateToProps처럼 하고 싶다면 아래와 같이 하면 된다.

#### *Components/Counter.js* (특정 값만 받아올 때)

```jsx
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// **** 함수형태로 파라미터를 전달해주면 특정 값만 받아올 수 있음.
@inject(stores => ({
  number: stores.counter.number,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))
@observer
class Counter extends Component {
  render() {
    const { number, increase, decrease } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

***
### Jest로 테스트 하기
![Jest Test 코드와 store코드 비교](https://user-images.githubusercontent.com/28648915/51457141-9644cc80-1d93-11e9-8847-0db64f6153b4.png)

CRA로 만든 react앱에는 jest가 미리 설치 되어 있다. 그렇기 때문에 store파일을 테스트 하기 위해서는 (스토어 파일 이름).test.js 파일을 만들면 된다.

Test Code를 보자. CounterStore를 import한 뒤 describe를 통해서 테스트의 제목을 짓는다.

beforeEach를 통해 각 테스트 전에 설정 해야할 것들을 넣어둔다. Store의 값을 매번 초기 값으로 해야되기 때문에 ```store = new CounterStore();```로 설정한다.

각 시나리오 별 테스트는 it 함수를 통하여 할 수 있다.
Expect의 인자로 store.number를 넣고 toBe, 즉 이 인자는 어떠한 값이 되어야 하는지 적으면 된다.

***

### MobX에서 비동기 호출
MobX에서 비동기 호출은 Redux처럼 외부 라이브러리(redux-thunk or redux-saga)를 사용하거나 action전 비동기 호출을 부르는 방식을 채택하지 않는다.

아래 단축 URL을 만드는 코드를 보자
```javascript
import { observable, action } from 'mobx';
import axios from 'axios';

export default class ShortUrlStore{
  @observable shortUrl = '값을 입력하고 변환 버튼을 눌러주세요';
  @observable status = false;

  @action makeShortUrl = (url) => {
    axios.get(`http://LetsMakeshort.url/?url=${url}`).then((res) => {
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
```
길이를 줄이고 싶은 URL을 인자로 받는 makeShortUrl이라는 함수을 실행하게 되면 axios를 통해 URL이 단축된다. 서버에서 값을 받아 그대로 넣으면 되기 때문에 redux-thunk나 redux-saga등을 쓰지 않아도 뙬 뿐만 아니라 Immutable.js로 불변성을 지키기 위한 고생을 하지 않아도 된다.