<template>
  <div class="main">
    <!-- 导航开始 -->
    <div class="nav-bar">
      <div class="nav-left">
        <img  src="../assets/kefulogo.jpg" :onerror="errorImgSrc" alt="">
        <div>
        <h3 @click="updataMapOverview">加马——船帮帮客服工作平台</h3>
        <p>Jiama Service</p>
        </div>
      </div>
      <div class="nav-right">
        <img :src="userInfo.headPic" :onerror="errorImgSrc" alt="">
        <div>
        <p>{{userInfo.nickName}}</p>
        </div>
        <button @click="workquit">准备下班 <i class="iconfont icon-shangxiaban-copy"></i> </button>
      </div>
    </div>
    <audio id="callout" src="./public/callout.mp3"></audio>
    <audio id="off" src="./public/off.mp3"></audio>
     <!-- 确认下班 dialog-->
        <!-- <el-dialog
          :visible.sync="dialogVisibleOff"
          width="30%"
          center>
          <div class="dialogVisibleOff">
            <div >
              <i class="iconfont icon-guanbi"></i>
              <p class="guanbi-p" style="color: #ff5f49;">下班退出</p>
            </div>
        <p style="margin-top: 50px;margin-bottom: 20px;">今天已经工作了</p>
        <p  style="font-size: 20px; font-weight: bold; color: black;">{}小时{}分钟{}秒</p>
        <button class="Off-button">
          确认下班
        </button>
        <p style="font-size: 16px;color: #4ed7d1;" @click="dialogVisibleOff=false">
          我点错了，继续努力
        </p>

      </div>
    </el-dialog> -->
    <!-- 咨询刮起确认下班 -->
     <!-- <el-dialog
      :visible.sync="dialogVisiblereadyOff"
      width="30%"
      center>
      <div class="dialogVisibleOff">
        <div >
          <i class="iconfont icon-guanbi"></i>
          <p class="guanbi-p" style="color:#4cd1cc">准备下班</p>
        </div>

        <p style="margin-top: 50px;margin-bottom: 20px;">有效的消息能让我们的工作效率更加提高</p>
        <p  >点击准备下班将不会再为您介入新的咨询用户</p>
        <button class="Off-button" style="background-color:#4ed7d1">
          确认
        </button>
        <p style="font-size: 16px;color: #4ed7d1;" @click="dialogVisiblereadyOff=false">
          我点错了，继续努力
        </p>

      </div> -->
    <!-- </el-dialog> -->
    <!-- 咨询刮起确认下班 -->
     <el-dialog
      :visible.sync="readyWorkOut"
      width="30%"
      center>
      <div class="dialogVisibleOff">
        <div >
          <i class="iconfont icon-guanbi"></i>
          <p class="guanbi-p" style="color:#ff5f49">下班退出</p>
        </div>
        <p class="dialog-p" style="margin-top: 20px;margin-bottom: 20px;">今天已经工作了</p>
        <p style="font-size: 18px; font-weight: bold; color: black;">{{duration}}</p>

        <p v-if="this.innerLeftList.length>=1" class="dialog-p" style="margin-top: 20px;margin-bottom: 20px;">当前有{{this.innerLeftList.length}}个咨询对话未结束</p>
        <p v-if="this.innerLeftList.length>=1" class="dialog-p">您可以选择移交给别的客服进行服务</p>
        <button v-if="this.innerLeftList.length>=1"  @click="transfer" class="Off-button" style="background-color:#4ed7d1; margin-top: 22px;">
          移交咨询
        </button>
        <button  @click="holdout" class="Off-button" style="background-color:#ff5f49;  margin-bottom: 21px;">
          确定下班
        </button>
        <p style="font-size: 16px;color: #4ed7d1;margin-bottom: 10px;" @click="dialogVisiblereadyOff=false">
          我点错了，继续努力
        </p>

      </div>
    </el-dialog>
     <!-- 准备下班 -->
     <el-dialog
      :visible.sync="dialogVisibleTransfer"
      width="760px"
      title='移交给'
      center>
      <div class="dialogTransfer">
        <div v-for="(item,index) in TranserList" :key="index" @click="SelectTransfer(item,index)"> 
          <span>
            <i class="iconfont icon-selected" v-if="Tindex==index" ></i>
            <i class="iconfont icon-yuan" v-if="Tindex!==index"></i>
          </span>
          <img :src="item.headPic" alt="">
          <p>{{item.nickName}}</p>
        </div>
      </div>
      <div  class="endOrder-button">
       <button @click="dialogVisibleTransfer=false">取消</button> <button @click="userTransfer">确认</button>
     </div>
    </el-dialog>
    <!-- 导航结束 -->
    <!-- inner start -->
    <div class="inner">
      <!-- 左边侧栏开始 -->
    <div class="inner-left">
      <el-tabs type="border-card" style="width: 100%;" >
        <el-tab-pane :label="currentService" >
      <ul>
        <li v-for="(item,idx) in innerLeftList" :key = idx  @click="getMessageInfo(item,idx,'start')" style="">
          <div class="inner-left-li-list"  :class="idx==index? 'messageListStyle' : ' '">

            <img :src="item.user_avatar" alt="">
            <div>
                <p >{{item.user_name}}</p>
                <span>{{item.start_time | timeFormat}}</span>
            </div>
            <div class="tip" v-if="item.tip>0">{{item.tip}}</div>
            <div class="leftListCover" v-if="item.leftListCover">
              当前服务单已被用户结束
            </div>
          </div>
        </li>
      </ul>
    </el-tab-pane>
    <el-tab-pane label="已结束服务">
      <ul>
        <li v-for="(item,endidx) in endOrderList" :key = endidx @click="getMessageInfo(item,endidx,'end')">
          <div class="inner-left-li-list"  :class="endidx==endindex? 'messageListStyle' : ' '" >
            <img :src="item.user_avatar" alt="">
            <div >
                <p >{{item.user_name}}</p>
                <span>5分钟前</span>
            </div>
          </div>
        </li>
      </ul>
      </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 左边侧栏结束 -->
    <!-- 地图开始 -->
    <div class="locationSign">
      位置: {全国}
    </div>
    <div class="SwitchPage" @click="SwitchPage" v-show='containerVisible2'>
      点击进入抢单页面
    </div>
    <div class="seachLocation" v-show='containerVisible2'>
      <div class="">
      <i class="iconfont icon-iconfontzhizuobiaozhun22"></i> <input type="text" id="suggestId" size="20" placeholder="用户附近搜索" style="width:150px;" />
      </div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    </div>
    <div v-show='containerVisible' id="container">
    </div>
    <div v-show='containerVisible2' id="container2">
    </div>
    <!-- 地图结束 -->
    <!-- 结束咨询开始 end order -->
    <el-dialog
          class="endOrder"
          :visible.sync="dialogVisibleEndOrder"
          width="38%"
          title="结束咨询"
          center>
         <div  class="endOrder-time">
          <div >
            <p>咨询时间</p>
            <p class="time bg">{{startTime}}</p>
          </div>
          <div >
            <p>结束时间</p>
            <p class="time bg">{{endTime}}</p>
          </div>
          <div >
            <p>服务时长</p>
            <p class="time">{{duration}}</p>
          </div>
         </div>
         <!-- 地址 -->
         <div  class="endOrder-adress">
           <p>咨询地址</p>
           <div v-if="edit==0" class="bg text">请输入地址</div>
           <input v-else-if="edit==1" class="bg" type="text" placeholder="请输入地址" v-model="inputEndOrderAdress">
            <i class="iconfont icon-iconfront-" @click="edit=1"></i>
         </div>
          <!-- 问题描述 -->
         <div  class="endOrder-desc">
           <p>咨询问题描述</p>
          <el-input
          type="textarea" class="bg"
          :autosize="{ minRows: 5, maxRows: 20}"
          placeholder="请输入内容"
          v-model="textareaEndOrderDesc">
        </el-input>
         </div>
         <div  class="endOrder-button">
           <button @click="dialogVisibleEndOrder=false">取消</button> <button @click="EndOrder">确认</button>
         </div>
        </el-dialog>
    <!--  呼叫列表弹出  -->
    <div v-if="callShow" class="callListDialog">
        <div class="userListBox">
            <div class="header">
                选择呼叫的人员
                <i @click="hiddenDialog" class="el-icon-close"></i>
            </div>
