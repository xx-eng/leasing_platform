<template>
  <div class="header-box">
    <div class="logo" @click="gotoHome" title="首页"><a><img src="@/assets/images/logo.png"/></a></div>
    <div class="search-box">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>

  </div>
</template>

<script>
export default {
  name: "LogoBar",
  data() {
    return {
      current: 1,
      steps: [
        {
          title: '确认订单',
          content: 'First-content',
        },
        {
          title: '付款',
          content: 'Second-content',
        },
        {
          title: '确认收货',
          content: 'Last-content',
        },
      ],
    };
  },
  methods: {
    gotoHome(){
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>

.ant-steps-icon {
  background: #339966;
}


.header-box{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 130px;
  background-color: white;
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
  left: 410px;
  background-color: #339966;
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
  color: #339966;
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

/deep/.ant-steps-item-process .ant-steps-item-icon {
  background: #339966;
  border-color: #339966;
}

/deep/ .ant-steps-item-process .ant-steps-item-icon {
  background: #339966;
}

/deep/ .ant-steps-item-finish .ant-steps-item-icon {
  background-color: #fff;
  border-color: #339966;
}

/deep/ .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after{
  background-color: #339966;
}

/deep/ .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
  color: #339966;
}

/deep/ .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
  background-color: #339966;
}


</style>