import Api from '../../../utils/config/api.js';
var utils = require('../../../utils/util.js');
let app = getApp()

Page({
  data: {
    posts_key: [],
    nearbydatas:['由近到远'],
    fooddatas: ["日本菜", "私房菜", "家常菜", "下午茶", "创意菜", "湖北菜", "粉面馆", "川菜", "卤味", "湘菜", "粤菜", "咖啡厅", "小龙虾", "火锅", "海鲜", "烧烤", "小吃快餐", "江浙菜", "韩国料理", "东南亚菜", "西餐", "自助餐", "面包甜点", "其他美食"],    
    sortingdatas:['人气排序'],
    page: 1,
    isScroll: true,
    ismodel: false,
    isnearby: false,
    isfood: false,
    issorting: false,
    reFresh: true
  },
  onLoad: function (options) {
    this.getData();
  },
  onShow: function () {
  },
  onHide: function () {
    // this.setData({
    //   posts_key: [],
    //   page: 1,
    //   reFresh: true
    // })
  },
  getData: function (num,data) {
    let _parms = {
      locationX: app.globalData.userInfo.lng,
      locationY: app.globalData.userInfo.lat,
      page: this.data.page,
      rows: 8
    }
    if(num ==1){ //附件

    }else if(num == 2){ //美食类别 
      _parms.businessCate = data
    }else if(num ==3){  //综合排序
      _parms.browSort = '2'
    }
    Api.shoplist(_parms).then((res) => {
      let data = res.data;
      if (data.code == 0 && data.data.list != null && data.data.list != "" && data.data.list != []) {
        let posts_key = this.data.posts_key;
        for (let i = 0; i < data.data.list.length; i++) {
          posts_key.push(data.data.list[i]);
        }
        this.getDistance(posts_key) //计算距离并赋值
        this.setData({
          reFresh: true
        });
      } else {
        this.setData({
          reFresh: false
        });
      }
    })
  },
  getDistance: function (data) { //计算距离
    let that = this;
    //获取当前位置
    wx && wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        //计算距离
        for (let i = 0; i < data.length; i++) {
          if (!data[i].locationX || !data[i].locationY) {
            return;
          }
          let _dis = utils.calcDistance(data[i].locationY, data[i].locationX, res.latitude, res.longitude);
          //转换显示
          let mydis = '<' + utils.transformLength(_dis);
          data[i].dis = mydis;
        }
        that.setData({
          posts_key: data
        })
      },
      fail: function (res) {
        utils.toast("error", '定位失败，请刷新页面重试');
      }
    });
  },
  //获取搜索框内的值
  onInputText: function (e) {
    // this.setData({
    //   searchValue: e.detail.value
    // })
    let _parms = {
      searchKey: e.detail.value
    }
    Api.shoplist(_parms).then((res) => {
      if (res.data.code == 0 && res.data.data.list != [] && res.data.data.list != '') {
        this.setData({
          posts_key: res.data.data.list
        });
      }
    })
  },
  // onSearchInp: function () {
  //   let _parms = {
  //     searchKey: this.data.searchValue
  //   }
  //   Api.shoplist(_parms).then((res) => {
  //     this.setData({
  //       posts_key: res.data.data.list
  //     });
  //   })
  // },
  //点击列表跳转详情
  onTouchItem: function (event) {
    wx.navigateTo({
      url: '../merchant-particulars/merchant-particulars?shopid=' + event.currentTarget.id,
    })
  },
  //用户上拉触底
  onReachBottom: function () {
    if (this.data.reFresh) {
      this.setData({
        page: this.data.page + 1
      });
      this.getData();
    }
  },





// 模态框 start
  openmodel: function (e) {  //打开模态框
    let id = e.currentTarget.id
    this.setData({
      ismodel: true,
      isScroll: false
    })
    if (id == 1) {
      this.setData({
        isnearby: true
      })
    } else if (id == 2) {
      this.setData({
        isfood: true
      })
    } else if (id == 3) {
      this.setData({
        issorting: true
      })
    }
  },
  closemodel: function () {  //关闭模态框
    this.setData({
      ismodel: false,
      isnearby: false,
      isfood: false,
      issorting: false,
      isScroll:true
    })
  },
  nearby: function () {  //附近
    this.setData({
      isnearby: true,
      isfood: false,
      issorting: false
    })
  },
  goodfood: function () {  //美食
    this.setData({
      isnearby: false,
      isfood: true,
      issorting: false
    })
  },
  sorting: function () {   //综合排序
    this.setData({
      isnearby: false,
      isfood: false,
      issorting: true
    })
  },
  clicknearby:function(ev){ //附近之一
    let id = ev.currentTarget.id
    let _data = this.data.nearbydatas
    let _value = ''
    for (let i = 0; i < _data.length; i++) {
      if (id == i) {
        _value = _data[i]
      }
    }
    this.closemodel()
    this.getData(1, _value)
  },
  clickfood: function (ev) { //美食之一
    let id = ev.currentTarget.id
    let _data = this.data.fooddatas
    let _value =''
    for(let i=0;i<_data.length;i++){
      if(id == i){
        _value = _data[i]
      }
    }
    this.closemodel()
    this.getData(2,_value)
  },
  clicksorting: function (ev) { //综合排序之一
    let id = ev.currentTarget.id
    let _data = this.data.sortingdatas;
    let _value = ''
    for (let i = 0; i < _data.length;i++){
      if(id == i){
        _value = _data[i]
      } 
    }
    this.closemodel()
    this.getData(3,_value)
  }

//模态框 end
})