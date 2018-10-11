
// 版本号
const v1 = '/v1'
/**
 * 接口文件，按需加载某个/多个接口
 * url     接口连接
 * method  调用方法
 * version 接口版本号
 * join    是否将参数连接到url上，参数是字符串数组
 */
export const getVerifyCode = { url: '/sms/send/1', method: 'POST', version: v1 } // 获取验证码
export const getLogin = { url: '/auth/token', method: 'POST', version: '' } // 登录
export const getOpenId = { url: '/auth/token', method: 'GET', version: '' } // 获取openid
export const verifySms = { url: '/sms', method: 'GET', version: v1, join: true } // 短信验证
export const restPassword = { url: '/member/api/rest/password', method: 'PUT', version: v1 } // 重置密码

// 收货地址
export const addDelivery = { url: '/delivery/api', method: 'POST', version: v1 } // 新增地址
export const delDelivery = { url: '/delivery/api', method: 'DELETE', version: v1, join: true } // 删除地址
export const idDelivery = { url: '/delivery/api', method: 'GET', version: v1, join: true } // 地址详情
export const updateDelivery = { url: '/delivery/api', method: 'PUT', version: v1 } // 更新地址
export const listDelivery = { url: '/delivery/api/page-list', method: 'GET', version: v1 } // 地址列表

// 收藏
export const collectionList = { url: '/member/collection/list', method: 'GET', version: v1 } // 列表
export const opCollection = { url: '/member/collection', method: 'POST', version: v1 } // 新增 / 取消
export const isCollection = { url: '/member/collection/check', method: 'POST', version: v1 } // 是否收藏

// 分类
export const category = { url: '/goods/categorys', method: 'GET', version: v1 } // tab

// 更多商品
export const goodsList = { url: '/goods/list', method: 'GET', version: v1 }// 列表
export const goodsDetail = { url: '/goods/details', method: 'GET', version: v1, join: true }// 列表

// 购物车
export const addCart = { url: '/cart/add', method: 'POST', version: v1 } // 添加购物车
export const updateCart = { url: '/cart', method: 'PUT', version: v1 } // 修改购物车数量
export const delCart = { url: '/cart', method: 'DELETE', version: v1, join: true } // 删除购物车商品
export const listCart = { url: '/cart/carts', method: 'GET', version: v1 } // 购物车列表

// 获取订单详情
export const goodOrderData = { url: '/order/detail', method: 'POST', version: v1 }
// 确认订单
export const createOrderData = { url: '/order/create', method: 'POST', version: v1 }
// 检查订单
export const checkOrderData = { url: '/order/check', method: 'GET', version: v1, join: true }
// 支付
export const payMoney = { url: '/pay/pay', method: 'POST', version: '' }

// 获取会员资料
export const memberData = { url: '/member/api/obtainMemberData', method: 'GET', version: v1 }

// 设置会员基础信息
export const setMemberData = { url: '/member/api/settingMemberBasics', method: 'PUT', version: v1 }

// 完善会员信息
export const setPerfect = { url: '/member/api/perfect', method: 'PUT', version: v1 }

// 检查会员手机号码存在
export const checkPhone = { url: '/member/api/check', method: 'GET', version: v1, join: true }

// 修改会员手机号
export const updateMemberPhone = { url: '/member/api/updateMemberPhone', method: 'PUT', version: v1 }

// 发票
export const addInvoice = { url: '/invoice/api', method: 'POST', version: v1 } // 新增
export const updateInvoice = { url: '/invoice/api', method: 'PUT', version: v1 } // 修改

// 个人中心
export const memberCenter = { url: '/member/api/center', method: 'GET', version: v1 }

// 订单
export const OrderList = { url: '/order/member/orders', method: 'GET', version: v1 } // 订单列表
export const cancelOrder = { url: '/order/cancel', method: 'PUT', version: v1, join: true } // 取消订单
export const subOrderDetail = { url: '/order/detail', method: 'GET', version: v1, join: true } // 子订单详情
export const refundOrderDetail = { url: '/order/detail', method: 'GET', version: v1, join: true } // 退款订单详情
export const confirmGoods = { url: '/order/confirm/goods', method: 'PUT', version: v1, join: true } // 确认收货
export const orderSince = { url: '/order/since', method: 'GET', version: v1, join: true } // 提货信息
export const pickUp = { url: '/order/since', method: 'PUT', version: v1, join: true } // 确认自提
export const orderSearch = { url: '/order/member/search', method: 'GET', version: v1 } // 订单搜索

// 国际品牌
export const brandList = { url: '/article/api/brand/info', method: 'GET', version: v1 } // 列表

// 故事
export const storyTabs = { url: '/article/api/child', method: 'GET', version: v1, join: true } // tab
export const storyKnow = { url: '/article/api/story/knowledge', method: 'GET', version: v1 } // 故事-识物
export const storyWord = { url: '/article/api/story/wordOfMouth', method: 'GET', version: v1 } // 故事-口碑产品
export const storySub = { url: '/article/api/story/subject', method: 'GET', version: v1 } // 故事-专题

// 体验馆
export const inforSpace = { url: '/experience/read/list', method: 'GET', version: v1 } // 列表

// 文件上传
export const fileUpload = { url: '/file/upload/', version: '' }

// 限时购
export const timeLimit = { url: '/activity/api/activity/goods/list', method: 'GET', version: v1 }

// 意见反馈
export const feedback = { url: '/view/feedback/api', method: 'POST', version: v1 }

// 发现
export const bannerList = { url: '/ad/api/ad-list', method: 'GET', version: v1, join: true } // banner
export const discoverTab = { url: '/article/api/outline', method: 'GET', version: v1, join: true } // 分类
export const recommend = { url: '/article/api/find/recommend', method: 'GET', version: v1 } // 推荐
export const hotel = { url: '/article/api/find/hotel', method: 'GET', version: v1 } // 酒店
export const houseGoods = { url: '/article/api/find/householdGoods', method: 'GET', version: v1 } // 居家用品

// 酒店详情接口
export const hotelDetailList = { url: '/article/api/detail', method: 'GET', version: v1, join: true } // 分类

// 店铺地址
export const storeAddr = { url: '/shop/record/all', method: 'GET', version: v1 } // 列表

// 购物车数量
export const cartNum = { url: '/cart/count', method: 'GET', version: v1 }

// 评论
export const comment = { url: '/comment', method: 'POST', version: v1 } // 新增
export const commentList = { url: '/comment', method: 'GET', version: v1 } // 列表

// 退货退款
export const applyAfterSales = { url: '/afterSales/applyAfterSales', method: 'POST', version: v1 }
export const submitLogic = { url: '/afterSales/deliveryAfterSales', method: 'POST', version: v1 }

// 仅退款
export const deliverAfterSales = { url: '/afterSales/deliverAfterSales', method: 'POST', version: v1 }

// 快递查询
export const express = { url: '/express/order-kuaidi', method: 'GET', version: v1 }
export const logisticsCompany = { url: '/logisticsCompany/list-logisticsCompany-all', method: 'GET', version: '' }
