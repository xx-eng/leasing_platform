<template>
  <div class="home-footer">
    <div class="container"><span>CORENT WITH YOU<span style="font-size: 15px;position: relative;left: 30px">THANKS FOR SUPPORTING♥</span></span></div>
    <div class="end">----------Copyright© 2021CORENT易起租----------</div>
  </div>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style lang="less" scoped>
.home-footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*position: relative;*/
  /*top: 750px;*/
  height: 200px;
  padding: 30px;
  padding-bottom: 10px;
  background-color: #127c47;
}

.home-footer .container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #127c47;
  border: 2px dashed #fff;
  height: 150px;
  width: 85%;
  border-radius: 5px;
}

.home-footer .container span {
  font-size: 35px;
  font-weight: bold;
  color: #fff;
}

.home-footer .end {
  margin-top: 5px;
  color: #000;
  font-size: 9px;
}
</style>