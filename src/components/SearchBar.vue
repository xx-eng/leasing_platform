<template>
  <div class="header-box">
    <div class="logo" @click="gotoHome" title="首页"><a><img src="../assets/images/logo.png"/></a></div>
    <div class="search-box">
      <a-input
          placeholder="请输入商品信息"
          style="border-radius: 50px;">
        <a-icon slot="prefix" type="search" style="border-radius: 50px;"/>
      </a-input>
      <a-button class="search-btn">搜索</a-button>
    </div>
    <a @click="gotoFavorite">
      <div class="cart">
        <a-icon type="shopping-cart" style="font-size: 15pt;" />&nbsp;&nbsp;&nbsp;我的收藏
      </div>
    </a>

  </div>


</template>

<script>
import user from "@/store/module/user";

export default {
  name: "SearchBar",
  methods: {
    search(value) {
      console.log(value);
    },
    gotoHome(){
      this.$router.push('/')
    },
    gotoFavorite(){
      console.log('user', user.state.userId)
      if(user.state.userId){
        this.$router.push('/favourite')
      }else{
        this.$router.push('/login')
      }
    }
  },
}

</script>

<style scoped>
.header-box{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 130px;
  background-color: white;
}
.search-box{
  width: 500px;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
}

>>>.ant-input {
  border-radius: 50px;
}

.search-btn{
  border-radius: 50px;
  width: 100px;
  position: relative;
  top: -32px;
  left: 400px;
  background-color: #117c6f;
  color: white;
}

.logo{
  position: absolute;
  top: 45px;
  left: 65px;
  font-family: 'LiSu';
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 30pt;
  color: #2fc4b2;
}

.logo img {
  height: 75px;
}

.cart{
  position: absolute;
  top: 60px;
  right: 140px;
  color: #339966;
  width: 120px;
  height: 30px;
  border: 1px solid #E5E5E5;
  line-height: 30px;
  text-align: center;
}

.cart:hover {
  background-color: rgba(240, 240, 240, .1);
}


</style>