<template>
  <div class="edit">
    <!--面包屑  -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物商城</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'gcnl'}">内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="editform">
      <!--表单分析：1.rules表单验证规则 model:关联表单数据，————下面data里面定义的ruleFrom里面的对象-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-ruleForm">
        <!--字段需要验证，必须要prop验证  -->
        <el-form-item label="内容标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="sub_title">
          <el-input v-model="ruleForm.sub_title"></el-input>
        </el-form-item>
        <!--下拉列表通过获取数据动态渲染  -->
        <el-form-item label="所属分类" prop="category_id">
          <el-select v-model="ruleForm.category_id" placeholder="请选择所属分类">
            <!--下拉选项列 里面的选项通过v-for来遍历后去，到data出现定义个存储位置  -->
            <el-option v-for="items in goodsCategory" :key="items.category_id " :label="items.title" :value="items.category_id ">
              <!--第一格不需要打空格，所以需要-1  -->
              <span v-for="i in (items.class_layer-1)" :key='i'>&nbsp;</span>
              <span v-if="items.class_layer!=1">|</span>
              <span>{{items.title}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!--是否发布滑动按钮  -->
        <el-form-item label="是否发布" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <!--推荐类型滑动按钮  -->
        <el-form-item label="推荐类型" prop="delivery">
          <el-switch v-model="ruleForm.is_slide" active-text="轮播图"></el-switch>
          <el-switch v-model="ruleForm.is_top" active-text="置顶"></el-switch>
          <el-switch v-model="ruleForm.is_hot" active-text="热门"></el-switch>
        </el-form-item>
        <!--图片上传  -->
        <!-- action属性用来配置上传接口, file-list用来关联数据进行展示, list-type用于设置展示的样式 -->
        <!-- on-success属性用于设置图片上传的成功回调, 成功后我们要把服务端返回的数据添加到表单的ruleForm.fileList字段 -->
        <el-form-item label="图片上传" prop="delivery">
          <!--action接口需要配置到自己后台的接口  -->
          <el-upload class="upload-demo" :action="upLoadImgApi" :file-list="ruleForm.imgList" list-type="picture" :on-success="upLoadImgApiHandler">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <!--附件上传  -->
        <el-form-item label="附件上传" prop="delivery">
          <!--multiple多选  limit限制大小 file-list关联数据展示-->
          <el-upload :on-success="upLoadFileApiHandler" class="upload-demo" :action="upLoadFileApi" multiple :limit="3" :file-list="ruleForm.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!--商品详细内容  -->
        <el-form-item label="商品货号" prop="goods_no">
          <el-input v-model="ruleForm.goods_no"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock_quantity">
          <el-input v-model="ruleForm.stock_quantity"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price">
          <el-input v-model="ruleForm.market_price"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" prop="sell_price">
          <el-input v-model="ruleForm.sell_price"></el-input>
        </el-form-item>
        <!--文本域  -->
        <el-form-item label="内容摘要" prop="zhaiyao">
          <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="详细信息" prop="content">
          <quill-editor v-model="ruleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button>
            <router-link :to="{name:'gcnl'}">返回上一页</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
// 导入富文本编辑器样式与组件  
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      // 图片上传接口, 两个文件上传接口, 因为上传使用的是elementUI组件, 所以必须传完整的接口url(domain接口域名)
      upLoadImgApi: this.$apidomain + this.$api.atImg,
      upLoadFileApi: this.$apidomain + this.$api.atFile,
      id: this.$route.params.id,
      // 表单分类列表
      goodsCategory: [],
      // 表单部分
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 当管理员没有填写内容时，出现的提示内容  上面的prop和v-model都需要跟着修改，否则无法关联 
      rules: {
        title: [{ required: true, message: '请输入标题内容', trigger: 'blur' }],
        sub_title: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
        goods_no: [{ required: true, message: '请输入商品货号', trigger: 'blur' }],
        stock_quantity: [{ required: true, message: '请输入库存', trigger: 'blur' }],
        market_price: [{ required: true, message: '请输入市场价格', trigger: 'blur' }],
        sell_price: [{ required: true, message: '请输入销售价格', trigger: 'blur' }],

      },

    };
  },
  methods: {
    // 获取下拉选项列表的里面的内容;因为是需要到购物商城里面获取所有的分类数据，看api文档，后台要求传tablename
    getGoodcategory() {
      this.$http.get(this.$api.ctList + 'goods').then(res => {
        this.goodsCategory = res.data.message;
        console.log(res.data);

      })
    },

    // 获取表单所有数据，记得获取ID 
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        // console.log(res);
        //// 为了让select能够自动选取默认的值, 把category_id转换为number, 与分类列表的id数据类型一致
        res.data.message.category_id = +res.data.message.category_id;
        this.ruleForm = res.data.message
      })
    },
    // 修改商品信息，记得获取ID 因为是post请求，需要传数据,把整个表单传递
    modifyGoods() {
      this.$http.post(this.$api.gsEdit + this.id, this.ruleForm).then(res => {
        this.$alert(res.data.message);
      })
    },
    // 表单部分，先验证通过再调接口
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 为了以后方便拓展
          this.modifyGoods();
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 图片上传
    upLoadImgApiHandler(data) {
      this.ruleForm.imgList = [data];
    },

    // 附件上传
    upLoadFileApiHandler(data) {
      this.ruleForm.fileList.push(data);
    }



  },

  created() {
    this.getGoods(),
      this.getGoodcategory();
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped lang="less">
.edit {
  // 表单
  .editform {
     border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 20px;
    padding: 20px;
    width: 750px;
      //富文本高度 
      .ql-editor {
          height: 200px;
    }
  }
}


</style>