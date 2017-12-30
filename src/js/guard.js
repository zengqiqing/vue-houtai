// 调接口，要api，要第三方包axios（因为是第三方包不用跟.js）
import axios from 'axios';
import api from './api_config.js';

// 导出路由守卫实例 因为不是vue的组件，不能直接用$api的方式调接口
export default function(to, from, next) {
    console.log(to);
    axios.get(api.islogin).then(res => {

        // console.log(res);
        let islogin = res.data.code == 'logined';
        // to：去到哪一个页面。name已定义的路径名
        let topage = to.name;
        console.log(to.name)


        if (topage == 'l') {
            // 去往登陆页面
            if (islogin) {
                next('/')
            } else {
                // 留在当前页
                next()
            }
        };
        // 去往非当前页
        if (topage != 'l') {
            if (islogin) {
                next() //允许访问
            } else { next('/login') };
        }
    })
}