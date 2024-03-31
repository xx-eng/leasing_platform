<template>
<div>
  <Menu :current="5"></Menu>
  <div class="bread">
    <a-breadcrumb>
      <a-breadcrumb-item href="">
        <a-icon type="home" />
        <span>用户中心</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item href="">
        <a-icon type="shopping-cart" />
        <span>我的收藏</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
  <div style="position: absolute; top: 100px; left: 270px;">
    <a>
      <div class="select-item"  style="border-bottom: 5px solid #339966;">
        我的收藏
      </div>
    </a>
  </div>

  <div class="goods">
    <div class="goods-box">
      <div class="goods-item" v-for="item in goods" :key="item.id" @click="goToDetail(item)">
        <img :src="item.image" class="show-pop"/>
        <div class="goods-desc">
          <div class="title">{{item.title}}</div>
          <div class="rental">{{item.rental}}</div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Menu from "@/components/Menu";
import {getFavorites} from "@/api/favourite";
import user from "@/store/module/user";

export default {
  name: "Favourite",
  components: {Menu},
  data(){
    return {
      goods: [],
    }
  },
  mounted() {
    getFavorites(user.state.userId).then(res => {
      console.log("收藏",res.data)
      this.goods = res.data
      this.goods = this.goods.filter(goods => goods.stuGoods === 0)
      for(let good of this.goods){
        good.image = process.env.VUE_APP_API_HOST + good.image
        console.log(good)
      }
      console.log("大类goods:", this.goods)
    }).catch(error => {
      console.log(error)
    });

  },
  methods:{
    goToDetail(item){
      this.$router.push({path: '/goods/'+item.goodsId})
    }

  }
}
</script>

<style lang="less" scoped>
a{
  color: #101010;
}


.bread{
  position: absolute;
  top: 60px;
  left: 270px;
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

.goods{
  position: absolute;
  top: 160px;
  //display: block;
  width: 70%;
  left: 270px;
  //background-color: #F5F5F5;
}

.goods-box{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  left: 50%;
  top: 10px;
  transform: translate(-50%);
  width: 100%;
  //background-color: red;
}

.goods-item{
  box-sizing: border-box;
  width: 19.45%;
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 10px;
  margin: 3px 3px;
  background-color: white;
  //height: 250px;
}

.goods-item:hover {
  cursor: pointer;
  border-bottom: 1px solid #339966;
}

.show-pop{
  width: 160px;
  display: block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.active{
  color: #339966;
}

/deep/.ant-breadcrumb-link:hover{
  color: #127c47;
}
</style>