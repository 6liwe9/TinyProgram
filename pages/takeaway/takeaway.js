// pages/takeaway/takeaway.js
var content_data = require('../inheritance/type.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typearray=content_data.typeData.slice(0);
    typearray.unshift('所有类型');
    this.setData({
      array:typearray
      })
    this.loadArticle(this.data.array[this.data.index]);
  },
  loadArticle:function(mitype){
    var that=this;
    if(mitype=='所有类型')
      mitype='';
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'http://localhost/springmvc/article/getTakeArticle.do',
      data: {
        type:mitype
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            articles:res.data.data
          })
        }
      }
    })
  },
  listenerPickerSelected:function(e){
    this.setData({
      index: e.detail.value
    });
    this.loadArticle(this.data.array[this.data.index]);
  },
  addMine:function(){
    wx.navigateTo({
      url: './addmine'　　// 页面 A
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