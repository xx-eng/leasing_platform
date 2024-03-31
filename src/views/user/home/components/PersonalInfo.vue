<template>
<div class="person-info">
  <div class="row1">
    <div class="top">
      <span><a-icon type="phone"></a-icon> 联系我们</span>
    </div>
    <div class="content">
      <div class="title"><a-icon type="phone"></a-icon> 服务热线: 020-2805-0999</div>
      <div class="title"><a-icon type="phone"></a-icon> 招商热线: 020-2818-7591</div>
    </div>
  </div>
  <div class="row2">
    <div class="top">
      <span><a-icon type="sound"></a-icon> 平台动态</span>
    </div>
    <div class="content">
      <div class="title">如何租赁？</div>
      <div class="title">全场正品保障，官方验机实拍</div>
      <div class="title">开学优惠不停 </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "PersonalInfo"
}
</script>

<style scoped>
.person-info{
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 250px;
  height: 430px;
  position: absolute;
  top: 150px;
  right: 50px;
  /*border-left: 9px solid #ff6666;*/
  border-bottom: 2px solid #127c47;
  box-shadow: 5px 5px 5px rgba(22, 22, 22, .1), -5px 5px 5px rgba(22, 22, 22, .1);
}

.row1 {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.row2 {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  height: 40px;
  background-color: #127c47;
}

.content {
  flex: 1;
  padding: 5px;
}

.title{
  color: #000;
  height: 30px;
  line-height: 30px;
  font-size: 10pt;
  border-bottom: 1px dashed #e0e0e0;
}
  .title:hover {
    background-color: rgba(202, 233, 247, .1);
  }
</style>