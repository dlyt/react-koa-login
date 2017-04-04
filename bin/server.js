import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import session from 'koa-generic-session'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import mount from 'koa-mount'							//https://github.com/koajs/mount
import serve from 'koa-static'
// import chokidar from 'chokidar'

//配置webpack
import webpack from 'webpack'
import webpackMiddleware from 'koa-webpack-middleware'
const devMiddleware = webpackMiddleware.devMiddleware
const hotMiddleware = webpackMiddleware.hotMiddleware
const webpackConf = require('../webpack.config')
const compiler = webpack(webpackConf)

//配置和中间件
import config from '../config'
import handle from '../src/server/utils/handle'
import { errorMiddleware } from '../src/server/middleware'


global.Handle =  handle

const app = new Koa()
app.keys = [config.session]
mongoose.Promise = global.Promise
mongoose.connect(config.database)

app.use(logger())
app.use(bodyParser())
app.use(convert(session()))
app.use(errorMiddleware())

//webpack中间件
app.use(devMiddleware(compiler, {
	noInfo: true,		//是否打印 Hash Version等信息
	publicPath: webpackConf.output.publicPath
}))
app.use(hotMiddleware(compiler))
/*
只支持根目录，其他路径报错：next is not a function
解决方案：升级koa-mount版本
 */
app.use(convert(mount('/', serve(`${process.cwd()}/src/client`))))
app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))))

require('../config/passport')
app.use(passport.initialize())
app.use(passport.session())

const modules = require('../src/server/modules')
modules(app)

// const path = require('path')
// const watcher = chokidar.watch([
//   path.join(__dirname, '../src/server'),
// ])
// watcher.on('ready', function () {
//   watcher.on('all', function (e, p) {
//     console.log("Clearing module cache");
//     Object.keys(require.cache).forEach(function(id) {
//       if (/[\/\\](src)[\/\\](server)/.test(id)) {
// 				delete require.cache[id]
// 			}
//     });
//   })
// })

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})

export default app
