//app.js
App({

  data: {
    appid: 'wx29669aff988ce16f',
    secret: 'aa9efe070558db0dadc603417791d94c'
  } ,
  getOpenid: function (code) {
    var that=this;
    if (code) {
      //发起网络请求
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        data: {
          js_code: code,
          appid: that.data.appid,
          secret: that.data.secret,
          grant_type: 'authorization_code'
        },
        success: function (result) {
          if (result.data.openid != null)
            that.globalData.openid = result.data.openid; //获取openid 
          else
            that.getOpenid(code)
        }
      })
    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  }
  ,
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.getOpenid(res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    userId: null
  }
})