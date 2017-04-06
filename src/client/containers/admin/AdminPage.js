/*
现在来创建一些容器组件把这些展示组件和 Redux 关联起来。
技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。
你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。

使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。
除了读取 state，容器组件还能分发 action。
类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。

通过 store.dispatch() 将 action 传到 store。
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { Link, Route } from 'react-router-dom'

import Sidebar from '../sidebar'
import Header from '../header'
import Breadcrumb from '../breadcrumb'
import Footer from '../footer'
import Welcome from '../welcome'
import LoginPage from '../login/LoginPage'
import Manage from '../manage/ManagePage'

import './admin.less'

const routes = [
  {
    path: '/admin',
    exact: true,
    component: () => <Welcome />,
  },
  {
    path: '/admin/manage',
    component: () => <Manage />,
  },
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { isAuthenticated } = this.props.auth
    if (!isAuthenticated) {
      return(
        <LoginPage />
      )
    }
    return (
      <div className="ant-layout-base">
        <Sidebar />
          <div id="main-content-div" className='ant-layout-main'>
            <Header />
            <Breadcrumb />
            <div className="ant-layout-container">
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </div>
            <Footer />
          </div>
      </div>
    )
  }
}

/*
如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用
http://cn.redux.js.org/docs/react-redux/api.html

获取 store 的 state 方法。
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(App)
