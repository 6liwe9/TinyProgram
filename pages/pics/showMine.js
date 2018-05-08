// pages/pics/showMine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picArr:[],
    showDel:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
    }
    )
    this.getPics();
  },
  viewPic: function (e) {
    wx.previewImage({
      current: e.target.dataset.pic,
      urls: [e.target.dataset.pic],
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      }
    })
  },
  getPics:function(){
    var that = this;
    var muserId = that.data.userId;
    if (muserId == app.globalData.userId) {
      that.setData({ showDel: true });
    }
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/getPicsByUser.do',
      data: {
        userId: muserId
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data
          })
        }
      }
    })
  },
  delpic:function(e){
    var aid = e.target.dataset.aid;
    var that=this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/delPics.do',
      data: {
        picId: aid
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.getPics();
        }
      }
    })
  }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  ,
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