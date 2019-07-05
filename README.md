# wcdog-web

### 新闻类web前端项目 (基于Vue)
这是一套简易完整的项目，包含前端、后端、移动端三端应用。

### 介绍
#### 1.后台源码
SSM(Spring+SpringMVC+Mybatis)<br/>
戳这里[后台源码(Android)](https://github.com/xandone/wcdog)<br/>
#### 2.移动端app(Android) 
MVP+Material+retrofit2+Rx..<br/>
戳这里[移动端app(Android)](https://github.com/xandone/wcdog-app)<br/>
#### 3.后台管理系统
vue+vuex+vue Router+element<br/>
戳这里[后台管理系统](https://github.com/xandone/wcdog-manager)

### 功能说明
- [x] 登录/注册
- [x] 发帖
- [x] 回复/点赞
- [x] 搜索
- [x] 公告面板
- [x] 发一条说说
- [x] 个人中心
- [ ] 其他

### 效果预览


### 目录结构

``` bash
├── public                                       // 构建相关  
│   ├── index.html                               // 入口html文件
├── src                                          // 项目代码
│   ├── assets                                   // 图标等静态资源
│   ├── bus                                      // 组件通讯
│   ├── common                                   // 公用资源
│   │   ├── base.scss                            // 共用style
│   ├── components                               // 全局公用组件
│   │   ├── headTop.vue                          // 头部
│   │   ├── comments.vue                         // 评论Item组件
│   │   ├── jokeItem.vue                         // 列表信息组件
│   │   ├── plank.vue                            // 公告面板组件
│   ├── config                                   // 全局配置
│   │   ├── env.js                               // url、常量等
│   ├── page
│   │   ├── jokeAdd.vue                          // 新增新闻
│   │   ├── jokeDetails.vue                      // 新闻详情
│   │   ├── jokeList.vue                         // 新闻列表
│   │   ├── personal.vue                         // 个人主页
│   │   ├── searchResult.vue                     // 搜索页
│   │   ├── userView.vue                         // 查看他人主页
│   │   |                         
│   ├── utils
│   │   ├── utils.js                             // 公共方法  
│   ├── views
│   │   ├── home.vue                             // 主页        
│   ├── store                                    // 全局store
│   ├── App.vue                                  // 页面入口
│   └── main.js                                  // 程序入口
├── pic                                          // 预览图片
├── .babelrc                                     // babel-loader 配置
├── .eslintrc.js                                 // eslint 配置项
├── .gitignore                                   // git 忽略项
└── package.json                                 // package.json
```

### 安装运行

```
# Project setup
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

```

## License

