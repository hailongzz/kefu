<template>
    <div class="limiter">
       <div class="container" >
        <div class="wrap-login100 p-l-55 p-r-55 p-t-60 p-b-54">
            <span class="login100-form-title p-b-35">加马客服系统登录</span>
              <div class="txt1 text-center">
            </div>

            <div class="flex-c-m">
                <a class="login100-social-item" href="http://oauth.jiama.online/oauth/login?which=username&amp;display=pc&amp;appKey=7863228592&amp;redirect_url=127.0.0.1:8080">
                    <img src="../assets/ServiceLogo.png" style="width: 200px;height: 200px">
                </a>
            </div>
            <div class="container-login100-form-btn m-t-10">
                <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn" id="btn" @click="btn">加马语聊账号登录</button>
                </div>
            </div>
            <div class="flex-col-c p-t-55">
                <div class="copyright txt2"><a href="http://jiama.online/" target="_blank">杭州加马行乐</a> 版权所有 ©2018-2019
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods:{
            btn(){
            window.location.href = "http://oauth.jiama.online/oauth/login?which=username&display=pc&appKey=7863228592&redirect_url=http:127.0.0.1:8080";
            },
            
        }
    }
</script>

<style scoped>
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}

/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: 'Microsoft Yahei';
  font-size: 14px;
  line-height: 1.5;
  color: #666666;
}

.txt2 {
  font-family: 'Microsoft Yahei';
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
  text-transform: uppercase;
}

.bg1 {background-color: #3b5998}
.bg2 {background-color: #1da1f2}
.bg3 {background-color: #ea4335}



/*//////////////////////////////////////////////////////////////////
[ login ]*/
.limiter {
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;  
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url('../assets/bg-01.jpg')
}

.wrap-login100 {
  width: 500px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  opacity:0.8;
  padding: 60px 55px 55px 55px;
}
.flex-c-m{
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
}
.txt2{
    font-family: 'Microsoft Yahei';
    font-size: 14px;
    line-height: 1.5;
    color: #333333;
    text-transform: uppercase;
    padding-top: 55px;
    text-align: center;
}
/*------------------------------------------------------------------
[ Form ]*/

.login100-form {
  width: 100%;
}

.login100-form-title {
  display: block;
  font-family: 'Microsoft Yahei';
  font-size: 39px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
}



/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
}

.label-input100 {
  font-family: 'Microsoft Yahei';
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
  padding-left: 7px;
}

.input100 {
  font-family: 'Microsoft Yahei';
  font-size: 16px;
  color: #333333;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 40px;
  background: transparent;
  padding: 0 5px 0 50px;
}


/*---------------------------------------------*/
.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::after {
  content: attr(data-symbol);
  font-family: Material-Design-Iconic-Font;
  color: #adadad;
  font-size: 22px;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: calc(100% - 20px);
  bottom: 0;
  left: 0;
  padding-left: 13px;
  padding-top: 3px;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #7f7f7f;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}


.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.input100:focus + .focus-input100::after {
  color: #a64bf4;
}

.has-val.input100 + .focus-input100::after {
  color: #a64bf4;
}


/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.wrap-login100-form-btn {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 25px;
  overflow: hidden;
  margin: 0 auto;

  box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
  -moz-box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
  -webkit-box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
  -o-box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
  -ms-box-shadow: 0 5px 30px 0px rgba(3, 216, 222, 0.2);
}

.login100-form-bgbtn {
  position: absolute;
  z-index: -1;
  width: 300%;
  height: 100%;
  background: #a64bf4;
  background: -webkit-linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
  background: -o-linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
  background: -moz-linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
  background: linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
  top: 0;
  left: -100%;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.login100-form-regbtn{
  position: absolute;
  z-index: -1;
  width: 99%;
  height: 92%;
  margin: 0.5% auto 0.5% auto;
  background-color: #fff;
  border-radius: 25px;
  left: 2px;
}
#reg{
  color: #9255eb;
}
.reg{
  border-radius: 25px;
  background: -webkit-linear-gradient(0deg, #00dbde, #fc00ff);
}
.reg:hover{
  border-radius: 25px;
  background: -webkit-linear-gradient(0deg, #fc00ff, #00dbde);
  transition: ease-in 1s;

}

.login100-form-btn {
  font-family: 'Microsoft Yahei';
  font-size: 16px;
  color: #fff;
  line-height: 50px;
  text-transform: uppercase;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 50px;
}

.wrap-login100-form-btn:hover .login100-form-bgbtn {
  left: 0;
}


/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 10px 4px 10px;
  bottom: calc((100% - 20px) / 2);
  -webkit-transform: translateY(50%);
  -moz-transform: translateY(50%);
  -ms-transform: translateY(50%);
  -o-transform: translateY(50%);
  transform: translateY(50%);
  right: 2px;
  pointer-events: none;

  font-family: 'Microsoft Yahei';
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: visible;
  opacity: 1;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}

.login100-social-item {
  font-size: 25px;
  color: #fff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  /*border-radius: 50%;*/
  margin: 5px;
}

.login100-social-item:hover {
  color: #fff;
  /*background-color: #333333;*/
}
@media (max-width: 576px) {
  .wrap-login100 {
    padding-left: 15px;
    padding-right: 15px;
  }
} 
</style>