/**
 * webpack是一款模块加载器兼打包工具，
 * 它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。
 */
import path from 'path'
import webpack from 'webpack'

module.exports = {
  entry: {
		app: [ "webpack-hot-middleware/client?reload=1", "./src/client/index.js" ]  //热加载
	},
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname, 'src/client'),
        path.join(__dirname, 'src/server/shared')
      ],
      query: {
        presets: [ 'es2015', 'react'],
        plugins: [['import', { libraryName: 'antd', style: true}]], //使用 babel-plugin-import 来进行按需加载
      }
    },{
      test: /\.less$/,
      use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}]
  }]
  }
}
