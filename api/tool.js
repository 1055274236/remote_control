/*
 * @Description: 
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-23 10:18:46
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

module.exports = File_Option