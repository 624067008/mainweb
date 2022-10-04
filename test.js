//遍历文件夹下的所有文件，最后输出文件夹下所有的文件名
//思路 使用fs，path 模块
//1、先读取文件夹，获取文件的所有文件
//2、对获取的文件进行遍历，用fs.stat 获得文件状态，
//3、通过状态中的stat.isFile()判断是否是一个文件，是文件直接输出文件名，不是文件就继续递归。
let fs = require("fs");
let path = require("path");
let myurl = "D:/ruanjian/美化/图片/总壁纸库"
const imgurls = []
let i = 0;
function myReadfile(MyUrl) {
  fs.readdir(MyUrl, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      //拼接获取绝对路径，fs.stat(绝对路径,回调函数)
      let fPath = path.join(MyUrl, file);
      fs.stat(fPath, (err, stat) => {
        if (stat.isFile()) {
          //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹
          imgurls.push(file + '')
          i++
          if (i == files.length) {
            return imgurls
          }
        }
        else {
          myReadfile(fPath)
          i++
          if (i == files.length) {
            return imgurls
          }
        }
      })
    })
  })
}
myReadfile(myurl);

export { myReadfile } 