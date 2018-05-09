// pages/inheritance/myMi.js
var content_data = require('./type.js')
var host = require('../../utils/host.js')
var content_data2 = require('../template/tabbar/tabbar.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err: false,
    errMsg: '测试',
    fatherText: '父',
    motherText: '母',
    children:null
  },
  listenCheckboxChange:function(e) {
    this.setData({ children: e.detail.value });
  },
  showMType: function () {
    this.setData({ showViewM: true, showViewF: false });
  },
  showFType: function () {
    this.setData({ showViewF: true, showViewM: false });
  },
  setTypeF: function (event) {
    var currentType = event.currentTarget.dataset.type;
    this.setData({ fatherText: currentType, showViewF: false });
  },
  setTypeM: function (event) {
    var currentType = event.currentTarget.dataset.type;
    this.setData({ motherText: currentType, showViewM: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeData: content_data.typeData,
      barData: content_data2.tabBarData
    });
  },
  showError:function(msg) {
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
  save:function(){
    if (this.data.fatherText == '父' || this.data.motherText=='母'||this.data.children==null){
      this.showError("父母或孩子的类型未填写！！！")
      return;
    }
    var that=this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: host.Url+'/springmvc/inherit/inherit_add.do',
      data: {
        fatherType: that.data.fatherText,
        motherType: that.data.motherText,
        children: that.data.children,
        userId: app.globalData.userId
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          wx.showToast({
            title: '保存成功',
            duration: 3000,   
          })
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