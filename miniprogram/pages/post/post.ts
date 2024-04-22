// import { update } from "XrFrame/kanata/lib/index";

// pages/post/post.ts
Page({
  data: {
    title: '', // 帖子的标题
    content: '' // 帖子的内容
  },


  updateTitle(event: any) {
    this.setData({
      title: event.detail.value // 更新标题
    });
  },
  updateContent(event: any) {
    this.setData({
      content: event.detail.value // 更新内容
    });
  },
  submitPost() {
    const { title, content } = this.data;
    if (!title || !content) {
      wx.showToast({
        title: '标题和内容不能为空',
        icon: 'none'
      });
      return;
    }
    wx.cloud.callFunction({
      name: "test"
    })
    .then(res=>{
      console.log(res)
    })
    // wx.cloud.callFunction({
    //   name: 'new_post', // 云函数的名称
    //   data: {
    //     title: title,
    //     content: content
    //   },
    //   success: res => {
    //     wx.showToast({
    //       title: '提交成功',
    //       icon: 'success'
    //     });
    //     // 清空输入
    //     this.setData({
    //       title: '',
    //       content: ''
    //     });
    //   },
    //   fail: err => {
    //     console.error('提交失败', err);
    //     wx.showToast({
    //       title: '提交失败',
    //       icon: 'none'
    //     });
    //   }
    // });
  
  
  }
});

