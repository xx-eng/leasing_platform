<template>
  <div>
    <SiteNav></SiteNav>
    <SearchBarPerson></SearchBarPerson>

    <div class="order-box">
      <div class="order-title">订单详情</div>
      <br/>
      <div class="order-info" style="border: 1px solid #BBBBBB; height: 380px;">
        <div class="address">
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;">收货人地址</div>
          <div class="address-desc">
            <div style="border: 2px solid #339966; height: 30px; line-height: 30px; text-align: center; width: 100px; display: inline-block;">
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
          <div style="font-size: 12pt; position: relative; top : 20px; font-weight: bold;">物品详情</div>
          <div class="goods-img goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 3px solid #339966;">
              商品参数
            </div>
            <img :src="goodsDetial.image" class="goods-image"/><!--background-color: lightyellow-->
            <div style="position: absolute; left: 120px; top: 100px;">{{goodsDetial.title}}</div>
          </div>

          <div class="goods-rental goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 3px solid #339966;">
              商品租金
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              ￥{{goodsDetial.rental}}/天
            </div>
          </div>

          <div class="goods-deposit goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 3px solid #339966;">
              商品押金
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              ￥{{goodsDetial.deposit}}
            </div>
          </div>

          <div class="goods-time goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 3px solid #339966;">
              状态
            </div>
            <div style="position: absolute;text-align: center; width: 100%; top: 100px; font-size: 13pt;">
              <!--<a-range-picker :default-value="[moment(this.startTime, this.dateFormat)._i, moment(this.endTime, this.dateFormat)._i]" style="width: 300px;" @change="onChangeDate"/>-->
              {{this.order.startTime}} ~ {{this.order.endTime}}
            </div>
          </div>

          <div class="goods-type goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 3px solid #339966;">
              续租天数
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              <!--<a-select
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
              </a-select>-->
              <a-input placeholder="输入续租天数" style="width: 200px" v-model="reletTime" allowClear @change="onChangeDate" ></a-input>
            </div>
          </div>

        </div>

      </div>
      <br/>
      <div class="order-envelope" style="border: 2px solid #339966; width: 400px; height: 185px; position: absolute; right: 0px;">
        <div style="position: absolute; top: 20px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">实付款:</span>
          <span style="font-size: 14pt; font-weight: bold; color: #339966;">￥{{goodsDetial.rental*this.order.rentTime + goodsDetial.deposit}}</span>
        </div>

        <div style="position: absolute; top: 80px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">地址:</span>
          <span style="font-size: 10pt;  ">{{userAddress.address_info}}</span>
        </div>

        <div style="position: absolute; top: 140px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">收货人:</span>
          <span style="font-size: 10pt;  ">{{userInfo.name}}</span>
          <span style="font-size: 10pt; margin-left: 10px;"> {{userInfo.mobile}}</span>
        </div>

        <div style="width: 100%; position: absolute; top: 184px;">
          <a @click="continueOrder">
            <div style="height: 50px; line-height: 50px; text-align: center; width: 100px; color:white; background-color: #339966; position: absolute; right: 0px;">
              续租
            </div>
          </a>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import SearchBarPerson from "@/views/user/personal/components/SearchBarPerson";
import {getOrderInfo, continueOrder} from "@/api/order";
import {getGoodsInfo} from "@/api/goodsDetail";
import {getDefaultAddress, getUserInfo} from "@/api/rental";
import user from "@/store/module/user";

export default {
  name: "Continue",
  components: {SearchBarPerson, SiteNav},
  data() {
    return {
      order: [],
      userAddress:[],
      userInfo: [],
      goodsDetial: [],
      state: '',
      reletTime: ''
    }
  },

  mounted() {
    const{id} = this.$route.params;
    getOrderInfo(id).then(res => {
      console.log("orderDescription",res.data)
      this.order = res.data
      this.order.image = process.env.VUE_APP_API_HOST + this.order.image
      if(this.order.orderState ===1){
        this.state = "未支付"
      }
      if(this.order.orderState ===3){
        this.state = "待发货"
      }
      if(this.order.orderState ===4){
        this.state = "待收货"
      }if(this.order.orderState ===9){
        this.state = "待归还"
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

    }).catch(error => {
      console.log(error)
    })



    //user.state.userId
    getUserInfo(user.state.userId).then(res => {
      console.log("res-user",res.data)
      this.userInfo = res.data
      console.log("userInfo",this.userInfo)
    }).catch(error => {
      console.log(error)
    });
    getDefaultAddress(user.state.userId).then(res => {
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
    continueOrder(){
      console.log("update-order",this.order)
      continueOrder(this.order.id, this.reletTime, this.goodsDetial.rental*this.reletTime).then(res => {
        console.log("res-order",res.data)
        // this.$router.push({name: 'pay',
        //   params: {goodsId: this.goodsDetial.id,startTime: this.startTime, endTime: this.endTime, type: this.type, }})
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="less" scoped>
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
  font-size: 11pt;
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

</style>