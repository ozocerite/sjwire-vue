import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/MainHome.vue'
import CeoComment from '../views/CeoComment.vue'
import CompanyHistory from '../views/CompanyInformation.vue'
import CompanyContact from '../views/CompanyContact.vue'
import ProductInfo from '../views/ProductInfo.vue'
import CompanyArchive from '../views/CompanyArchive.vue'
import ProductQuotation from '../views/ProductQuotation.vue'
import ProductQuestion from '../views/ProductQuestion.vue'

const routeInfos = [
    {
        path: '/main',
        redirect: '/'
    },
    {
        path : '/',
        name : 'Main',
        component : MainHome            // 메인화면
    },
    {
        path : '/ceo',
        name : 'CeoComment',
        component : CeoComment          // 인사말
    },
    {
        path : '/company',
        name : 'CompanyHistory',
        component : CompanyHistory      // 회사정보
    },
    {
        path : '/contact',
        name : 'CompanyContact',
        component : CompanyContact      // 연락처
    },
    {
        path : '/product',
        name : 'ProductInfo',
        component : ProductInfo       // 제품 페이지
    },
    {
        path : '/archive',
        name : 'CompanyArchive',
        component : CompanyArchive      // 자료실
    },
    {
        path : '/quotation',
        name : 'ProductQuotation',
        component : ProductQuotation      // 견적
    },
    {
        path : '/question',
        name : 'ProductQuestion',
        component : ProductQuestion      // QnA
    }
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes : routeInfos,
});

export default router;