<template>
  <a-carousel autoplay class="carousel" arrows>
    <div
            slot="prevArrow"
            class="custom-slick-arrow"
            style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <div v-for="item in adverts" v-bind:key="item.id">
      <a :href=item.url><img :src="item.image" class="show-advert" alt=""/></a>
    </div>
  </a-carousel>
</template>
<script>
import {getAllAdvert} from "@/api/home";

export default {
  data(){
    return{
      adverts: [],
    }
  },
  async mounted(){
    getAllAdvert().then(res => {
      console.log("res",res.data)
      this.adverts = res.data
      for(let ad of this.adverts){
        ad.image = process.env.VUE_APP_API_HOST + ad.image
        console.log(ad)
      }
      console.log("adverts", this.adverts)
    }).catch(error => {
      console.log(error)
    })
  }

};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 400px;
  background: #364d79;
  overflow: hidden;
}
.show-advert{
  width: 650px;
  height: 400px;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.carousel{
  width: 650px;
  position: absolute;
  left: 50%;
  top: 150px;
  transform: translate(-55%);
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>