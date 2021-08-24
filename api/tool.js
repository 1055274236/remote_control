/*
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-24 20:40:27
 */
let File_Option = {}
const fs = require('fs')
const date = require("silly-datetime");

// Error log
File_Option.save_file = (data, position = '0') => {
  try {
    // the wrong time, position of error,  cause of error
    fs.writeFileSync("./error/" + date.format(new Date(), 'YYYYMMDD') + '.log', JSON.stringify({
      time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      position: position,
      message: data
    }) + '\n', { 'flag': 'a' }, err => {
      return false;
    })
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * @description: 读取指定路径相关 JSON 数据
 * @param {String} filePath
 * @return {JSON} data or {Boolean} false
 * @author: Huang Yingming
 */
File_Option.readFile = (filePath) => {
  let data = {};
  try {
    //读文件
    let jsondata = fs.readFileSync(filePath);
    //json数据流解析
    data = JSON.parse(jsondata);
    //输出
    // console.log(data);
    return data
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * @description: 将指定数据保存到指定文件中
 * @param {String} filePath
 * @param {JSON} data
 * @return {Boolean} *
 * @author: Huang Yingming
 */
File_Option.saveFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data))
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = File_Option