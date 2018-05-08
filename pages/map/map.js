// pages/map/map.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 13,
    latitude: "",
    longitude: "",
    markers: []
  },
  markertap:function(e){
    wx.navigateTo({
      url: '../other/mine?userId='+e.markerId
    })
  },
  getOther:function(){
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/map/addUserPosition.do',
      data: {
        userId: app.globalData.userId,
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          wx.showToast({
            title: '获取成功',
            duration: 3000
          })
            var ret=res.data.data;
            var mmarkers=[];
            for(var i=0;i<ret.length;i++){
              var marker={
                id: ret[i].userId,
                latitude: ret[i].latitude,
                longitude: ret[i].longitude,
                width: 20,
                height: 20,
                iconPath: "../icons/people_fill.png",
                title: ret[i].userName
              }
              mmarkers.push(marker);
            }
            that.setData({
              markers:mmarkers
            })
            
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
      
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: app.globalData.userId,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 20,
            height: 20,
            iconPath: "../icons/people_fill.png",
            title: "我的位置"

          }]
      })
    }})
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