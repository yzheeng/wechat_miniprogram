// me.ts
Page({
  data: {
    userInfo: {
      // avatar: "https://example.com/user-avatar.jpg",  
      nickname: "用户昵称"
    }
  },
  navigateToSettings: function() {
    wx.navigateTo({
      url: '../settings/settings'
    });
  },
  viewHistory: function() {
    wx.navigateTo({
      url: '../history/history'
    });
  },
  logout: function() {
    wx.showModal({
      title: '确认',
      content: '确定要退出登录吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
