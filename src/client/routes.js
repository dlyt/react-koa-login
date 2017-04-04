import App from './containers/App'


/*
问题1： /login 无法访问，一直加载。已解决：查看 hashHistory 和 browserHistory 的区别。
问题2： IndexRoute 不好用，换了种写法。

路由参考网址：
https://reacttraining.com/react-router/web/guides/quick-start
 */
 const routes = [
  {
    path: '/',
    component: App,
  }
 ]

export default routes
