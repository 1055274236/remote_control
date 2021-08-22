/*
 * @Description:
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-22 20:22:42
 */

const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new koa();
const tool = require('./tool');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, { cors: true });

const router = require('./router')
// 支持跨域
app.use(require('koa2-cors')());
app.use(bodyparser())

let room = {}

