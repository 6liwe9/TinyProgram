// pages/mIndex/mIndex.js
var content_data = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [],
    pics: {
      pics: [{ url: 'http://114.116.9.92/springmvc/wximages/test1.jpg' }, { url: '/pages/icons/2.png'}]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ barData: content_data.tabBarData});
    this.getAnnounce();
  },
  getAnnounce:function(){
    var that = this;
    wx.request({
      url: 'http://localhost/springmvc/article/getAnnounce.do',
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