<template>
  <div>
    <SiteNav></SiteNav>
    <div class="logo" @click="gotoHome" title="首页"><a><img src="@/assets/images/logo.png"/></a></div>

    <div class="order-box">
      <div class="order-title">
        <span @click="$router.back()">&lt;&lt;返回&nbsp;&nbsp;</span>
        <a-icon type="smile"></a-icon>订单详情</div>
      <br/>
      <div class="order-info" style="border: 1px solid #98bb8f; height: 380px;">
        <div class="address">
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;color: #339966">●收货人地址</div>
          <div class="address-desc">
            <div style="border-bottom: 1px solid #339966; height: 30px; line-height: 30px; text-align: center; width: 100px; display: inline-block;">
              {{userInfo.name}}
            </div>
            <div class="select-item">
              {{userAddress.province}}
            </div>
            <div class="select-item">
              {{userAddress.city}}
            </div>
            <div class="select-item">
              {{userAddress.county}}
            </div>
            <div class="select-item">
              {{userAddress.address_info}}&nbsp;（{{userInfo.name}}收）
            </div>
            <div class="select-item">
              {{userInfo.mobile}}
            </div>
          </div>
        </div>

        <div class="goods-info">
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;color: #339966;">●物品详情</div>
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
              状态
            </div>
            <div style="position: absolute;text-align: center; width: 100%; top: 100px; font-size: 13pt;">
              <!--<a-range-picker :default-value="[moment(this.startTime, this.dateFormat)._i, moment(this.endTime, this.dateFormat)._i]" style="width: 300px;" @change="onChangeDate"/>-->
              {{this.order.status}}
            </div>
          </div>

          <div class="goods-type goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              租赁方式
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              <a-select
                  show-search
                  defaultValue="0"
                  style="width: 200px"
                  disabled
              >
                <a-select-option value="0">
                  以租代售
                </a-select-option>
                <a-select-option value="1">
                  共享租赁
                </a-select-option>
                <a-select-option value="2">
                  先租后售
                </a-select-option>
              </a-select>
            </div>
          </div>

        </div>

      </div>
      <br/>
      <div class="order-envelope" style="border: 2px solid #339966; width: 400px;margin-bottom: 10px; height: 250px; position: absolute; right: 0px;">
        <div style="position: absolute; top: 20px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">实付款:</span>
          <span style="font-size: 14pt; font-weight: bold; color: #339966;">￥{{goodsDetial.rental*this.order.rentTime + goodsDetial.deposit}}</span>
        </div>

        <div style="position: absolute; top: 80px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">地址:</span>
          <span style="font-size: 10pt;  ">{{userAddress.addressInfo}}</span>
        </div>

        <div style="position: absolute; top: 140px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">商家地址:</span>
          <span style="font-size: 10pt;  ">{{firmAddress.addressInfo}}</span>
        </div>

        <div style="position: absolute; top: 200px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">收货人:</span>
          <span style="font-size: 10pt;  ">{{userInfo.name}}</span>
          <span style="font-size: 10pt; margin-left: 10px;"> {{userInfo.mobile}}</span>
        </div>

        <!--<div style="width: 100%; position: absolute; top: 184px;">
          <a>
            <div style="height: 50px; line-height: 50px; text-align: center; width: 100px; color:white; background-color: #FF6666; position: absolute; right: 0px;">
              付款
            </div>
          </a>
        </div>-->
      </div>

    </div>


  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import {getOrderInfo} from "@/api/order";
import {getGoodsInfo} from "@/api/goodsDetail";
import {getDefaultAddress, getUserInfo} from "@/api/rental";
import {getFirmAddress} from "@/api/address";
import user from "@/store/module/user";

export default {
  name: "Description",
  components: {SiteNav},
  data() {
    return {
      order: [],
      userAddress:[],
      userInfo: [],
      goodsDetial: [],
      state: '',
      firmAddress: []
    }
  },

  mounted() {
    const{id} = this.$route.params;
    getOrderInfo(id).then(res => {
      console.log("orderDescription",res.data)
      this.order = res.data
      this.order.image = process.env.VUE_APP_API_HOST + this.order.image
      if (this.order.orderState === 1) {
        this.order.status = '待付款'
      }
      if (this.order.orderState === 3) {
        this.order.status = '待发货'
      }
      if (this.order.orderState === 4) {
        this.order.status = '待收货'
      }
      if (this.order.orderState === 6) {
        this.order.status = '续租'
      }
      if (this.order.orderState === 7) {
        this.order.status = '已购买'
      }
      if (this.order.orderState === 8) {
        this.order.status = '退租'
      }
      if (this.order.orderState === 9) {
        this.order.status = '返还'
      }
      if (this.order.orderState === 10) {
        this.order.status = '结束'
      }
      this.order.rental = Number(this.order.rental)
      this.order.deposit = Number(this.order.deposit)

      console.log("order", this.order)
      getGoodsInfo(this.order.goodsId).then(res => {
        console.log("res-goods",res.data)
        this.goodsDetial = res.data
        this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
        this.goodsDetial.rental = Number(this.goodsDetial.rental)
        this.goodsDetial.deposit = Number(this.goodsDetial.deposit)
        console.log("goodsDetail", this.goodsDetial)
      }).catch(error => {
        console.log(error)
      })

      getFirmAddress(this.order.firmId).then(res => {
        this.firmAddress = res.data
        console.log('firmAddress', this.firmAddress)
      }).catch(error => {
        console.log(error)
      })

    }).catch(error => {
      console.log(error)
    })



    //user.state.userId
    getUserInfo(20213000001).then(res => {
      console.log("res-user",res.data)
      this.userInfo = res.data
      console.log("userInfo",this.userInfo)
    }).catch(error => {
      console.log(error)
    });
    getDefaultAddress(20213000001).then(res => {
      console.log("userId",user.state.userId)
      console.log("res",res.data)
      console.log("user",user.state)
      this.userAddress = res.data
      console.log("userAddress", this.userAddress)
    }).catch(error => {
      console.log(error)
    });


  },
  methods: {
    gotoHome(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .logo{
    position: absolute;
    top: 45px;
    left: 65px;
    letter-spacing: 3px;
    font-weight: bold;
    font-size: 30pt;
    color: #339966;
  }

  .logo img {
    height: 75px;
  }
.order-box{
  position: absolute;
  top: 130px;
  //background-color: cornsilk;
  width: 90%;
  left: 50%;
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
  border-bottom: 1.5px solid #BBBBBB;
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

.goods-type{
  position: absolute;
  left: 820px;
  //background-color: #7B7A7A;
  width: 200px;
}

>>>.ant-calendar-picker, >>>.ant-select-selection.ant-select-selection--single{
  width: 85%;
  left: 7%;
}
</style>