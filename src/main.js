// 放置公共组件例如根组件，路由组件
// 1.1 导入第三包
import Vue from 'vue';
// 1.3导入路由插件
import VueRouter from 'vue-router';
//4.1引入element-ui插件
import ElementUI from 'element-ui';
//4.2 引入element-ui的css样式文件
import 'element-ui/lib/theme-chalk/index.css';
/* 保护有用的浏览器默认样式而不是完全去掉它们;一般化的样式：为大部分HTML元素提供,修复浏览器自身的bug并保证各浏览器的一致性*/
import 'normalize.css';
// 导入全局样式
import './less/index.less';
// 4.3启动element插件
Vue.use(ElementUI);
// 1.4启动vue插件
Vue.use(VueRouter);

// 1.2 导入根组件
import AppComponent from './component/App.vue';


// 2.导入路由配置
import routerConfig from './router/index.js'; //写一个文件目录，会自动到router里面找router.js
// 2.1 导入配置后的axios与api, 并注入到Vue原型中 将来在实例通过this.$http调用
import axios from './js/axios_config.js';
import api, { domain } from './js/api_config.js';

Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$apidomain = domain;

// 引入guard路由，创建路由实例，添加路由守卫，进行登录校验;这不是vue的组件  const:常量，不可变
import routerGuard from './js/guard.js';
const vueRouter = new VueRouter(routerConfig);
// to,from
vueRouter.beforeEach(routerGuard);

// 3渲染根组件, 启动应用程序
new Vue({
    el: '#app',
    render: cerateElement => cerateElement(AppComponent),
    // 2.1开启路由
    router: vueRouter
});