/*
 * @Description:
 * @Autor: Huang Yingming
 * @LastEditors: Huang Yingming
 * @LastEditTime: 2021-08-22 20:13:42
 */

let File_Option = {}
var fs = require('fs')

File_Option.read_file = () => {
  let data = {};
  try {
    //读文件
    let jsondata = fs.readFileSync('data.json');
    //json数据流解析
    data = JSON.parse(jsondata);
    //输出
    // console.log(data);
    return data
  } catch (err) {
    console.log(err);
    return false;
  }
}

File_Option.save_file = (data) => {
  try {
    fs.writeFileSync('./data.json', JSON.stringify(data))
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = File_Option