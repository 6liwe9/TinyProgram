// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uId = options.userId;
    var that=this;
    that.setData({
      userId:uId
    })
    wx.request({
      url: 'https://www.mymiwo.club/springmvc/user/user_get.do?userId=' + uId,
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
            that.setData({
              userInfo:res.data.data
            })
        }
      }
    })
    that.getArticle();
    that.getPics();
  },
  getPics: function () {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/getPicsByUser.do',
      data: {
        userId: that.data.userId
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data
          })
        }
      }
    })
  },
  getArticle:function(){
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/article/getTakeArticle.do',
      data: {
        userId: that.data.userId
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            articles: res.data.data
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})