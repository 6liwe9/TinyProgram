// pages/mIndex/mIndex.js
var content_data = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList: [
      { id: "123", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
       { id: "123", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
       { id: "123", title: "公告：你想和一群有志青年一起过生日嘛？" }],
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