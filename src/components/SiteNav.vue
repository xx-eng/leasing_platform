<template>
<div id="site-nav">
  <div class="left">
      <ul>
        <li id="login" style="font-weight: bold;font-size: 13px">您好，欢迎来到租赁平台</li>
        <li style="padding:0;"><a-divider type="vertical" /></li>
        <a href="/"><li id="register"><a-icon type="home"></a-icon> 首页</li></a>
        <li style="padding:0;"><a-divider type="vertical" /></li>
        <a href="/category/1"><li id="home" ><a-icon type="shopping"></a-icon> 商品</li></a>
        <li style="padding:0;"><a-divider type="vertical" /></li>
        <li id="order"><a-icon type="question"></a-icon> 帮助中心</li>
      </ul>
  </div>
  <div class="right">
    <ul>
      <div v-if="isnull">
        <li id="firm" class="person-info" style="padding: 0px 20px;" @click="gotoFirmRegister">商家注册</li>
        <li id="favorate" class="person-info" style="padding: 0px 20px;" @click="gotoRegister">注册</li>
        <li id="personal" class="person-info" @click="gotoLogin">您好，请登录</li>
      </div>
      <div v-else>
        <li id="person" class="person-in">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{userInfo.name}}    <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="gotoPersonal" class="down-item">
                <a href="javascript:;">个人中心</a>
              </a-menu-item>
              <a-menu-item @click="userLogout" class="down-item">
                <a href="javascript:;"><a-icon type="logout" />退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown></li>
      </div>
    </ul>
  </div>
</div>
</template>

<script>
import user from "@/store/module/user";
import { getUserInfo, logout } from "@/api/user";

export default {
name: "SiteNav",
  data(){
    return{
      isnull: '',
      userInfo: []
    }
  },
  async mounted() {
    console.log('user.name', user.state.userId)
    if(user.state.userId === ""){
      this.isnull = true
    }else{
      this.isnull = false
      getUserInfo(user.state.userId).then(res => {
        console.log("res",res.data)
        this.userInfo = res.data
        console.log("userInfo", this.userInfo)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    gotoPersonal(){
      this.$router.push({path: '/personal'})
    },
    gotoLogin(){
      this.$router.push({path: '/login'})
    },
    userLogout(){
      logout().then(res => {
        console.log("res",res.data)
        this.$router.push({path: '/login'})
      }).catch(error => {
        console.log(error)
      })
    },
    gotoRegister(){
      this.$router.push({path: '/register'})
    },
    gotoFirmRegister(){
      this.$router.push({ path: '/firmRegister'})
    }
  }
}
</script>

<style scoped>
ul{
  list-style: none;
}
li{
  padding:0 10px;
  float: left;
  font-size: 9pt;
}
#site-nav{
  display: flex;
  z-index: 10000;
  width: 100%;
  height: 35px;
  background-color: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px 2px rgba(191, 148, 129, 0.1);
  line-height: 35px;
  color: dimgrey;
  margin-top: 0;
  padding: 0;
  position:fixed;
  top:0;
  background-color: #339966;
  color: #fff;
}

.left {
  display: flex;
  justify-content: flex-start;
  flex: 1;
}

.right {
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  flex: 1;
}


a{
  color: #fff;
}

a:hover {
  color: #e0e0e0;
}

.person-info:hover{
  cursor: pointer;
  color: #e0e0e0;
}

.person-in{
  /*position: relative;*/
  /*left: 550px;*/
}

  .down-item {
    background-color: #339966;
    width: 80px;
    color: #fff;
    cursor: pointer;
  }

.down-item:hover {
  background-color: #127c47;
}

</style>