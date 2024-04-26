// me.ts
Page({
  data: {
    // 初始用户信息设置
    userInfo: {
      avatar: "", // 用户头像
      nickname: "用户昵称", // 用户昵称
    },
    // 这个登录标识符是用于控制wxml组件显示的
    logged: false,
    avatarUrl: "",
  },

  onShow: function(){
    //页面显示时，设置登录标识符与全局登录状态同步
    const app = getApp();
    this.setData({
      logged : app.getLoginStatus(),
    })
    console.log("current login status:", this.data.logged);
    console.log("current openId: ", app.getOpenId());
  },

  //用户头像
  onChooseAvatar: function (event: any) {
    this.setData({
      avatarUrl: event.detail.avatarUrl
    })
  },

  // 用户登录方法
  userLoginBtn: function () {
    const app = getApp();
      // 检查用户是否已经登录
    if (app.getLoginStatus()) {
      wx.showToast({
        title: '您已经登录了',
        icon: 'none'
      });
      // 如果已登录，直接返回
      return;
    }
    // 登录
    wx.login({
      //拿到凭证code
      success: res => {
        console.log("login code: ", res.code);
        //调用登录云函数
        wx.cloud.callFunction({
          name: 'user_login',
          data: {
            code: res.code,
          },//登录成功
          success: (res: any) => {
            // 设置open id
            app.setOpenId(res.result.data.open_id);
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });
            //设置登录状态
            this.setData({logged : true})
            app.setLoginStatus(true);
          },//登录失败
          fail: ((error: any) => {
            console.log("error", error);
          })
        })
      },
    });
  },

  // 用户登出方法
  logout: function () {
    const app = getApp()
    if(app.getLoginStatus() == false){
      return;
    }
      // 重置用户信息和登录状态
    this.setData({
      userInfo: { nickname: "用户昵称", avatar: "" }, // 重置为初始昵称和移除头像
      logged: false 
    });
      //更改 登录状态 
    app.setLoginStatus(false);
    app.setOpenId('');
      // 显示已退出登录提示
    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    });
  },
});
