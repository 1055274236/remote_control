<!--
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-25 19:53:33
-->

### 使用方法
    node app.js
    http://localhost:40001

### 文件介绍
## data
&nbsp;&nbsp;  所有数据的集合
## app.js
&nbsp;&nbsp;  主文件。包含所有的socket.io接口，同时包含部分router接口
## router.js
&nbsp;&nbsp;  承担大部分用户操作的接口
## tool.js
&nbsp;&nbsp;  用于对文件操作的相关函数

### 接口介绍
    '/login' 登录
    '/signIn' 注册
    '/getFavorite' 获取指定用户名“喜爱的频道”
    '/addFavorite' 给指定用户名添加指定的喜爱的频道
    '/deleteFavorite' 删除指定用户名指定的频道