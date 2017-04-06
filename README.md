## 启动
```js
npm install
npm run dev
```

## api文档
```js
npm run docs
```
查看 http://localhost:5000/docs/

## 效果图
![Octicons](http://cdn.tycocn.com/123.gif)

## 目录结构
```
.
├── bin                      
│   └── server.js            # 启动文件
├── config                   
│   ├── env                  # 环境配置文件夹
│   └── passport.js          # 封装koa-passport的一些函数
├── dist                     # 打包文件夹
├── docs                     # api文档
├── src                      # 程序源文件         
│   ├── client               # 前端文件夹
│   │     ├── actions        # action
│   │     ├── components     # 组件
│   │     ├── containers     # 容器
│   │     ├── reducers       # reducer
│   │     ├── utils          # 辅助函数文件夹
│   │     ├── index.html         
│   │     ├── index.js       # 前端入口文件
│   │     └── routes.js      # 路由  
│   └── server               # 后端文件夹
│         ├── middleware     # 中间件
│         ├── models         # 模型
│         ├── modules        # api文件夹
│         ├── shared         # 共享前端文件夹
│         └── utils          # 辅助函数文件夹
├── index.js                 # 程序入口文件
├── note.md                  # 项目记录
└── webpack.config.js        # webpack配置文件

```
