<template>
<div class="aside">
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
     
    <!--导航主列表  -->
    <!--1.做一个模板出来，其余部分通过v-for遍历的方式得所有的模板，
    2.index="item.title"组件实现分组通过title来实现，也可以通过slot来设定，
        index属性也是为每个分组可以分别点击展开，而不是一点击批量展开；
    3.key="item"作用：优化：是唯一，key属性用于for循环时性能优化。类比于id=XX
    如果修改了局部内容，那么只做局部刷新不会进行全局刷新，不会整个列表属性。index属性值为-->
     <el-submenu v-for="item in menuList" :key="item.title":index="item.title">
        <template slot="title">
          <i class="el-icon-location"></i>
          <!--动态生成每个导航栏的名称  -->
          <span>{{item.title}}</span>
        </template>
        <!--导航子列表  -->
          <el-menu-item v-for="subitem in item.children" :key="subitem.title" :index="subitem.title">
            <router-link :to="subitem.path">{{subitem.title}}</router-link>
          </el-menu-item>
        </el-submenu>
        </el-menu>
</div>
</template>

<script>
  export default {
    data(){
      return{
      menuList:[
        {title:'学生问题',children:[
                {title:'内容管理',path:'/'},
                {title:'类别管理',path:'/'},
                {title:'评论管理',path:'/'},

        ]},
        {title:'前端技术',children:[
                {title:'内容管理',path:'/'},
                {title:'类别管理',path:'/'},
                {title:'评论管理',path:'/'},

        ]},
        {title:'难点分析',children:[
                {title:'内容管理',path:'/'},
                {title:'类别管理',path:'/'},
                {title:'评论管理',path:'/'},
        ]},
        {title:'资源管理',children:[
                {title:'内容管理',path:'/'},
                {title:'类别管理',path:'/'},
                {title:'评论管理',path:'/'},
        ]},
         {title:'购物商城',children:[
                {title:'商品管理', path:'/goods/category/list'},
                {title:'内容管理',path:'/goods/contents/list'},
                {title:'评论管理',path:'/goods/comment/list'},
        ]},
         {title:'订单管理',children:[
                {title:'订单列表',path:'/'},
        ]},
        
      ]
    }
  },

  }
</script>

<style scoped lang="less">
  .aside{
    height: 100%;
    .el-menu-item{text-align: center}
    .el-menu-item a{
      color: #fff;
      text-decoration: none;
}

  .el-menu{
    height: 100%;
    border: 0px ;
    &_item{
      min-width: 0;
      
    }
  }
  }
</style>