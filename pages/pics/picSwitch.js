// pages/pics/picSwitch.js
var content_data = require('../inheritance/type.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auto:false,
    animate1:null,
    animate2:null,
    curr:0,
    picPos:0,
    picArr:[],
    index: 0,
    hate:0,
    like:0
  },

  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
    this.initImages(this.data.array[e.detail.value]);
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
    this.initImages(typearray[0]);
  },
  initImages:function(type){
    var p = this;
    wx.request({
      url: 'http://114.116.9.92/springmvc/hello/wx_image.do',
      data: {
        sortType: type
      },
      method: "GET",
      success: function (res) {
        p.setData({
          picArr: res.data.imageUrl
        });
        var p1 = p.data.picArr[0];
        var p2 = p.data.picArr[1];
        var now=p.data.curr;
        if (now == 0)
          p.setData({
            pic1:p1,
            pic3: p2,
            pic2: p2
          });
        if (now == 1)
          p.setData({
            pic1: p2,
            pic3: p2,
            pic2: p1
          });
        if (now == 2)
          p.setData({
            pic1: p2,
            pic3: p1,
            pic2: p2
          });
        p.setData({
          picPos: 2,
          curr: 0
        })
      }
    })
  },
  getImages:function(type){
    var p=this;
    wx.request({
      url: 'http://114.116.9.92/springmvc/hello/wx_image.do',
      data: {
        sortType:type
      },
      method: "GET",
      success: function (res) {
        p.setData({
          picArr: res.data.imageUrl,
          picPos: 0 
        });
      }
    })
  },
  change:function(e){
    var now=e.detail.current;
    var pre=this.data.curr;
    var dir=''
    if(now-pre==1)
      dir="left";
    if(now-pre==-1)
      dir="right";
    if(now-pre==-2)
      dir="left";
    if(now -pre==2)
      dir="right";
    var pos=this.data.picPos;
      
    var pic = this.data.picArr[pos];
    if(pos==6){
      this.getImages(this.data.array[this.data.index]);
    }
    var p=this;
    this.setData({ picPos: pos + 1, curr:now});
    setTimeout(function () {
      if (now == 0)
        p.setData({
          pic3: pic,
          pic2: pic
        });
      if (now == 1)
        p.setData({
          pic3: pic,
          pic1: pic
        });
      if (now == 2)
        p.setData({
          pic2: pic,
          pic1: pic
        });
    }.bind(this), 500)
   
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease-out",
    })
    animation.scale(2, 2).step();
    if (dir == 'left') {
      this.setData({
        animate1: animation.export()
      })
    }
    else {
      this.setData({
        animate2: animation.export()
      })
    }
    setTimeout(function () {
      animation.scale(1, 1).step();
      if (dir == 'left') {
        this.setData({
          animate1: animation.export()
        })
      }
      else {
        this.setData({
          animate2: animation.export()
        })
      }
    }.bind(this), 500)
  },
  viewPic:function(e){
    wx.previewImage({
       
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