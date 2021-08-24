/*
 * @Description:
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-24 21:58:42
 */

const router = require('koa-router')()
const tool = require('./tool')

/**
 * @description: 登录功能实现
 * @param {String} account
 * @param {String} password
 * @return {Number} status
 * @author: Huang Yingming
 */
router.post('/login', ctx => {
  let body = ctx.request.body
  let account = body.account
  let password = body.password

  let message = {}
  message['option'] = 'login'
  message['status'] = 403

  let user = tool.readFile('./data/user.json')
  // 查询用户名是否存在
  if (user[account] !== undefined) {
    // 查询密码是否相同
    if (user[account].password == password) {
      message['status'] = 200
    }
  }

  ctx.response.body = message
})

/**
 * @description: 注册功能的实现
 * @param {String} account
 * @param {String} password
 * @return {Number} status
 * @author: Huang Yingming
 */
router.post('/signIn', ctx => {
  let body = ctx.request.body
  let account = body.account
  let password = body.password

  let message = {}
  message['option'] = 'signIn'
  message['status'] = 403

  let user = tool.readFile('./data/user.json')

  // 查询用户名是否存在，如果存在并操作成功则返回 200
  if (user[account] === undefined) {
    user[account] = {}
    console.log(user)
    user[account]['password'] = password
    tool.saveFile('./data/user.json', user)

    message['status'] = 200
  }

  ctx.response.body = message
})

/**
 * @description: 返回指定同户名的喜爱频道
 * @param {String} account
 * @return {Array} favorite
 * @author: Huang Yingming
 */
router.post('/getFavorite', ctx => {
  let body = ctx.request.body
  let account = body.account

  let favorite = tool.readFile('./data/favorite.json')

  let message = {}
  message['option'] = 'getFavorite'
  message['status'] = 503

  if (favorite[account] !== undefined) {
    message['message'] = favorite[account]
    message['status'] = 200
  }

  ctx.response.body = message
})

/**
 * @description: 添加指定用户名的喜爱频道
 * @param {String} account
 * @param {String} addFavorite
 * @return {Number} status code
 * @author: Huang Yingming
 */
router.post('/addFavorite', ctx => {
  let body = ctx.request.body
  let account = body.account
  let addFavorite = body.addFavorite

  let favorite = tool.readFile('./data/favorite.json')

  let message = {}
  message['option'] = 'addFavorite'
  message['status'] = 503

  if (favorite[account] !== undefined) {
    favorite[account].push(addFavorite)
    tool.saveFile('./data/favorite.json', favorite)
    message['status'] = 200
  } else {
    favorite[account] = [addFavorite]
    tool.saveFile('./data/favorite.json', favorite)
    message['status'] = 200
  }

  ctx.response.body = message
})

/**
 * @description: 删除指定用户名的喜爱频道
 * @param {String} account
 * @param {String} deleteFavorite
 * @return {Number} status code
 * @author: Huang Yingming
 */
router.post('/deleteFavorite', ctx => {
  let body = ctx.request.body
  let account = body.account
  let deleteFavorite = body.deleteFavorite

  let favorite = tool.readFile('./data/favorite.json')

  let message = {}
  message['option'] = 'deleteFavorite'
  message['status'] = 503

  if (favorite[account] !== undefined) {
    if (favorite[account].indexOf(deleteFavorite) != -1) {
      favorite[account] = favorite[account].splice(favorite[account].indexOf(deleteFavorite) + 1, 1)
      tool.saveFile('./data/favorite.json', favorite)
      message['status'] = 200
    }
  }

  ctx.response.body = message
})

module.exports = router