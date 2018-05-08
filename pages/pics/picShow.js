// pages/pics/picShow.js
var content_data = require('../inheritance/type.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    page:1,
    size:10,
    picArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typearray = content_data.typeData.slice(0);
    typearray.unshift('所有类型');
    this.setData({
      array: typearray
    })
    var that=this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/getPics.do',
      data: {
        type: that.data.array[that.data.index],
        page:that.data.page,
        size:10
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data,
            page:that.data.page+1
          })
        }
      }
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  onReachBottom: function () {
    var pics=this.data.picArr;
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/getPics.do',
      data: {
        type: that.data.array[that.data.index],
        page: that.data.page,
        size: 10
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          pics.concat(res.data.data)
          that.setData({
            picArr: pics,
            page: that.data.page + 1
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value,
      page:1
    });
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/mipic/getPics.do',
      data: {
        type: that.data.array[that.data.index],
        page: that.data.page,
        size: 10
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            picArr: res.data.data,
            page: that.data.page + 1
          })
        }
      }
    })
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
    console.log(113)
  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})