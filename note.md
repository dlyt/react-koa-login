关于一些 redux 的基础知识，可以看 [Redux 中文文档](http://cn.redux.js.org/docs/introduction/Motivation.html)

首先，我想向大家介绍这俩个中间件 redux-thunk 和 redux-logger。
下面是登录的action `/src/client/actions/authActions.js`
```js
export function login(user) {
  return dispatch => {
    return axios.post('/api/auth', user).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwtDecode(token)))
    })
  }
}
```
如果不添加 redux-thunk 这个中间件这段代码是会保错的，提示如下：
```js
Actions must be plain objects. Use custom middleware for async actions.
```
这里，要先知道：

通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。

下面的代码更容易我们理解（https://medium.com/@WendellLiu/%E9%80%81%E8%AE%93%E4%BD%A0%E7%9A%84action%E8%83%BD%E4%BD%9C%E6%9B%B4%E5%A4%9A-redux-thunk-c07bc5488e48）
```js
const foo = () => {
	let bar = 'before'
	setTimeout(() => {
    bar = 'after'
  }, 3000)
  return {
  	bar
  }
}

document.getElementById('demo').innerHTML = foo().bar
```
由于 foo 中回传的 bar 在 return 之时是为 'before' ,并不会等到 setTimeout 结束后在被 assign 的 'after'。

再来理解一下这句话：

如果不引入 thunk 它只有同步操作。每当 dispatch action 时，state 会被立即更新。这时候使用异步操作就会报错。

我们解决这个问题就可以使用 redux-thunk ，它是通过中间件（middleware）的形式被引用。

这句话有助于你理解 middleware： 它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点。

middleware 改造了你的 dispatch ，让它有能力判断送进去的东西是一个 pure object 还是 function 。

我们先看一下 redux-thunk 是如何使用的。
```js
import thunkMiddleware from 'redux-thunk'
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,    // 允许我们 dispatch() 函数
      loggerMiddleware    // 一个很便捷的 middleware，用来打印 action 日志
    ),
  )
)
```

redux-thunk 的源码中，首先判断是否是 function :
```js
if (typeof action === 'function'){}
```
如果不是 function ，那自然就是一个 pure object ,利用 next 送出，什么也不需要做；若是 function ,则把这个 thunk 需要的 dispatch , getState 和其他 arguement 传给 thunk ,让它做你所指定它做的事情。

redux-logger 这个中间件会在控制台打印出 action 如图，有助于开发。
![](http://cdn.tycocn.com/react-login.png)


以上内容很多都是摘抄的，我根据在项目中遇到的问题，整理总结。


##### 该文件记录在项目中遇到的一些知识的记录
###### ...运算符
它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

该运算符主要用于函数调用。

该运算符将一个数组，变为参数序列。

替代数组的 apply 方法
```js
// ES5 的写法  
function f(x, y, z) {  
// ...  
}  
var args = [0, 1, 2];  
f.apply(null, args);  
// ES6 的写法  
function f(x, y, z) {  
// ...  
}  
var args = [0, 1, 2];  
f(...args);
```
