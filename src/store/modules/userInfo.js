
import * as types from '../mutation-types'
import Api from '@/assets/js/api'

const state = {
      accountID: 'hahahha',
      headPic: '',
      nickName: '',
      sex: '',
      cityCode: ''
}
//计算 state的过滤属性
const getters = {}

//修改 state 状态
const mutations = {
}
//异步修改 state的状态
let  timeStamp = Date.parse (new Date ()) / 1000;
const actions = {
  //获取个人信息
   [types.GET_KF_INFO](state,accountID){
      return new Promise((resolve,reject)=>{
        Api.getKfInfo({
          "accountID": accountID
        }).then(res => {
          console.log('res')
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
  },
  //获取服务单列表
  [types.LIST_ORDER](state,data){
    return new Promise((resolve,reject)=>{
      // 如果有发起人
      if(data.accountID){
        Api.listOrder({
          "status": data.status,
          "isKF":'1',
          "accountID":data.accountID
        }).then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })

      }else{
        //没有发起人
        Api.listOrder({
          "status": data.status,
          "isKF":'1'
        }).then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      }
    })
},
//获取推送过来的服务单列表
[types.LIST_PUSH_ORDER](state,data){
  return new Promise((resolve,reject)=>{
    // 如果有发起人
      Api.listPushOrder({
        "userStatus":'0',
        "orderStatus": '0',
        "accountID":data.accountID
      }).then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
},
[types.UPDATE_ORDER](state,data){
  return new Promise((resolve,reject)=>{
    Api.updateOrder(data).then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
[types.END_ORDER](state,o_id){
  return new Promise((resolve,reject)=>{
    Api.endOrder({
      "orderID": o_id
    }).then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
[types.OUT_KF_CHANNEL](state,data){ //客服退出频道
  return new Promise((resolve,reject)=>{
    Api.outKfChannel(data).then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
[types.JOIN_CHANNEL](state,info){
  console.log('GET_USER_INFO===')
  return new Promise((resolve,reject)=>{
    Api.joinChannel({
      "userInfo": {
          "accountID": info.accountID, 
          "nickName": info.user_name, 
          "headPic": info.user_avatar,
          "lng": info.lng,
        "lat": info.lat, 
          "userType": info.userType //1 -用户 2 客服 3-合伙人 4 -互助
      }, 
      "channelID": info.channelID,// 用户端发起不用传
      "orderID":info.orderID
  }).then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
//获取频道用户列表
// [types.CHANNEL_USER_LIST](state,channelID){
//   console.log('CHANNEL_USER_LIST===')
//   console.log(channelID)
//   return new Promise((resolve,reject)=>{
//     Api.channelUserList({
//       "channelID": channelID// 用户端发起不用传
//   }).then(res => {
//       resolve(res)
//     })
//     .catch(err => {
//       console.log(err)
//       reject(err)
//     })
//   })
// },

//频道详情 初始化频道 返回频道用户列表
[types.INIT_ORDER](state,data){
  console.log('INIT_ORDER===')
  console.log(data)
  return new Promise((resolve,reject)=>{
    Api.initOrder(data).then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
//聊天记录
[types.GET_CHAT_LOG](state,data){
  return new Promise((resolve,reject)=>{
    Api.getChatLog(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
//保存聊天记录
[types.ADD_CHAT_LOG](state,data){
  return new Promise((resolve,reject)=>{
    Api.addChatLog(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
//上传图片
[types.UPLOAD_OSS_IMG](state,data){
  return new Promise((resolve,reject)=>{
    Api.uploadOssImg(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
//上传音频
[types.UPLOAD_OSS_FILE](state,data){
  return new Promise((resolve,reject)=>{
    Api.uploadOssFile(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
},

//上传音频
[types.REFRESH_MSG_TOKEN](state,data){
  return new Promise((resolve,reject)=>{
    Api.refreshMsgToken(data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
},
}


export default {
    state,
    getters,
    actions,
    mutations

}