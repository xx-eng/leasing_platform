<template>
<div>
  <Menu :current="'3'" style="z-index: 100;"></Menu>
  <div class="bread">
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <a-icon type="home" />
        <span>用户中心</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="solution" />
        <span>我的订单</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div style="position: absolute;top: 90px;width: 75%;left: 275px;">
    <a-menu v-model="currentType" mode="horizontal" >
      <a-menu-item :key="0" @click="getAllOrder">全部订单</a-menu-item>
      <a-menu-item :key="1" @click="getUnpayOrders">待付款</a-menu-item>
      <a-menu-item :key="3" @click="getShippedOrders">待发货</a-menu-item>
      <a-menu-item :key="4" @click="getDispatchedOrders">待收货</a-menu-item>
      <a-menu-item :key="9" @click="getNotReturnOrders">待归还</a-menu-item>
      <a-menu-item :key="8" @click="getTerminalOrder">退租订单</a-menu-item>
      <a-menu-item :key="10" @click="getCompleteOrders">待评价</a-menu-item>
      <a-menu-item :key="11" @click="getUselessOrders">已完成</a-menu-item>
    </a-menu>
  </div>

  <!--<div style="position: absolute;text-align: center; width: 150px; top: 95px; left: 750px;">
    <a-select
        show-search
        placeholder="选择租赁方式"
        option-filter-prop="children"
        style="width: 150px"
        :filter-option="filterOption"
        @change="handleChangeType"
        v-model="type"
    >
      <a-select-option :value="0">
        全部
      </a-select-option>
      <a-select-option :value="1">
        以租代售
      </a-select-option>
      <a-select-option :value="2">
        共享租赁
      </a-select-option>
      <a-select-option :value="3">
        先租后售
      </a-select-option>
    </a-select>
  </div>-->

  <div class="table">
    <a-table
        :columns="columns"
        :row-key="order => order.id"
        :data-source="order"
        :pagination="pagination"
        :loading="loading"
        @change="handlePageChange"
    >
      <a slot="image" slot-scope="text, record" @click="gotoDescription(record)">
        <img  :src="record.image" style="width: 80px;" />
      </a>

      <template slot="date" slot-scope="text, record">
        <span>{{record.startTime.substring(0, 10)}}~<br/>{{record.endTime.substring(0,10)}}</span>
      </template>


      <div slot="operate" slot-scope="text, record">
        <div v-if="currentType === 0">
          <a @click="gotoDescription(record)">详情</a>
        </div>
        <div  v-if="currentType[0]===0">
          <a @click="gotoDescription(record)">详情</a>
          <!--<a @click="gotoLOG(record)">查看物流</a><br/>
          <a>投诉商家</a><br/>
          <a @click="gotoContinue(record)">续租</a><br/>
          <a @click="gotoTerminal(record)">退租</a><br/>
          <a @click="gotoComment(record)">评论</a>-->
        </div>
        <div v-else-if="currentType[0] === 1">
          <a @click="gotoPay(record)">付款</a><br/>
          <a >取消订单</a>
        </div>
        <div v-else-if="currentType[0] === 3">
          <a @click="gotoComplain(record)">投诉商家</a><br/>
        </div>
        <div v-else-if="currentType[0] === 4">
          <a @click="confirm(record)">确认收货</a><br/>
          <a @click="gotoComplain(record)">投诉商家</a><br/>
        </div>
        <div v-else-if="currentType[0] === 9">
          <a @click="gotoComplain(record)">投诉商家</a><br/>
          <a @click="gotoContinue(record)">续租</a><br/>
          <a @click="gotoTerminal(record)">退租</a><br/>
          <a @click="gotoNormalTerminal(record)">退款</a><br/>
          <a v-if="record.type!=3" @click="gotoBuy(record)">购买</a><br/>
          <a>返还</a><br/>
        </div>
        <div v-else-if="currentType[0] === 10">
          <a @click="gotoComment(record)">评论</a>
        </div>
        <div v-else-if="currentType[0] === 8">
          <a @click="gotoDescription(record)">详情</a>
        </div>

        <div v-if="currentType[0] === 11">
          <a @click="gotoDescription(record)">详情</a>
        </div>


      </div>
    </a-table>
  </div>

