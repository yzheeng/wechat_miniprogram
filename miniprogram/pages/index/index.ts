// index.ts
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
    //帖子
    posts: [
      {
        id: 1,
        title: "帖子标题一",
        summary: "这里是帖子的简介，最多显示一两行。",
        time: "2023-04-21"
      },
      {
        id: 2,
        title: "帖子标题二",
        summary: "这里是帖子的简介，最多显示一两行。",
        time: "2023-04-20"
      }
    ],
  },
  //筛选按钮
  onFilterTap: function () {
    wx.showActionSheet({
      itemList: ['综合', '最新'],
      success: function (res) {
        console.log(res.tapIndex);
        // 根据选择的索引做进一步操作
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });
  }

  
})
