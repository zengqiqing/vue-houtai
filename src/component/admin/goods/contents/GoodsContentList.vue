<template>

   <div class="list">
     <!--面包屑导航  -->
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>购物商城</el-breadcrumb-item>
  <el-breadcrumb-item>内容管理</el-breadcrumb-item>
</el-breadcrumb>
<hr>
<!--工具条  -->
<section class="tool">
  <!-- 左边的按钮 -->
  <div class="tool_btn">
  <el-button plain size="small" icon="el-icon-plus">新增</el-button> 
  <el-button plain size="small" icon="el-icon-menu"> 全选</el-button> 
  <el-button plain size="small" icon="el-icon-delete">删除</el-button> 
  </div>
  <!--右边的搜索框  -->
  <!--搜索框数据通过v-model双向绑定数据获取  -->
  <!-- 当焦点离开时, 调用接口获取搜索后的数据列表 -->
  <div class="tool_search">
  <el-input @blur="getList" placeholder="请输入内容" size="small"  v-model="query.searchvalue" prefix-icon="el-icon-search" >
  </el-input>
  </div>
  </section>

  <!--表格  -->
  <!--data属性为列表数据, 传一个数据后会自动渲染  @selection-change="handleSelectionChange勾选事件  表头固定通过下面的height来设定-->
    <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark" style="width: 100%" height="400">
      <!--多选框部分  -->
      <!--对应列的类型。如果设置了 selection 则显示多选框；  -->
    <el-table-column type="selection"></el-table-column>
    <!--label：显示的标题 prop：用于指定展示该列字段的名称 -->
    <el-table-column label="商品名称"  prop="title"></el-table-column>
    <el-table-column label="所属类库" width="100" prop="categoryname"></el-table-column>
    <el-table-column label="库存" width="100" prop="stock_quantity"></el-table-column>
    <el-table-column label="市场价"  width="100"prop="market_price"></el-table-column>
    <el-table-column label="销售价" width="100" prop="sell_price"></el-table-column>
    
<!--普通的列  -->
    <el-table-column  label="状态" width="100" >
        <!--表单内容 可以设置html任意结构：可能不是一段文本是个标签那么可以嵌套这个template里面，但里面拿数据都需要通过scope.row.xxx点这样来拿数据 -->
        <template slot-scope="scope">
          <!-- 动态class可以设为数组，里面可以放很多东西。scope.row -->
      <i :class="['el-icon-upload2',scope.row.is_top?'active' : '']"></i>
      <i :class="['el-icon-star-on',scope.row.is_hot?'active' : '']"></i>
      <i :class="['el-icon-picture-outline',scope.row.is_slide?'active' : '']"></i>
      </template>
    </el-table-column>
     <el-table-column  label="操作" width="100">
                <template slot-scope="scope">
                  <!--跳转到修改页面；写活 注意点击修改数据时拿到id的  -->
                  <router-link :to="{name:'gcne', params:{id:scope.row.id}}">修改</router-link>
                </template>
            </el-table-column>
    </el-table>

    <!--分页  -->
    <!--size-change和current-change事件来处理页码大小和当前页变动时候触发的事件。 current-page：当前页 page-sizes从第10/20/30/40页开始展示 page-size属性用于设置每页条目的可选项 -->
  <div class="block">
    <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange"  :current-page="query.pageIndex"  :page-sizes="[10, 20, 30, 40]"  :page-size="100"  layout="total, sizes, prev, pager, next, jumper" :total="totalcount"></el-pagination>
  </div>
     
</div>
</template>

<script>
  export default {
    data(){
      return{
        tableList:[],
        // 分页
        // currentPage1: 1,
        totalcount:0,
        query:{pageIndex:1,pageSize:10,searchvalue:''}
      }
    },
    methods:{
        // 获取表格数据
        getList(){
          this.$http.get(this.$api.gsList,{params:this.query}).then(res=>{
            console.log(res);
            // 拿到表格里的每一条数据
            this.tableList=res.data.message;
            // 拿到总条数
            this.totalcount=res.data.totalcount;
          })
        },

          // 分页
         handleSizeChange(pageSize) {
        this.query.pageSize=pageSize;
        this.getList();
      },
      // 跳转到第几页
      handleCurrentChange(pageIndex) {
        this.query.pageIndex=pageIndex;
        this.getList();
      }
    },
    searchvalue(searchvalue){
    this.query.searchvalue=searchvalue;
    this.getList();
    },
    created(){
      // 调用时，别忘了指向实例，否则没法定义
      this.getList()
    }
  }
</script>

<style scoped lang='less'>
.el-breadcrumb{font-size: 15px;}
.tool{
  // 因为里面的盒子都浮动了，无法撑起高度，会出现盒子塌陷问题，所以通过overflow来撑起高度
  overflow: hidden;
  padding: 7px;
  .tool_btn{
    float:left;
  }
.tool_search{
  float:right;
}
}

</style>