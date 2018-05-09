// pages/mine/mine.js
const app = getApp()
var host = require('../../utils/host.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err: false,
    errMsg: '测试',
    userInfo: app.globalData.userInfo,
    articles:[],
    userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userId:app.globalData.userId
    })
    this.getArticle();
    this.getPics();
  },
  getPics: function () {
    var that = this;
    var muserId =  app.globalData.userId;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url+'/springmvc/mipic/getPicsByUser.do',
      data: {
        userId: muserId
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
      url: host.Url+'/springmvc/article/getTakeArticle.do',
      data: {
        userId: app.globalData.userId
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
  }
  ,
  showError: function (msg) {
    this.setData({
      err: true,
      errMsg: msg
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        err: false,
      })

    }.bind(this), 3000)

  },
  delete:function(e){
    var aid=e.target.dataset.aid;
    var that = this;
    wx.request({
      url: host.Url+'/springmvc/article/delTakeArticle.do?articleId='+aid,
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          wx.showToast({
            title: '保存成功',
            duration: 3000
          })
          that.getArticle();
        }else{
          that.showError('删除失败，请稍后再试')
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