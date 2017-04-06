import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/authActions'
import setAuthorizationToken from './utils/setAuthorizationToken'

import reducers from './reducers'
import routes from './routes'

const history = createHistory()
/*
如果不引入 thunk 它只有同步操作。每当 dispatch action 时，state 会被立即更新。
这时候使用异步操作会报错，如下：
Actions must be plain objects. Use custom middleware for async actions.

通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。
这时，这个 action 创建函数就成为了 thunk。

thunk 的一个优点是它的结果可以再次被 dispatch

react-router-redux:
https://github.com/reacttraining/react-router/tree/master/packages/react-router-redux
 */
const loggerMiddleware = createLogger()
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      thunkMiddleware,    // 允许我们 dispatch() 函数
      loggerMiddleware    // 一个很便捷的 middleware，用来打印 action 日志
    ),
  )
)

/*
如果 jwtToken 存在，会添加 token 到 axios 的请求头，之后设置当前用户。
 */
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

/*
React Router 是建立在 history 之上的。 简而言之，一个 history 知道如何去监听浏览器地址栏的变化，
并解析这个 URL 转化为 location 对象， 然后 router 使用它匹配到路由，最后正确地渲染对应的组件。

首先 browserHistory 其实使用的是 HTML5 的 History API，浏览器提供相应的接口来修改浏览器的历史记录；
而 hashHistory 是通过改变地址后面的 hash 来改变浏览器的历史记录；
使用 browserHistory 的时候，浏览器从 / 到 /login 是会向 server 发送 request 的。所以 server 端是要做特殊配置的。
而使用hashHistory的时候，因为 url 中 # 符号的存在，从 /#/ 到 /#/login 浏览器并不会去发送一次 request，
react-router 自己根据 url 去 render 相应的模块。

错误1：
  react-router 4.0.0 不支持以前的写法了，换成react-router-dom
    <Router history={hashHistory} routes={routes} />
  https://github.com/ReactTraining/react-router/issues/4752
  Failed prop type: The prop `history` is marked as required in `Router`, but its value is `undefined`.
  in Router
  react-router 4.0.0 将 web 和 native 分开了。
错误2：（这其实不是一个错误，因为我当时不理解 hashHistory 和 browserHistory。
  使用 hashHistory 会造成 url 后面增加/#/。
  解决方案：换成 browserRouter
错误3：
  A <Router> may have only one child element
  解决方案：加个div
 */
let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  rootElement
)

/*
Store 就是把 action和 reducer联系到一起的对象。Store 有以下职责：
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。

Store 会把两个参数传入 reducer： 当前的 state 树和 action。

<Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。
 */
