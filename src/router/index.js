// 放置路由
import LoginComponent from '../component/login/Login.vue';
import AdminComponent from '../component/admin/Admin.vue';

import goodsRouterConfig from './goods.js';
// 拆分
let adminChildren = [...goodsRouterConfig];

// 对外暴露导出路由对象
export default {
    routes: [
        { name: 'a', path: '/', component: AdminComponent, children: adminChildren },
        { name: 'l', path: '/login', component: LoginComponent }

    ]

};