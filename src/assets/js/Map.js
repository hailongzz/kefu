// import {Provinces} from '../../../assets/js/region';
// import $ from 'jquery'
// import {lastStorage} from './localstorage'
// import {globalStore} from '../../../components/base/store'
// import { boilerDetail } from '../../../components/base/userInfo'
// import { doMain } from '../../../protocal/url'
export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
// export default {
//   createMap : function (initX, initY) {
//     // 创建地图实例
//     var map = new BMap.Map('container');
//     // 创建初始点
//     var point = new BMap.Point(initX, initY);
//     // 开启滚轮缩放
//     map.enableScrollWheelZoom(true);
//     // 添加平移缩放
//     // map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}));
//     // 添加比例尺
//     map.addControl(new BMap.ScaleControl());
//     // 添加缩略地图
//     map.addControl(new BMap.OverviewMapControl());
//     map.centerAndZoom(point, 12);
//     return map
//   },
//   // 添加标注信息
//   addInfoTag : function (info, color) {
//     let border = ''
//     let background = ''
//     if (color != 2) {
//       border = '1px solid green';
//       background = '#195fff';
//     } else {
//       border = '1px solid red';
//       background = '#e85655'
//     }
//     var label = new BMap.Label(info.title, {
//       offset: new BMap.Size(-100, -35)
//     });
//     label.setStyle({
//       width: '230px',
//       color: 'black',
//       background: background,
//       borderRadius: '2px',
//       textAlign: 'center',
//       border: border,
//       cursor: "pointer"
//     })
//     return label;
//   },
//   // 创建标注
//   createdMaker : function (map, point, index, color) {
//     let path = ''
//     if (color != 2) {
//       path = '/src/assets/image/map/map_ok.png'
//     } else {
//       path = '/src/assets/image/map/map_cell.png'
//     }
//     var myIcon = new BMap.Icon(path, new BMap.Size(45, 45), {background: ''});
//     var marker = new BMap.Marker(point, {icon: myIcon});
//     map.addOverlay(marker);
//     return marker;
//   },
//   //搜索经纬度
//   search : function (address) {
//     let thatm = this;
//     let x = 116.3856888888;
//     let y = 39.90152888888;
//     let map2 = this.createMap(x, y);
//     var myGeo = new BMap.Geocoder();
//     myGeo.getPoint(address, function (point) {
//       if (point) {
//         map2.centerAndZoom(point, 16);
//         var marker = new BMap.Marker(point);
//         map2.addOverlay(marker);
//         marker.enableDragging();
//         var info = ''
//         myGeo.getLocation(point, function (rs) {
//           var addComp = rs.addressComponents;
//           info = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street
//         });
//         marker.addEventListener("dragend", function (e) {
//           // var label = this.getLabel()
//           // label.setContent(""); //设置标签内容为空
//           // label.setStyle({border: "none", width: null, height: '0'}); //设置标签边框宽度为0
//           // myGeo.getLocation(e.point, function (rs) {
//           //   var addComp = rs.addressComponents;
//           //   info = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
//           // });
//           marker.setLabel(thatm.addInfoTag({title: info}));
//           globalStore.position = e.point
//         })
//         marker.addEventListener('mouseover', function (e) {
//           // 为标注添加信息
//           myGeo.getLocation(e.point, function (rs) {
//             var addComp = rs.addressComponents;
//             info = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street
//           });
//           marker.setLabel(thatm.addInfoTag({title: info}));
//         })
//         marker.addEventListener('mouseout', function () {
//           // var label = this.getLabel()
//           // label.setContent(""); //设置标签内容为空
//           // label.setStyle({border: "none", width: null, height: '0'}); //设置标签边框宽度为0
//         })
//         globalStore.position = point
//       } else {
//         alert("您选择地址没有解析到结果!");
//       }
//     }, "");
//   },
//   // 添加标注
//   addMaker : function (that, info) {
//     let thatm = this;
//     let x = info.alleStand.length > 0
//       ? info.alleStand[0].longitude
//       : '116.3856888888';
//     let y = info.alleStand.length > 0
//       ? info.alleStand[0].latitude
//       : '39.90152888888';
//     let map = this.createMap(x, y);
//     if (info.alleStand.length != 0) {
//       info.alleStand
//         .forEach((item, i) => {
//           let point = new BMap.Point(item.longitude, item.latitude);
//           let marker = thatm.createdMaker(map, point, i, item.alarmStatus);
//           // 为标注添加点击事件
//           marker.addEventListener('click', function (e) {
//             that.globalStore.boilerId = item.id;
//             that.globalStore.alarmStatus = item.alarmStatus;
//             that.globalStore.index = 1;
//             that.tabView();
//             that.getChimneyList();
//             that.globalStore.title = item.bname;
//           });
//           marker.addEventListener('mouseover', function () {
//             let txt = "<table style='width: 350px;font-size:14px'> " +
//                       "<tr><td style='width: 100px'>锅&nbsp;&nbsp;炉&nbsp;&nbsp;房：</td><td style='text-align: left'>" + item.bname + "</td></tr>" +
//                       "<tr><td style='width: 100px'>cems数量：</td><td>" + item.boilerQuantity + "</td style='text-align: left'></tr>" +
//                       "<tr><td style='width: 100px'>公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司：</td><td style='text-align: left'>" + item.company + "</td></tr>" +
//                       "<tr><td style='width: 100px'>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</td><td style='text-align: left'>" + item.address + "</td></tr>" +
//                       // "<tr><td style='text-alifn: center'>经&nbsp;&nbsp;&nbsp;&nbsp;度：</td><td>" + item.latitude + "</td></tr>" +
//                       // "<tr><td style='text-alifn: center'>纬&nbsp;&nbsp;&nbsp;&nbsp;度：</td><td>" + item.longitude + "</td></tr>" +
//                       "</table>"
//             map.openInfoWindow(new BMap.InfoWindow(txt,{offset:{width: 0,height: -20}}), new BMap.Point(item.longitude,item.latitude));
//             // 为标注添加信息
//             // let str = item.bname;
//             // marker.setLabel(thatm.addInfoTag({
//             //   title: str
//             // }, item.alarmStatus));
//           })
//           marker.addEventListener('mouseout', function () {
//             // var label = this.getLabel()
//             // label.setContent(""); //设置标签内容为空
//             // label.setStyle({border: "none", width: null, height: '0'}); //设置标签边框宽度为0
//           })
//         });
//     }
//   }
// }

// 添加hover事件 marker.addEventListener('mouseover',function(e){   var label = new
// BMap.Label(jtem.name + ':' + ktem.id,{offset: new BMap.Size(0,-35)});
// label.setStyle({     width:'120px',color: '#FFF',background:
// 'rgba(0,0,0,0.5)',borderRedius: '5px',     textAlign: 'center',height:
// '20px',lineHeight: '20px'   })   marker.setLabel(label) }) 添加move事件
// marker.addEventListener('mouseout',function(e){   var label =
// this.getLabel();   label.setStyle({border: 'none',height: '0px',padding:
// '0px'}) })
