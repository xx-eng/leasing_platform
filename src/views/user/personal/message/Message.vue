<template>
  <div>
    <Menu :current="'6'"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>用户中心</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="message" />
          <span>消息管理</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div style="position: absolute;top: 90px;width: 75%;left: 275px;">
      <a-menu v-model="currentType" mode="horizontal" >
        <a-menu-item :key="0" @click="getAllOrder">我的消息</a-menu-item>
        <a-menu-item :key="1" @click="getUnpayOrders">系统通知</a-menu-item>
      </a-menu>
    </div>

    <div class="info" v-if="currentType[0] === 0">
      <div
          v-infinite-scroll="handleInfiniteOnLoad"
          class="demo-infinite-container"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
          style="width: 150px; border-right: 1px solid #e9e9e9;border-left: 1px solid #e9e9e9;"
      >
        <div style="width: 100%; border: 1px solid #e9e9e9; height: 35px; line-height: 35px; text-align: center;background-color: #339966;color: #fff">近期消息</div>
        <a-list :data-source="firm">
          <a-list-item slot="renderItem" slot-scope="item" @click="getChat(item)">
            <a-list-item-meta :description="item.firmId">
              <a slot="title">{{ item.firmName }}</a>
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

      <div class="chat-box">
        <div class="chats">
          <div style="width: 100%; height: 35px; line-height: 35px; text-align: center; background-color: white;">
            {{ firmInfo.firmId }}</div><br/>
          <div style="width: 100%; position: relative; left: 5px;">
            <div v-for="item in chat" :key="item.id">
              <div :class="[ item.initiator? 'userRecord':'firmRecord']">{{ item.record }}</div>
            </div>
          </div>
        </div>

        <div class="send-message">
          <a-textarea
              v-model="record"
              placeholder="发送消息"
              :auto-size="{ minRows: 7, maxRows: 7 }"
              style="background-color: #F9F8F8; border: 0px;"
          />
          <a-button style="position: absolute; bottom: 0; right: 5px;background-color: #339966; color: #fff;" @click="addChat">发送</a-button>
        </div>

      </div>
    </div>

    <div class="info" v-else>
      <div
          v-infinite-scroll="handleInfiniteOnLoad"
          class="demo-infinite-container"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
          style="width: 800px; border-right: 1px solid #e9e9e9;border-left: 1px solid #e9e9e9;"
      >
        <div style="width: 100%; border: 1px solid #e9e9e9; height: 35px; line-height: 35px; text-align: center;background-color: #339966;color: #fff">近期消息</div>
        <a-list :data-source="messages">
          <a-list-item slot="renderItem" slot-scope="item" @click="getChat(item)" style="position: relative; left: 20px;">
            <a-list-item-meta :description="item.message">
              <a slot="title">{{ item.firmName }}</a>
<!--              <a-avatar-->
<!--                  slot="avatar"-->
<!--                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
<!--              />-->
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
</template>

<script>
import Menu from "@/components/Menu";
import user from "@/store/module/user";
// import {getFavorites} from "@/api/favourite";
import {getChatFirmInfo, getFirmChat, addChat, getMessage} from "@/api/account";

export default {
  name: "Message",
  components: {Menu},
  data(){
    return {
      // goods: [],
      currentType: [0],
      firm: [],
      loading: false,
      busy: false,
      chat: [],
      firmInfo: [],
      record: '',
      messages: []
    }
  },
  mounted() {
    /* getFavorites(20213000001).then(res => {
      console.log("收藏",res.data)
      this.goods = res.data
      for(let good of this.goods){
        good.image = process.env.VUE_APP_API_HOST + good.image
        console.log(good)
      }
      console.log("大类goods:", this.goods)
    }).catch(error => {
      console.log(error)
    }); */
    getMessage(user.state.userId).then(res => {
      this.messages = res.data
    })
    getChatFirmInfo(user.state.userId).then(res => {
      console.log('message', res.data)
      this.firm = res.data
    })

  },
  methods:{
    goToDetail(item){
      this.$router.push({path: '/goods/'+item.goods_id})
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
    getChat(item){
      console.log('item', item)
      this.firmInfo = item
      getFirmChat(item.clientId, item.firmId).then(res => {
       this.chat = res.data

        for(let ch of this.chat){
          if(ch.initiator === 0){
            ch.initiator = true
          }else{
            ch.initiator = false
          }
          console.log('initiator', ch)
        }

        console.log('chat', this.chat)
      }).catch(error => {
        console.log(error)
      })
    },
    addChat(){
      addChat(user.state.userId, this.firmInfo.firmId, 0, this.record).then(res => {
        if(res.code === 2006){
          this.getChat(this.firmInfo)
          this.record = ''
        }

      }).catch(error => {
        console.log(error)
      })
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

.info{
  position: absolute;
  top: 150px;
  width: 70%;
  left: 270px;
  margin-left: 100px;
  margin-top: 15px;
}

.active{
  color: #339966;
}
/deep/ .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td{
  background-color: white;
}

a:hover{
  color: #339966;
}

.ant-menu-item-selected{
  color: #339966;
  border-bottom: 2px solid #339966;
}

.ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover{
  color: #339966;
  border-bottom: 2px solid #339966;
}


.chats{
  position: absolute;
  top: 0px;
  left: 150px;
  width: 600px;
  height: 300px;
  border: 1px solid #e9e9e9;
  background-color: #F9F8F8;
}

.firmRecord{
  display: inline-block;
  background-color: white;
  height: 30px;
  width: fit-content;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 0px 10px 10px 10px;
}

.userRecord{
  display: inline-block;
  position: absolute;
  right: 10px;
  background-color: rgb(161, 221, 169);
  color: #fff;
  height: 30px;
  width: fit-content;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 10px 10px 0px 10px;
}

.send-message{
  position: absolute;
  top: 300px;
  left: 150px;
  width: 600px;
  height: 150px;
  border: 1px solid #e9e9e9;
  background-color: #F9F8F8;
}

/deep/.ant-breadcrumb-link:hover{
  color: #127c47;
}
</style>