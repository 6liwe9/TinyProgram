var content_for = {
  bar:[
  {
    barUrl: '../mIndex/mIndex',
    text: '主页',
    image: '../icons/1.png'
  },
  {
    barUrl: '../takeaway/takeaway',
        text: '带走',
        image: '../icons/2.png'
  },
  {
    barUrl: '../inheritance/inheritance',
    text: '遗传',
    image: '../icons/3.png'
  },
 
  {
    barUrl: '../upload/upload',
    text: '上传',
    image: '../icons/4.png'
  }
  ,
  {
    barUrl: '../buy/buy',
    text: '淘货',
    image: '../icons/2.png'
  }
    ,
  {
    barUrl: '../upload/upload',
    text: '我的',
    image: '../icons/1.png'
  }
  ]
}
//输出出口
module.exports = {
  tabBarData: content_for
}