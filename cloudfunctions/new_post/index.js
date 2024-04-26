// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( )
const db = cloud.database() 

exports.main = async (event, context) => {
  const {uid, title, content, category } = event;
  const now = new Date();

  try {
    // 向“general_post”添加数据
    const result = await db.collection('general_post').add({
      data: {
        uid: uid,
        title: title,
        content: content,
        // category 是 db.general post 的 Forage key, 指向 db.postcategory 
        category: category,
        time: now,
      }
    });
    return {
      success: true,
      data: result,
      message: '数据提交成功'
    };
  } catch (err) {
    console.error('提交数据出错：', err);
    return {
      success: false,
      error: err,
      message: '数据提交失败'
    };
  }
};