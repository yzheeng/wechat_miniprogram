// index.ts
interface Post {
  _id: string;
  title: string;
  content: string;
  time: string;
}

Page({
  data: {
    //置顶信息
    topPosts: [
      {
        id: 1,
        title: "重要通知",
        // imageUrl: "https://example.com/top1.jpg"  
      },
      {
        id: 2,
        title: "活动预告",
        // imageUrl: "https://example.com/top2.jpg"  
      },
      {
        id: 3,
        title: "最新发布",
        // imageUrl: "https://example.com/top3.jpg"  
      }
    ],
    //分类条和筛选按钮
    categories: [
      { id: 1, name: "全部" },
      { id: 2, name: "租房" },
      { id: 3, name: "二手交易" },
      { id: 4, name: "拼车" },
      { id: 5, name: "选课" },
      { id: 6, name: "xx" },
      { id: 7, name: "xx" },
      { id: 8, name: "xx" },
      { id: 9, name: "xx" },
    ],
    selectedCategoryId: 1,
  },

  onPullDownRefresh:function(){
    this.fetchPosts();
    // wx.stopPullDownRefresh();
  },

  fetchPosts: function(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_post'    
    })
    .then((res: any) => {
      console.log('帖子数据获取成功:', res);
      wx.stopPullDownRefresh();
        this.setData({
          // posts 对应发帖列表， post是fetch过来的data
          posts: res.result.data.map((post: Post) => ({
            id: post._id, 
            title: post.title,
            content: post.content,
            time: this.formatDateToHourMinute(new Date(post.time)),

          }))
        });
      })
      .catch(err => {
        console.error('帖子数据获取失败:', err);
        wx.stopPullDownRefresh();
      });
  },

  //默认启动
  onLoad: function () {
    this.fetchPosts();
  },

  // Date 类型格式转换
  formatDateToHourMinute: function (date: Date): string {
    const year = date.getFullYear(); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    return `${year}-${month}-${day} ${hours}:${minutes}`; 
  },

  //筛选按钮
  onFilterTap: function () {
    wx.showActionSheet({
      itemList: ['综合', '最新'],
      success: function (res) {
        console.log(res.tapIndex);
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });
  }

})
