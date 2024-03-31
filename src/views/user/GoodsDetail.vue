<template>
<div>
  <SiteNav></SiteNav>
  <SearchBar></SearchBar>
  <div class="goods">
    <div class="goods-title" style="width: 100%; height: 50px; line-height: 50px; border-top: 1px solid #e9e9e9; border-bottom: 1px solid #e9e9e9;">
      <span class="title"><a style="color: #117c6f;font-weight: bold" @click="$router.back()">&lt;&lt;返回</a>&nbsp;&nbsp;{{goodsDetial.title}}</span>
      <span class="rental">
          <span style="font-size: 12pt; font-weight: normal; color: #7D7365;">租金：</span>
          ￥&nbsp;&nbsp;{{goodsDetial.rental}}
        </span>
    </div>

    <div class="goods-box" style="width: 100%; height: 500px; ">
      <img :src="goodsDetial.image" class="goods-image"/><!--background-color: lightyellow-->
      <div class="goods-info">
        <div class="goods-title">{{goodsDetial.title}}</div>
        <div class="goods-money">
          <a-list style="width: 535px;">
            <a-list-item style="background-color: #a1dda9;">
              <span class="money-type">租金：</span>
              <span class="money" style="font-size: 15pt; font-weight: bold;">￥{{goodsDetial.rental}}/天</span>
            </a-list-item>
            <a-list-item>
              <span class="money-type">押金：</span>
              <span class="money">￥{{goodsDetial.deposit}}</span>
            </a-list-item>
            <a-list-item>
              <span class="money-type">购买价格：</span>
              <span class="money">￥{{goodsDetial.price}}</span>
            </a-list-item>
          </a-list>

        </div>
        <div style="height: 50px; line-height: 50px; border-bottom: 0.5px solid #e9e9e9;">
          <span style="position: relative; left: 25px;">
            库存：{{goodsDetial.stock}}
          </span>
        </div>
        <div style="height: 50px; line-height: 50px; border-bottom: 0.5px solid #e9e9e9;">
          <span style="position: relative; left: 25px;">
            最短租赁天数：
            <span style="font-size: 15pt; color: #101010;">{{goodsDetial.rentTime}}天</span>
          </span>
        </div>

        <div style="position: relative; top: 100px;">
          <a-button class="like-btn btns" @click="addFavorites">收藏</a-button>
          <a-button class="rent-btn btns" style="position: absolute; right: 0px;" @click="goToRental">租赁</a-button>
        </div>
      </div>

    </div>

    <br/>
    <br/>
    <br/>
    <div class="goods-desc">
      <a-menu v-model="current" mode="horizontal" style="position:absolute; left: 50%; transform: translate(-50%);">
        <a-menu-item :key="0">赔偿标准</a-menu-item>
        <a-menu-item :key="1">宝贝评价</a-menu-item>
      </a-menu>

      <div v-if="current[0] === 0" style="position:relative; top: 100px; width: 100%;">
        <img src="../../assets/images/qq_pic_merged_1611892389095.jpg" width="800" style="position: absolute; left:50%; transform: translate(-50%);"/>
      </div>
      <div v-if="current[0] === 1" style="position:relative; top: 100px; width: 100%;">
        <div
            v-infinite-scroll="handleInfiniteOnLoad"
            class="demo-infinite-container"
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
            style="width: 800px; position: absolute; left:50%; transform: translate(-50%);"
        >
          <a-list :data-source="comments">
            <a-list-item slot="renderItem" slot-scope="item" @click="getChat(item)" style="position: relative; left: 20px; background-color: white;">
              <a-list-item-meta :description="item.goodsComment">
                <a slot="title">{{ item.userId }}</a>
                              <a-avatar
                                  slot="avatar"
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              />
              </a-list-item-meta>
              <!--        <div>Content</div>-->
            </a-list-item>
            <div v-if="loading && !busy" class="demo-loading-container">
              <a-spin />
            </div>
          </a-list>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getGoodsInfo, getAllComments} from "@/api/goodsDetail";
import SiteNav from "@/components/SiteNav";
import SearchBar from "@/components/SearchBar";
import {addFavorites} from "@/api/goodsDetail";
import user from "@/store/module/user";

export default {
  name: "GoodsDetail",
  components: {SiteNav, SearchBar},
  data(){
    return{
      goodsDetial: [],
      current: [0],
      loading: false,
      busy: false,
      comments: []
    }
  },
  async mounted(){
    const {id} = this.$route.params;
    console.log("id", id)
    getGoodsInfo(id).then(res => {
      console.log("res",res.data)
      this.goodsDetial = res.data
      this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
      this.goodsDetial.rental = Number(this.goodsDetial.rental)
      this.goodsDetial.deposit = Number(this.goodsDetial.deposit)
      this.goodsDetial.price = Number(this.goodsDetial.price)

      console.log("goodsDetail", this.goodsDetial)
    }).catch(error => {
      console.log(error)
    })

    getAllComments(id).then(res =>{
      console.log('comment', res.data)
      this.comments = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods:{
    goToRental(){
      if(user.state.userId === ''){
        console.log(user.state.userId === '')
        this.$router.push({path: '/login'})
      }else{
        this.$router.push({path: '/rent/'+ this.goodsDetial.id})
      }

    },
    handleInfiniteOnLoad() {
      const data = this.firm;
      this.loading = true;
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all');
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    },
    addFavorites(){
      if(user.state.userId === ''){
        console.log(user.state.userId === '')
        this.$router.push({path: '/login'})
      }else {
        addFavorites(user.state.userId, this.goodsDetial.id).then(res => {
          console.log("res-favorite", res.data)
          alert("收藏成功")
          //this.$router.push({path: '/pay/'+this.goodsDetial.id})
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods{
  position: absolute;
  top: 130px;
  width: 100%;
}

.title{
  font-size: 12pt;
  position: relative;
  left: 50px;
}
.rental{
  font-size: 15pt;
  font-weight: bold;
  color: #339966;
  position: absolute;
  right: 100px;
}

.goods-image{
  width: 35%;
  position: relative;
  top: 25px;
  left: 50px;
}

.goods-info{
  position: absolute;
  left: 50%;
  top: 90px;
  //background-color: white;
}

.goods-title{
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  //height: 50px;
}

.ant-list-split .ant-list-item {
  border-bottom: 0 solid #339966;
}

.ant-list-item{
  background-color: #e6ffd1;

}

.money{
  position: relative;
  right: 100px;
  color: #339966;
}

.money-type{
  position: relative;
  left: 25px;
}

.btns{
  background-color: #339966;
  color: white;
  width: 200px;
  height: 60px;
  font-size: 15pt
}

.ant-menu-item{
  width: 200px;
  text-align: center;
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

</style>