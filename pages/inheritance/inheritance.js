// pages/inheritance/inheritance.js
var content_data = require('./type.js')
var content_data2 = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fatherText:'父',
    motherText:'母',
    text:'结果来自蜜友共享,后期将根据数据进行遗传推导'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ typeData: content_data.typeData, 
    barData: content_data2.tabBarData});
  },
  showMType: function () {
    this.setData({ showViewM: true, showViewF: false});
  },
  showFType: function () {
    this.setData({ showViewF: true, showViewM: false});
  },
  setTypeF: function (event) {
    var currentType=event.currentTarget.dataset.type;
    this.setData({ fatherText: currentType ,showViewF: false});
  },
  setTypeM: function (event) {
    var currentType = event.currentTarget.dataset.type;
    this.setData({ motherText: currentType, showViewM: false});
  },
  addMine: function () {
    wx.navigateTo({
      url: './myMi'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  addAnimation: function () {
    
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease-in",
    })
    this.animation = animation;
      animation.opacity(0).scale(2, 2).step();
      this.setData({
        animationData: animation.export()})
      setTimeout(function () {
        animation.opacity(1).scale(1, 1).step();
        this.setData({
          animationData: animation.export()
        })
        this.setData({
          text: '原色：60%，马赛克40%'
        })
      }.bind(this), 1000)
   
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