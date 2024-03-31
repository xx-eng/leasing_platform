<template>
<div style="width: 250px; height: 610px; background-color: white; border-right: 1px solid #e9e9e9;">
  <div>
    <a @click="gotoHome">
      <div class="title">
        <a-icon type="layout"/> <!--:style="{ fontSize: '20px'  }"-->
        <span>易起租共享租赁平台</span>
      </div>
    </a>
    <a-menu
        :default-selected-keys="[this.current.toString()]"
        mode="inline"
        theme="light"
        :inline-collapsed="false"
        style="z-index: 100;"
    >
      <a-menu-item key="1" @click="gotoPersonal">
        <a-icon type="setting" />
        <span>账户中心</span>
      </a-menu-item>
      <a-menu-item key="2" @click="gotoPassword">
        <a-icon type="edit" />
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-item key="3" @click="gotoOrder">
        <a-icon type="solution" />
        <span>我的订单</span>
      </a-menu-item>
      <a-menu-item key="4" @click="gotoAddress">
        <a-icon type="environment" />
        <span>地址管理</span>
      </a-menu-item>
      <a-menu-item key="5" @click="gotoFavorate">
        <a-icon type="shopping-cart" />
        <span>我的收藏</span>
      </a-menu-item>
<!--      <a-menu-item key="6" @click="gotoMessage">-->
<!--        <a-icon type="message" />-->
<!--        <span>消息管理</span>-->
<!--      </a-menu-item>-->
<!--      <a-menu-item key="7">-->
<!--        <a-icon type="inbox" />-->
<!--        <span>反馈意见</span>-->
<!--      </a-menu-item>-->
      <a-menu-item key="7" @click="gotoRecharge">
        <a-icon type="pay-circle" />
        <span>充值中心</span>
      </a-menu-item>

      <a-menu-item key="8" @click="gotoSchool" v-if="isStud">
        <a-icon type="shop" />
        <span>校租租</span>
      </a-menu-item>
    </a-menu>
  </div>

  <div style="position: absolute; width:100%; height: 50px; line-height: 50px; top:0;color: #000; border-bottom: 1px solid #e9e9e9 ;box-shadow: 0 2px 5px 2px #b8e0b4">
    <div class="bell"><a-icon type="bell" :style="{ fontSize: '25px' }"/></div>
    <div class="time">{{gettime}}</div>
    <div class="wel">欢迎您！</div>
    <div class="back" @click="$router.push('/')">&lt;返回首页</div>
  </div>

</div>
</template>

<script>
import {getUserInfo} from "@/api/rental";
import user from "@/store/module/user";
export default {
  name: "Menu",
  props: {
    'current': String,
  },
  data() {
    return {
      gettime: "", //当前时间
      userInfo: [],
      isStud: false
    };
  },

    mounted() {
      getUserInfo(user.state.userId).then(res => {
        console.log("res-user",res.data)
        this.userInfo = res.data
        console.log('sex', res.data.sex)
        this.sex = res.data.sex
        this.account = res.data.account
        this.mobile = res.data.mobile
        this.email = res.data.email
        if(this.userInfo.isStudent === 1){
          this.isStud = true
        }else{
          this.isStud = false
        }

      }).catch(error => {
        console.log(error)
      });
    //展示现在的时间
    this.created();
  },

  methods: {
    //获取现在时间
    getTime: function () {
      var _this = this;
      let yy = new Date().getFullYear();
      var mm =
          new Date().getMonth() < 10
              ? "0" + (new Date().getMonth() + 1)
              : new Date().getMonth() + 1;
      var dd =
          new Date().getDate() < 10
              ? "0" + new Date().getDate()
              : new Date().getDate();
      let hh = new Date().getHours();
      let mf =
          new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes();
      let ss =
          new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      setInterval(this.getTime, 500);
    },
    created() {
      this.currentTime();
    },
    gotoHome(){
      this.$router.push({path: '/'})
    },
    gotoPersonal(){
      this.$router.push({path: '/personal'})
    },
    gotoPassword(){
      this.$router.push({path: '/password'})
    },
    gotoOrder(){
      this.$router.push({path: '/order'})
    },
    gotoAddress(){
      console.log('???')
      this.$router.push({path: '/address'})
    },
    gotoFavorate(){
      this.$router.push({ path: '/favourite'})
    },
    gotoRecharge(){
      this.$router.push({ path: '/recharge'})
    },
    gotoMessage(){
      this.$router.push({ path: '/message'})
    },
    gotoSchool() {
      this.$router.push({path: '/school/home'})
    }
  },

}
</script>

<style lang="less" scoped>
.title{
  width: 100%;
  height: 50px;
  color: #fff;
  text-align: center;
  line-height: 50px;
  border-right: 1px solid #127c47;
  border-bottom: 2px solid #127c47;
  background-color: #127c47;
}

.back {
  position: absolute;
  right: 20px;
  font-weight: bold;
  color: #339966;
}

.back:hover {
  color: #13c45b;
  cursor: pointer;
}

.bell{
  position: absolute;
  right: 350px;
}

.time{
  position: absolute;
  right: 200px;
}

.wel{
  position: absolute;
  right: 100px;
}

/deep/ .ant-menu-item-selected {
  color: #339966;
  background-color: rgba(202, 233, 247, .1);
}

/deep/.ant-menu-item-active{
  color: #339966;
  background-color: rgba(202, 233, 247, .1);
}

/deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
  background-color: rgba(202, 233, 247, .1);
}

.ant-menu-inline .ant-menu-item::after, .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after{
  border-right: 3px solid #339966;
}

//border-right: 3px solid #f5222d;

</style>