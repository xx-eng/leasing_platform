<template>
  <div class="my-goods">
    <Menu :current="'8'"  style="z-index: 100;"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="shop" />
          <span>校租租</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>首页</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>我的租屋</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="tips">
      <a-collapse default-active-key="0">
        <a-collapse-panel key="1" header="☺校租租温馨提示">
          <p>1. 欢迎来到我的租屋，首先进入的是“商品管理”板块，这里展示了您挂在校租租上的所有闲置物品。您还可以选择添加商品。</p>
          <p>2. 另一个是“订单管理”板块，可以查看自己在校租租上的所有订单。</p>
        </a-collapse-panel>
      </a-collapse>
      <div class="my-rent" v-if="currentMenuType[0]===0">
        <a-button type="primary" @click="goToAddGoods">添加商品</a-button>
        <a-button type="primary" @click="$router.back()" style="margin-left: 30px;">返回</a-button>
      </div>
    </div>
    <div class="goods">
      <div class="goods-box">
        <div class="my-menu">
          <a-menu v-model="currentMenuType" mode="horizontal" >
            <a-menu-item :key="0" @click="currentMenuType[0]=0"><a-icon type="bars"></a-icon>商品管理</a-menu-item>
            <a-menu-item :key="1" @click="currentMenuType[0]=1"><a-icon type="shopping"></a-icon>订单管理</a-menu-item>
          </a-menu>
        </div>
        <div class="my-content">
          <!-- 商品管理 -->
          <div v-if="currentMenuType[0]===0" class="table">
            <a-table
                    :columns="columns"
                    :row-key="goods => goods.id"
                    :data-source="mygoods"
                    :pagination="pagination"
                    :loading="loading"
                    @change="handlePageChange"
            >
              <div
                      slot="filterDropdown"
                      slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                      style="padding: 8px"
              >
                <a-input
                        v-ant-ref="c => (searchInput = c)"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                  Search
                </a-button>
                <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                  Reset
                </a-button>
              </div>
              <a-icon
                      slot="filterIcon"
                      slot-scope="filtered"
                      type="search"
                      :style="{ color: filtered ? '#108ee9' : undefined }"
              />
              <template slot="customRender" slot-scope="text, record, index, column">
                <span v-if="searchText && searchedColumn === column.dataIndex">
                  <template
                          v-for="(fragment, i) in text
                      .toString()
                      .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                  >
                    <mark
                            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                            :key="i"
                            class="highlight"
                    >{{ fragment }}</mark>
                    <template v-else>{{ fragment }}</template>
                  </template>
                </span>
                <template v-else>
                  {{ text }}
                </template>
              </template>
              <a slot="image" slot-scope="text, record" @click="gotoDescription(record)">
                <img  :src="record.image" style="width: 80px;" />
              </a>

              <template slot="date" slot-scope="text, record">
                <span>{{record.startTime.substring(0, 10)}}~<br/>{{record.endTime.substring(0,10)}}</span>
              </template>


              <div slot="operate" slot-scope="text, record">
                <div>
                  <a @click="goToDetail(record)">详情</a>
                </div>
                <div>
                  <a @click="deleteGoods(record)">删除</a>
                </div>


              </div>
            </a-table>
          </div>
          <!-- 订单管理 -->
          <div v-else class="table">
            <a-menu v-model="currentType" mode="horizontal" >
<!--              <a-menu-item :key="0" @click="getAllOrder">全部订单</a-menu-item>-->
              <a-menu-item :key="1" @click="getUserUnpayOrder">待付款</a-menu-item>
              <a-menu-item :key="2" @click="getUserReturnOrder">待归还</a-menu-item>
              <a-menu-item :key="3">已完成</a-menu-item>
            </a-menu>
            <a-table
                    :columns="columns2"
                    :row-key="order => order.id"
                    :data-source="myorders"
                    :pagination="pagination"
                    :loading="loading"
                    @change="handlePageChange"
            >
              <a slot="image" slot-scope="text, record" @click="gotoDescription(record)">
                <img  :src="record.image" style="width: 80px;" />
              </a>

