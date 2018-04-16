// pages/takeaway/addmine.js
var content_data = require('../inheritance/type.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    hasPic:false
  },
  onLoad: function (options) {
    var typearray = content_data.typeData.slice(0);
    typearray.unshift('请点击选择类型');
    this.setData({
      arr: typearray
    })
  },
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  delete: function () {
    this.setData({
      pics: {},
      hasPic: false
    });
  },
  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  save:function(){
    console.log(this.data.title);
    console.log(this.data.content);
  },
  viewPic:function(e){
    
    wx.previewImage({
      current: e.target.dataset.pic,
      urls: this.data.pics,
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      }})
  },
  uploadPics:function(){
     var mPointer=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        mPointer.setData({
          pics:tempFilePaths,
          hasPic:true
        });
      }});
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