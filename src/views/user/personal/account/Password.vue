<template>
  <div>
    <Menu :current="'2'"  style="z-index: 100;"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>用户中心</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="edit" />
          <span>修改密码</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="info-card">
      <div style="height: 40px; line-height: 40px; font-weight: bolder; font-size: 13pt; background-color: #127c47; color: #fff; width: 100%;">
        <span style="position:relative; left: 30px;">修改密码</span>
      </div>
      <div class="user-info">
        <div class="user-info-item">
          <div class="user-info-title">旧密码:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input-password  v-model="pass" allowClear style="width: 200px;"></a-input-password>
          </div>
        </div>

        <div class="user-info-item" style="top: 80px;">
          <div class="user-info-title">新密码:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input-password  v-model="newPass" allowClear style="width: 200px;"></a-input-password>
          </div>
        </div>

        <div class="user-info-item" style="top: 160px;">
          <div class="user-info-title">确认密码:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input-password  v-model="confirmPass" allowClear style="width: 200px;"></a-input-password>
          </div>
        </div>


        <div class="submitBtn">
          <a-button class="search-btn" @click="updateUserPassword">保存</a-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
// import SearchBarPerson from "@/views/user/personal/components/SearchBarPerson";
import Menu from "@/components/Menu";
import {getUserInfo} from "@/api/rental";
import {updateUserPassword} from "@/api/account";
import md5 from 'md5'
import user from "@/store/module/user";

export default {
  name: "Password",
  components: {  Menu}, //SearchBarPerson,SiteNav,
  data() {
    //this.dateFormat = 'YYYY-MM-DD';
    return {
      //userAddress: [],
      changeAcc: false,
      userInfo: [],
      pass: '',
      newPass: '',
      confirmPass: ''

    }
  },
  async mounted(){
    //,user.state.userId
    getUserInfo(user.state.userId).then(res => {
      console.log("res-user",res.data)
      this.userInfo = res.data
    }).catch(error => {
      console.log(error)
    });
  },
  methods:{
    isChangeAcc(){
      console.log(this.changeAcc)
      this.changeAcc = !this.changeAcc;
      console.log(this.changeAcc)
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.sex = value;
    },

    updateUserPassword(){
      console.log('updatePassword')
      if(this.newPass === this.confirmPass){
        updateUserPassword(user.state.userId, md5(this.pass), md5(this.newPass)).then(res => {
          console.log("res",res.data)
          if(res.code === 2004) {
            this.pass = this.newPass = this.confirmPass =  ''
            this.$notification.success({  //注册成功侧边提示框
              message: '操作消息',
              description: '修改密码成功！',
              icon: <a-icon type="smile" style="color: #339966" />,
          })
          }
        }).catch(error => {
          console.log(error)
        })
      }else{
        this.$notification.success({  //注册成功侧边提示框
          message: '操作消息',
          description: '两次密码不一致，请检查！',
          icon: <a-icon type="exclamation-circle" style="color: #ff1010"/>,
      })
      }
    },

  }

}
</script>

<style scoped>
a{
  color: #101010;
}

/*.nav{
  position: absolute;
  left: 70px;
  width: 100px;
  //background-color: lightyellow;
}
.nav-title{
  height: 35px;
  line-height: 35px;
  font-size: 14pt;
  color: #FF6666;
  font-weight: bold;
}

.nav-content{
  height: 30px;
  line-height: 40px;
  font-size: 13pt;
}

.user-info{
  height: 150px;
  width: 600px;
  border: 1px solid #BBBBBB;
  position: absolute;
  left: 270px;
}

.select-item{
  display: inline-block;
  position: relative;
  width: 25%;
  top: 20px;
  border-right: 1px solid #BBBBBB;
}
/deep/ .ant-fullcalendar-selected-day .ant-fullcalendar-value, .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value{
  background-color: #FF6666;
}
/deep/ .ant-fullcalendar-today .ant-fullcalendar-value, .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value {
  box-shadow: 0 0 0 1px #FF6666 inset;
}

/deep/ .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: #FF6666;
  background: #fff;
  border-color: #FF6666;
  box-shadow: -1px 0 0 0 #FF6666;
}

/deep/ .ant-radio-button-wrapper:hover{
  color: #FF6666;
}*/

.bread{
  position: absolute;
  top: 60px;
  left: 270px;
}

.info-card{
  position: absolute;
  top: 130px;
  left: 60%;
  transform: translate(-50%);
  width: 700px;
  height: 300px;
  border: 2px solid #e9e9e9;
  box-shadow: 2px 2px 5px 2px #e0e0e0;
}

.user-info{
  width: 100%;
  position: absolute;
  left: 30px;
}
.user-info-item{
  height: 80px; line-height: 80px;
  position: absolute;
}

.user-info-title{
  width: 70px;
  font-weight: bold;
  //background-color: lightyellow;
}

.submitBtn {
  position: absolute;
  top: 200px;
  left: 40%;
}

.search-btn{
  width: 100px;
  height: 50px;
  position: absolute;
  top: 100px;
  background-color: #127c47;
  border: 0;
  color: white;
}

.search-btn:hover {
  background-color: #13c45b;
}

/deep/.ant-breadcrumb-link:hover{
  color: #127c47;
}






</style>

