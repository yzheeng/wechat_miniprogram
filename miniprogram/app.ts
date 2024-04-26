// app.ts
interface IAppOption{
  globalData:{
    isLoggedIn: boolean,
    open_id: string,
  },
  getLoginStatus(): boolean,
  setLoginStatus(status : boolean) : void,
  getOpenId() : string,
  setOpenId(open_id: string) : void,
  
}

App<IAppOption>({
  globalData: {
    isLoggedIn: false,// 登录状态， false是未登录，  true是登录
    open_id: '',
  },

  getLoginStatus() {
    return this.globalData.isLoggedIn;
  },

  setLoginStatus(status : boolean){
    this.globalData.isLoggedIn = status;
  },
  getOpenId(){
    return this.globalData.open_id
  },

  setOpenId(openId){
    this.globalData.open_id = openId
  },

  

  onLaunch() {
    // 初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true, 
        env: 'uni-campus-miniapp-2d6le87276b49' 
      });
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);


  },

  
});
