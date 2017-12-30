<template>
  <div class="login">
    <div class="login_content">
      <section class="login_content_logo">
        <img src="../../img/logo.png" alt="">
      </section>
      <section class="login_content_form">
        <!--如果你的表单需要校证，重置，那么就必须设置model属性，关联整个表单  -->
        <el-form @keyup.enter.native="a($event)" :model="user" :rules="formRules" status-icon ref="ruleForm2"  label-width="70px" class="demo-ruleForm" label-position='left'>
          <el-form-item label="用户名" prop="uname">
            <!--v-model记得关联表单字段,这里的v-model是user表单里面的用户名  -->
            <el-input type="text" v-model="user.uname" auto-complete="off"></el-input>
          </el-form-item>
          <!-- 这里的v-model记得关联表单字段 -->
          <el-form-item label="密码" prop="upwd">
            <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
// 导出
export default {
  data() {
    //  将来提交给后端的用户字段
    return {
      user: {
        uname: '',
        upwd: '',
      },
      formRules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /\w{5,15}/, message: '长度在 4 到 18 个字符, 且只能为&_或字母与数字', trigger: 'blur' },
        ],
        upwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /.{6,15}/, message: '长度在 6 到 18 个字符', trigger: 'blur' },
        ]
      }
    };
  },


  
  methods: {
    a:function(e){
      if(e.keyCode == 13){
        this.login();
      }
    },
    //  登陆
    login(){
      // 通过post方式发送请求
     this.$http.post(this.$api.login,this.user)
    //  响应
     .then(rsp=>{
        console.log(rsp);
        let{status,message}=rsp.data;
        // 登陆成功
        if(status==0){
          // localstorges本地存储，将用户名存储到本地存储上，即使刷新也可以直接到本地存储上获取用户名称，
          // 存储前先用JSON.stringify()方法将json对象转换成字符串形式
          localStorage.setItem('user',JSON.stringify(message));
          this.$router.push('/');
        }else(
          alert('您的用户名或密码错误了！')
        )
     })
    },

    // 登陆按钮
   submitForm(formName) {
        this.$refs[formName].validate((result) => {
          if (result) {
            this.login()
          } else {
           alert('您的用户名或密码错误了！')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
}

}
</script>
<style scoped lang='less'>
.login {
  height: 100%;
  background-color: #267cb7;

  &_content {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -160px;
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 10px;
    &_logo {
      text-align: center;
    }
  }
}
</style>
