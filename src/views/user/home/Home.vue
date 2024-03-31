<template>
  <div class="home">
    <SiteNav></SiteNav>
    <SearchBar></SearchBar>
    <div style="width: 100%; height: 650px; background-color: #F5F5F5;">
      <Category></Category>
      <CarouselMap></CarouselMap>
      <PersonalInfo></PersonalInfo>
    </div>

    <div class="goods">
      <div class="goods-container">
        <header class="goods-header" style="border-bottom: 3px solid #117c6f">热门商品</header>
        <div class="goods-box">
          <div class="goods-item" v-for="item in popularGoods" :key="item.id" @click="goToDetail(item)">
            <div class="show-pop"><img :src="item.image"/></div>
            <div class="goods-desc">
              <div class="title">{{item.title}}</div>
              <div class="rental">￥{{item.rental}}/天</div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-container" style="position: relative; top: 80px;">
        <header class="goods-header"  style="border-bottom: 3px solid #117c6f">最新优选</header>
        <div class="goods-box">
          <div class="goods-item" v-for="item in newGoods" :key="item.id" @click="goToDetail(item)">
            <div class="show-pop"> <img :src="item.image"/></div>
            <div class="goods-desc">
              <div class="title" style="display: block;">{{item.title}}</div>
              <div class="rental">￥{{item.rental}}/天</div>
            </div>
          </div>
        </div>
      </div>
    </div>


<!--    <Footer class="footer"></Footer>-->


  </div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import CarouselMap from "@/components/CarouselMap";
import SearchBar from "@/components/SearchBar";
import Category from "@/views/user/home/components/Category";
import PersonalInfo from "@/views/user/home/components/PersonalInfo";
import {getPopularGoods} from "@/api/home";
import {getNewGoods} from "@/api/home";
// import Footer from "@/components/Footer";

export default {
  name: "Home",
  components: {SiteNav, CarouselMap, SearchBar,Category, PersonalInfo,},  // Footer}, //Footer
  data(){
    return{
      popularGoods: [],
      newGoods: [],
    }
  },
  async mounted(){
    getNewGoods().then(res => {
      console.log("res",res.data)
      this.newGoods = res.data
      for(let good of this.newGoods){
        good.image = process.env.VUE_APP_API_HOST + good.image
        good.rental = Number(good.rental)
        good.deposit = Number(good.deposit)
        good.price = Number(good.price)
        console.log(good)
      }
      console.log("new", this.newGoods)
    }).catch(error => {
      console.log(error)
    });
    getPopularGoods().then(res => {
      console.log("res",res.data)
      this.popularGoods = res.data
      for(let good of this.popularGoods){
        good.image = process.env.VUE_APP_API_HOST + good.image
        good.rental = Number(good.rental)
        good.deposit = Number(good.deposit)
        good.price = Number(good.price)
        console.log(good)
      }
      console.log("popular", this.popularGoods)
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {
    goToDetail(item){
      this.$router.push({path: '/goods/'+item.id})
    }
  }


}
</script>

<style lang="less" scoped>
body{
  //background-color: #F5F5F5;
}

.home{
  //background-color: #F5F5F5;
}

.goods{
  position: absolute;
  top: 650px;
  width: 100%;
  //height: 700px;
  //background-color: #F5F5F5;
}

.goods-header{
  height: 50px;
  line-height: 50px;
  //width: 100%;
  //background-color: red;
  display: block;
  font-size:20pt;
  font-weight: bold;
  //font-family: "Arial Narrow";
  position: absolute;
  left: 90px;
}

.goods-box{
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  position: relative;
  left: 50%;
  top: 50px;
  transform: translate(-50%);
  width: 92%;
  //background-color: #F5F5F5;
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

.show-pop{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.show-pop img{
  width: 100%;
}

.rental {
  font-size: 18px;
  color: #339966;
  font-weight: bold;
}

  .footer {
    position: relative;
    top: 700px;
  }



</style>