<!--            v-if="userInfo.userId !== item.userId"-->
            <ul v-if="callUserList.length !== 0">
                <li @click="ischeck(item)" v-for="(item,index) in callUserList" :key="index">
                    <i v-if="!item.check" class="iconfont icon-weigouxuan"></i>
                    <i v-if="item.check" class="iconfont icon-gouxuan-xuanzhong-yuankuang"></i>
                    <img :src="item.headPic" alt="">
                    <span>{{item.nickName}}</span>
                </li>
            </ul>
            <div v-if="callUserList.length !== 0" class="buttonBox">
                <!--          <el-button @click="allCheck">选择全部</el-button>-->
                <el-button @click="allNoCheck" type="info">全部取消</el-button>
                <el-button @click="startCall" type="primary">开始呼叫 ({{clickItemUserList.length}}人)</el-button>
            </div>
            <div style="width: 100%; text-align: center; height: 300px; line-height: 300px;letter-spacing: 3px; font-size: 22px; color: #ccc" v-if="callUserList.length === 0">无在线人员</div>
        </div>
    </div>
        <!--  个人信息弹出  -->
    <div v-if="infoShow" class="callListDialog infoDialog">
            <div class="infoBox">
                <div v-if="clickItemUserList.length === 1" class="info">
                    <img :src="clickItemUserList[0].headPic" alt="">
                    <span>{{clickItemUserList[0].nickName}}</span>
                </div>
                <ul v-if="clickItemUserList.length > 1">
                    <li v-for="(item,index) in clickItemUserList" :key="index">
                        <img :src="item.headPic" alt="">
                        <span>{{item.nickName}}</span>
                    </li>
                </ul>
                <div class="textarea">
                    <el-input
                            type="textarea"
                            :rows="3"
                            :maxlength = "72"
                            resize = "none"
                            placeholder="请输入呼叫理由(最多72个字)"
                            v-model="textarea">
                    </el-input>
                    <el-button @click="sureCall" type="primary">确认呼叫</el-button>
                    <p @click="infoShow = false">我点错了</p>
                </div>
            </div>
        </div>
    <!--  个人信息弹出  -->
    <div v-if="roomAdminShow" class="callListDialog roomDialog">
        <div class="infoBox">
            <div class="info">
                <img :src="clickItemUser.headPic" alt="">
                <span>{{clickItemUser.nickName}}</span>
            </div>
            <div class="textarea">
                <el-button @click="kickoutUser" type="primary">踢出通话</el-button>
                <p @click="roomAdminShow = false">关闭</p>
            </div>
        </div>
    </div>
    <!--  在线呼叫通话页面弹出  -->
    <div v-if="onlineCallShow" class="onlineCallDialog">
        <img class="bg" src="../assets/kefulogo.jpg" alt="">
        <div class="title">在线呼叫 {{callList.length}}人</div>
        <ul class="clearfix">
            <li @click="toAdminRoom(item)" v-for="(item,index) in callList" :key="index">
                <div v-if="!item.online"><i class="el-icon-more"></i></div>
                <img :src="item.headPic" alt="">
                <span :class="!item.online?'ccc': ''">{{item.nickName}}</span>
            </li><li v-if="callList.length < 9" @click="addCallUser" class="add">
            <i class="el-icon-circle-plus-outline"></i>
            <span>添加</span>
        </li>
        </ul>
        <div id="ado"></div>
        <div class="btn">
            <span @click="leaveRoom"><i class="iconfont iconguaduan"></i></span>
            <i @click="toMetud(true)" v-if="!metud" class="el-icon-microphone"></i>
            <i @click="toMetud(false)" v-if="metud" class="el-icon-turn-off-microphone"></i>
        </div>
    </div>
    <!--结束咨询结束  -->
    <!-- 内容右侧核心功能开始 -->
    <div class="inner-right" v-show="innerRightVisible">
      <div class="inner-right-nav">
        <span class="inner-right-nav-span">当前服务</span>
        <div style="width:57%;overflow: hidden;">
        <img v-for="(item,index) in innerRightOrderMember" :key = "index" :src="item.headPic" :onerror="errorImgSrc" :title="item.nickName">
        </div>
         <i class="iconfont icon-jiahao"></i>
        <p class="inner-right-nav-p" @click='EndOrderStart'>
          结束咨询
        </p>
      </div>
      <!-- socket 消息列表 -->
      <div class="inner-right-content" id="socketMessageList" >
        <p class="loadingStyle" v-if="loading">
          <img :src="loadingImg" alt="" >
        </p>
        <p class="loadingStyle" v-if="noMore">没有更多了</p>
        <ul id="socketMessageListUl"  class="list"> 
          <li v-for="(item,index) in chatMessageList" :key ='index'  class="list-item">
              <!-- 普通消息 -->
              <div v-if="item.msgType=='groupText' ||  item.msgType=='groupPic' ||  item.msgType=='groupVoice' || item.msgType=='groupMap'" :class="messageStyle(item.accountID)" >
                <img class="message-item-pic" :src="item.msgObj.sh" alt="" >
                <div data-v-79408788="" class="flex message-box">
                  <div>
                    <div class="message-box-top"><span class="name">{{item.msgObj.sn}}</span> <span class="day">{{item.msgTime | timeFormat}}</span> </div>
                    <div class="bubble_cont basi left">
                      <!-- 消息文本 -->
                      <div v-if="item.msgType=='groupText'" class="card1">
                        <p class="puretext font14 c333 wordbreak" style="height: auto;">{{item.msgObj.text}}</p>
                      </div>
                      <!-- 音频消息 -->
                      <div v-else-if="item.msgType=='groupVoice'" class="card1">
                        <video controls  name="media">
                        <source type="audio/aac" :src="item.msgObj.vu[0].url"/>
                        </video>
                      </div>
                      <!-- 地图消息 -->
                      <div v-else-if="item.msgType=='groupMap'" class="card1">
                        <!-- 创建地图定位 -->
                        <div :id="'groupMap'+item.msgTime" class="groupMap">
                        </div>
                      </div>
                      <!-- 图片消息 -->
                      <div v-else-if="item.msgType=='groupPic'" class="card1">
                        <img :src="item.msgObj.url" alt="">
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <!-- 系统消息 -->
            <p class="systemMessage" v-else-if="item.msgType=='kfNotice' ||  item.msgType=='kfWelcome' ||  item.msgType=='kfEnd'">
                {{item.msgObj.content}}
            </p>
            <p class="systemMessage" v-else-if="item.msgType=='groupEnd'">
                {{item.msgObj.content}}
            </p>
            <div class="userMessage" v-else-if="item.msgType=='userState'">
                <p v-if="item.msgObj.st==1">
                 {{item.msgTime | timeFormat}} {{item.msgObj.un}}上线了
                </p>
                <p v-if="item.msgObj.st==0">
                 {{item.msgTime | timeFormat}} {{item.msgObj.un}}下线了
                </p>
                <p v-if="item.msgObj.st==-1">
                 {{item.msgTime | timeFormat}} {{item.msgObj.un}}离开群组
                </p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 消息列表结束 -->
      <!-- 消息输入 -->
      <div class="inner-right-input">
       <el-input
       @keydown.enter.native="sendMessageInfo(socketMessageText,'groupText')"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 5}"
          placeholder="请输入聊天内容"
          v-model="socketMessageText">
        </el-input>
        <div class="inner-right-input-buttom">
          <div class="inner-right-input-buttom-left">
            <!-- 常用语 -->
            <el-popover
              ref="popover5"
              placement="top"
              v-model="visible2">
              <div class="CommonWord">
                  <p class="CommonTitle">常用话</p>
                <ul >
                  <li v-for="(item,index) in this.commonWordList" :key ='index'>
                   <div class="content">{{item}}</div> <div class="send" @click="sendMessageInfo(item,'groupText')">发送</div>
                  </li>
                </ul>
              </div>
            </el-popover>
            <div v-popover:popover5>常用语</div>
            <!-- 常见问题 -->
            <el-popover
              ref="popover4"
              placement="top"
              v-model="visible3">
              <div class="CommonWord">
                <p class="CommonTitle">常见问题</p>
                <ul>
                  <li v-for="(item,index) in this.commonProblemList" :key='index'>
                   <div class="content">
                     {{item}}
                    </div>
                    <div class="send" @click="sendMessageInfo(item,'groupText')">
                       发送
                    </div>
                  </li>
                </ul>
              </div>
            </el-popover>
            <div class="commonProblem" v-popover:popover4>常见问题</div>
            <div @click="sendLocation">发送位置</div>
          </div>
          <div class="bottom-right">
            <div class="inner-right-input-buttom-right">
              <input type="file" class="uploadInput" id='uploadInput' accept="image/*"  @change="sendImg">
              <i class="iconfont icon-tupian"></i>
                <i @click="toCall" class="iconfont icon-lianxi1"></i>
            <i class="iconfont icon-yanjizhushou-shangchuan_maikefeng" @click="Recording('start')"> </i>
            </div>
            <div class="sendMessage button" @click="sendMessageInfo(socketMessageText,'groupText')" >发送</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧核心功能结束 -->
    <!-- inner end -->
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import * as types from '@/store/mutation-types'
import Api from '../assets/js/api'
import axios from 'axios'
import utils from '../assets/js/utils'
import { setTimeout, setInterval } from 'timers';
import { async } from 'q';
export default {
  beforeRouteEnter (to, from, next) {
    console.log(to.path)
    let url = window.location.href.split('?')[1] || ""
    //获取url参数 存到session
    if(url&&url!==""){
      url.split('&').forEach(item=>{
        let query = item.split('=')
        sessionStorage.setItem(query[0],query[1])
      })
    }
    next()
  },
  created(){
    //获取个人信息
    this.ListData0={
        "status":"0",
        "accountID":this.accountID
        },
      this.ListData1={
        "status":"1",
        "accountID":this.accountID
      },
      this.ListData2 ={
        "status":"2",
        "accountID":this.accountID
      }
    this.$store.dispatch(types.GET_KF_INFO,this.accountID)
    .then(res=>{
      _this.userInfo = res
      sessionStorage.setItem('userInfo',res)
    }).catch(err=>console.log(err))

    if(!sessionStorage.getItem("accountID")){
        this.$router.push('/login')
    }
    //socket  token
    let _this = this
    //刷新msgtoken 并且开启长连接
    _this.$store.dispatch(types.REFRESH_MSG_TOKEN,{accountID:sessionStorage.getItem('accountID')})
   .then(res=>{
        initWebSocket()
        function initWebSocket(){
        //初始化websocket
        //建立连接
        _this.websocket = new WebSocket('wss://im-msg-weixin.jiama.online/wss')
        //建立成功
        _this.websocket.onopen = function (){ //连接成功事件
        console.log('websocket success')
          _this.websocket.send (JSON.stringify ({
                opt: "connect",
                accountID: _this.accountID,
                msgToken: res.msgToken,
                timestamp: 1559568992,
                lat: 31.01, //登陆时纬度
                lon: 121.01 //登陆时经度
          }))
          //获取已接单列表
          _this.getListOrder(_this.ListData1)

          //获取地图上未被接单的列表
          _this.getPushListOrder(_this.ListData0)
          //获取结束单列表
          _this.getEndOrderList(_this.ListData2)
        }
        //建立失败
          _this.websocket.onerror = function(){ //连接失败事件
          console.log("WebSocket连接发生错误");
          //  this.reconnect();
          }
          //接受信息
          _this.websocket.onmessage = function (event){ //接收服务器推送的信息
            //打印收到的服务器内容
            let data = JSON.parse(event.data)
            console.log(data)
            //开启心跳
            start()
            if(data.msgType=="kfNotice"){
                let List = []
                List.push(data)
                console.log(data)
                _this.updataPushMapOverview(List)
            }else if(data.msgType=="groupText" ||  data.msgType=='groupPic' ||  data.msgType=='groupVoice' || data.msgType=='groupMap'){
                  if(data.groupID==_this.currentServiceInfo.channelID){
                    _this.chatMessageList.push(data)
                    if(data.msgType=="groupMap"){
                    data.msgObj.map = JSON.parse(data.msgObj.map)
                    setTimeout(() => {
                      let map = new BMap.Map('groupMap'+data.msgTime);    //
                      let point = new BMap.Point(data.msgObj.map.lng, data.msgObj.map.lat);
                      map.centerAndZoom(point, 19);
                      let marker = new BMap.Marker(point)
                      map.addOverlay(marker)
                    }, 1)
                  }
                  _this.handleScroll()
                  }else{
                    // _this.innerLeftList.map(val)
                  }
            }else if(data.msgType=="kfWelcome" || data.msgType=="kfEnd" ){
                _this.chatMessageList.push(data)
            }else if(data.msgType=="groupEnd"){
              for (let it of _this.innerLeftList){
                if(it.orderID == data.orderID){
                  it.leftListCover = true
                }
              }
            }else if(data.msgType=="kfOrderSuccess"){
              setTimeout(()=>{
              let div = document.getElementsByClassName('Overlay'+data.msgObj.orderID)
              div.remove(div)

              },50)
            }
            setTimeout(()=>{
              _this.handleScroll()
            },50)
            
          }
        //连接关闭
          _this.websocket.onclose = function (e){
          clearTimeout(_this.timeoutObj)
          console.log("connection closed (" + e.code + ")");
          //重连
          reconnect()
          }
      }
      function reconnect(){//重新连接
          if(_this.lockReconnect){
            return
          }
          _this.lockReconnect = true
          //如果没有连上会一直重连，设置延迟避免请求过多
          _this.timeoutnum && clearTimeout(_this.timeoutnum);
          _this.timeoutnum = setTimeout(function(){
           // 新连接
            initWebSocket()
            _this.lockReconnect = false
          },false)
        }
      function start(){//开启心跳
        console.log('start  go')
        let time = 0
          _this.timeoutObj = setInterval(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息
            console.log('.11')
            let timeStamps = Date.parse (new Date ()) / 1000;
              _this.websocket.send(JSON.stringify ({
                opt: 'heart',
                accountID: _this.accountID,
                msgToken: _this.msgToken,
                timestamp: timeStamps,
                isKF: 1,
                gps: [{
                  E: 121.30692,
                  N: 31.16184,
                  V: 0,
                  D: - 1,
                  A: 13,
                  T: timeStamps
                }]
              }));
          },30000)
        }
    }).catch(err=>{
      console.log(err)
    })
    //获取服务单列表
  },
  name: 'index',
  props: {
    msg: String
  },
  data() {
    return {
      errorImgSrc: 'this.src="'+ require('../assets/ServiceLogo.png') + '"',
      orderhelp:require('../assets/orderhelp.jpg'),
      orderSOS:require('../assets/orderSOS.jpg'),
      loadingImg:require('../assets/loading.gif'),
      clock:require('../assets/clock.png'),
      currentO_id:"",
      containerVisible:true,
      containerVisible2:false,
      //客服个人信息
      userInfo:{},
      //工单推送信息
      userPointLocationOrderInfo:[],
      //右侧已推送工单列表
      innerLeftList:[],
      //获取左侧列表
      ListData0:{},
      ListData1:{},
      ListData2 :{},
      accountID:sessionStorage.getItem('accountID'),
      accessToken:sessionStorage.getItem('accessToken'),
      //右边长连接消息详情
      innerRightMessageInfo:[],
      //右边成员列表
      innerRightOrderMember:[],
      //当前服务
      currentServiceNum:0,
      currentService:"当前服务(0)",
      //已结束服务单列表
      endOrderList:[],
      dialogVisibleTransfer:false,
      TranserList:[],//转移在线客服列表,
      commonWordList:['问候语ni好吗','我不好你个垃圾','我可以帮您查路况，查地点，设置导航位置，没事唠嗑也行！也可以帮你查周围的停车、加油等服务点。'],//常用语消息列表
      commonProblemList:['车子有问题拿去卖破烂','车子没问题拿去卖铁'],
      beTransfer:"",
      edit:0,//是否编辑
      inputEndOrderAdress:"上海市-普陀区-镇坪路389号",
      textareaEndOrderDesc:"请描述用户所咨询的问题",
      startTime:'',//咨询开始时间
      endTime:'', //咨询结束时间
      duration:'',
      textarea: '',
      currentAdvisory:0,//当前咨询个数
      status: "1",
      socketMessageText:"",
      index:Number,//右侧列表下标
      endindex:Number,
      Tindex:Number, //转移下标
      leftListActive:"",
      visible2: false,
      visible3: false,
      innerRightVisible:false,
      readyWorkOut:false,
      dialogVisibleEndOrder:false,
      ak: 'G1ZqRQeFuAutcV5NYPiVvdaMNQ5tWpp9',
      currentServiceInfo:{},//当前服务信息,
      map:{},//地图
      map2:{},//地图
      BMap:{},
      currentGps:{},
      searchLocation:{},//搜索当前地址
      Overlay:{},
      Point:{},
      // socket 部分
      msgToken:'',
      websocket:null,//建立的连接
      //消息列表部分
      chatMessageList:[],
      loading: false,
      zcount:0,//当前个数
      count:0,//总个数
      page:0,//当前页数,
      noMore:false,
      recordingVisible:true, //录音对话框
      lockReconnect:false,
      timeout:2*1000,//30秒一次的心跳
      timeoutObj:null,//心跳倒计时
      serverTimeoutObj:null,//心跳倒计时
      timeoutnum:null,//断开 重连倒计时
      lastRunTime:Date.now(),//上次播放的时间
      mapPoint:[],//实时地图位置
      callShow: false,
      callUserList: [
          {
              headPic: require('../assets/orderSOS.jpg'),
              nickName: '放的地方',
              userId: '556556'

          },
          {
              headPic: require('../assets/orderSOS.jpg'),
              nickName: '放的地方',
              userId: '12566452'

          }
      ],
      clickItemUserList: [],
      infoShow: false,
      roomName: '',
      againVit: false,
      myRoom: '',
      roomAdminShow: false,
      onlineCallShow: false,
      myInfo: {},
      callList: [
          {
              headPic: require('../assets/orderSOS.jpg'),
              nickName: '放的地方',
              userId: 'dfgdfg'
          },
          {
              headPic: require('../assets/orderSOS.jpg'),
              nickName: '放的地方',
              userId: '12566452'

          }
      ],
      clickItemUser: {
          headPic: require('../assets/orderSOS.jpg'),
          nickName: '放的地方',
          userId: '12566452'
      }
    }
  },

  mounted(){
    //渲染地图
     var _this = this; 
     //推送单的列表的地图1
      _this.map = new BMap.Map('container')
      let map = _this.map
      _this.map.centerAndZoom(new BMap.Point(116.328, 40.020), 15);
      _this.map.enableScrollWheelZoom(true);
      // 添加比例尺
      // _this.map.addControl(new _this.BMap.ScaleControl());
      _this.map.addControl(new BMap.ScaleControl()); 
      // 添加缩略地图
      _this.map.addControl(new BMap.OverviewMapControl());
    // })
    //推送myGPS地图2
     _this.map2 = new BMap.Map('container2')
      let map2 = _this.map2
      _this.map2.centerAndZoom(new BMap.Point(116.328, 40.020), 15);
      _this.map2.enableScrollWheelZoom(true);
      // 添加比例尺
      // _this.map.addControl(new _this.BMap.ScaleControl());
      _this.map2.addControl(new BMap.ScaleControl()); 
      // 添加缩略地图
      _this.map2.addControl(new BMap.OverviewMapControl());
    document.getElementById('socketMessageList').addEventListener('scroll', this.loadingScroll)
    //自动完成搜索地址并找到并发送
    function G(id) {
      return document.getElementById(id);
    }      // 初始化地图,设置城市和地图级别。

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {"input" : "suggestId"
      ,"location" : map2
    });

      ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
      var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        
        value = "";
        if (e.toitem.index > -1) {
          _value = e.toitem.value;
          value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }    
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
      });

      var myValue;
      ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        
        setPlace();
      });

      function setPlace(){

        function myFun(){
          var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          _this.searchLocation = pp
          map2.centerAndZoom(pp, 18);
          map2.addOverlay(new BMap.Marker(pp));    //添加标注
          let BMap_Marker = document.querySelectorAll('span.BMap_Marker')
            setTimeout(()=>{
                for ( let it of BMap_Marker){
                    it.remove(it)
                  }
          },5000)
        }
        var local = new BMap.LocalSearch(map2, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);
      }
      
  },
  methods:{
    SwitchPage(){ //抢单页面切换
      this.containerVisible2 = false
      this.containerVisible = true
    },
    SelectTransfer(item,index){ //选择当前客服
      this.Tindex = index
      this.beTransfer = item

    },
    userTransfer(){ //转移客服
      let _ = this
      let data = {
        kfInfo :this.beTransfer,
        userInfo:this.userInfo
      }
      console.log(data)
      Api.changeKf(
        data
      ).then(res=>{
        if(res=='success'){
          _.getListOrder(_.ListData1)
          _.innerRightVisible = false
          _.openSuccess('移交成功')
        }else{
          _.onerror("移交失败")
        }
        _.dialogVisibleTransfer = false
      }).catch(err=>{
        console.log(err)
        _.onerror("移交失败")
      })

    },
    transfer(){
      this.readyWorkOut = false
      this.dialogVisibleTransfer = true
      let _this = this
      Api.getKfList(
        {
          "spID": this.userInfo.spID
        }
      ).then(res=>{
        console.log(res)
        _this.TranserList = res
      }).catch(err=>{
        console.log(err)
      })
    },
    holdout(){
      this.$router.push('/login')
    }, 
    workquit(){
      this.readyWorkOut=true
      this.currentAdvisory = this.innerLeftList.length
    },
    //第一次加载页面刷新覆盖物
    updataMapOverview(list){
      var _this = this;
          //循环遍历增加页面推送工单
          function picOverlay(point,data){
          //创建页面自定义覆盖物原型方法
            this._point = point;
            this.data = data
          }
          picOverlay.prototype = new BMap.Overlay()
          picOverlay.prototype.initialize = function(map){
            this._map = map
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute'
            div.style.overflow = 'hidden'
            div.style.fontSize = '12px'
            div.style.textAlign = 'center'
            div.style.cursor = 'pointer'
            div.className = 'Overlay'+this.data.orderID
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            let p = this._p = document.createElement('p')
            let img = this._img = document.createElement('img')
            let tipImg = this._tipImg = document.createElement('img')
            p.appendChild(document.createTextNode(this.data.nickName))
            img.setAttribute('src',this.data.headPic)
            tipImg.setAttribute('src',_this.orderhelp)
            //设置图片样式
            img.style.width ='30px'
            img.style.height ='30px'
            img.style.border = '2px solid #005ced'
            img.style.boxShadow = '0px 0px 8px #005ced'
            img.style.borderRadius = '50px'
            //设置tip图片样式
            tipImg.style.width ='118px'
            tipImg.style.height ='65px'
            let Cdiv = document.createElement('div')
            Cdiv.className = 'ClockTime'
            Cdiv.style.backgroundColor= 'white';
            Cdiv.style.display='inline-block';
            Cdiv.style.padding= '4px';
            Cdiv.style.borderRadius= '10px';
            let Cimg = document.createElement('img')
            Cimg.style.height = '20px'
            Cimg.style.verticalAlign = 'middle'
            Cimg.setAttribute('src',_this.clock)
            let Cspan = document.createElement('span')
            let _ = this
            let Ctime = document.createTextNode(this.num)
            let currentTime = Date.parse(new Date()) / 1000
            let diff = currentTime-_.data.cTime<=0 ? 0 : currentTime-_.data.cTime
            let h = Math.floor(diff/3600) 
            diff = diff % 3600
            let m = Math.floor(diff/60)
            diff = diff % 60
            let s = diff 

            setInterval(()=>{ //增加正计时
                s++
                if(s>=60){
                   s = 1
                   m++
                }
                if(m>=60){
                   h++
                   m=0
                }
                Cspan.innerText =  h + '小时'+ m +'分钟' + s +'秒'
            },1000)
            let OverDiv = document.createElement('div')
            Cspan.appendChild(Ctime)
            Cdiv.appendChild(Cimg)
            Cdiv.appendChild(Cspan)
            OverDiv.appendChild(Cdiv) 
            div.appendChild(tipImg)
            div.appendChild(OverDiv) //增加倒计时
            div.appendChild(img)
            div.appendChild(p)
            //增加点击事件创建服务单
            let data = this.data
            //抢单事件
            div.onclick = function(e){
                //客服抢单时获取用户信息
                console.log(_this.accountID)
                  let userInfo = _this.userInfo
                  console.log(userInfo)
                  userInfo.lng = '116.358'
                  userInfo.lat = '40.050'
                  console.log(userInfo)
                let QD_Data = {
                  "userInfo":userInfo,
                  "orderID" : data.orderID,
                  "channelID":data.channelID
                }
                console.log(QD_Data)
                _this.$store.dispatch(types.UPDATE_ORDER,QD_Data).then(res=>{
                _this.openSuccess('抢单成功')
                _this.getListOrder(_this.ListData1)
                div.remove(div)
              }).catch(err=>{
                console.log(err)
                _this.openError('抢单失败')
              })
              //获取正在服务服务单列表
            }
            _this.map.getPanes().labelPane.appendChild(div);
              return div
            }
            picOverlay.prototype.draw = function(){
              let map = this._map;
              let pixel = map.pointToOverlayPixel(this._point)
              this._div.style.left = pixel.x + "px";
              this._div.style.top  = pixel.y - 30 + "px";
            }
          //遍历用户
          if(list&&list[0]&&list.length>=1){
              for (let it of list) {
                let location =  {lng:it.lng,lat:it.lat}
                let myOverlay = new picOverlay(location,it)
                _this.map.addOverlay(myOverlay)
            }
          }
    },
    // 增加 / 更新 / 刷新页面 覆盖物
    updataPushMapOverview(list){
          var _this = this;
          //循环遍历增加页面推送工单
          //创建页面自定义覆盖物原型方法
          function picOverlay(point,data){
            this._point = point;
            this.data = data
          }
          picOverlay.prototype = new BMap.Overlay()
          picOverlay.prototype.initialize = function(map){
            this._map = map
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute'
            div.style.overflow = 'hidden'
            div.style.fontSize = '12px'
            div.style.textAlign = 'center'
            div.style.cursor = 'pointer'
            div.className = 'Overlay'+this.data.orderID
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            let p = this._p = document.createElement('p')
            let img = this._img = document.createElement('img')
            let tipImg = this._tipImg = document.createElement('img')
            p.appendChild(document.createTextNode(this.data.msgObj.nickName))
            img.setAttribute('src',this.data.msgObj.headPic)
            tipImg.setAttribute('src',_this.orderhelp)
            console.log(this.data)
            //设置图片样式
            img.style.width ='30px'
            img.style.height ='30px'
            img.style.border = '2px solid #005ced'
            img.style.boxShadow = '0px 0px 8px #005ced'
            img.style.borderRadius = '50px'
            //设置tip图片样式
            tipImg.style.width ='118px'
            tipImg.style.height ='65px'
            //增加正计时开始
            let Cdiv = document.createElement('div')
            Cdiv.className = 'ClockTime'
            Cdiv.style.backgroundColor= 'white';
            Cdiv.style.display='inline-block';
            Cdiv.style.padding= '4px';
            Cdiv.style.borderRadius= '10px';
            let Cimg = document.createElement('img')
            Cimg.style.height = '20px'
            Cimg.style.verticalAlign = 'middle'
            Cimg.setAttribute('src',_this.clock)
            let Cspan = document.createElement('span')
            let _ = this
            let Ctime = document.createTextNode(this.num)
            let currentTime = Date.parse(new Date()) / 1000
            let diff = currentTime-_.data.msgObj.cTime<=0 ? 0 : currentTime-_.data.msgObj.cTime
            console.log('======')
            console.log(currentTime-_.data.cTime)
            console.log(diff)
            let h = Math.floor(diff/3600) 
            diff = diff % 3600
            let m = Math.floor(diff/60)
            diff = diff % 60
            let s = diff 
            setInterval(()=>{ //增加正计时
                 h = m+1>=60 ? h+1 : h +1 >=60 ? 0 : h  
                 m = s+1>=60 ? m+1 : m +1 >=60 ? 0 : m 
                 s = s+1>=60 ? 0 : s+1 
              Cspan.innerText =  h + '小时'+ m +'分钟' + s +'秒'
            },1000)
            let OverDiv = document.createElement('div')
            Cspan.appendChild(Ctime)
            Cdiv.appendChild(Cimg)
            Cdiv.appendChild(Cspan)
            OverDiv.appendChild(Cdiv) 
            div.appendChild(tipImg)
            div.appendChild(OverDiv) //增加倒计时结束
            div.appendChild(img)
            div.appendChild(p)
            //增加点击事件创建服务单
            let data = this.data
            //抢单事件
            //抢单事件
            div.onclick = function(e){
                let userInfo = _this.userInfo
                  console.log(userInfo)
                  userInfo.lng = '116.358'
                  userInfo.lat = '40.050'
                  console.log(userInfo)
                let QD_Data = {
                  "userInfo":userInfo,
                  "orderID" : data.orderID,
                  "accountID" : _this.accountID
                }
                _this.$store.dispatch(types.UPDATE_ORDER,QD_Data).then(res=>{
                 _this.openSuccess('抢单成功')
                _this.getListOrder(_this.ListData1)
                  div.remove(div)
              }).catch(err=>{
                console.log(err)
                _this.openError('抢单失败')
              })
              //获取正在服务服务单列表
            }
            _this.map.getPanes().labelPane.appendChild(div);
              return div
            }
            picOverlay.prototype.draw = function(){
              let map = this._map;
              let pixel = map.pointToOverlayPixel(this._point)
              this._div.style.left = pixel.x + "px";
              this._div.style.top  = pixel.y - 30 + "px";
            }
          //遍历用户
          console.log(list)
          if(list&&list[0].msgObj&&list.length>=1){
              for (let it of list) {
                let location = {lng:it.msgObj.lng,lat:it.msgObj.lat}
                let myOverlay = new picOverlay(location,it)
                _this.map.addOverlay(myOverlay)
            }

          }
    },
    createPushMapUser(gps){
          let _this = this
          function picOverlay(point,data){
          //创建页面自定义覆盖物原型方法
            this._point = point;
            this.data = data
          }
          picOverlay.prototype = new BMap.Overlay()
          picOverlay.prototype.initialize = function(map){
            let _ = this
            this._map = map
            let div = this._div = document.createElement('div');
            div.style.position = 'absolute'
            div.style.overflow = 'hidden'
            div.style.fontSize = '12px'
            div.style.textAlign = 'center'
            div.style.cursor = 'pointer'
            div.className = 'OverlayUserMove'
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            let p = this._p = document.createElement('p')
            let img = this._img = document.createElement('img')
            p.appendChild(document.createTextNode(this.data.nickName))
            img.setAttribute('src',this.data.headPic)
            //设置图片样式
            img.style.width ='30px'
            img.style.height ='30px'
            img.style.border = '2px solid #005ced'
            img.style.boxShadow = '0px 0px 8px #005ced'
            img.style.borderRadius = '50px'
            div.appendChild(img)
            div.appendChild(p)
            _this.map2.getPanes().labelPane.appendChild(div);
              return div
            }
            picOverlay.prototype.draw = function(){
              let map = this._map;
              let _ = this
              let pixel
              setInterval(()=>{
                pixel = map.pointToOverlayPixel(_._point)
              _._div.style.left = pixel.x + "px";
              _._div.style.top  = pixel.y - 30 + "px";
              },10)
            }
            let location =  {lng:gps.gps.lng,lat:gps.gps.lat}
            let myOverlay = new picOverlay(location,gps)
            _this.map2.addOverlay(myOverlay)
    },
    removeOverlay(){ //删除覆盖物

          let OverlayUserMove = document.querySelectorAll('div.OverlayUserMove')
            for ( let it of OverlayUserMove){
                it.remove(it)
          }
    },
    getPushListOrder(data){ //推送服务单列表
      let _this = this
      this.$store.dispatch(types.LIST_PUSH_ORDER,data)
      .then(res=>{
          if(res.status=="error"){
            _this.endOrderList = []
          }else{
            _this.userPointLocationOrderInfo = res
            _this.updataMapOverview(_this.userPointLocationOrderInfo)
            console.log(_this.userPointLocationOrderInfo)
          }
      }).catch(err=>{
        console.log(err)
      })
    },
    getEndOrderList(data){ //已结束服务单列表
      console.log(123)
      let _this = this
      this.$store.dispatch(types.LIST_ORDER,data)
      .then(res=>{
          if(res.status=="error"){
            _this.endOrderList = []
          }else{
            _this.endOrderList = res
          }
      }).catch(err=>{
        console.log(err)
      })
    },
    //消息列表滚动条事件
    handleScroll(){
      let scroll = document.getElementById('socketMessageList')
      let height = document.getElementById('socketMessageListUl').offsetHeight
      scroll.scrollTop = scroll.scrollHeight
    },
    //获取服务单列表
    getListOrder(data){

      let _this = this
      this.$store.dispatch(types.LIST_ORDER,data)
      .then(res=>{
            //获取还未被抢单的列表
            if(data.status=="0"){
              console.log(res)
              _this.userPointLocationOrderInfo = res
            //获取已经被抢单的列表
            }else if(data.status=="1"){
              console.log(res)
              if(res.status=="error"){
                _this.innerLeftList = []
              }else{
                //增加 遮罩层 增加未读提示消息
                _this.innerLeftList= []
                for (let it of res ){
                  it.leftListCover = false
                  it.tip = 0
                  _this.innerLeftList.push(it)
                }
                _this.currentServiceNum = _this.innerLeftList.length
              }
            }
      }).catch(err=>{
        console.log(err)
      })
    },
    //客服加入频道
    joinChannel(info){
      this.$store.dispatch(types.JOIN_CHANNEL,info).then(res=>{
        console.log('joinChannel')
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取右侧消息详情
    getMessageInfo(item,index,option){
      // console.log
      let _that = this
      _that.containerVisible = false
      this.containerVisible2 = true
      this.currentServiceInfo = item
      if(index !== this.index){
        _that.chatMessageList = []
      }
      this.currentServiceInfo.option = option
      //创建并且初始化聊天窗口
      if(option=='start'){
          this.index = index
      }else if(option=='end'){
        this.endindex = index
      }
      _that.innerRightOrderMember = []
      this.innerRightVisible = true
      let data = {
        "orderID":item.orderID,
        "accountID": item.accountID,// 登录用户id
        "isInit":false
      } 
      _that.$store.dispatch(types.INIT_ORDER,data)
      .then(res=>{
        _that.innerRightOrderMember = res
        console.log(res)
        _that.getUserLocation(res) //第一次执行
        setTimeout(()=>{
          _that.map2.centerAndZoom(new BMap.Point(_that.currentGps.lng, _that.currentGps.lat),15);
        },1000)
        setInterval(()=>{
          _that.removeOverlay()
          _that.getUserLocation(res) //20秒一次绘图人物定位
        },20000)
      }).catch(err=>{
        console.log(err)
      })
      _that.page = 1
      _that.chatMessageList = [] //消息列表
      _that.getChatLog(item.channelID)
        setTimeout(()=>{
         _that.handleScroll() //滚动条
        },500)
      console.log(item)
      //创建频道在线内用户列表
      //地图上创建标注 创建轨迹 
    },
    //调用myGPS接口
    getUserLocation(list){
      let _ = this
      let memberList = list
        for(let it of memberList){
          if(it.accountID==_.accountID){
            continue
          }
            Api.getUserLocation({accountID:it.accountID}).then(res=>{
              if(res.status!=='error'){
                  it.gps = res
                  _.createPushMapUser(it)
              }
              if(it.userType=='1'){
                _.currentGps = res 
              }
            }).catch(err=>{
              console.log(err)
            })
        }

    },
    getChatLog(channelID){ //获取聊天记录

      this.loading = true
      let _this = this
      let data = {
        channelID:channelID,
        page:_this.page,
        "step": "20",
        "isUp":'up'
      }
      console.log(_this.page)
      
      Api.getChatList(data)
      .then(res=>{
        console.log(res)
        _this.count = res.count
        _this.zcount = res.zcount
        _this.page =  _this.page+1 
        if(res.list<1){
          _this.loading = false
          _this.noMore = true
          return
        }
          // let list = JSON.parse(res.list)
          for (let it of res.list) {
            //push 指定的文本
              _this.chatMessageList.unshift(it)
              
              if(it.msgType=="groupMap"){
                it.msgObj.map = JSON.parse(it.msgObj.map)
                console.log(it)
                setTimeout(() => {
                  let map = new BMap.Map('groupMap'+it.msgTime);    //

                  let point = new BMap.Point(it.msgObj.map.lng, it.msgObj.map.lat);
                  console.log(point)
                  map.centerAndZoom(point, 19);
                  let marker = new BMap.Marker(point)
                  map.addOverlay(marker)
                }, 1)
              }
              _this.loading = false
          }
          
            _this.loading = false
        }).catch(err=>{
          console.log(err)
        })
    },
    loadingScroll(){
      let _this = this
      let scroll = document.getElementById('socketMessageList')
      let height = document.getElementById('socketMessageListUl').offsetHeight
      if(scroll.scrollTop == 0){
        console.log('show')
        _this.getChatLog(_this.currentServiceInfo.channelID)
        
      }
    },
    //历史消息图文 录音 处理
    sendImg() {
      let uploadInput = document.getElementById('uploadInput').files[0]
      let fr = new FileReader()
      let base64 
      let _this = this
      fr.readAsDataURL(uploadInput);
      fr.onload = function(){
        base64 = fr.result
        Api.uploadOssImg({base64:base64}).then(res=>{
            console.log(res)
            _this.sendMessageInfo(res,'groupPic')
            console.log(res)
          }).catch(err=>{
            _this.openError('上传失败')
          })
      }
      // const isJPG = file.type === 'image/jpeg' ;
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // console.log(file)
      // if (!isJPG) {
      //   this.$message.error('格式不对!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    
    Recording(operating){ //开始录音
      let _this = this
      let rec =  Recorder ()
      console.log(rec)
      rec.open(function(){//打开麦克风授权获得相关资源
      rec.start ();
       _this.$confirm('正在录音，点击录音完成发送给用户', '温馨提示', {
          confirmButtonText: '录音完成',
          cancelButtonText: '取消录音',
          type: 'success'
        }).then(() => {
          _this.$message({
            type: 'success',
            message: '录音发送成功!'
          });
          rec.stop(function(blob,duration){//到达指定条件停止录音，拿到blob对象
            rec.close ();//释放录音资源
              const voice = new FileReader()
              voice.readAsDataURL(blob)
              voice.onload = function(e){
                //保存数据 上传并发送
              let  base64 = e.target.result
                Api.uploadOssFile({base64:base64}).then(res=>{
                  console.log(res)
                  _this.sendMessageInfo(res,'groupVoice')
                  console.log(res)
                }).catch(err=>{
                  _this.openError('上传失败')
                })
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '录音发送失败'
          });  
          rec.stop(function(blob,duration){
            rec.close();//释放录音资源
          })        
        });
    })
    },
    //保存聊天记录
    saveChatLog (user_info,msg,type) {
      const msgInfo = {
        from_id: user_info.id,
        from_name: user_info.name,
        from_avatar: user_info.avatar,
        to_name: uinfo.username,
        to_id: accountID,
        msgType: type,
        content: msg,
        group_id: user_info.groupID
      };
      // this.$store.dispatch(types.ADD_CHAT_LOG,)
    },
    //获取文件属性
    getType (msgType) {
      switch ( msgType ) {
        case 'groupVoice':
          return 'audio';
        case 'groupPic':
          return 'img';
        case 'groupText':
          return 'text';
        case  'groupMap':
          return 'map';
        default:
          return 'text';
      }
    },
    sendLocation(){
      this.sendMessageInfo(JSON.stringify(this.searchLocation) ,'groupMap')
      this.handleScroll()
    },
    sendMessageInfo(msg,group){ //向服务器发送消息
          //数据发送
          if(this.currentServiceInfo.option == 'end'){
            this.$message.error('当前服务单已经结束');
            return
          }

          let _this = this
          let info = {
            "userInfo":{
              "accountID": _this.userInfo.accountID, 
              "nickName": _this.userInfo.nickName, 
              "headPic": _this.userInfo.headPic,
              "lng": "116.358",
              "lat": "40.050",
              "userType": 2
            },
            "content":msg,
            "msgType": group, 
            "channelID": _this.currentServiceInfo.channelID, 
            "orderID": _this.currentServiceInfo.orderID
          }
          _this.$store.dispatch(types.ADD_CHAT_LOG,info).then(res=>{

          _this.socketMessageText = ""
            console.log(res)
          }).catch(err=>{
            console.log(err)
            _this.openError('发送失败')
          })
          setTimeout(()=>{
            _this.handleScroll()
          },0)
    },
    EndOrderStart(){  //结束工单开始
        this.dialogVisibleEndOrder=true
        // this.inputEndOrderAdress:"上海市-普陀区-镇坪路389号",
        // this.textareaEndOrderDesc:"请描述用户所咨询的问题",
        console.log(this.currentServiceInfo)
        this.startTime =utils.formatData(new Date((this.currentServiceInfo.start_time*1000)))
        this.endTime=utils.formatData(new Date()) //咨询结束时间
        this.calcDuration(this.currentServiceInfo.start_time)
    },
    calcDuration(t){ //计算时间
          let timeStamps = Date.parse(new Date())/1000
          let diff = timeStamps-t
          let h = Math.floor(diff/3600) + '小时'
          diff = diff % 3600
          let m = Math.floor(diff/60)+'分钟'
          diff = diff % 60
          let s = diff +'秒'
          this.duration = h+m+s
    },
    EndOrder(){ //结束工单
         let info = this.userInfo
         let _this = this
         let data = {
           "userInfo":info,
            "channelID": this.currentServiceInfo.channelID,
            "desc": this.textareaEndOrderDesc,
            "address": this.inputEndOrderAdress,
            "endTime": this.endTime
         }
         console.log(data)
         console.log(_this.innerLeftList)
        this.$store.dispatch(types.OUT_KF_CHANNEL,data).then(res=>{
          this.openSuccess('结单成功')
          _this.innerLeftList =  _this.innerLeftList.filter((val)=>{
             return val.channelID != data.channelID
          })
          _this.endOrderList.push(this.currentServiceInfo)
          _this.currentServiceNum = _this.innerLeftList.length
        }).catch(err=>{
          console.log(err)
          this.openError('结单失败')
        })
        _this.currentServiceNum = _this.innerLeftList.length
        this.dialogVisibleEndOrder=false
        this.innerRightVisible = false
        this.removeOverlay()
    },
    //错误提示
    openError(err) {
        this.$message.error(err);
    },
    //成功提示
    openSuccess(success) {
        this.$message({
          message:success,
          type:'success'
        })
    },
  //聊天样式绑定 自己的和他人的
    messageStyle(accountID){
      return accountID== this.accountID ? 'message-item-self' : 'message-item'
    },
      toCall() {
        this.callShow = true
        for (let item of this.callUserList) {
          this.$set(item, 'check', false)
        }
        // this.callUserList = this.innerRightOrderMember
      },
      // 踢人
      kickoutUser () {
          this.$confirm('确认将' + this.clickItemUser.nick_name + '踢出回话房间？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
          }).then(() => {
              this.roomAdminShow = false
              this.myRoom.kickoutUser(this.clickItemUser.accountID)
          }).catch(() => {
          })
      },
      // 开始呼叫
      startCall () {
          if (this.clickItemUserList.length === 0) {
              this.$message({
                  showClose: true,
                  message: '请选择呼叫人员',
                  type: 'error'
              })
          } else if (this.clickItemUserList.length > 8) {
              this.$message({
                  showClose: true,
                  message: '最多只能呼叫8个人',
                  type: 'error'
              })
          } else {
              this.infoShow = true
          }
      },
      // 取消全部
      allNoCheck () {
          for (let item of this.callUserList) {
              this.$set(item, 'check', false)
          }
          this.clickItemUserList = []
      },
      // 选中
      ischeck (item) {
          this.$set(item, 'check', !item.check)
          if (item.check) {
              this.clickItemUserList.push(item)
          } else {
              for (let i = this.clickItemUserList.length - 1; i >= 0; i--) {
                  if (this.clickItemUserList[i].userId === item.userId) {
                      this.clickItemUserList.splice(i, 1)
                  }
              }
          }
      },
      // 静音
      toMetud (boon) {
          this.metud = boon
          // 批量订阅tracks，并在页面上播放
          // 订阅房间中已经存在的 tracks
          if (this.metud) {
              const localTracks = QNRTC.deviceManager.getLocalTracks({
                  audio: {enabled: true, tag: 'audio', muted: true}
              })
              this.myRoom.publish(localTracks)
          } else {
              const localTracks = QNRTC.deviceManager.getLocalTracks({
                  audio: {enabled: true, tag: 'audio', muted: false}
              })
              this.myRoom.publish(localTracks)
          }
      },
      toShowUserList (i) {
          console.log(i)
          $('.userListDialog').animate({
              right: '0'
          }, 100)
          if (i === 0) {
              // 获取当前在线列表
              this.$store.commit('updateActiveIndexTab', 0)
              if (this.myInfo.role === 1) {
                  this.$store.dispatch('POP_POST_GETCUSTOMERUSERLIST', {accountID: this.myInfo.accountID, status: '1'}).then((res) => {
                      console.log(res, '客户')
                      this.$store.commit('updateUserActiveList', res)
                  })
              } else {
                  this.$store.dispatch('POP_POST_GETNEARUSERLIST', {cityCode: this.myInfo.cityCode}).then((res) => {
                      console.log(res, '在线')
                      this.$store.commit('updateUserActiveList', res)
                  })
              }
          } else if (i === 1) {
              // // 活跃
              // this.$store.dispatch('POP_POST_GETACTIVEUSERLIST', {accountID: this.myInfo.accountID}).then((res) => {
              //   console.log(res, '活跃')
              //   this.$store.commit('updateActiveIndexTab', 1)
              //   this.$store.commit('updateUserActiveList', res)
              // })
          } else {
              // 客户
              this.$store.commit('updateActiveIndexTab', 2)
              this.$store.dispatch('POP_POST_GETCUSTOMERUSERLIST', {accountID: this.myInfo.accountID}).then((res) => {
                  console.log(res, '客户')
                  this.$store.commit('updateUserActiveList', res)
              })
          }
      },
      // 选择呼叫人员
      toAdminRoom (item) {
          console.log(item)
          // this.$store.commit('updateClickItem', item)
          this.clickItemUser = {
              accountID: item.accountID,
              user_header: item.user_header,
              nick_name: item.nick_name
          }
          this.roomAdminShow = true
      },
      // 挂断并退出房间
      leaveRoom () {
          document.getElementById('callout').pause()
          document.getElementById('off').play()
          this.roomName = ''
          this.callList = []
          this.clickItemUserList = []
          this.againVit = false
          this.onlineCallShow = false
          this.myRoom.leaveRoom()
          this.callUserList = []
          clearTimeout(this.timeout)
      },
      call () {
          this.$store.commit('updateAgainVit', false)
          this.againVit = true
          let obj = {
              accountID: this.clickItem.accountID,
              user_header: this.clickItem.headPic,
              nick_name: this.clickItem.nickName,
              lat: this.clickItem.lat,
              lng: this.clickItem.lng,
              online: false
          }
          this.clickItemUserList.push(obj)
          this.infoShow = true
      },
      // 关闭选择呼叫人员弹出
      hiddenDialog () {
          this.clickItemUserList = []
          this.callShow = false
          this.callUserList = []
      },
      // 添加呼叫人员
      addCallUser () {
        this.againVit = true
        this.callShow = true
        this.callUserList= this.mapUserList
      },
      // 创建房间进行通话
      createRoom () {
          this.myRoom = new QNRTC.TrackModeSession()
          if (!QNRTC.version) {
              this.$alert('您的浏览器不支持语音通话，请切换谷歌浏览器使用', '温馨提示', {
                  confirmButtonText: '确定'
              })
              this.roomName = ''
              this.myRoom = ''
              return false
          }
          console.log('current version is', QNRTC.version)
          // 加入房间
          this.onlineCallShow = true
          this.callShow = false
          this.infoShow = false
          document.getElementById('callout').play()
          // 通话中再邀请
          if (this.roomName) {
              // this.$set(this.myInfo, 'online', true)
              // this.callList.push(this.myInfo)
              console.log(this.myInfo, 9999999)
              let ary = []
              for (let item of this.clickItemUserList) {
                  let a = 0
                  for (let i of this.callList) {
                      if (i.accountID === item.accountID) {
                          a = 1
                      }
                  }
                  if (a === 0) {
                      ary.push(item.accountID)
                      // 获取房间暂未加入人员基本信息
                      console.log(item, 102155555555555555555555555555555)
                      this.$set(item, 'online', false)
                      this.$set(item, 'user_name', item.nick_name)
                      this.callList.push(item)
                      this.timeout = setTimeout(() => {
                          console.log(item)
                          if (!item.online) {
                              this.$message({
                                  message: item.user_name + '未接听通话',
                                  type: 'warning'
                              })
                              this.callList.forEach((item1, index) => {
                                  console.log(item1, index)
                                  if (item1.accountID === item.accountID) {
                                      this.callList.splice(index, 1)
                                      if (this.callList.length === 1) {
                                          setTimeout(() => {
                                              this.$message({
                                                  message: '即将结束通话',
                                                  type: 'warning'
                                              })
                                          }, 1000)
                                          setTimeout(() => {
                                              this.roomName = ''
                                              this.onlineCallShow = false
                                              document.getElementById('callout').pause()
                                              document.getElementById('off').play()
                                              this.myRoom.leaveRoom()
                                          }, 3000)
                                      }
                                  }
                              })
                          }
                      }, 60000)
                  } else {
                      this.$message({
                          showClose: true,
                          message: item.nick_name + '正在通话中',
                          type: 'error'
                      })
                  }
              }
              let re = {
                  fromUser: this.myInfo.accountID,
                  toUser: ary.join(','),
                  msgType: 'qnNotice',
                  msgTime: new Date().getTime(),
                  msgObj: {
                      appId: 'e6tc2sxx0',
                      roomName: this.roomName,
                      reason: this.textarea,
                      st: 0 // 0-发起 1-确认ok 2- 拒绝/系统30s自动挂断
                  }
              }
              // 发送语音通话请求
              this.$store.dispatch('POP_POST_SENDTALKMSG', re).then(reo => {
                  let req = {
                      appId: 'e6tc2sxx0',
                      accountID: this.myInfo.accountID,
                      roomName: this.roomName,
                      permission: 'admin',
                      expireAt: '3600'
                  }
                  // 获取房间token
                  this.$store.dispatch('POP_POST_APPTOKEN', req).then((res) => {
                      this.clickItemUserList = []
                      this.callUserList = []
                      joinRoom(res.data, this.roomName)
                  })
                  // if (reo.msgID) {
                  //
                  // } else {
                  //   this.$message({
                  //     showClose: true,
                  //     message: '对方不在线',
                  //     type: 'error'
                  //   })
                  // }
              })
          } else {
              // 新建通话
              this.callList = []
              this.$set(this.myInfo, 'online', true)
              this.callList.push(this.myInfo)
              let arr = []
              for (let item of this.clickItemUserList) {
                  let a = 0
                  for (let i of this.callList) {
                      if (i.accountID === item.accountID) {
                          a = 1
                      }
                  }
                  if (a === 0) {
                      arr.push(item.accountID)
                      // 获取房间暂未加入人员基本信息
                      console.log(item, 102155555555555555555555555555555)
                      this.$set(item, 'online', false)
                      this.$set(item, 'user_name', item.nick_name)
                      this.callList.push(item)
                      this.timeout = setTimeout(() => {
                          console.log(item)
                          if (!item.online) {
                              this.$message({
                                  message: item.user_name + '未接听通话',
                                  type: 'warning'
                              })
                              this.callList.forEach((item1, index) => {
                                  console.log(item1, index)
                                  if (item1.accountID === item.accountID) {
                                      this.callList.splice(index, 1)
                                      if (this.callList.length === 1) {
                                          setTimeout(() => {
                                              this.$message({
                                                  message: '即将结束通话',
                                                  type: 'warning'
                                              })
                                          }, 1000)
                                          setTimeout(() => {
                                              this.roomName = ''
                                              this.onlineCallShow = false
                                              document.getElementById('callout').pause()
                                              document.getElementById('off').play()
                                              this.myRoom.leaveRoom()
                                          }, 3000)
                                      }
                                  }
                              })
                          }
                      }, 60000)
                  }
              }
              this.$store.dispatch('POP_POST_INITROOM', {appId: 'e6tc2sxx0', accountID: this.myInfo.accountID}).then((rea) => {
                  console.log(rea)
                  this.roomName = rea.roomName
                  let ary = []
                  for (let item of this.clickItemUserList) {
                      ary.push(item.accountID)
                  }
                  let re = {
                      fromUser: this.myInfo.accountID,
                      toUser: ary.join(','),
                      msgType: 'qnNotice',
                      msgTime: new Date().getTime(),
                      msgObj: {
                          appId: 'e6tc2sxx0',
                          roomName: rea.roomName,
                          reason: this.textarea,
                          st: 0 // 0-发起 1-确认ok 2- 拒绝/系统30s自动挂断
                      }
                  }
                  console.log(re, 'sendtalkmsg111111111111')
                  // 发送语音通话请求
                  this.$store.dispatch('POP_POST_SENDTALKMSG', re).then(reo => {
                      console.log(rea, 'sendtalkmsg22222222222')
                      let req = {
                          appId: 'e6tc2sxx0',
                          accountID: this.myInfo.accountID,
                          roomName: rea.roomName,
                          permission: 'admin',
                          expireAt: '3600'
                      }
                      // 获取房间token
                      this.$store.dispatch('POP_POST_APPTOKEN', req).then((res) => {
                          this.clickItemUserList = []
                          this.callUserList = []
                          joinRoom(res.data, rea.roomName)
                      })
                  })
              })
          }
          let _this = this
          let ado = document.getElementById('ado')
          async function joinRoom (roomToken, roomName) {
              try {
                  // 加入房间
                  await _this.myRoom.joinRoomWithToken(roomToken)
                  _this.$store.dispatch('POP_POST_INITROOM', {appId: 'e6tc2sxx0', accountID: _this.myInfo.accountID}).then((reb) => {
                      // 获取房间所有人信息
                      _this.$store.dispatch('POP_POST_LISTUSER', {appId: 'e6tc2sxx0', roomName: roomName}).then((res) => {
                          console.log(res, 5555555656568566)
                          if ((JSON.parse(res.data.body).users).length > 0) {
                              for (let item of JSON.parse(res.data.body).users) {
                                  let a = 0
                                  for (let i of _this.callList) {
                                      if (i.accountID === item.userId) {
                                          a = 1
                                      }
                                  }
                                  if (a === 0) {
                                      // 获取房间暂未加入人员基本信息
                                      _this.$store.dispatch('POP_POST_GETMYSELFINFO', {accountID: item.userId}).then((rep) => {
                                          // 加入房间
                                          _this.$set(rep, 'online', true)
                                          _this.callList.push(rep)
                                      })
                                  }
                              }
                          }
                      })
                  })
                  // 订阅房间中已经存在的 tracks
                  subscribeTracks(_this.myRoom.trackInfoList)
              } catch (e) {
                  console.error(e)
                  this.roomName = ''
                  document.getElementById('callout').pause()
                  document.getElementById('off').play()
                  this.myRoom.leaveRoom()
                  alert(`加入房间失败！ErrorCode: ${e.code || ''}`)
                  return
              }
              // user-join 房间有除自己以外的新用户加入
              _this.myRoom.on('user-join', user => {
                  document.getElementById('callout').pause()
                  for (let i of _this.callList) {
                      if (i.accountID === user.userId) {
                          _this.$set(i, 'online', true)
                      }
                  }
              })
              // track-add 房间中有其他用户发布了 Track
              _this.myRoom.on('track-add', tracks => {
                  console.log('new tracks', tracks, 222222222222222222222)
              })
              // 监听房间中其他人发布的 Track，自动订阅它们
              _this.myRoom.on('track-add', (tracks) => {
                  subscribeTracks(tracks)
              })
              _this.myRoom.on('user-leave', user => {
                  console.log('user leave!', user, 9556565656566)
                  _this.callList.forEach((item, index) => {
                      console.log(item, index)
                      if (item.accountID === user.userId) {
                          _this.callList.splice(index, 1)
                          if (_this.callList.length === 1) {
                              _this.$message({
                                  message: item.user_name + '已中断通话',
                                  type: 'warning'
                              })
                              setTimeout(() => {
                                  _this.$message({
                                      message: '即将结束通话',
                                      type: 'warning'
                                  })
                              }, 1000)
                              setTimeout(() => {
                                  _this.roomName = ''
                                  _this.onlineCallShow = false
                                  document.getElementById('callout').pause()
                                  document.getElementById('off').play()
                                  _this.myRoom.leaveRoom()
                              }, 3000)
                          }
                      }
                  })
              })
              // 自动发布
              await publish()
          }
          async function publish () {
              console.log(QNRTC.deviceManager, 99999)
              // 这个函数会返回一个列表，列表中每一项就是一个音视频轨对象
              const localTracks = await QNRTC.deviceManager.getLocalTracks({
                  audio: {enabled: true, tag: 'audio'}
              })
              console.log('my local tracks', localTracks)
              // 将刚刚的 Track 列表发布到房间中
              await _this.myRoom.publish(localTracks)
              console.log('publish success!')
              // for (const track of localTracks) {
              //   track.play(ado)
              // }
          }
          function subscribeTracks (trackInfoList) {
              // 批量订阅 tracks，并在页面上播放
              _this.myRoom.subscribe(trackInfoList.map(t => t.trackId)).then(tracks => {
                  for (const track of tracks) {
                      track.play(ado)
                  }
              })
          }
      },
      // 确认呼叫
      sureCall () {
          if (this.roomName && !this.againVit) {
              this.$confirm('您正在通话中，是否挂掉当前通话，建立新的通话？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$store.commit('updateOnlineCallShow', false)
                  this.roomName = ''
                  document.getElementById('callout').pause()
                  document.getElementById('off').play()
                  this.myRoom.leaveRoom()
                  this.callList = []
                  this.createRoom()
              }).catch(() => {
                  return false
              })
          } else {
              this.createRoom()
          }
      },
  },
  filters:{
    timeFormat:function(v){
       let time = Date.parse(new Date())
      let diff = (time/1000)-v
      let t = new Date(v*1000) //86400 504780
      if(diff<300&&diff>60){
       return parseInt(diff/60)+'分钟前'
      }else{
        return  t.toLocaleString()
      }
    },
    diff:function(v){
      let timeStamps = Date.parse(new Date())/1000
      let diff = timeStamps-v
       (Math.floor((diff/60/60)*100)/100).toString().split('.')[0]+'小时'+(Math.floor((diff/60/60)*100)/100).toString().split('.')[1]+'分钟'
    }
  },
  computed:{
      disabled () {
        return this.loading || this.noMore
      }
  },
  watch:{
    currentServiceNum:function(v){
      this.currentService="当前服务("+v+")"
    },
    innerLeftList:function(v){
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ClockTime{
    background-color: white;
    display: inline-block;
    padding: 4px;
    border-radius: 10px;
    img{
      height: 20px;
      vertical-align: middle;
    }
}
.icon-selected{
  color:#4acdc8
}
.loadingStyle{
    margin: 15px;
    color: #aaaaaa;
    text-align: center;
}
.systemMessage{
    text-align: center;
    margin: 25px 15px;
    font-size: 14px;
    color: #aaaaaa;
}
.userMessage{
   text-align: center;
    margin: 25px 15px;
    font-size: 14px;
    color: #aaaaaa;
}
.uploadInput{
          position: absolute;
          width: 50px;
          height: 40px;
          opacity: 0;
    }
.locationSign{
  display: inline-block;
  height: 40px;
  font-size: 14px;
  position: absolute;
  top: 100px;
  left: 280px;
  color: white;
  background-color: rgba(0,0,0,.4);
  line-height: 40px;
  border-radius: 8px;
  padding: 0 10px;
  z-index: 1;
}
.SwitchPage{
  display: inline-block;
  height: 40px;
  font-size: 14px;
  position: absolute;
  top: 100px;
  left: 580px;
  color: white;
  background-color: rgba(0,0,0,.4);
  line-height: 40px;
  border-radius: 8px;
  padding: 0 10px;
  cursor:pointer;
  z-index: 1;
}
.seachLocation{
  display: inline-block;
  height: 40px;
  font-size: 14px;
  position: absolute;
  top: 100px;
  left: 380px;
  color: white;
  background-color: rgba(0,0,0,.4);
  line-height: 40px;
  border-radius: 8px;
  padding: 0 10px;
  z-index: 1;
  input{
    width: 150px;
    background-color: rgba(0,0,0,0);
    color: white;
    border: none;
    font-size: 14px;
  }
  input::placeholder{
    color: white;
  }
  i{
    font-weight: bold;
  }
  input:focus{
    border: none
  }
}
.wordbreak{
    word-break: break-word;
    max-width: 350px;
}
/deep/.el-message{
      top: 100px !important;
}
/deep/.el-tabs__nav-wrap{
    border: 1px solid #4acdc8;
    border-radius: 5px;
    margin: 5px;
}
/deep/ .el-tabs__content{
    height: 600px;
    overflow-y: auto;
}
/deep/ .el-tabs__nav{
    width: 100%;
    .el-tabs__item{
      width: 51%;
      text-align: center;
      color:#4acdc8 !important;
      background-color: white
    }
    .is-active{
      background-color:#4acdc8 !important;
      color: white !important
    }
}
.dialogTransfer{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 200px;
    .select{
     color: #4ed7d1;
    }
    i{
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  img{
    margin-top: 30px;
    padding: 10px;
    width: 40px;
    height: 40px;
  }
  div{
    position: relative;
    width:124px ;
    height:140px ;
    text-align: center;
    margin: 10px 18px 0 0;
    box-shadow: 0px 1px 6px gainsboro;
  }
}
.endOrder-button{
  cursor: pointer;
  text-align: right;
  button{
        cursor: pointer;
    width: 80px;
    height: 30px;
    border-radius: 5px;
    border-width: 0;
    margin-left: 12px;
  }
  button:nth-of-type(1){
    background-color: #f1f3f8
  }
  button:nth-of-type(2){
    background-color: #4ed7d1;
    color: white
  }
}
#socketMessageList{
    .message-item-self{
        margin: 5px 0px 20px 15px;
        flex-direction: row-reverse;
        display: flex;
        .message-box-top{
          margin-top: 5px;
          display: flex;
          flex-direction: row-reverse;
        }

        .card1{
          background-color: #fafbff;
          padding: 14px;
          margin-top: 8px;
          color: black;
          font-size: 14px;
          border-radius: 0px 8px 8px 8px;
          border: 1px solid #dadadc;
          img{
              max-width: 200px;
              max-height: 200px;
          }
        }

    }

    .groupMap{
        width: 300px;
        height: 200px;
    }
    .message-item{
          margin: 5px 0px 20px 15px;
          display: flex;
          .card1-self{
            border-radius: 8px 0px 8px 8px;
            background-color: #4992f7;
            padding: 14px;
            margin-top: 8px;
            color: white;
            font-size: 14px;
            img{
              max-width: 200px;
              max-height: 200px;
          }
        }
    }
    video{
          height: 20px;
          width: 100%;
    }
        .message-box-top{
          span{
            padding-right: 10px;
            font-size: 12px;
          }
          .day{
            color:#aaaaaa
          }
          .time{
            color:#aaaaaa
          }
        }
        .message-item-pic{
            padding: 8px;
            width: 40px;
            height: 40px;
            border-radius: 50px;
        }

}
.flex{
  display: flex;
}
.endOrder{
   .bg{
    background-color: rgba(0,0,0,.05);
  }
  .endOrder-time{
  display: flex;
  justify-content: space-between;
  .time{
    width: 150px;
    padding: 5px;
    margin: 5px 20px 14px 0;
  }

}
.endOrder-desc{
  .el-textarea{
    margin: 12px 0;
   /deep/ .el-textarea__inner{
      background-color: rgba(0,0,0,.01);
    }
  }
}
.endOrder-adress{
      position: relative;
    input{
    border-width: 0px;
    width: 100%;
    padding: 5px 0;
    margin: 10px 0;
    }
    .text{
       width: 100%;
      padding: 5px 0;
      margin: 10px 0;
    }
    i{
      position: absolute;
      right: 0;
      top: 26px;
      font-size: 20px;
    }
}
}
#container{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  #container2{
    width: 100%;
    height: 100%;
    position: absolute;
  }
.dialogVisibleOff{
  text-align: center;
  .icon-guanbi{
    font-size: 50px;
    color: #ff5f49;
  }
  .guanbi-p{
    padding-top: 10px;
    font-size: 18px;
    color: #ff5f49;
  }
  .Off-button{
        cursor: pointer;
    width: 70%;
    height: 45px;
    border-radius: 5px;
    background-color: #ff5f49;
    color: white;
    font-size: 16px;
    margin: 6px;
  }
  .dialog-p{
    font-size: 16px;
  }
}
.el-popover{
        width: 526px;
  .CommonWord{
    width: 400px;
    .CommonTitle{
      font-weight: bold;
    text-align: center;
    padding: 5px;
    border-bottom: 1px solid #eeeeee;
    }
    div{
          display: inline-block;
    }
    .content{
              padding: 10px;
              width: 83%;
    }
    .send{
          cursor: pointer;
        width: 10%;
        height: 100%;
        background-color: #4ed7d1;
        color: white;
        border-radius: 5px;
        text-align: center;
        padding: 5px 2px;
    }

  }
}

.nav-bar{
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    background: white;
    z-index: 2;
    box-shadow: 0px 1px 6px rgb(124, 106, 106);
    .nav-left{
          display: flex;
          padding-left: 15px;
          h3{
            margin-top: 15px;
            font-size:24px
          }
          img{
              width: 70px;
              height: 70px;
          }
    }
    .nav-right{
          margin-top: 5px;
          display: flex;
          img{
              width: 60px;
              height: 60px;
              margin-right: 5px;
              border-radius: 50px;
          }
          p{
                margin-top: 15px;
          }
          button{
               cursor: pointer;
                margin: 10px;
                width: 104px;
                height: 38px;
                border-radius: 8px;
                background-color: #4ed7d1;
                color: white;
                font-size: 14px;
                font-weight: 900;
          }
    }
}
.inner{
      background-color: gainsboro;
  .inner-left{
        position: fixed;
        z-index: 1;
        width: 260px;
        padding-top: 100px;
        background-color: white;
        box-shadow: 0px 1px 6px gainsboro;
        .inner-left-top{
              padding-left: 12px;
              display: flex;
              justify-content: space-between;
              padding-bottom: 15px;
              padding-right: 10px;
              span:nth-of-type(1){
                color:#888888
              }
        }
        .inner-left-li-list{
              position: relative;
              display: flex;
              margin: 5px 10px;
              padding: 10px 10px;
              border-bottom: 1px solid #dddddd;
              .leftListCover{
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  text-align: center;
                  line-height: 60px;
                  background: rgb(0,0,0,.6);
                  color: white
              }
              .tip{
                    position: absolute;
                    background-color: #fa474f;
                    font-size: 10px;
                    height: 15px;
                    padding: 0 4px;
                    line-height: 15px;
                    border-radius: 50%;
                    color: white;
                    right: 10px;
                    bottom: 35px;
              }
              div>p{
                    padding-bottom: 6px;
              }
            div>span{
                  opacity: .7;
                  font-size: 13px;
            }
        }
        img{
            width: 40px;
            height: 40px;
            margin-right: 7px;
            border-radius: 50px;

        }
  }
  .inner-right{
        width: 600px;
        height: auto;
        background-color: white;
        border-radius: 8px;
        position: fixed;
        right: 0;
        margin-top: 80px;
        box-shadow: 0px 1px 6px gainsboro;
        .inner-right-nav{
          display: flex;
          padding: 15px;
          justify-content: space-between;
          border-bottom: 2px solid gainsboro;
          .inner-right-nav-span{
                padding-top: 8px;
                color: #888888;
          }
          .inner-right-nav-p{
                cursor: pointer;
                border-left: 1px solid gainsboro;
                padding-left: 8px;
                margin-left: 10px;
                color: #fa474f;
                height: 25px;
                padding-top: 8px;
          }
          img{
              margin-left: 5px;
              border-radius: 50px;
              width: 40px;
              height: 40px;
          }
          .icon-jiahao{
            font-size: 37px;
            color: gainsboro;
          }
        }
        .inner-right-content{
              height: 500px;
              overflow-y: auto;
              background-color: white;
        }
        /deep/ .el-textarea__inner{
                border: 1px solid white;
        }
        .inner-right-input{
          border-top: 1px solid gainsboro;
          padding: 10px;
          .inner-right-input-buttom{
            background-color: white;
            padding-bottom: 5px;
            display: flex;
            justify-content: space-between;
            .bottom-right{
             display: flex;
            }
            .inner-right-input-buttom-left div{
                  cursor: pointer;
                  width: 90px;
                  height: 30px;
                  text-align: center;
                  background-color: #f1f3f8;
                  line-height: 30px;
                  border-radius: 5px;
                  margin-left: 10px;
              }
               .inner-right-input-buttom-right {
                  i{
                    color: gainsboro;
                    font-size: 36px;
                    margin-right: 15px;
                  }

               }
               .button{
                     cursor: pointer;
                        width: 100px;
                        height: 35px;
                        background-color: #4ed7d1;
                        color: white;
                        border-radius: 8px;
                        text-align: center;
                        line-height: 35px;
                  }
            div{
              display: inline-block;
            }
          }
        }
  }
}
.messageListStyle{
    background: linear-gradient(to right,#52dfd9,#4acdc8);
    color:white !important;
    border-radius: 10px;

}


.callListDialog{
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    .userListBox{
        width: 625px;
        height: 450px;
        margin:  -225px auto 0;
        position: relative;
        top: 50%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        .header{
            height: 50px;
            line-height: 50px;
            box-shadow: 0 2px 10px #f1f1f1;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            position: relative;
            i{
                position: absolute;
                right: 10px;
                top: 12px;
                font-size: 28px;
                color: #aaa;
                cursor: pointer;
                animation: 2s linear;
            }
            i:hover{
                transform: scale(1.2);
                color: #000;
            }
        }
        ul{
            width: 100%;
            height: 330px;
            overflow-y: auto;
            padding: 10px;
            box-sizing: border-box;
            li{
                float: left;
                margin: 10px 5.4px;
                width: 90px;
                height: 100px;
                background: #fff;
                text-align: center;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                cursor: pointer;
                border: 1px solid #ccc;
                box-sizing: border-box;
                i{
                    position: absolute;
                    right: 2px;
                    top:0;
                    font-size: 20px;
                }
                .iconweigouxuan{
                    color: #ccc;
                }
                .icongouxuan-xuanzhong-yuankuang{
                    color: #418bff;
                }
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50px;
                    margin-top: 20px;
                }
                span{
                    display: block;
                    font-size: 14px;
                    margin-top: 3px;
                }
            }
            li:hover{
                box-shadow: 1px 1px 5px 2px #ccc;
            }
        }
        .buttonBox{
            text-align: center;
            height: 60px;
            line-height: 60px;
            button{
                margin: 0 20px;
            }
        }
    }
}
.infoDialog{
    z-index: 110;
    .infoBox{
        width: 325px;
        height: 450px;
        margin:  -225px auto 0;
        position: relative;
        top: 50%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        .info{
            /*margin: 10px 5.4px;*/
            margin: 50px auto 30px;
            width: 90px;
            height: 100px;
            box-shadow: 1px 1px 5px 2px #ccc;
            background: #fff;
            text-align: center;
            border-radius: 5px;
            position: relative;
            i{
                position: absolute;
                right: 5px;
                top: 5px;
                /*color: #5195ff;*/
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background: #5195ff;
                /*font-size: 30px;*/
            }
            img{
                width: 45px;
                height: 45px;
                border-radius: 50px;
                margin-top: 20px;
            }
            span{
                display: block;
                font-size: 14px;
                margin-top: 3px;
            }
        }
        ul{
            width: 100%;
            height: 240px;
            overflow-y: auto;
            padding: 10px;
            box-sizing: border-box;
            li{
                float: left;
                margin: 5px 3px;
                width: 90px;
                height: 100px;
                background: #fff;
                overflow: hidden;
                text-align: center;
                border-radius: 5px;
                position: relative;
                cursor: pointer;
                border: 1px solid #ccc;
                box-sizing: border-box;
                i{
                    position: absolute;
                    right: 2px;
                    top:0;
                    font-size: 20px;
                }
                .iconweigouxuan{
                    color: #ccc;
                }
                .icongouxuan-xuanzhong-yuankuang{
                    color: #418bff;
                }
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50px;
                    margin-top: 20px;
                }
                span{
                    display: block;
                    font-size: 14px;
                    margin-top: 3px;
                }
            }
            li:hover{
                box-shadow: 1px 1px 5px 2px #ccc;
            }
        }
        .textarea{
            width: 300px;
            padding-top: 10px;
            margin: 0 auto;
            font-size: 14px;
            .el-button{
                width: 100%;
                margin: 20px 0 10px;
            }
            p{
                width: 100%;
                font-size: 14px;
                text-align: center;
                color: #4a8cf5;
                cursor: pointer;
                padding: 5px 0;
            }
            p:hover{
                opacity: .8;
            }
        }
        .calling{
            width: 100%;
            text-align: center;
            div{
                margin: 50px 0;
                color: #418bff;
                font-size: 16px;
            }
            span{
                background: #ff554e;
                width: 60px;
                height: 60px;
                line-height: 60px;
                display: inline-block;
                border-radius: 60px;
                cursor: pointer;
                i{
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
    }
}
.roomDialog{
    z-index: 110;
    .infoBox{
        width: 325px;
        height: 300px;
        margin:  -150px auto 0;
        position: relative;
        top: 50%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        .info{
            /*margin: 10px 5.4px;*/
            margin: 50px auto 30px;
            width: 90px;
            height: 100px;
            box-shadow: 1px 1px 5px 2px #ccc;
            background: #fff;
            text-align: center;
            border-radius: 5px;
            position: relative;
            i{
                position: absolute;
                right: 5px;
                top: 5px;
                /*color: #5195ff;*/
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background: #5195ff;
                /*font-size: 30px;*/
            }
            img{
                width: 45px;
                height: 45px;
                border-radius: 50px;
                margin-top: 20px;
            }
            span{
                display: block;
                font-size: 14px;
                margin-top: 3px;
            }
        }
        .textarea{
            width: 300px;
            padding-top: 10px;
            margin: 0 auto;
            font-size: 14px;
            .el-button{
                width: 100%;
                margin: 20px 0 10px;
            }
            p{
                width: 100%;
                font-size: 14px;
                text-align: center;
                color: #4a8cf5;
                cursor: pointer;
                padding: 5px 0;
            }
            p:hover{
                opacity: .8;
            }
        }
        .calling{
            width: 100%;
            text-align: center;
            div{
                margin: 50px 0;
                color: #418bff;
                font-size: 16px;
            }
            span{
                background: #ff554e;
                width: 60px;
                height: 60px;
                line-height: 60px;
                display: inline-block;
                border-radius: 60px;
                cursor: pointer;
                i{
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
    }
}
.onlineCallDialog{
    position: absolute;
    right: 15px;
    top: 50%;
    width: 308px;
    height: 520px;
    margin-top: -260px;
    background: #fff;
    z-index: 120;
    border-radius: 8px;
    overflow: hidden;
    padding: 15px 20px;
    box-sizing: border-box;
    .bg{
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-filter: blur(5px);
        filter: blur(20px);
        transform: scale(1.2);
        z-index: -1;
    }
    .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 50px;
        background: #838e95;
        font-size: 14px;
        color: #fff;
        text-align: center;
    }
    ul{
        padding: 10px 0;
        box-sizing: border-box;
        width: 100%;
        max-height: 350px;
        overflow-y: auto;
        li{
            width: 25%;
            height: 80px;
            float: left;
            font-size: 12px;
            color: #fff;
            margin: 10px 0;
            text-align: center;
            position: relative;
            cursor: pointer;
            div{
                position: absolute;
                top: 0;
                left: 4px;
                background: rgba(0, 0, 0, .5);
                width: 60px;
                height: 60px;
                border-radius: 60px;
                line-height: 60px;
                font-size: 24px;
                color: #ccc;
            }
            img{
                width: 60px;
                height: 60px;
                border-radius: 60px;
                display: block;
                margin: 0 auto;
            }
            span{
                margin-top: 5px;
                display: block;
            }
            .ccc{
                color: #888;
            }
        }
        .add{
            color: #c6c9b5;
            i{
                font-size: 60px;
                display: block;
                margin: 0 auto;
            }
        }
    }
    .btn{
        position: absolute;
        bottom: 30px;
        left: 0;
        /*height: 100px;*/
        line-height: 50px;
        text-align: center;
        /*font-size: 50px;*/
        width: 100%;
        span{
            background: #ff554e;
            width: 60px;
            height: 60px;
            line-height: 60px;
            display: inline-block;
            border-radius: 60px;
            cursor: pointer;
            i{
                font-size: 30px;
                color: #fff;
            }
        }
        .el-icon-microphone{
            position: absolute;
            right: 60px;
            top: 18px;
            color: #fff;
            font-size: 30px;
        }
        .el-icon-turn-off-microphone{
            position: absolute;
            right: 60px;
            font-size: 30px;
            top: 18px;
            color: #6b7571;
        }
    }
}
</style>
