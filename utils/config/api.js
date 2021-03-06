import MyHttp from './request.js';
import { myStore } from '../tools/store';

//所有的请求
const ALL_API = {
  userlist: { //openId登录
    method: 'POST', 
    url: 'user/list'
  },
  getOpenId:{  //获取openId
    method:'POST',
    url:'wxpay/getOpenId'
  },
  useradd:{
    method:'POST',
    url:'user/add'
  },
  usersignup: {
    method: 'POST',
    url: 'user/signup'
  },
  shoptop: {   //分页查询热门商家列表   推荐餐厅
    method: 'GET',
    url: 'shop/top'
  },
  shoplist: {   //根据条件查询商家列表信息， 分页查询商家列表信息
    method: 'GET',
    url: 'shop/list'
  },
  shopget: {   //根据id查询商家信息
    method: 'GET',
    url: 'shop/get'
  },
  actlist: {   //分页查询活动列表
    method: 'GET',
    url: 'act/list'
  },
  acttop: {   //热门活动列表
    method: 'GET',
    url: 'act/top'
  },
  hcllist: {  //首页轮播图
    method: 'GET',
    url: 'hcl/list'
  },
  topictop: { //首页美食墙
    method: 'GET',
    url: 'topic/top'
  },
  topiclist: {   //主题列表  
    method: 'GET',
    url: 'topic/list'
  },
  actget: {   //根据id查询一条活动信息
    method: 'GET',
    url: 'act/get'
  },

  actshoplist: {  //查询参加某一活动的商家
    method: 'GET',
    url: 'actshop/list'
  },
  actshoptop: {  //根据编号或名称搜索查询参加某一活动的商家某个商家
    method: 'GET',
    url: 'actshop/top'
  },
  merchantEnter: {   //商家入驻信息
    method: 'POST',
    url: 'shopEnter/add'
  },
  terraceRoll: {   //享七劵列表
    method: 'GET',
    url: 'sku/list'
  },
  paymentPay: {   //享七劵列表
    method: 'POST',
    url: '/wxpay/pay'
  },
  voteadd: {  //投票
    method: 'POST',
    url: 'vote/add'
  },
  votedelete: {   //取消投票
    method: 'POST',
    url: 'vote/delete'
  },
  topicadd:{  //文章列表
    method:'POST',
    url:'topic/add'
  },
  getTopicByZan:{ //获取某个文章详情
    method:'GET',
    url:'topic/getTopicByZan'
  },
  cmtlist: {  //查询文章评论
    method:'GET',
    url:'cmt/list'
  },
  cmtadd:{   //新增文章评论
    method:'POST',
    url:'cmt/add'
  },
  zanadd:{   //点赞
    method:'POST',
    url:'zan/add'
  },
  zandelete:{   //取消点赞
    method: 'POST',
    url: 'zan/delete'
  },
  doUnifiedOrder: { //支付接口
    method: 'POST',
    url: 'wxpay/doUnifiedOrder'
  },
  topicadd: {  //新增文章主题
    method: 'POST',
    url: 'topic/add'
  },
  somyorder:{  //我的订单列表
    method:"GET",
    url:'so/myorder'
  },
  socreate:{  //创建支付订单
    method:'POST',
    url:'so/create'
  },
  skutsc:{  //推荐餐厅
    method:'GET',
    url:'sku/tsc'
  },
  photograph: {  //店铺详情图片
    method: 'GET',
    url: 'shop/get'
  },
  takepartin: {  //商家报名活动
    method: 'POST',
    url: 'actshop/add'
  },
}

const Api = new MyHttp({}, ALL_API);

export default Api;