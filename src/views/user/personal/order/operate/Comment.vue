<template>
<div>
  <SiteNav></SiteNav>
  <SearchBar></SearchBar>
  <div class="comment-box">
    <div class="goods-box">
      <img :src="goodsDetial.image" class="goods-image"/>
      <div style="position: absolute; top: 330px; width: 100%; text-align: center; font-size: 14pt;">{{goodsDetial.title}}</div>
    </div>

    <div class="comment">
      <div style="position: absolute; top: 10px; left: 20px;">
        <a-rate v-model="mark" />
      </div>
      <div style="position: absolute; top: 50px; left:20px;">
        <a-textarea
            v-model="comment"
            placeholder="请写下您的评论"
            :auto-size="{ minRows: 15, maxRows: 15 }"
            style="width: 450px;"
        />
      </div>
    </div>

    <div class="btn">
      <a-button class="search-btn" @click="addComment">发表</a-button>
    </div>
  </div>
</div>
</template>

<script>
import SiteNav from "@/components/SiteNav";
import SearchBar from "@/components/SearchBar";
import {getOrderInfo} from "@/api/order";
import {getGoodsInfo} from "@/api/goodsDetail";
import {getUserInfo} from "@/api/rental";
import {addComment} from "@/api/order";
import user from "@/store/module/user";

export default {
  name: "Comment",
  components:{SiteNav, SearchBar},
  data() {
    return {
      order: [],
      userInfo: [],
      goodsDetial: [],
      comment: '',
      mark: '',
    }
  },

  mounted() {
    const{id} = this.$route.params;
    getOrderInfo(id).then(res => {
      console.log("orderDescription",res.data)
      this.order = res.data
      this.order.image = process.env.VUE_APP_API_HOST + this.order.image
      if(this.order.order_state ===1){
        this.state = "未支付"
      }
      if(this.order.order_state ===3){
        this.state = "待发货"
      }
      if(this.order.order_state ===4){
        this.state = "待收货"
      }if(this.order.order_state ===9){
        this.state = "待归还"
      }

      console.log("order", this.order)
      getGoodsInfo(this.order.goodsId).then(res => {
        console.log("res-goods",res.data)
        this.goodsDetial = res.data
        this.goodsDetial.image = process.env.VUE_APP_API_HOST + this.goodsDetial.image
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
  },

  methods:{
    addComment(){

      addComment(user.state.userId,this.goodsDetial.id,this.comment, this.mark, this.order.id).then(res => {
        console.log("res-comment",res.data)
        //this.$router.push({path: '/pay/'+this.goodsDetial.id})
        this.$router.push({path: '/order'})
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment-box{
  position: absolute;
  top: 130px;
  height: 600px;
  width: 100%;
  background-color: #f5f5f5;
}

.goods-box{
  background-color: white;
  height: 400px;
  width: 400px;
  text-align: center;
  position: absolute;
  left: 200px;
  top: 50px;
}

.goods-image{
  width: 300px;
  position: relative;
  top: 25px;
  //left: 50px;
}

.comment{
  background-color: white;
  height: 400px;
  width: 520px;
  text-align: center;
  position: absolute;
  left: 605px;
  top: 50px;
}

a{
  color: #101010;
}

.search-btn{
  border-radius: 50px;
  width: 100px;
  background-color: #13c45b;
  color: white;
}

.btn{
  background-color: white;
  position: absolute;
  top: 500px;
  left: 200px;
  height: 80px;
  line-height: 80px;
  width: 925px;
  text-align: center;
}
</style>