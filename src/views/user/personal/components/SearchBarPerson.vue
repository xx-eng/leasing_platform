<template>
  <div class="header-box">
    <div class="logo">租赁平台</div>
    <div class="search-box">
      <a-input
          placeholder="请输入商品信息"
          style="border-radius: 50px;">
      </a-input>
      <a-button class="search-btn">搜素</a-button>
    </div>
    <a>
      <div class="cart">
        <a-icon type="shopping-cart" style="font-size: 15pt;"/>&nbsp;&nbsp;&nbsp;我的收藏
      </div>
    </a>

  </div>
</template>

<script>
export default {
  name: "SearchBarPerson",
  methods: {
    search(value) {
      console.log(value);
    },
  },
}
</script>

<style lang="less" scoped>
.header-box{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 130px;
  background-color: #339966;
}
.search-box{
  width: 40%;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
}

.search-btn{
  border-radius: 50px;
  width: 100px;
  position: absolute;
  top: 0px;
  left: 411px;
  background-color: white;
  color: #339966;
  border: 1px solid #339966;
}

.logo{
  position: absolute;
  top: 30px;
  left: 65px;
  font-family: 'LiSu';
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 30pt;
  color: white;
  background-color: #339966;
  height: 100px;
  line-height: 100px;
  width: 200px;
  text-align: center;
}

.cart{
  position: absolute;
  top: 60px;
  right: 140px;
  color: white;
  width: 120px;
  height: 30px;
  border: 1px solid #E5E5E5;
  line-height: 30px;
  text-align: center;
}
</style>