// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title:"测试文章",
    Content:"文章需要三个部分，标题，内容，和图片列表，可以用作商品详细页展示，小蜜详情展示",
    Pics: ['../icons/1.png','../icons/2.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        title: options.articleId
      })
  },
  viewPic:function(e){
    wx.previewImage({
      current: e.target.dataset.pic,
      urls: this.data.Pics,
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
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