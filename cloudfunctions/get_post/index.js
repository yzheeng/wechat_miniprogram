// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( )
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const {categoryID} = event;
  //如果有categoryID作为参数，返回对应分类的posts
  if(categoryID && (categoryID != "5ca5d2676627e6e1089d9cc575602c6b")){
    return await db.collection("general_post")
    .where({
      category : categoryID
    }).get();
    //没有categoryID作为参数，默认返回全部
  }else{
    return await db.collection("general_post").get();
  }
}