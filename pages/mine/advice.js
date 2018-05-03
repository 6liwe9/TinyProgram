// pages/mine/advice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err: false,
    errMsg: '测试',
   content:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  showError: function (msg) {
    this.setData({
      err: true,
      errMsg: msg
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        err: false,
      })

    }.bind(this), 3000)

  }
  ,
  save: function () {
    var that = this;
    if(that.data.content==''){
      that.showError("建议内容未填写")
      return
    }
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'http://localhost/springmvc/advice/addAdvice.do',
      data: {
        userId: app.globalData.userId,
        adviceContent:that.data.content
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          wx.showToast({
            title: '保存成功',
            duration: 3000
          })
          that.setData({
            content: ''
          })
        }
        else{
          that.showError('保存失败，请稍后再试');
        }
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