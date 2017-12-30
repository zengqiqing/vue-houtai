<template>
  <!--左侧导航栏  -->
  <el-container>  
  <el-aside width="200px">
    <app-aside></app-aside>
  </el-aside>
<!--右侧部分  -->
<el-container>
  <!--右侧头部  -->
  <el-header>
    <app-header></app-header>
  </el-header>
  <!-- 右侧主题内容 -->
  <el-main><router-view></router-view></el-main>
</el-container>
</el-container>
</template>

<script>
// 导入公共的左侧与头部组件, 注册成专属子组件使用
import AsideComponent from './frame/aside.vue';
import HeaderComponent from './frame/header.vue';
  export default {
    // 注册组件
    components:{
      appAside:AsideComponent,
      appHeader:HeaderComponent
    }
  }
</script>

<style scoped lang='less'>
.el-container{
  height: 100%;
  color: #666666;
  .el-aside{
    background-color: #D3DCE6;
    text-align: left;
    height: 100%;
  }
  .el-header{
    background-color:  #B3C0D1;
    text-align: right;
    line-height: 60px;
  }
  .el-main{
    background-color: #E9EEF3;
  }
}
</style>