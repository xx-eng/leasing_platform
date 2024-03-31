<template>
  <div class="category">

    <a-menu style="width: 200px; text-align: center; "  id = "category-menu">
      <a-menu-item style="color: #fff; font-weight:bold; border-bottom: 1px solid #DCDCDC; pointer-events: none;background-color: #127c47;margin-top: 0" >
        <a-icon type="unordered-list"></a-icon>全部商品分类
      </a-menu-item>
      <a-menu-item v-for="item in categories" v-bind:key="item.id" @click="goToCategory(item)">
        {{item.name}}
      </a-menu-item>
    </a-menu>
  </div>

</template>

<script>
import {getAllCategory} from "@/api/home";

export default {
  name: "Category",
  data(){
    return{
      categories: [],
    }
  },
  async mounted(){
    getAllCategory().then(res => {
      console.log("res",res.data)
      this.categories = res.data
      console.log("categories", this.categories)
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {
    goToCategory(item){
      this.$router.push({path: '/category/'+item.id})
    }
  }

}

</script>

<style lang="less" scoped>
.category{
  position: absolute;
  top: 150px;
  left: 50px;
  box-shadow: 5px 5px 5px rgba(22, 22, 22, .1), -5px 5px 5px rgba(22, 22, 22, .1);
}

.ant-menu-item:hover, .ant-menu-item-active{
  color: #339966;
  background-color: rgba(202, 233, 247, .1);
}

.ant-menu-item-selected {
  color: #339966;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #FDE9E9;
}


</style>