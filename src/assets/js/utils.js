

function formatTime(t) {
    var r = t.getFullYear(),
      e = t.getMonth() + 1,
      a = t.getDate(),
      o = t.getHours(),
      n = t.getMinutes(),
      m = t.getSeconds();
    return [r, e, a].map(formatNumber).join("/") + " " + [o, n, m].map(formatNumber).join(":");
  }
  
  function formatData(t) {
    var r = t.getFullYear(),
      e = t.getMonth() + 1,
      a = t.getDate();
    t.getHours(), t.getMinutes(), t.getSeconds();
    return [r, e, a].map(formatNumber).join("-") + ' ' +t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
  }
  
  function formatNumber(t) {
    return (t = t.toString())[1] ? t : "0" + t;
  }
  
  function objectToUrlParams(t) {
    var r = "";
    for (var e in t) r += "&" + e + "=" + t[e];
    return r.substr(1);
  }
  
  function gainPhone(params) { //获取验签
  
    let Obj = {}
  
    Obj = Object.assign(Obj, params, {
      secret: "6C928F35692B4FFB90A26B16E0127FBCAC699AFF"
    })
    let array = []
    //字典排序
    for (let key in Obj) {
      array.push(key)
    }
    array.sort()
    let paramArray = []
    //拼接字符串
    for (let index in array) {
      let key = array[index]
      let value = Obj[key]
  
      paramArray.push(key + '' + value)
    }
    //sha1化
    let source = paramArray.join('')
    return sha1(source).toUpperCase();
    // return sha1
    //   .createMethod('sha1')
    //   .update(source)
    //   .digest('hex')
    //   .toUpperCase()
  }
  function compressPictures(bath64){
    // 压缩图片需要的一些元素和对象
        let  img = new Image();
        img.src = bath64
        // 缩放图片需要的canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        // base64地址图片加载完毕后
        img.onload = function () {
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
            // 最大尺寸限制
            var maxWidth = 300, maxHeight = 300;
            // 目标尺寸
            var targetWidth = originWidth, targetHeight = originHeight;
            // 图片尺寸超过300x300的限制
            if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }
                
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            var type = 'image/jpeg';
            //将canvas元素中的图像转变为DataURL
            var dataurl = canvas.toDataURL(type);
            console.log(dataurl)
            //抽取DataURL中的数据部分，从Base64格式转换为二进制格式
            var bin = atob(dataurl.split(',')[1]);
            //创建空的Uint8Array
            var buffer = new Uint8Array(bin.length);
            //将图像数据逐字节放入Uint8Array中
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            //利用Uint8Array创建Blob对象
            var blob = new Blob([buffer.buffer], {type: type});
            var url = window.URL.createObjectURL(blob);
            console.log(url)
        };
    }

  function editCityCode(json){//为省市县重新赋值
          
      let cl = cityLocation 
      let codeGroup = []
      let codeGroupChild = []
      for(let i=0;i<codeArr.length;i++){
        codeGroupChild = []
      let cityCodeTwo = codeArr[i].substring(0,2)
          for (let j=0;j<codeArr.length;j++){
              if(codeArr[j].substring(0,2)==cityCodeTwo){   //前两位相同的加入
                codeGroupChild.push(codeArr[j])
              }
          }
          codeGroup.push([...new Set(codeGroupChild)])
      }
      codeGroup = [...new Set(codeGroup)]   //得到数列的组数以及遍历的次数
      let a,b,c,d,e,f,g,h,i,j,k,l,m,n 
      for( a=0; a<codeGroup.length;a++){  //遍历多少次
            //假设第一次
            for( b=0; b<cl.length;b++){      //第一次 遍历省级并赋值
              if( cl[b].id == codeGroup[a][0]){         
                cl[b].checkArr[0].type="1"
                cl[b].checkArr[0].isChecked="1"
                console.log(cl[b])
                for( c=0; c<cl[b].children.length;c++){ //遍历市级并赋值
                  if(cl[b].children[c].id== codeGroup[a][1]){
                    cl[b].children[c].checkArr[0].type="1"
                    cl[b].children[c].checkArr[0].isChecked="1"
                      console.log(cl[b].children[c])
                      let codeCounty = codeGroup[a].splice(2) //得到市后面的区
                      console.log(codeCounty)
                      for(e=0;e<codeCounty.length;e++){
                          for( d=0; d<cl[b].children[c].children.length;d++){ //遍历区/县级并赋值
                          console.log('jinlaile')
                            if(cl[b].children[c].children[d].id == codeCounty[e]){
                              cl[b].children[c].children[d].checkArr[0].type="1"
                              cl[b].children[c].children[d].checkArr[0].isChecked="1"
                              console.log(cl[b].children[c].children[d])
                            }
                        }
                      }
                  }
                }
              }
          }
        }

      console.log(cl)
   }  
  
//压缩图片
 function AudioPlay(){ //来信息时响应音效
  let dl = this.dingling
    var borswer = window.navigator.userAgent.toLowerCase();
    if ( borswer.indexOf( "ie" ) >= 0 ){
      //IE内核浏览器
      var strEmbed = `<embed name="embedPlay" src=${dl} autostart="true" hidden="false" loop="false"></embed>`;

      if (document.getElementsByTagName("embed").length <= 1 )
        document.getElementsByTagName('body')[0].appendChild( strEmbed );
      var embed = document.embedPlay;

      //浏览器不支持 audion，则使用 embed 播放
      embed.volume = 100;
      //embed.play();这个不需要
    } else{
      //非IE内核浏览器
      let strAudio = document.createElement('audio')
      strAudio.setAttribute('id',"audioPlay")
      strAudio.setAttribute('src',dl)
      strAudio.setAttribute('hidden',false)
      if (document.getElementsByTagName("audio").length <= 1 ){

      }
      document.getElementsByTagName('body')[0].appendChild( strAudio );
      console.log(document.getElementsByTagName('body'))
      var audio = document.getElementById( "audioPlay" );
      console.log(audio)
      audio.play();
    }
} 
  /**
 * 获取url ?后面的传值
 */
export const getQuery = (key)=>{
  const params = window.location.href.split('?')[1] || ""
  const query = {}
  if(params){
      params.split('&').forEach((item)=>{
          let queryValue = item.split('=')
          query.queryValue[0] = queryValue[1]
      })
  }
  const rst = query[key]
  return rst ? window.decodeURIComponent(query[key]) : ""
}
export default {
    gainPhone: gainPhone,
    formatTime: formatTime,
    objectToUrlParams: objectToUrlParams,
    formatData: formatData,
    compressPictures:compressPictures,
    editCityCode:editCityCode,
    AudioPlay:AudioPlay,
    scene_decode: function(t) {
      var r = (t + "").split(","),
        e = {};
      for (var a in r) {
        var o = r[a].split(":");
        0 < o.length && o[0] && (e[o[0]] = o[1] || null);
      }
      return e;
    }
  };
  
  function sha1(s) {
    var data = new Uint8Array(encodeUTF8(s))
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [], f = [
      function () { return m[1] & m[2] | ~m[1] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; },
      function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; }
    ], rol = function (n, c) { return n << c | n >>> (32 - c); },
      k = [1518500249, 1859775393, -1894007588, -899497514],
      m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
      var o = m.slice(0);
      for (j = 0; j < 80; j++)
        w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
          t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
          m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
      for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);
  
    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
      return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");
  
    return hex;
  };
  
  function encodeUTF8(s) {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
      if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
      else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
      else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
          c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
      };
    return r;
  };