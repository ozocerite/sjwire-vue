import { createRouter, createWebHistory } from 'vue-router'
import MainHome from '../views/MainHome.vue'
import CeoComment from '../views/CeoComment.vue'
import CompanyInformation from '../views/CompanyInformation.vue'
import CompanyHistory from '../views/CompanyHistory.vue'
import CompanyContact from '../views/CompanyContact.vue'
import ProductInfo from '../views/ProductInfo.vue'
import CompanyArchive from '../views/CompanyArchive.vue'
import ProductQuotation from '../views/ProductQuotation.vue'
import ProductQuestion from '../views/ProductQuestion.vue'
import UserQuestionList from "@/views/include/UserQuestionList.vue";
import UserQuestionForm from "@/views/include/UserQuestionForm.vue";
import ArchivePostList from "@/views/include/ArchivePostList.vue";
import ArchiveUploadForm from "@/views/include/ArchiveUploadForm.vue";
import LoginForm from "@/views/LoginForm.vue";
import SignupForm from "@/views/SignupForm.vue";
import AdminLoginForm from "@/views/AdminLoginForm.vue";
import MyMenu from "@/views/MyMenu.vue";
import AdminMenu from "@/views/AdminMenu.vue";
import { logout, checkExpired } from "@/api/auth.js";

// 세션 초기화 후 리디렉트
const requireAuth = (to, from, next) => {
    const userInfo = JSON.parse(session.getItem('user'));
    if (userInfo != null) {
        if(checkExpired()){
            // 토큰 유효기간이 만료 됐으면 로그아웃 시킴
            logout();
            window.location.reload();
        }else{
            return next();
        }
    }
    return next({
        path: '/login',
        query: { redirect: to.fullPath }
    });
}

// 단순 세션 초기화
const init = ()=>{
    const userInfo = JSON.parse(session.getItem('user'));
    if (userInfo != null) {
        const expiredInfo = JSON.parse(session.getItem('result'));
        const toDate = new Date();
        const accessDate = new Date(expiredInfo.expired.access);
        if(toDate>accessDate){
            // 토큰 유효기간이 Expired 됐으면 로그아웃 시킴
            logout();
        }
    }
}

const routeInfos = [
    {
        path: '/main',
        redirect: '/',
        meta: {
            title:'세진철망 - Home',
        },
    },
    {
        path : '/',
        name : 'Main',
        component : MainHome,            // 메인화면
        meta: {
            title:(new Date).getFullYear()-1985+'년의 기술력, 사람과 자연이 함께 합니다.',
        },
    },
    {
        path : '/login',
        name : 'LoginForm',
        component : LoginForm,    // 회원 로그인
        meta: {
            title:'Login',
        },
    },
    {
        path : '/signup',
        name : 'SignupForm',
        component : SignupForm,    // 회원가입
        meta: {
            title:'회원가입',
        },
    },
    {
        path : '/adminLogin',
        name : 'AdminLoginForm',
        component : AdminLoginForm, // 관리자 로그인
    },
    {
        path : '/my/:tab_value',
        name : 'MyMenu',
        component : MyMenu,
        props : true,
        beforeEnter: requireAuth,
    },
    {
        path : '/admin/:tab_value',
        name : 'AdminMenu',
        component : AdminMenu,
        props : true,
        beforeEnter: requireAuth,
    },
    {
        path : '/ceo',
        name : 'CeoComment',
        component : CeoComment,          // 인사말
        meta: {
            title:'대표 인사말',
        },
    },
    {
        path : '/information',
        name : 'CompanyInformation',
        component : CompanyInformation,      // 회사정보
        meta: {
            title:'회사개요',
        },
    },
    {
        path : '/history',
        name : 'CompanyHistory',
        component : CompanyHistory,      // 회사연혁
        meta: {
            title:'회사연혁',
        },
    },
    {
        path : '/contact',
        name : 'CompanyContact',
        component : CompanyContact,      // 연락처
        meta: {
            title:'오시는 길',
        },
    },
    {
        path : '/product/:cat_id/:prd_id',
        name : 'ProductInfo',
        component : ProductInfo,       // 제품 페이지
        props : true,
        meta: {
            title:'제품 소개',
        },
    },
    {
        path : '/archive',
        name : 'CompanyArchive',
        component : CompanyArchive,      // 자료실
        meta: {
            title:'자료실',
        },
        children: [
            {
                path : 'list',
                name : 'ArchiveList',
                component : ArchivePostList,        // 자료실 List
                beforeEnter: init,
            },
            {
                path : 'form',
                name : 'ArchiveForm',
                component : ArchiveUploadForm,      // 자료실 Form
                beforeEnter: requireAuth,
            },
        ]
    },
    {
        path : '/quotation',
        name : 'ProductQuotation',
        component : ProductQuotation,      // 견적
        meta: {
            title:'견적 신청하기',
        },
    },
    {
        path : '/question',
        name : 'ProductQuestion',
        component : ProductQuestion,      // QnA Main
        meta: {
            title:'문의게시판',
        },
        children: [
            {
                path : 'list',
                name : 'UserQuestionList',
                component : UserQuestionList,        // QnA List
                beforeEnter: init,
            },
            {
                path : 'form',
                name : 'UserQuestionForm',
                component : UserQuestionForm,      // QnA Form
                beforeEnter: requireAuth,
            },
        ]
    },
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes : routeInfos,
});

router.beforeEach((to, from, next)=>{
    document.title = `세진철망 ${to.meta.title?'- '+to.meta.title:''}`;
    next();
});

export default router;