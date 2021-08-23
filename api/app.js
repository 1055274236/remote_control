/*
 * @Description:
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-23 15:32:32
 */

const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, { cors: true });

// 错误日志保存
const tool = require('./tool');

// 对其他网站的导入
// const router = require('./router')

// 支持跨域
app.use(require('koa2-cors')());
app.use(bodyparser())

// 房间的缓存信息
let room = {}
let randomKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd'
  , 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z']

/**
 * @description: 随机生成房间序号
 * @return {String} kry
 * @author: Huang Yingming
 */
function randomRoomKey() {
  let key = ''
  do {
    key = 'r'
    for (let index = 0; index < 4; index++) {
      key += randomKey[Math.floor(Math.random() * 36)]
    }
  } while (room[key] !== undefined)
  return key
}

/**
 * @description: socket.io 的相关操作
 * @author: Huang Yingming
 */
io.on('connection', (socket) => {

  /**
   * @description: socket.io 断开连接,对缓存内的相应数据进行删除
   * @author: Huang Yingming
   */
  io.on('disconnect', () => {
    if (socket == room[socket.roomKey].tv) {
      if (room[socket.roomKey].remoteControl !== undefined)
        room[socket.roomKey].remoteControl.$emit('disconnect', '电视断开连接,请重新输入编号')
      delete room[socket.roomKey]
    }
    if (socket == room[socket.roomKey].remoteControl)
      delete room[socket.roomKey].remoteControl
  })

  /**
   * @description: 创建一个房间码，并对此链接存储分类
   * @return {Object} message {option, status, key}
   * @author: Huang Yingming
   */
  io.on('createRoom', () => {
    let message = {}
    message.option = 'createRoom'
    try {
      let roomKey = randomRoomKey()
      room[roomKey] = {}
      room[roomKey].tv = socket
      // room[roomKey].remoteControl = {}
      socket.roomKey = roomKey
      message.status = 200
      message.key = roomKey
    } catch (err) {
      message.status = 503
      tool.save_file(err.toString(), 'createRoom')
    }
    socket.$emit('createRoom', message)
  })

  /**
   * @description: 遥控器接受参数，并对相应的房间进行连接
   * @param {Object} msg {roomKey}
   * @return {Object} message {option, status}
   * @author: Huang Yingming
   */
  io.on('connectRoom', (msg) => {
    msg = JSON.parse(JSON.stringify(msg))
    let message = {}
    message.option = 'connectRoom'
    try {
      room[msg.roomKey].remoteControl = socket
      socket.roomKey = msg.roomKey
      message.status = 200
    } catch (err) {
      message.status = 503
      tool.save_file(err.toString(), 'connectRoom')
    }
    socket.$emit('connectRoom', message)
  })

  /**
   * @description: 遥控的相关操作传递给tv
   * @param {Object} option
   * @return {Object} option
   * @author: Huang Yingming
   */
  io.on("option", (msg) => {
    msg = JSON.parse(JSON.stringify(msg))
    try {
      room[msg.roomKey].tv.$emit('option', msg)
    } catch (err) {
      tool.save_file(err.toString(), 'option')
    }
  })
})

/**
 * @description: 返回当前所有房间，同时返回房间内设备情况
 * @return {Array} allTheRoom
 * @author: Huang Yingming
 */
router.get("/allTheRoom", ctx => {
  let allTheRoom = []
  for (let i in room)
    allTheRoom.push({
      room: i,
      tv: room[i].tv === undefined,
      remoteControl: room[i].remoteControl === undefined
    })

  // Return result
  ctx.response.body = {
    AllTheRoom: allTheRoom
  }
})


app.use(router.routes());

server.listen(40001, () => {
  console.log("start serve at:http://localhost:40001")
})