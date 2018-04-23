// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barData: {
      bar: [
        {
          barUrl: '../index/index',
          text: '主页',
          image: '../icons/1.png'
        },
        {
          barUrl: '../index/index',
          text: '测试',
          image: '../icons/2.png'
        },
        {
          barUrl: '../index/index',
          text: '测试',
          image: '../icons/3.png'
        }]
    }
  },
  uploadPic:function(){
    var mPointer=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'http://114.116.9.92/springmvc/hello/wx_upload.do', //
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type":
            "multipart/form-data"
          },
          success: function (res) {
            var a=10;
            console.log(a);
        }
        })
      }});
      
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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