</div>
</template>

<script>
  import Menu from "@/components/Menu";
  import {getAllOrders, getShippedOrders,
    getDispatchedOrders, getNotReturnOrders,
    getUnpayOrders, getCompleteOrders,
    confirm, getTerminalOrder, getUselessOrders} from "@/api/order";
  import user from "@/store/module/user";


  export default {
    name: "Order",
    components: {  Menu },
    data() {
      const columns = [
        {
          title: '商品图片',
          dataIndex: 'image',
          align: 'center',
          width: '100px',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: '商品详情',
          dataIndex: 'goodsTitle',
          align: 'center',
          width: '200px',
          //scopedSlots: { customRender: 'order' },
        },
        {
          title: '押金',
          dataIndex: 'rental',
          align: 'center',
          width: '30',
        },
        {
          title: '租金',
          align: 'center',
          dataIndex: 'deposit',
          width: '30',
        },
        {
          title: '交易状态',
          align: 'center',
          dataIndex: 'status'
        },
        {
          title: '租赁类型',
          align: 'center',
          dataIndex: 'typeName'
        },
        {
          title: '租期',
          align: 'center',
          width: '140px',
          scopedSlots: { customRender: 'date' },
        },
        {
          title: '详细操作',
          dataIndex: 'operate',
          width: '100',
          scopedSlots: { customRender: 'operate' },
        },
      ];

      return {
        currentType: [0],
        order: [],
        pagination: {
          pageSize: 2,
          current: 1,
          total: 0
        },
        loading: false,
        columns,
        type: 0,
      };
    },
    mounted() {
      // 获取所有订单
      getAllOrders(user.state.userId, 1, 100, this.type).then(res => {
        console.log("res-order",res.data)
        this.order = res.data
        this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
        for(let orderinfo of this.order){
          orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
          orderinfo.rental = Number(orderinfo.rental)
          orderinfo.deposit = Number(orderinfo.deposit)
          if (orderinfo.orderState === 1) {
            orderinfo.status = '待付款'
          }
          if (orderinfo.orderState === 3) {
            orderinfo.status = '待发货'
          }
          if (orderinfo.orderState === 4) {
            orderinfo.status = '待收货'
          }
          if (orderinfo.orderState === 6) {
            orderinfo.status = '续租'
          }
          if (orderinfo.orderState === 7) {
            orderinfo.status = '已购买'
          }
          if (orderinfo.orderState === 8) {
            orderinfo.status = '退租'
          }
          if (orderinfo.orderState === 9) {
            orderinfo.status = '返还'
          }
          if (orderinfo.orderState === 10) {
            orderinfo.status = '结束'
          }
          if (orderinfo.type === '1') {
            console.log('type', orderinfo.type)
            orderinfo.typeName = '以租代售'
          }
          if (orderinfo.type === '2') {
            orderinfo.typeName = '共享租赁'
          }
          if (orderinfo.type === '3') {
            orderinfo.typeName = '先租后售'
          }
          console.log(orderinfo)
        }
        console.log("order", this.order)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      handlePageChange(pagination){
        this.pagination = pagination
        this.select()
      },
      // 获取所有订单
      getAllOrder(){
        console.log('type', this.type)
        getAllOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取待付款订单
      getUnpayOrders(){
        console.log('currentType', this.currentType)
        console.log('type', this.type)
        getUnpayOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("unpay-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取待发货订单
      getShippedOrders(){
        console.log('type', this.type)
        getShippedOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取待收货订单
      getDispatchedOrders(){
        console.log('type', this.type)
        getDispatchedOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取待归还订单
      getNotReturnOrders(){
        console.log('type', this.type)
        getNotReturnOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取已完成订单
      getCompleteOrders(){
        console.log('type', this.type)
        getCompleteOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      // 获取退租订单
      getTerminalOrder(){
        console.log('type', this.type)
        getTerminalOrder(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              console.log('type', orderinfo.type)
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      getUselessOrders(){
        console.log('type', this.type)
        getUselessOrders(user.state.userId, 1, 10, this.type).then(res => {
          console.log("res-order",res.data)
          this.order = res.data
          this.order = this.order.filter(order => !(Number(order.type) === '4'))  //过滤校园租赁订单
          for(let orderinfo of this.order){
            orderinfo.image = process.env.VUE_APP_API_HOST + orderinfo.image
            orderinfo.rental = Number(orderinfo.rental)
            orderinfo.deposit = Number(orderinfo.deposit)
            if (orderinfo.orderState === 1) {
              orderinfo.status = '待付款'
            }
            if (orderinfo.orderState === 3) {
              orderinfo.status = '待发货'
            }
            if (orderinfo.orderState === 4) {
              orderinfo.status = '待收货'
            }
            if (orderinfo.orderState === 6) {
              orderinfo.status = '续租'
            }
            if (orderinfo.orderState === 7) {
              orderinfo.status = '已购买'
            }
            if (orderinfo.orderState === 8) {
              orderinfo.status = '退租'
            }
            if (orderinfo.orderState === 9) {
              orderinfo.status = '返还'
            }
            if (orderinfo.orderState === 10) {
              orderinfo.status = '结束'
            }
            if (orderinfo.type === '1') {
              orderinfo.typeName = '以租代售'
            }
            if (orderinfo.type === '2') {
              orderinfo.typeName = '共享租赁'
            }
            if (orderinfo.type === '3') {
              orderinfo.typeName = '先租后售'
            }
            console.log(orderinfo)
          }
          console.log("order", this.order)
        }).catch(error => {
          console.log(error)
        })
      },
      confirm(record){
        confirm(record.id).then(res => {
          if(res.code === 2004){
            this.$notification.success({  //确认收货侧边提示框
              message: '操作消息',
              description: '你已确认收货！',
              icon: <a-icon type="smile" style="color: #339966" />,
          })
          }
        })
      },



      gotoLOG(record){ //跳转！！！
        console.log(record)
        this.$router.push({name: 'orderDescription',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoDescription(record){
        console.log(record)
        this.$router.push({name: 'orderDescription',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoContinue(record){
        console.log(record)
        this.$router.push({name: 'continue',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoTerminal(record){
        console.log(record)
        this.$router.push({name: 'terminal',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoNormalTerminal(record){
        console.log(record)
        this.$router.push({name: 'NormalTerminal',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoComment(record){
        console.log(record)
        this.$router.push({name: 'comment',
          params: {goodsId: record.goods_id, id: record.id }})
      },
      gotoPay(record){
        this.$router.push({name: 'pay',
          params: { order: record }})
      },
      gotoBuy(record){
        this.$router.push({name: 'buy',
          params: { order: record}})
      },
      gotoComplain(record){
        this.$router.push({name: 'complain',
          params: {goodsId: record.goods_id, id: record.id }})
      }
    },
  }
</script>

<style scoped>
.table {
  position: absolute;
  top: 150px;
  width: 75%;
  left: 275px;
  //background-color: lightyellow;
}
.bread{
  position: absolute;
  top: 60px;
  left: 270px;
}
a{
  color: #101010;
}

a:hover{
  color: #339966;
}


.select-item{
  display: inline-block;
  width: 150px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 12pt;
  //background-color: lightyellow;
}

.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td{
  background-color: white;
}
.ant-menu-item-selected{
  color: #339966;
  border-bottom: 2px solid #339966;
}

.ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover{
  color: #339966;
  border-bottom: 2px solid #339966;
}

/deep/.ant-breadcrumb-link:hover{
  color: #127c47;
}

/deep/.ant-pagination-item.ant-pagination-item-active {
  border-color: #127c47;
}

/deep/.ant-pagination-item:hover {
  border-color: #127c47;
}

/deep/.ant-pagination-item-active a {
  border-color: #127c47;
  color: #127c47;
}

/deep/a:hover {
  color: #127c47;
}

  /deep/.ant-pagination-prev .ant-pagination-item-link:hover,  /deep/.ant-pagination-next .ant-pagination-item-link:hover{
    color: #127c47;
    border-color: #127c47;
  }



</style>