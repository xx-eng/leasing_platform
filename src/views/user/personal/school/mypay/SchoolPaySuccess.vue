<template>
  <div class="pay-success">
    <Menu :current="'8'"  style="z-index: 100;"></Menu>
    <div class="step-box">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="shop" />
          <span>校租租</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="" @click="$router.push('/school/home')">
          <a-icon type="home" />
          <span>首页</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="pay-circle" />
          <span>订单</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="content">
      <a-icon type="safety-certificate"/>
      <div class="msg"><span style="font-size: 15px;color: #339966;font-weight: 700;">付款成功！</span><span class="link" @click="$router.push({path: '/school/home'})">返回首页>></span></div>
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/Menu'
  export default {
    name: "SchoolPaySuccess",
    components: {
      Menu
    },
    data() {
      return {
        current: 2,
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
            title: '完成订单',
            content: 'Last-content',
          },
        ],
      }
    }
  }
</script>

<style scoped>
  /* 面包屑 */
  .bread{
    position: absolute;
    top: 60px;
    left: 270px;
  }

  /* 进度条 */
  .step-box {
    position: absolute;
    top: 100px;
    left: 850px;
  //background-color: cornsilk;
    width: calc(100vw - 900px);
    transform: translate(-50%);
    font-size: 8pt;
  }

  /* elementui样式 */
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

  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    top: 200px;
    left: 530px;
    width: calc(100vw - 900px);
    height: 200px;
    color: #339966;
  }

  >>>.content svg {
    width: 100px;
    height: 100px;
  }

  .content .msg {
    text-align: center;
    margin-top: 50px;
    font-size: 13px;
  }

  .content .msg .link {
    color: #353535;
  }

  .content .msg .link:hover {
    text-decoration: underline;
    color: #339966;
    cursor: pointer;
  }
</style>