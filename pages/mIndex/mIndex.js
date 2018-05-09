// pages/mIndex/mIndex.js
var content_data = require('../template/tabbar/tabbar.js')
var host = require('../../utils/host.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    page: 1,
    size: 10,
    picArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ barData: content_data.tabBarData});
    this.getAnnounce();
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url+'/springmvc/mipic/getYesterdayPics.do',
      data: {
        page: that.data.page,
        size: 10
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data,
            page: that.data.page + 1
          })
        }
      }
    })
  },
  getAnnounce:function(){
    var that = this;
    wx.request({
      url: host.Url+'/springmvc/article/getAnnounce.do',
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            msgList: res.data.data
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
    var that = this;
    that.setData({
      page:1
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url + '/springmvc/mipic/getYesterdayPics.do',
      data: {
        page: that.data.page,
        size: 10
      },
      method: "POST",
      success: function (res) {
        wx.stopPullDownRefresh()
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data,
            page: that.data.page + 1
          })
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var pics = this.data.picArr;
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url+'/springmvc/mipic/getYesterdayPics.do',
      data: {
        page: that.data.page,
        size: 10
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          pics.concat(res.data.data)
          that.setData({
            picArr: pics,
            page: that.data.page + 1
          })
        }
      }
    })
  },
  viewPics: function (e) {
    wx.previewImage({
      current: e.target.dataset.pic,
      urls: [e.target.dataset.pic],
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})