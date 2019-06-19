import Axios from './axios'
let Api = {}

// 获取用户信息
 Api.getKfInfo = (data = {})=>Axios('/api/uc/getKfInfo',data,'post')

 //服务单列表  1-创建 2-正在服务 3-服务结束 4-系统取消
 Api.listOrder = (data = {})=>Axios('/api/uorder/listOrder',data,'post')

  //服务单列表  0-发起 1-已经接入 2-解散 3-删除 
  Api.listPushOrder = (data = {})=>Axios('/api/uorder/listPushOrder',data,'post')
 //创建服务单 
 Api.createOrder = (data = {})=>Axios('/api/uorder/createOrder',data,'post')

//接单
Api.updateOrder = (data = {})=>Axios('/api/uorder/updateOrder',data,'post')

//获取所有在线客服的列表
Api.getKfList = (data = {})=>Axios('/api/uc/getKfList',data,'post')
// 切换客服
Api.changeKf = (data={})=>Axios('/api/uc/changeKf',data,'post')

//结束服务单
Api.endOrder = (data = {})=>Axios('/api/uorder/endOrder',data,'post')

//结束服务单
Api.outKfChannel = (data = {})=>Axios('/api/umsg/outKfChannel',data,'post')

//系统相关的接口变动
Api.joinChannel = (data = {})=>Axios('/api/UMsg/joinChannel',data,'post')

//频道内用户列表  包括类型
// Api.channelUserList = (data = {})=>Axios('/api/uc/channelUserList',data,'post')

//刷新token  调取长连接接口
Api.refreshMsgToken = (data = {}) =>Axios('/invokMessage/account/refreshMsgToken',data,'post')

//初始化频道  返回频道用户列表
Api.initOrder = (data={})=>Axios('/api/uOrder/initOrder',data,'post')

// 2.12 获取用户实时的位置 经纬度
Api.getUserLocation = (data={})=>Axios('/api/uc/getUserLocation',data,'post')

//聊天记录
Api.getChatLog = (data={})=>Axios('/api/umsg/getChatLog',data,'post')

//查询聊天记录 
Api.getChatList = (data={})=>Axios('/api/umsg/getChatList',data,'post')

//保存聊天记录
Api.addChatLog = (data={})=>Axios('/api/umsg/addChatLog',data,'post')

//上传图片接口
Api.uploadOssImg = (data={})=>Axios('/api/Upload/uploadOssImg',data,'post')
//上传语音接口
Api.uploadOssFile = (data={})=>Axios('/api/upload/uploadOssFile',data,'post')

//
export default Api
