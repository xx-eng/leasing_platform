<template>
  <div>
    <Menu :current="4"></Menu>
    <div class="bread">
      <a-breadcrumb>
        <a-breadcrumb-item href="">
          <a-icon type="home" />
          <span>用户中心</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="" @click.native="$router.push({path: '/address'})">
          <a-icon type="environment"/>
          <span>地址管理</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <a-icon type="setting" />
          <span>添加地址</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="info-card">
      <div style="height: 40px; line-height: 40px; font-weight: bolder; font-size: 13pt; background-color: #127c47; color: #fff; width: 100%;">
        <span style="position:relative; left: 30px;">添加地址</span>
      </div>
      <div class="user-info">
        <div class="user-info-item">
          <div class="user-info-title">省:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-select v-model="province" :default-value="provinces[110000]" style="width: 220px" @change="handleChangeProvince">
              <a-select-option v-for="(val, key) in provinces" :value="val" :key="key">
                {{val}}
              </a-select-option>
            </a-select>
          </div>


        </div>

        <div class="user-info-item" style="top: 50px;">
          <div class="user-info-title">市:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-select v-model="city" default-value="1" style="width: 220px" @change="handleChangeCity">
              <a-select-option v-for="(val, key) in cities" :value="val" :key="key">
                {{val}}
              </a-select-option>
            </a-select>
          </div>
        </div>

        <div class="user-info-item" style="top: 100px;">
          <div class="user-info-title">区:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-select v-model="county" default-value="1" style="width: 220px" @change="handleChangeCounty">
              <a-select-option v-for="(val, key) in counties" :value="val" :key="key">
                {{val}}
              </a-select-option>
            </a-select>
          </div>
        </div>

        <div class="user-info-item" style="top: 150px;">
          <div class="user-info-title">街道:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input  v-model="street" allowClear style="width: 220px;"></a-input>
          </div>
        </div>


        <div class="user-info-item" style="top: 200px;">
          <div class="user-info-title">县:</div>
          <div style="position: absolute; top: 0px; left:80px;">
            <a-input  v-model="town" allowClear style="width: 220px;"></a-input>
          </div>
        </div>
        <div class="user-info-item" style="top: 250px;">
          <div class="user-info-title">详细信息:</div>
          <div style="position: absolute; top: 20px; left:80px;">
            <a-textarea  v-model="addressInfo" allowClear style="width: 220px;"></a-textarea>
          </div>
        </div>

        <div class="submitBtn">
          <a-button class="search-btn" @click="addAddress">添加地址</a-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
// import SearchBarPerson from "@/views/user/personal/components/SearchBarPerson";
import Menu from "@/components/Menu";
import {getUserInfo, getAllAddress} from "@/api/rental";
import {updateUserInfo} from "@/api/account";
import { addAddress } from "@/api/address";
import addressList from "@/utils/area"
import user from "@/store/module/user";

export default {
  name: "Personal",
  components: {  Menu}, //SearchBarPerson,SiteNav,
  data() {
    //this.dateFormat = 'YYYY-MM-DD';
    return {
      //userAddress: [],
      changeAcc: false,
      isDefault: 0,
      provinces: addressList.province_list,
      cities: [],
      counties: [],
      province: '',
      city: '',
      county: '',
      street: '',
      town: '',
      addressInfo: '',
      addresses: [],
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

    getAllAddress(user.state.userId).then(res => {
      console.log("res-address", res.data)
      this.addresses = res.data
      for(let add of this.addresses){
        if(add.isDefault != 1){
          add.default = '非默认'
        }else{
          add.default = '默认'
          this.defaultId = add.id
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods:{
    isChangeAcc(){
      console.log(this.changeAcc)
      this.changeAcc = !this.changeAcc;
      console.log(this.changeAcc)
    },
    handleChangeProvince(value, obj) {
      this.city = ''
      this.county = ''
      let province_pre = obj.key.substring(0, 2)
      let selected_cities = {}
      for(let k in addressList.city_list) {
        if(k.startsWith(province_pre))
          selected_cities[k] = addressList.city_list[k]
      }
      this.cities = selected_cities;
    },
    handleChangeCity(value, obj) {
      this.county = ''
      let city_pre = obj.key.substring(0, 4)
      let selected_counties = {}
      for(let k in addressList.county_list) {
        if(k.startsWith(city_pre))
          selected_counties[k] = addressList.county_list[k]
      }
      this.counties = selected_counties;
    },

    updateUserInfo(){
      updateUserInfo(this.userInfo.id,this.account, this.sex).then(res => {
        console.log("res",res.data)
      }).catch(error => {
        console.log(error)
      });
    },
    addAddress(){
      let isDefault = this.addresses.length?0:1
      addAddress(user.state.userId, isDefault, this.province, this.city, this.county, this.street, this.town, this.addressInfo).then(res => {
        if(res.code === 2006){
          this.$notification.success({  //注册成功侧边提示框
            message: '操作消息',
            description: '地址添加成功！',
            icon: <a-icon type="smile" style="color: #339966" />,
        })
          this.$router.push({path: '/address'})
        }
      })
    }

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
  top: 30px;
  left: 40%;
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