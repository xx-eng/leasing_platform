<template>
  <div class="school-rental">
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
          <a-icon type="eye" />
          <span>商品详情</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="order-box">
      <div class="order-title">
        <span @click="$router.back()">&lt;&lt;返回</span>&nbsp;&nbsp;
        <a-icon type="smile"></a-icon>填写并核对订单信息
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
              选择时间
            </div>
            <div style="position: absolute;text-align: center;width: 250px; top: 100px; font-size: 13pt;">
              <a-range-picker @change="onChangeDate" />
            </div>
          </div>

          <div class="rent-time goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              租期
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              {{ rentTime }}天
            </div>
          </div>
        </div>

      </div>
      <br/>
      <div class="order-envelope" style="border: 2px solid #a1dda9; width: 200px; height: 85px; position: absolute; right: 0px;box-shadow: 2px 2px 5px 2px #e0e0e0">
        <div style="position: absolute; top: 20px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 30px; font-weight: bold;">实付款:</span>
          <span style="font-size: 14pt; font-weight: bold; color: #409969;">￥{{goodsDetial.rental*rentTime + goodsDetial.deposit}}</span>
        </div>

        <div style="width: 100%; position: absolute; top: 84px;">
          <a @click="addOrder">
            <div style="height: 40px; line-height: 40px; text-align: center; width: 80px; color:white; background-color: #339966; position: absolute; right: 0px;top: 10px;font-size: 13px;margin-bottom: 10px; border-radius: 5px">
              提交订单
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu"

  import {getUserInfo} from "@/api/rental";
  import user from "@/store/module/user";
  import {getGoodsInfo} from "@/api/goodsDetail";
  import {addSchoolOrder} from "@/api/school"
  export default {
    name: "SchoolRental",
    components: {
      Menu
    },
    data(){
      return{
        current: 0,
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
        userInfo: [],
        renterInfo:[],
        goodsDetial: [],
        startTime: '',
        endTime: '',
        rentTime: '',
        rental: '',
        order: ''
      }
    },
    methods:{
      /* 选择租赁日期 */
      onChangeDate(date, dateString) {
        console.log(date, dateString)
        this.startTime = dateString[0]
        this.endTime = dateString[1]
        this.rentTime = (date[1]-date[0])/86400000 + 1
        this.rental = this.goodsDetial.rental* this.rentTime
        console.log(this.rental)
        console.log(this.startTime,'---',this.endTime)
        console.log(this.rentTime)
      },
      /* 校园租赁下单 */
      addOrder(){
        addSchoolOrder(this.userInfo.id,this.goodsDetial.id,this.rentTime,this.rental).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          //this.$router.push({path: '/pay/'+this.goodsDetial.id})
          this.$router.push({name: 'SchoolMyPayment',
            params: {goodsId: this.goodsDetial.id,startTime: this.startTime, endTime: this.endTime, order: res.data }})
        }).catch(error => {
          console.log(error)
        })
      }
    },

    async mounted(){
      const {goodsId} = this.$route.params;
      console.log("id", goodsId)
      /* 商品信息*/
      getGoodsInfo(goodsId).then(res => {
        console.log("res",res.data)
        this.goodsDetial = res.data
        this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
        this.goodsDetial.rental = Number(this.goodsDetial.rental)
        this.goodsDetial.deposit = Number(this.goodsDetial.deposit)
        console.log("goodsDetail", this.goodsDetial)
      }).catch(error => {
        console.log(error)
      })
      /* 租赁者信息 */
      getUserInfo(user.state.userId).then(res => {
        console.log("res-user",res.data)
        this.userInfo = res.data

        /* 出租者信息 */
        getUserInfo(this.goodsDetial.firmId).then(res => {
          console.log("renter",res.data)
          this.renterInfo = res.data
        }).catch(error => {
          console.log(error)
        });
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
    border-bottom: 1.5px solid #127c47;
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
    width: 100px;
  }
  .goods-time{
  position: absolute;
     left: 515px;
   //background-color: #7B7A7A;
     width: 300px;
   }

  .rent-time{
  position: absolute;
    left: 820px;
  //background-color: #7B7A7A;
    width: 100px;
  }

  .goods-type{
    position: absolute;
    left: 820px;
  //background-color: #7B7A7A;
    width: 200px;
  }

  /* elementui样式 */
  >>>.ant-calendar-picker, >>>.ant-select-selection.ant-select-selection--single{
    width: 85%;
    left: 7%;
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