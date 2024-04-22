// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init( )
const db = cloud.database() 

exports.main = async (event, context) => {
  const { title, content } = event;
  const now = new Date();

  try {
    // 向“general_post”添加数据
    const result = await db.collection('general_post').add({
      data: {
        title: title,
        content: content,
        time: now
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