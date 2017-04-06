import React from 'react'
import { Route } from 'react-router'
import Welcome from './containers/welcome'
import Admin from './containers/admin/AdminPage'

/*
问题1： /login 无法访问，一直加载。已解决：查看 hashHistory 和 browserHistory 的区别。
问题2： IndexRoute 不好用，换了种写法。

路由参考网址：
https://reacttraining.com/react-router/web/guides/quick-start
 */
 export default (
   <div className="ant-layout-base">
     <Route exact path="/" component={Welcome}/>
     <Route path="/admin" component={Admin}/>
   </div>
 )
