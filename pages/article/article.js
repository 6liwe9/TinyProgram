// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title:"坏了的文章",
    Content:"Sorry！文章的内容被小蜜啃坏了！",
    Pics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      var articleId = options.articleId;
      var toUrl ='http://localhost/springmvc/article/getArticle.do?articleId='+articleId;
      wx.request({
        url: toUrl,
        method: "GET",
        success: function (res) {
          if(res.data.result=='success'){
            that.setData({
              Title: res.data.data.articleTitle,
              Content: res.data.data.articleContent,
              Pics: res.data.data.pics
            });
          }
        }
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