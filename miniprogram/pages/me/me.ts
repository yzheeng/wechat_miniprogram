// me.ts
Page({
  data: {
    // 初始用户信息设置
    userInfo: {
      avatar: "", // 用户头像
      nickname: "用户昵称", // 用户昵称
    },
    logged: false // 登录状态标记
  },

  // 用户登录方法
  userLogin: function () {
    // 检查用户是否已经登录
    if (this.data.logged) {
      wx.showToast({
        title: '您已经登录了',
        icon: 'none'
      });
      // 如果已登录，直接返回
      return; 
    }
    // 请求用户授权获取个人信息
    wx.getUserProfile({
      desc: '用于完善会员资料', // 授权描述信息
      success: (res) => {
        console.log("拿到的用户信息：", res.userInfo); // 控制台打印获取的用户信息
        // 更新页面数据
        this.setData({
          userInfo: {
            avatar: res.userInfo.avatarUrl, // 更新用户头像信息
            nickname: res.userInfo.nickName // 更新昵称为微信用户昵称
          },
          logged: true // 更新登录状态为已登录
        });
        // 显示登录成功提示
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: () => {
        // 登录失败时显示提示
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  // 用户登出方法
  logout: function () {
    // 重置用户信息和登录状态
    this.setData({
      userInfo: { nickname: "用户昵称", avatar: "" }, // 重置为初始昵称和移除头像
      logged: false // 设置登录状态为未登录
    });
    // 显示已退出登录提示
    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    });
  },
});
