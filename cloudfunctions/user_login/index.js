const cloud = require('wx-server-sdk')
const axios = require('axios'); 

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) 
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const appId = 'wx76597eb9e9d5b6dd'; 
  const appSecret = '0b1120c68c8a96e20c9f5072e0e6ffd9'; 
  const jsCode = event.code;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${jsCode}&grant_type=authorization_code`;
  
  //尝试拉取 openid & session key
  try {
    const response = await axios.get(url);
    //失败
    if (response.data.errcode) {
      return {
        errcode: response.data.errcode,
        errmsg: response.data.errmsg
      };
      //成功
    } else {
      const { openid, session_key } = response.data;
      const userQuery = await db.collection('user_info').where({
        open_id: openid
      }).get();
      if (userQuery.data.length > 0) {
        // 用户已存在，更新 session_key
        await db.collection('user_info').where({
          open_id: openid
        }).update({
          data: {
            session_key: session_key
          }
        });
      }else {
        // 用户不存在，添加新用户
        await db.collection('user_info').add({
          data: {
            open_id: openid,
            session_key: session_key
          }
        });
      }
      return {
          success : true,
          data: {
            open_id : response.data.openid,
            session_key : response.data.session_key,
          },
          message: "用户已更新/添加"
      }
    }
  }catch (error) {
    return {
      errcode: -1,
      errmsg: '请求失败: ' + error.toString()
    };
  }
}