//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isBtn:true,
    showNavi:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: {}
  },
  //事件处理函数
  bindViewTap: function() {
    this.setData({ isBtn: false});
    var that=app;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }, 
      url: 'http://114.116.9.92/springmvc/user/user_login.do',
      data: {
        openId: that.globalData.openid,
        nickname: that.globalData.userInfo.nickName,
        avaterUrl: that.globalData.userInfo.avaterUrl
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode==200&&res.data.result =='success'){
          that.globalData.userId = res.data.data;
          console.log(that.globalData.userId);
        }
      }
    })
    this.addAnimation();
  },
  onLoad: function () {
    var p = this;
    wx.request({
      url: 'http://114.116.9.92/springmvc/hello/wx_cover.do', 
      data: {
      },
      method: "GET",
      success: function (res) {
        p.setData({ imageUrl: res.data.imageUrl });
        console.log(res.data)
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  addAnimation: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease-in",
    })
    this.animation = animation;
    setTimeout(function () {
      animation.opacity(0).scale(2,2).step();
      this.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        wx.navigateTo({
        url: '../mIndex/mIndex'
       })
        this.setData({
          showNavi: true
        });
      }.bind(this), 1500)
    }.bind(this), 1000)
  }
})
