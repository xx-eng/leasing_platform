<template>
  <div>
    <SiteNav></SiteNav>
    <PayLogoBar></PayLogoBar>
    <div class="order-box">
      <div class="order-title">
        <span @click="$router.back()">&lt;&lt;返回&nbsp;&nbsp;</span>
        <a-icon type="smile"></a-icon>填写并核对订单信息</div>
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
              ￥{{order.rental}}/天
            </div>
          </div>

          <div class="goods-deposit goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              商品押金
            </div>
            <div style="position: absolute;text-align: center; width: 100px; top: 100px; font-size: 13pt;">
              ￥{{order.deposit}}
            </div>
          </div>

          <div class="goods-time goods-list-item">
            <div style="height: 50px;line-height: 50px; width: 100%; text-align: center; font-size: 12pt; border-bottom: 2px solid #339966;">
              所选时间
            </div>
            <div style="position: absolute;text-align: center; width: 100%; top: 100px; font-size: 13pt;">
              <!--<a-range-picker :default-value="[moment(this.startTime, this.dateFormat)._i, moment(this.endTime, this.dateFormat)._i]" style="width: 300px;" @change="onChangeDate"/>-->
              {{order.startTime}} ~ {{order.endTime}}
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
                  @change="handleChange"

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
      <div class="order-envelope" style="border: 2px solid #a1dda9; width: 400px; height: 185px; position: absolute; right: 0px;box-shadow: 2px 2px 5px 2px #e0e0e0">
        <div style="position: absolute; top: 20px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">实付款:</span>
          <span style="font-size: 14pt; font-weight: bold; color: #409969;">￥{{order.rental + order.deposit}}</span>
        </div>

        <div style="position: absolute; top: 80px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">地址:</span>
          <span style="font-size: 10pt;  ">{{userAddress.addressInfo}}</span>
        </div>

        <div style="position: absolute; top: 140px; right: 20px;">
          <span style="font-size: 11pt; margin-right: 20px; font-weight: bold;">收货人:</span>
          <span style="font-size: 10pt;  ">{{userInfo.name}}</span>
          <span style="font-size: 10pt; margin-left: 10px;"> {{userInfo.mobile}}</span>
        </div>

        <div style="width: 100%; position: absolute; top: 184px;">
          <a @click="pay">
            <div style="height: 40px; line-height: 40px; text-align: center; width: 80px; color:white; background-color: #339966; position: absolute; right: 0;top: 10px; font-size: 13px; margin-bottom: 10px; border-radius: 5px">
              付款
            </div>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import PayLogoBar from "@/views/user/pay/components/PayLogoBar";
//import {getAllAddress} from "@/api/rental";
import {getDefaultAddress} from "@/api/rental";
import {getUserInfo} from "@/api/rental";
import user from "@/store/module/user";
import {getGoodsInfo} from "@/api/goodsDetail";
import {pay} from '@/api/rental'
//import moment from 'moment';

export default {
  name: "Payment",
  components: {PayLogoBar, SiteNav},
  data(){
    //this.dateFormat = 'YYYY-MM-DD';
    return{
      userAddress:[],
      userInfo: [],
      goodsDetial: [],
      type:'',
      startTime: '',
      endTime: '',
      rentTime: '',
      rental: '',
      contranctId: '',
      order: []
    }
  },
  methods:{
    //moment,
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
    /*handleChange(value){
      this.type = value
      console.log('value',value)
    },*/

    pay(){
      pay(this.order.id ).then(res => {
        console.log("res-pay",res.data)
        if(res.code === 2004){
          // alert("付款成功")
          this.$router.push('/PaySuccess')
          // this.$router.push('/order')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },

  async mounted(){
    // const {startTime} = this.$route.params
    // this.startTime = startTime
    // const {endTime} = this.$route.params
    // this.endTime = endTime
    // const {type} = this.$route.params
    // this.type = type
    const {order} = this.$route.params
    this.order = order
    this.order.rental = Number(this.order.rental)
    this.order.deposit = Number(this.order.deposit)

    console.log("pay_order::", this.order)
    getGoodsInfo(order.goodsId).then(res => {
      console.log("res",res.data)
      this.goodsDetial = res.data
      this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
      console.log("goodsDetail", this.goodsDetial)
    }).catch(error => {
      console.log(error)
    })
    // user.state.userId
    getUserInfo(user.state.userId).then(res => {
      console.log("res-user", res.data)
      this.userInfo = res.data
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


}
</script>

<style scoped>
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

.goods-type{
  position: absolute;
  left: 870px;
  //background-color: #7B7A7A;
  width: 200px;
}

>>>.ant-calendar-picker, >>>.ant-select-selection.ant-select-selection--single{
  width: 85%;
  left: 7%;
}




</style>