<!--              <template slot="date" slot-scope="text, record">-->
<!--                <span>{{record.startTime.substring(0, 10)}}~<br/>{{record.endTime.substring(0,10)}}</span>-->
<!--              </template>-->


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
                  <a v-if="record.type!=3" @click="gotoBuy(record)">购买</a><br/>
                  <a>返还</a><br/>
                </div>
                <div v-else-if="currentType[0] === 10">
                  <a @click="gotoComment(record)">评论</a>
                </div>
                <div v-else-if="currentType[0] === 8">
                  <a @click="gotoDescription(record)">详情</a>
                </div>


              </div>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import user from "@/store/module/user";
  import {getUserSchoolGoods, getUserUnpayOrder, getUserReturnOrder, deleteUserGoods} from '@/api/school'
  export default {
    name: "MyGoodsList",
    components: {
      Menu
    },
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
          dataIndex: 'title',
          align: 'center',
          width: '200px',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.title
                  .toString()
                  .includes(value),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: '押金',
          dataIndex: 'rental',
          align: 'center',
          width: '30',
          sorter: (a, b) => a.rental - b.rental,
        },
        {
          title: '租金',
          align: 'center',
          dataIndex: 'deposit',
          width: '30',
          sorter: (a, b) => a.deposit - b.deposit,
        },
        {
          title: '交易状态',
          align: 'center',
          dataIndex: 'isSale',
          filters: [
            { text: '未租', value: '未租' },
            { text: '已租', value: '已租' },
          ],
          onFilter: (value, record) => record.isSale.indexOf(value) === 0
        },
        {
          title: '租期',
          dataIndex: 'rentTime',
          align: 'center',
          width: '140px',
          // scopedSlots: { customRender: 'date' },
        },
        {
          title: '添加时间',
          dataIndex: 'createdTime',
          align: 'center',
          width: '140px',
          sorter: (a, b) => {
            let time1 = a.createdTime.toString().split('-');
            let time2 = b.createdTime.toString().split('-');
            let time11 =new Date(time1[0]-0,time1[1]-1,time1[2].substring(0, 2)-0);
            let time22 =new Date(time2[0]-0,time2[1]-1,time2[2].substring(0, 2)-0);
            console.log('hhhhhhhhhh')
            console.log('time1', time1)
            console.log('time2', time2)
            console.log('04'-1)
            return time11 > time22
          }
        },
        {
          title: '详细操作',
          dataIndex: 'operate',
          width: '100',
          scopedSlots: { customRender: 'operate' },
        },
      ];
      const columns2 = [
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
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.title
                  .toString()
                  .includes(value),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: '押金',
          dataIndex: 'rental',
          align: 'center',
          width: '30',
          sorter: (a, b) => a.rental - b.rental,
        },
        {
          title: '租金',
          align: 'center',
          dataIndex: 'deposit',
          width: '30',
          sorter: (a, b) => a.deposit - b.deposit,
        },
        {
          title: '订单状态',
          align: 'center',
          dataIndex: 'orderState',
        },
        {
          title: '租期',
          dataIndex: 'rentTime',
          align: 'center',
          width: '140px',
          // scopedSlots: { customRender: 'date' },
        },
        {
          title: '开始时间',
          dataIndex: 'startTime',
          align: 'center',
          width: '140px',
          // scopedSlots: { customRender: 'date' },
          sorter: (a, b) => {
            let time1 = a.startTime.toString().split('-');
            let time2 = b.startTime.toString().split('-');
            let time11 =new Date(time1[0]-0,time1[1]-1,time1[2].substring(0, 2)-0);
            let time22 =new Date(time2[0]-0,time2[1]-1,time2[2].substring(0, 2)-0);
            console.log('hhhhhhhhhh')
            console.log('time1', time1)
            console.log('time2', time2)
            console.log('04'-1)
            return time11 > time22
          }
        },
        {
          title: '详细操作',
          dataIndex: 'operate',
          width: '100',
          scopedSlots: { customRender: 'operate' },
        },
      ];
      return {
        activeNames: ['1'],
        myorders: [],
        mygoods: [],
        pagination: {
          pageSize: 2,
          current: 1,
          total: 0
        },
        loading: false,
        columns,
        columns2,
        type: 0,
        currentMenuType: [0],
        currentType: [1],
        searchText: '',
        searchInput: null,
        searchedColumn: '',
      }
    },
    mounted() {
      /* 获取我的所有商品 */
      getUserSchoolGoods(user.state.userId).then(res => {
        this.mygoods = res.data
        for(let goods of this.mygoods){
          goods.image = process.env.VUE_APP_API_HOST + goods.image
          goods.rental = Number(goods.rental)
          goods.deposit = Number(goods.deposit)
          goods.price = Number(goods.price)
          if(goods.isSale) {
            goods.isSale = '已租'
          }
          else {
            goods.isSale = '未租'
          }
          if(!goods.rentTime) {
            goods.rentTime = '无'
          }
          console.log(goods)
        }
        console.log("mygoods", this.mygoods)
      }).catch(error => {
        console.log(error)
      });
      getUserUnpayOrder(user.state.userId).then(res => {
        this.myorders = res.data
        for(let order of this.myorders){
          order.image = process.env.VUE_APP_API_HOST + order.image
          order.rental = Number(order.rental)
          order.deposit = Number(order.deposit)
          order.price = Number(order.price)
          console.log(order)
        }
        console.log("myorders", this.myorders)
      }).catch(error => {
        console.log(error)
      });
    },
    methods: {
      handlePageChange(pagination){
        this.pagination = pagination
        // this.select()
      },
      goToAddGoods() {
        this.$router.push('/school/myrent/addGoods')
      },
      goToDetail(item){
        this.$router.push({path: '/school/schoolGoodsDetail/'+item.id})
      },
      deleteGoods(record) {
        deleteUserGoods(record.id).then(res => {
          console.log('res', res)
          if (res.code === 2002) {
            this.$notification.success({  //添加成功侧边提示框
              message: '操作消息',
              description: '恭喜您已成功删除商品！',
              icon: <a-icon type="smile" style="color: #339966" />,
          })
            getUserSchoolGoods(user.state.userId).then(res => {
              this.mygoods = res.data
              for(let goods of this.mygoods){
                goods.image = process.env.VUE_APP_API_HOST + goods.image
                goods.rental = Number(goods.rental)
                goods.deposit = Number(goods.deposit)
                goods.price = Number(goods.price)
                if(goods.isSale) {
                  goods.isSale = '已租'
                }
                else {
                  goods.isSale = '未租'
                }
                if(!goods.rentTime) {
                  goods.rentTime = '无'
                }
                console.log(goods)
              }
              console.log("mygoods", this.mygoods)
            }).catch(error => {
              console.log(error)
            });
          }
        })
      },
      /* 筛选 */
      handleSearch(selectedKeys, confirm, dataIndex) {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchedColumn = dataIndex;
      },
      handleReset(clearFilters) {
        clearFilters();
        this.searchText = '';
      },

      /* 获取数据 */
      /* 待付款订单*/
      getUserUnpayOrder() {
        getUserUnpayOrder(user.state.userId).then(res => {
          this.myorders = res.data
          for(let order of this.myorders){
            order.image = process.env.VUE_APP_API_HOST + order.image
            order.rental = Number(order.rental)
            order.deposit = Number(order.deposit)
            order.price = Number(order.price)
            order.orderSate = '待付款'
            console.log(order)
          }
          console.log("myorders", this.myorders)
        }).catch(error => {
          console.log(error)
        });
      },
      /* 待归还订单*/
      getUserReturnOrder() {
        getUserReturnOrder(user.state.userId).then(res => {
          this.myorders = res.data
          for(let order of this.myorders){
            order.image = process.env.VUE_APP_API_HOST + order.image
            order.rental = Number(order.rental)
            order.deposit = Number(order.deposit)
            order.price = Number(order.price)
            console.log(order)
          }
          console.log("myorders", this.myorders)
        }).catch(error => {
          console.log(error)
        });
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

  .tips {
    position: absolute;
    top: 100px;
    left: 280px;
    width: calc(100vw - 350px);
    z-index: 999;
  }

  >>>.ant-collapse.ant-collapse-icon-position-left {
    display: inline-block;
    background-color: #f9f9f9;
  }


  >>>.ant-collapse .ant-collapse-item {
    width: 700px;
    height: 45px;
    /*background-color: #65cf88;*/
    font-weight: bold;
  }

  >>>.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    color: #46985a;
  }

  >>>.ant-collapse-content-box {
    border: 1px dashed #dbdbdb;
    border-top: 0;
    font-weight: 400;
    background-color: #effcf4;
  }

  .my-rent {
    display: inline-block;
    position: fixed;
    right: 50px;
    margin-left: 10px;
    margin-top: 6px;
  }

  .ant-btn-primary {
    background-color: #127c47;
    border-color: #127c47;
  }

  .ant-btn-primary:hover {
    background-color: rgba(18, 124, 71, .9);
    border-color: rgba(18, 124, 71, .9);
  }

  /* 菜单栏 */
  .select-item{
    display: inline-block;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12pt;
    border: 1px solid #127c47;
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


  .goods {
    position: absolute;
    top: 150px;
    left: 220px;
    width: calc(100vw - 280px);
  }

  .goods-box{
    position: relative;
    left: 50%;
    top: 0px;
    transform: translate(-50%);
    width: 92%;
  //background-color: red;
  }

  .goods-box .my-menu {
    margin-bottom: 20px;
  }


  /* elementui样式 */
  /deep/.ant-breadcrumb-link:hover{
    color: #127c47;
  }

  .ant-table-row-cell-break-word a {
    color: #353535;
  }

  .ant-table-row-cell-break-word a:hover {
    color: #127c47;
  }
</style>