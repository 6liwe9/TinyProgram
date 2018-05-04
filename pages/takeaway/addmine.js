// pages/takeaway/addmine.js
var content_data = require('../inheritance/type.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err: false,
    errMsg: '测试',
    index: 0,
    hasPic:false,
    title:'',
    content:''
    ,picIndex:0,
    picIds:[]
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
  savePic:function(){
    var that = this;
    wx.uploadFile({
      url: 'http://localhost/springmvc/pic/uploadPic.do', //
      filePath: that.data.pics[that.data.picIndex],
      name: 'pic',
      header: {
        "Content-Type":
        "multipart/form-data"
      },
      success: function (res) {
        res.data = JSON.parse(res.data);
        if(res.data.result=='success'){
          var arr=that.data.picIds;
          arr.push(res.data.data);
          that.setData({
            picIndex: that.data.picIndex + 1,
            picIds: arr
          });
          if (that.data.pics.length > that.data.picIndex) {
            that.savePic();
          }else
            that.saveArticle();
        }else{
          that.showError('图片上传失败，请稍后再试！')
        }
        
      }
    })
  },
  saveArticle: function () {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'http://localhost/springmvc/article/addTakeArticle.do',
      data: {

          articleTitle: that.data.title,
          articleContent: that.data.content,
        type:that.data.arr[that.data.index],
        userId: app.globalData.userId,
        pics: that.data.picIds
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == 'success') {
          var toUrl="../article/article?articleId="+res.data.data; 
          wx.showToast({
            title: '保存成功',
            duration: 3000,
            success:function(){
              wx.navigateTo({
                url: toUrl
              })
            }
          })
        }else{
          that.showError('信息上传失败，请稍后再试！')
        }
        that.setData({
          index: 0,
          hasPic: false,
          title: '',
          content: ''
          , picIndex: 0,
          picIds: [], pics: null
        })
      }
    })
  },
  save:function(){
    if (this.data.title == '' || this.data.content == '' || this.data.index==0){
      this.showError("标题、类型或者内容为空，请填写！");
      return;
    }
    this.savePic();
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