<template>

 <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
   您好！{{user.uname}}
<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>修改密码</el-dropdown-item>
    <el-dropdown-item command="logout">注销登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

</template>

<script>
  export default {
    data(){
      return{
         // 通过localStorage本地存储拿到用户名, 如果没有设一个空对象;getitem(user)是在login.vue上面用来存储转换好的message的值
      // 要将之前存储的JSON字符串先转成JSON对象再进行操作/parse用于从一个字符串中解析出json对象
      user:JSON.parse(localStorage.getItem('user'))||{}
      // 如果通过params传值获取用户名，每当刷新一次用户名就会不再了，所以只能通过localStoage本地存储来取值，即使每次刷新都可以到本地存储去拿到username的值进行渲染

      }    
    },
     methods:{
       logout(){
         console.log(1234);
        this.$http.get(this.$api.logout).then(res=>{
         localStorage.removeItem('user');
         this.$router.push('/login');
        })
      },
       handleCommand(command) {
        switch(command){
          case 'logout':
          this.logout();
          break;
        }
      }

     }


  }
</script>

<style scoped>

</style>