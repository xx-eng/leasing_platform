<template>
  <div>
    <Menu :current="1"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>用户中心</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="setting" />
          <span>账号管理</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
 <!--   <div style="width: 100%; height: 100px; position: absolute; top: 160px;">
      <div class="nav">
        <a><div class="nav-title">全部功能</div></a>
        <a><div class="nav-content" @click="gotoOrder">我的订单</div></a>
        <a><div class="nav-content" @click="gotoAccount">账号管理</div></a>
        <a><div class="nav-content" @click="gotoAddress">地址管理</div></a>
        <a><div class="nav-content">投诉平台</div></a>
        <a><div class="nav-content">消息管理</div></a>
      </div>

      <div class="user-info">
        <div style="width: 100%; border-bottom: 1px solid #BBBBBB; height: 80px; line-height: 80px;">
          <a-avatar style="backgroundColor:#FF6666; left: 50px;" :size="64" icon="user"/>
          <div style="position: absolute; top: 5px; left: 150px; font-size: 13pt; font-weight:bold">
            Hi!  {{this.userInfo.name}}({{this.userInfo.account}})
          </div>
        </div>
        <div style="text-align: center;">
          <a><div class="select-item">待收货</div></a>
          <a><div class="select-item">待发货</div></a>
          <a><div class="select-item">待收货</div></a>
          <a><div class="select-item">待归还</div></a>
        </div>
      </div>

      <div class="calendar"
           :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px',
           position:'absolute' , right: '50px'}">
        <a-calendar :fullscreen="false" />
      </div>


    </div>-->

    <div class="info-card">
      <div style="height: 40px; line-height: 40px; font-weight: bolder; font-size: 13pt; background-color: #127c47; color: #fff; width: 100%;">
        <span style="position:relative; left: 30px;">账户信息设置</span>
      </div>
      <div class="user-info">
        <div class="user-info-item">
          <div class="user-info-title">账号:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input v-if="changeAcc" v-model="account" allowClear style="width: 200px;"></a-input>
            <div v-else style="position: absolute; top: 0px; left:0px; ">
              {{this.userInfo.account}}
            </div>
          </div>

          <a @click="isChangeAcc">
            <div style="position: absolute; top: 0px; left: 500px;">
              <a-icon type="form" :style="{ fontSize: '25px', color: '#337ab7' }"/>
            </div>
          </a>

        </div>

        <div class="user-info-item" style="top: 80px;">
          <div class="user-info-title">性别:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-select id="sex" :value="sex" style="width: 120px" @change="handleChange">
              <a-select-option :value="1">
                男
              </a-select-option>
              <a-select-option :value="2">
                女
              </a-select-option>
            </a-select>
          </div>
        </div>

        <div class="user-info-item" style="top: 160px;">
          <div class="user-info-title">手机号:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input v-if="changeMobile" v-model="mobile" allowClear style="width: 200px;"></a-input>
            <div v-else style="position: absolute; top: 0px; left:0px; ">
              {{this.userInfo.mobile}}
            </div>
          </div>
          <a @click="isChangeMobile">
            <div style="position: absolute; top: 0px; left: 500px;">
              <a-icon type="form" :style="{ fontSize: '25px', color: '#337ab7' }"/>
            </div>
          </a>
        </div>

        <div class="user-info-item" style="top: 240px;">
          <div class="user-info-title">邮箱号:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input v-if="changeEmail" v-model="email" allowClear style="width: 200px;"></a-input>
            <div v-else style="position: absolute; top: 0px; left:0px; ">
              {{this.userInfo.email}}
            </div>
          </div>
          <a @click="isChangeEmail">
            <div style="position: absolute; top: 0px; left: 500px;">
              <a-icon type="form" :style="{ fontSize: '25px', color: '#337ab7' }"/>
            </div>
          </a>
        </div>

      </div>

    </div>
    <div class="submitBtn">
      <a-button class="search-btn" @click="updateUserInfo">保存资料</a-button>
    </div>

  </div>
</template>

<script>
// import SearchBarPerson from "@/views/user/personal/components/SearchBarPerson";
import Menu from "@/components/Menu";
import {getUserInfo} from "@/api/rental";
import {updateUserInfo} from "@/api/account";
import user from "@/store/module/user";

export default {
  name: "Personal",
  components: {  Menu}, //SearchBarPerson,SiteNav,
  data() {
    //this.dateFormat = 'YYYY-MM-DD';
    return {
      //userAddress: [],
      changeAcc: false,
      changeMobile: false,
      changeEmail: false,
      account: '',
      acc: {},
      s: {},
      sex: '',
      mobile: '',
      mbl: '',
      email: '',
      eml: '',
      userInfo: [],
    }
  },
  async mounted(){
    //,user.state.userId
    getUserInfo(user.state.userId).then(res => {
      console.log("res-user",res.data)
      this.userInfo = res.data
      console.log('sex', res.data.sex)
      this.sex = res.data.sex
      this.account = res.data.account
      this.mobile = res.data.mobile
      this.email = res.data.email

    }).catch(error => {
      console.log(error)
    });
  },
  methods:{
    isChangeAcc(){
      console.log(this.changeAcc)
      this.changeAcc = !this.changeAcc;
      console.log(this.changeAcc)
      if(this.changeAcc) {
        this.account = this.userInfo.account
      }
    },
    isChangeMobile() {
      this.changeMobile = !this.changeMobile
      if(this.changeMobile) {
        this.mobile = this.userInfo.mobile
      }
    },
    isChangeEmail() {
      this.changeEmail = !this.changeEmail
      if(this.changeEmail) {
        this.email = this.userInfo.email
      }
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.sex = value;
    },

    updateUserInfo(){
      if (this.account !== '') {
        this.acc = { account: this.account }
      }
      if (this.sex != '') {
        this.s = { sex: this.sex}
      }
      if(this.email != '') {
        this.eml = {email: this.email}
      }
      if(this.mobile != '') {
        this.mbl = {mobile: this.mobile}
      }
      console.log(this.userInfo.id)
      const useId = { id: this.userInfo.id }
      // eslint-disable-next-line no-undef
      const requestParameters = Object.assign({}, useId, this.acc, this.s, this.mbl, this.eml)
      console.log(requestParameters)
      // const firm = { firmId: 20212000001, status: 1 }
      // const requestParameters = Object.assign({}, pageData, firm, this.searchForm.form)
      updateUserInfo(requestParameters).then(res => {
        console.log("res",res.data)
        this.$notification.success({  //注册成功侧边提示框
          message: '操作消息',
          description: '修改资料成功！',
          icon: <a-icon type="smile" style="color: #339966" />,
      })
        // 修改成功，更新用户信息
        getUserInfo(user.state.userId).then(res => {
          console.log("res-user",res.data)
          this.userInfo = res.data
          console.log('sex', res.data.sex)
          this.sex = res.data.sex
          this.account = res.data.account
          this.mobile = res.data.mobile
          this.email = res.data.email
          this.changeAcc = false
          this.changeMobile = false
          this.changeEmail = false
        }).catch(error => {
          console.log(error)
        });
      }).catch(error => {
        console.log(error)
      });
    },

  }

}
</script>

<style lang="less" scoped>
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
  height: 400px;
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
  left: 60%;
}

.search-btn{
  width: 100px;
  height: 50px;
  position: absolute;
  top: 355px;
  left: -32px;
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