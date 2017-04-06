/*
reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
注意:
不要修改 state。 使用 Object.assign() 新建了一个副本。
不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。
你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。
在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

我们使用 combineReducers() 将多个 reducer 合并成为一个。
 */
import { combineReducers } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import auth from './auth'


export default combineReducers({
  auth,
  router: routerReducer
})
