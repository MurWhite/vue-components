/**
 * Created by BaiBai on 2017/3/1.
 */
const fs = require('fs');
const path = require('path')

var pagesDir = path.resolve(__dirname,'../pages/');

// module.exports = {
//   entrys(){
    let obj=[],entry={};
    fs.readdir(pagesDir,(err, files)=>{
      console.log(files)
      if(err){
        console.log("发生了一些异常，无法读取目录！详细信息：",err)
      }else{
        entry = files.reduce((pre,item)=>{
          if(/.vue$/ig.test(item)){
            pre[item.slice(0,-4).toLowerCase()] = [ 'babel-polyfill' ,pagesDir + item];
          }
          return pre;
        },{});
        console.log(JSON.stringify(entry))
      }
    });

    // return {}
  // }
// };
