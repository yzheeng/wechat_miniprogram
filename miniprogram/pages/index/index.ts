// index.ts
interface Post {
  _id: string;
  title: string;
  content: string;
  time: string;
}

interface PostCategory {
  _id: string;
  type: string;
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
    categories: [],
    posts: []
  },
  //下滑刷新，拉取最新post
  onPullDownRefresh: function () {
    this.fetchPosts();
  },
  //生命周期： 启动
  onLoad: function () {
    this.fetchPosts();
    this.fetchCategory();
  },

  //点击事件： 点击post分类
  onCategorySelect: function (event: any) {
    const categoryID = event.currentTarget.dataset.id
    // console.log(categoryID);
    this.fetchPosts(categoryID);
  },
  // 拉取发帖分类
  fetchCategory: function () {
    wx.cloud.callFunction({
      name: 'get_post_category'
    })
      .then((res: any) => {
        this.setData({
          categories: res.result.data.map((postCategory: PostCategory) => ({
            id: postCategory._id,
            name: postCategory.type,
          }))
        })
      })
      .catch(err => {
        console.log("拉取帖子分类信息失败", err);
      })
  },
  // 拉取发帖
  // paramater: category -> 拉取对应分类post
  // parmater: none -> 默认拉取全部post 
  fetchPosts: function (category? : string) {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'get_post',
      data: {categoryID: category}
    })
      .then((res: any) => {
        // console.log('帖子数据信息:', res);
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
  },
  // Date 类型格式转换
  formatDateToHourMinute: function (date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

})
