<template>
<div>
  <SiteNav></SiteNav>
  <SearchBar></SearchBar>
  <div class="desc">
    <div class="selected-label" >
      <span style="position: relative; left: 50px;"> 全部结果<a-icon type="right" /> </span>
      <button @click="$router.back()">返回</button>
    </div>
    <div style="width: 100%; background-color: #F5F5F5; height: 130px;">
      <a-list style="width: 92%;background-color: white; position: relative; left: 50%; transform: translate(-50%); font-size: 9pt;">
        <a-list-item >
          <div class="select-title">分类:</div>
          <div class="select-list-items" style="position: absolute; left: 100px;">
            <!--<a><div class="select-item">不限</div></a>-->

              <div v-for="item in categories" :key="item.id" class="select-item">
                <a :class="activeCategory == item.id ? 'active':''" @click="getSelectedGoods(item)">{{item.name}}</a>
            </div>
          </div>
        </a-list-item>

        <a-list-item >
          <div class="select-title">分类:</div>
          <div class="select-list-items" style="position: absolute; left: 100px;">
            <!--<a><div class="select-item">不限</div></a>-->
            <a>
              <div :class="activeCategoryDetail == item.id ? 'active':''" v-for="item in categoryDetial" :key="item.id" class="select-item"  @click="getSelectGoods(item)">
                {{item.name}}
              </div>
            </a>
          </div>
        </a-list-item>

<!--        <a-list-item>-->
<!--          <div class="select-title">租金:</div>-->
<!--          <div class="select-list-items"  style="position: absolute; left: 100px;">-->
<!--            <a><div class="select-item">0-199</div></a>-->
<!--            <a><div class="select-item">200-499</div></a>-->
<!--            <a><div class="select-item">500-999</div></a>-->
<!--            <a><div class="select-item">1000以上</div></a>-->
<!--          </div>-->

<!--        </a-list-item>-->

<!--        <a-list-item>-->
<!--          <div class="select-title">押金:</div>-->
<!--          <div class="select-list-items"  style="position: absolute; left: 100px;">-->
<!--            <a><div class="select-item">0-1000</div></a>-->
<!--            <a><div class="select-item">1000-2000</div></a>-->
<!--            <a><div class="select-item">2000-6000</div></a>-->
<!--            <a><div class="select-item">6000以上</div></a>-->
<!--          </div>-->

<!--        </a-list-item>-->
      </a-list>
    </div>
    <div class="goods">
      <div class="goods-box">
        <div class="goods-item" v-for="item in goods" :key="item.id" @click="goToDetail(item)">
          <div class="show-pop"><img :src="item.image"/></div>
          <div class="goods-desc">
            <div class="title">{{item.title}}</div>
            <div class="rental">￥{{item.rental}}/天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer class="footer"></Footer>

</div>
</template>

<script>
import {getACategory} from "@/api/category";
import SiteNav from "@/components/SiteNav";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import {getAllCategory} from "@/api/home";
import {getSelectGoods} from "@/api/categoryPage";
import {getSelectedGoods} from "@/api/categoryPage";

export default {
  name: "CategoryPage",
  components: {SiteNav, SearchBar, Footer}, //, Footer},
  data(){
    return{
      categories: [],
      activeCategory: 1,
      categoryDetial: [],
      activeCategoryDetail: -1,
      goods: [],
    }
  },
  async mounted(){
    const {id} = this.$route.params;
    console.log("id", id)
    getACategory(id).then(res => {
      console.log("res",res.data)
      this.categoryDetial = res.data
      console.log("categoryDetial", this.categoryDetial)
    }).catch(error => {
      console.log(error)
    });
    getAllCategory().then(res => {
      console.log("res",res.data)
      this.categories = res.data
      console.log("categories", this.categories)
    }).catch(error => {
      console.log(error)
    });
    getSelectedGoods(id).then(res => {
      console.log("大类res",res.data)
      this.goods = res.data
      for(let good of this.goods){
        good.image = process.env.VUE_APP_API_HOST + good.image
        good.rental = Number(good.rental)
        good.deposit = Number(good.deposit)
        good.price = Number(good.price)
        console.log(good)
      }
      console.log("大类goods:", this.goods)
    }).catch(error => {
      console.log(error)
    });

  },

  methods: {
    getSelectedGoods(item){
      console.log('getSelectedGoods', item.id)
      getSelectedGoods(item.id).then(res => {
        this.activeCategory = item.id
        console.log("res",res.data)
        this.goods = res.data
        for(let good of this.goods){
          good.image = process.env.VUE_APP_API_HOST + good.image
          console.log(good)
        }
        console.log("goods", this.goods)

      }).catch(error => {
        console.log(error)
      });
      getACategory(item.id).then(res => {
        console.log("res",res.data)
        this.categoryDetial = res.data
        console.log("categoryDetial", this.categoryDetial)
      }).catch(error => {
        console.log(error)
      });
    },
    getSelectGoods(item){
      console.log('getSelectGoods::', item.id)
      getSelectGoods(item.id,1,30).then(res => {
        this.activeCategoryDetail = item.id
        console.log("res",res.data)
        this.goods = res.data
        for(let good of this.goods){
          good.image = process.env.VUE_APP_API_HOST + good.image
          console.log(good)
        }
        console.log("goods", this.goods)

      }).catch(error => {
        console.log(error)
      })
    },
    goToDetail(item){
      this.$router.push({path: '/goods/'+item.id})
    },

  }
}
</script>

<style lang="less" scoped>

body{
  background-color: #F5F5F5;
}
.desc{
  position: absolute;
  top: 130px;
  width: 100%;
  background-color: #F5F5F5;
 // height: 500px;
}

.selected-label {
  margin-top: 15px;
  margin-bottom: 10px;
}

.select-item{
  display: inline-block;
  margin-right: 40px;
}

.select-title{
  position: relative;
  left: 20px;
  font-weight: bold;
  font-size: 13px;
  color: #117c6f;
}

a{
  color: #101010;
}

button {
  position: absolute;
  right: 50px;
  background-color: #117c6f;
  color: #fff;
  border: 1px solid #117c6f;
  border-radius: 5px
}

button:hover {
  background-color: #127c10;
  cursor: pointer;
}

.goods{
  position: absolute;
  //top: 650px;
  //display: block;
  width: 100%;
  //background-color: #F5F5F5;
}

.goods-box{
  display: flex;
  justify-content: flex-start;
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
  //height: 250px;
}

.goods-item:hover {
  cursor: pointer;
  border: 1px solid #a1dda9;
}

.show-pop{
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.show-pop img {
  width: 100%;
}

.active{
  color: #13c45b;
}

.footer {
  position: relative;
  top: 950px;
}
</style>