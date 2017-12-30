// 导入商品相关组件
// content内容分类
import GoodsContentList from '../component/admin/goods/contents/GoodsContentList.vue';
import GoodsContentAdd from '../component/admin/goods/contents/GoodsContentAdd.vue';
import GoodsContentEdit from '../component/admin/goods/contents/GoodsContentEdit.vue';
//category类别管理
import GoodsCategoryList from '../component/admin/goods/category/GoodsCategoryList.vue';
import GoodsCategoryAdd from '../component/admin/goods/category/GoodsCategoryAdd.vue';
import GoodsCategoryEdit from '../component/admin/goods/category/GoodsCategoryEdit.vue';
// 评论管理
import GoodsCommentList from '../component/admin/goods/comment/GoodsCommentList.vue';
import GoodsCommentAdd from '../component/admin/goods/comment/GoodsCommentAdd.vue';
import GoodsCommentEdit from '../component/admin/goods/comment/GoodsCommentEdit.vue';

// 对外暴露导出商品现相关路由对象
export default [
    // content内容分类
    { name: 'gcnl', path: 'goods/contents/list', component: GoodsContentList },
    { name: 'gcna', path: 'goods/contents/add', component: GoodsContentAdd },
    { name: 'gcne', path: 'goods/contents/edit/:id', component: GoodsContentEdit },

    //category类别管理
    { name: 'gcgl', path: 'goods/category/list', component: GoodsCategoryList },
    { name: 'gcga', path: 'goods/category/add', component: GoodsCategoryAdd },
    { name: 'gcge', path: 'goods/category/edit', component: GoodsCategoryEdit },
    // 评论管理
    { name: 'gcml', path: 'goods/comment/list', component: GoodsCommentList },
    { name: 'gcma', path: 'goods/comment/add', component: GoodsCommentAdd },
    { name: 'gcme', path: 'goods/comment/edit', component: GoodsCommentEdit },

]