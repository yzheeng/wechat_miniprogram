// 引入微信服务器 SDK
const cloud = require('wx-server-sdk');

// 初始化 cloud
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 自动获取环境
});

exports.main = async (event, context) => {
  const db = cloud.database();
  const { title, content } = event;

  try {
    // 向数据库的 generalPost 集合添加数据
    const result = await db.collection('general_post').add({
      data: {
        title: title,
        content: content,
        createTime: db.serverDate() // 服务器时间
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