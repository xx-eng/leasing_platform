<template>
  <div class="school-home">
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
      </a-breadcrumb>
    </div>
    <div class="tips">
      <a-collapse default-active-key="0">
        <a-collapse-panel key="1" header="☺校租租温馨提示">
          <p>1. 欢迎来到校租租，首先进入的是首页，展示了与你同校的同学挂出的闲置待租物品。您可以在当中找寻您心仪的物品进行租赁</p>
          <p>2. 进入“我的租屋”板块，进行订单管理和商品管理操作。可查看自己的订单和挂出自己的闲置物品。</p>
        </a-collapse-panel>
      </a-collapse>
      <div class="my-rent">
        <a-button type="primary" @click="goToMyFavourite">我的收藏</a-button>
        <a-button type="primary" @click="goToMyRent" style="margin-left: 30px;">我的租屋</a-button>
      </div>
    </div>
    <div class="goods">
      <div class="goods-title">
        <span>全部商品</span>
      </div>
      <div class="goods-box">
        <div class="goods-item" v-for="item in goods" :key="item.id" @click="goToDetail(item)">
          <div class="show-all"><img :src="item.image"/></div>
          <div class="goods-desc">
            <div class="title">{{item.title}}</div>
            <div class="rental">￥{{item.rental}}/天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu";
  import {getAllSchoolGoods} from '@/api/school'

  export default {
    name: "SchoolHome",
    components: {
      Menu
    },
  data() {
      return {
        activeNames: ['1'],
        goods: [],

      }
  },
    mounted() {
      getAllSchoolGoods().then(res => {
        this.goods = res.data
        for(let good of this.goods){
          good.image = process.env.VUE_APP_API_HOST + good.image
          good.rental = Number(good.rental)
          good.deposit = Number(good.deposit)
          good.price = Number(good.price)
          console.log(good)
        }
        console.log("goods", this.goods)
      }).catch(error => {
        console.log(error)
      });
    },
    methods: {

      handleChange(val) {
        console.log(val);
      },
      goToMyRent() {
        this.$router.push('/school/myrent')
      },
      goToDetail(item){
        this.$router.push({path: '/school/schoolGoodsDetail/'+item.id})
      },
      goToMyFavourite() {
        this.$router.push({path: '/school/myFavourite'})
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
    /*height: 300px;*/
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



  .goods {
    position: absolute;
    top: 170px;
    left: 220px;
    width: calc(100vw - 280px);
  }

  .goods-title {
    position: relative;
    width: 92%;
    left: 60px;
    top: 0px;
    border-left: 8px solid #339966;
    padding-left: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .goods-title span {
    font-size: 30px;
    font-weight: 700;
  }

  .goods-box{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    position: relative;
    left: 50%;
    top: 0px;
    transform: translate(-50%);
    width: 92%;
  //background-color: red;
  }

  .goods-item{
    box-sizing: border-box;
    width: 19.45%;
    border: 1px solid #e9e9e9;
    padding: 10px 10px;
    margin: 3px 3px;
    background-color: white;
  }

  .goods-item:hover {
    cursor: pointer;
    border: 1px solid #a1dda9;
  }

  .show-all{
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }

  .show-all img {
    height: 100%;
  }

  .rental {
    font-size: 18px;
    color: #339966;
    font-weight: bold;
  }

  .active{
    color: #13c45b;
  }

  /* elementui样式 */
  /deep/.ant-breadcrumb-link:hover{
    color: #127c47;
  }
</style>