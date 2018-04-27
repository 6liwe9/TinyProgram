// pages/inheritance/inheritance.js
var content_data = require('./type.js')
var content_data2 = require('../template/tabbar/tabbar.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err:false,
    errMsg:'测试',
    fatherText:'父',
    motherText:'母',
    text:'结果根据蜜友共享数据计算,后期将推出根据大量数据进行遗传推导功能',
    userCnt:null,
    usegender:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ typeData: content_data.typeData, 
    barData: content_data2.tabBarData});
    var p = this;
    wx.request({
      url: 'https://www.mymiwo.club/springmvc/inherit/inherit_cnt.do',
      data: {
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          p.setData({ userCnt: res.data.data });
        }
      }
    })
  },
  showError(msg){
    this.setData({
      err: true,
      errMsg: msg
    })
    var that=this;
    setTimeout(function () {
      that.setData({
        err: false,
      })

    }.bind(this), 3000)

  }
  ,
  switchChange:function(e){
    this.setData({
      usegender: e.detail.value
    }
    )
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
    if (this.data.fatherText == '父' || this.data.motherText == '母') {
      this.showError("父母类型没有选择！！！")
      return;
    }
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.mymiwo.club/springmvc/inherit/inherit_calculate.do',
      data: {
        fatherType: that.data.fatherText,
        motherType: that.data.motherText,
        useGender:that.data.usegender
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          that.setData({
            text: res.data.data
          })
          }}
    })

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