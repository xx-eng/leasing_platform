<template>
  <div class="school-pay">
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
    <div class="order-box">
      <div class="order-title">
        <span @click="$router.back()">&lt;&lt;返回</span>&nbsp;&nbsp;
        <a-icon type="smile"></a-icon>请核对订单信息并付款
      </div>
      <br/>
      <div class="order-info" style="border: 1px solid #98bb8f; height: 480px;">
        <div class="address">
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;color: #339966;">●租赁者信息</div>
          <div class="address-desc">
            <div style="border-bottom: 1px solid #339966; height: 30px; line-height: 30px; text-align: center; width: 100px; display: inline-block;">
              {{userInfo.name}}
            </div>
            <div class="select-item">
              {{userInfo.mobile}}(手机)
            </div>
            <div class="select-item">
              {{userInfo.email}}（邮箱）
            </div>
          </div>
        </div>
        <div class="address">
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;color: #339966;">●出租者信息</div>
          <div class="address-desc">
            <div style="border-bottom: 1px solid #339966; height: 30px; line-height: 30px; text-align: center; width: 100px; display: inline-block;">
              {{renterInfo.name}}
            </div>
            <div class="select-item">
              {{renterInfo.mobile}}(手机)
            </div>
            <div class="select-item">
              {{renterInfo.email}}（邮箱）
            </div>
          </div>
        </div>

        <div class="goods-info">
          <div style="font-size: 12pt; position: relative; top : 30px; font-weight: bold;color: #339966;">●物品详情</div>
          <div class="goods-img goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              商品参数
            </div>
            <img :src="goodsDetial.image" class="goods-image"/><!--background-color: lightyellow-->
            <div style="position: absolute; left: 120px; top: 100px;">{{goodsDetial.title}}</div>
          </div>

          <div class="goods-rental goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              商品租金
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              ￥{{goodsDetial.rental}}/天
            </div>
          </div>

          <div class="goods-deposit goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              商品押金
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              ￥{{goodsDetial.deposit}}
            </div>
          </div>

          <div class="goods-time goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              租赁时间
            </div>
            <div style="position: absolute;text-align: center;width: 250px; top: 100px; font-size: 13pt;">
              {{startTime}} ~ {{endTime}}
            </div>
          </div>

          <div class="rent-time goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              租期
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              {{ order.rentTime }}天
            </div>
          </div>
        </div>

      </div>
      <br/>
      <div class="order-envelope" style="border: 2px solid #a1dda9; width: 200px; height: 85px; position: absolute; right: 0px;box-shadow: 2px 2px 5px 2px #e0e0e0">
        <div style="position: absolute; top: 20px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 30px; font-weight: bold;">实付款:</span>
          <span style="font-size: 14pt; font-weight: bold; color: #409969;">￥{{(Number(goodsDetial.rental*order.rentTime) + Number(goodsDetial.deposit)).toFixed(2)}}</span>
        </div>

        <div style="width: 100%; position: absolute; top: 84px;">
          <a @click="pay">
            <div style="height: 40px; line-height: 40px; text-align: center; width: 80px; color:white; background-color: #339966; position: absolute; right: 0px;top: 10px;font-size: 13px;margin-bottom: 10px; border-radius: 5px">
              付款
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";

  import {getUserInfo} from "@/api/rental";
  import user from "@/store/module/user";
  import {getGoodsInfo} from "@/api/goodsDetail";
  import {schoolPay} from '@/api/school'
  export default {
    name: "SchoolMyPayment",
    components: {
      Menu
    },
    data(){
      //this.dateFormat = 'YYYY-MM-DD';
      return{
        current: 1,
        steps: [
          {
            title: '确认订单',
            content: 'First-content',
          },
          {
            title: '待付款',
            content: 'Second-content',
          },
          {
            title: '完成订单',
            content: 'Last-content',
          },
        ],
        userInfo: [],
        renterInfo: [],
        goodsDetial: [],
        type:'',
        startTime: '',
        endTime: '',
        rentTime: '',
        rental: '',
        order: []
      }
    },
    methods:{
      // 校园租赁付款
      pay(){
        schoolPay(this.order.id ).then(res => {
          console.log("res-pay",res.data)
          if(res.code === 2004){
            this.$router.push('/school/mypaysuccess')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },

    async mounted(){
      const {order} = this.$route.params
      const {startTime} = this.$route.params
      const {endTime} = this.$route.params
      this.order = order
      this.order.rentTime = Number(this.order.rentTime)
      this.startTime = startTime
      this.endTime = endTime

      console.log("pay_order::", this.order)
      // 获取订单信息
      getGoodsInfo(order.goodsId).then(res => {
        console.log("res",res.data)
        this.goodsDetial = res.data
        this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
        this.goodsDetial.rental = Number(this.goodsDetial.rental).toFixed(2)
        this.goodsDetial.deposit = Number(this.goodsDetial.deposit).toFixed(2)
        console.log("goodsDetail", this.goodsDetial)
      }).catch(error => {
        console.log(error)
      })
      // 租赁者信息
      getUserInfo(user.state.userId).then(res => {
        console.log("res-user",res.data)
        this.userInfo = res.data
      }).catch(error => {
        console.log(error)
      });
      /* 出租者信息 */
      getUserInfo(this.order.firmId).then(res => {
        console.log("renter",res.data)
        this.renterInfo = res.data
      }).catch(error => {
        console.log(error)
      });
    },
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

  .order-box{
    position: absolute;
    top: 150px;
    left: 850px;
  //background-color: cornsilk;
    width: calc(100vw - 400px);
    transform: translate(-50%);
    font-size: 8pt;
  }

  .order-title{
    margin-top: 15px;
    font-size: 11pt;
  }

  .order-title span {
    color: #339966;
    font-weight: bold;
  }

  .order-title span:hover {
    color: #13c45b;
    cursor: pointer;
  }

  .address{
    width: 90%;
  //background-color: blue;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    height : 100px;
    border-bottom: 1.5px solid #339966;
  }

  .address-desc{
    position: relative;
    top: 35px;
  }

  .select-item{
    display: inline-block;
    margin-right: 20px;
    margin-left: 10px;
    font-size: 11pt;
  }

  .goods-info{
    width: 90%;
  //background-color: blue;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  //height : 100px;
  }

  .goods-list-item{
    display: inline-block;
  //background-color: lightyellow;
    height: 200px;
    position: absolute;
    top: 60px;
    border: 1px solid #339966;
  }

  .goods-img{
    width: 300px;
  }

  .goods-image{
    width: 100px;
    position: relative;
    top: 30px;
  }

  .goods-rental{
    position: absolute;
    left: 305px;
  //background-color: #7B7A7A;
    width: 100px;
  }

  .goods-deposit{
    position: absolute;
    left: 410px;
  //background-color: #7B7A7A;
    width: 150px;
  }

  .goods-time{
    position: absolute;
    left: 565px;
  //background-color: #7B7A7A;
    width: 300px;
  }

  .rent-time{
    position: absolute;
    left: 870px;
  //background-color: #7B7A7A;
    width: 100px;
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


</style>