// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( )
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const {openID} = event;
  //如果openID作为参数，返回对应分类的posts
  if(openID){
    return await db.collection("general_post")
    .where({
      uid : openID
    }).get();
  }else{
    return;
  }
}