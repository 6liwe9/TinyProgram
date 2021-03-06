//index.js
//获取应用实例
const app = getApp()
var host = require('../../utils/host.js')
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
    var that=this;
   
    if (app.globalData.userId!=null) {
      that.addAnimation();
      that.update();
      this.setData({ isBtn: false });
    }else{
      wx.showToast({
        title: '登录失败',
      })
    }
  },
  update: function () {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url + '/springmvc/user/user_update.do',
      data: {
        userId: app.globalData.userId,
        nickname: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      },
      method: "POST",
      success: function (res) {
        if (!(res.statusCode == 200 && res.data.result == 'success')) {
          wx.showToast({
            title: '更新用户信息失败' ,
            duration: 2000
          })
        }
      }
    })
  },  
  onLoad: function () {
    var p = this;
    p.setData({ imageUrl: host.Url+'/wximages/cover/cover.jpg'});
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
