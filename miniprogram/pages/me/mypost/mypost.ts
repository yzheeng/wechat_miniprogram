// pages/me/mypost/mypost.ts
interface Post {
  _id: string;
  title: string;
  content: string;
  time: string;
}
Page({
  data: {
    posts: [],
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
  // Date 类型格式转换
  formatDateToHourMinute: function (date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  },

  //下滑刷新，拉取最新post
  onPullDownRefresh: function () {
    this.fetchPosts();
  },
  //生命周期： 启动
  onLoad: function () {
    this.fetchPosts();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})