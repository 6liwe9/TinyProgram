// pages/inheritance/myMi.js
var content_data = require('./type.js')
var content_data2 = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatherText: '父',
    motherText: '母'
  },
  listenCheckboxChange:function(e) {
    this.setData({ children: e.detail.value });
  },
  showMType: function () {
    this.setData({ showViewM: true, showViewF: false });
  },
  showFType: function () {
    this.setData({ showViewF: true, showViewM: false });
  },
  setTypeF: function (event) {
    var currentType = event.currentTarget.dataset.type;
    this.setData({ fatherText: currentType, showViewF: false });
  },
  setTypeM: function (event) {
    var currentType = event.currentTarget.dataset.type;
    this.setData({ motherText: currentType, showViewM: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeData: content_data.typeData,
      barData: content_data2.tabBarData
    });
  },
  save:function(){
    wx.showToast({
      title: '保存成功',
      duration: 1000
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