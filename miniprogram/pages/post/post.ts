// pages/post/post.ts

// db: posts_category datatypes
interface PostCategory {
  _id: string;
  type: string;
}
// array:  categories datatype
interface Categories{
  id: string;
  type: string;
}
Page({
  data: {
    title: '', //标题
    content: '', //内容
    categories: [] as Categories[],//分类标签的数组
    selectedType: '请选择类型',     //选择的分类标签显示名称
    selectedTypeID: ''            //选择的分类标签对应的db._id
  },

  onLoad: function () {
    this.fetchCategory();
  },

  updateType : function(event : any){
    const index = event.detail.value;
    const selected_category_name = this.data.categories[index].type;
    const selected_category_ID = this.data.categories[index].id;
    this.setData({
      selectedType: selected_category_name,
      selectedTypeID: selected_category_ID,
    })
  },
  // 获取发帖分类， 填入类型选择框
  fetchCategory: function () {
    wx.cloud.callFunction({
      name: 'get_post_category'
    })
      .then((res: any) => {
        //过滤掉分类标签“全部”
        const filteredCategories = res.result.data.filter((item: PostCategory) => item.type !== "全部");
        this.setData({
          categories: filteredCategories.map((item: PostCategory) => ({
            id: item._id,
            type: item.type,
          }))
        })
      })
      .catch(err => {
        console.log("拉取帖子分类信息失败", err);
      })
  },
  //输入标题
  updateTitle(event: any) {
    this.setData({
      title: event.detail.value // 更新标题
    });
  },
  //输入内容
  updateContent(event: any) {
    this.setData({
      content: event.detail.value // 更新内容
    });
  },
  //提交post
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
      // call 云函数 new_post, 添加新的post到db
      name: 'new_post',
      data: {
        title: title,
        content: content,
        category: this.data.selectedTypeID,
      },
      success: res => {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
        this.setData({
          //提交后清空标题和内容
          title: '',
          content: ''
        });
      },
      fail: err => {
        console.error('提交失败', err);
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
    });
  }
});

