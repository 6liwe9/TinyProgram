// pages/mIndex/mIndex.js
var content_data = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: {
      pics: [{ url: 'http://114.116.9.92/springmvc/wximages/test1.jpg' }, { url: '/pages/icons/2.png'}]}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ barData: content_data.tabBarData});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  abc:function(e){
    wx.previewImage({
      urls: [e.target.dataset.pic],
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
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