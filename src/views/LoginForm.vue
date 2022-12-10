<template>
  <div id="login">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->

    <div class="container">
      <div class="row signin">
        <div class="col-md-12">
          <div class="text-center">
            <p class="small mt-3">카카오 계정을 통해 간편하게 로그인 및 회원가입이 가능합니다.</p>
            <button type="button" class="btn btn-lg login-button" @click="login">
              <span style="font-size: 0.85em;"><i class="fa fa-comment"/>&nbsp;&nbsp;카카오계정으로 로그인</span>
            </button>
            <button type="button" class="btn btn-lg admin-login-button" @click="goLoginAdmin" style="margin-left:10px;">
              <span style="font-size: 0.85em;"><i class="fa fa-user-cog"/>&nbsp;&nbsp;관리자 로그인</span>
            </button>
          </div>
        </div>
        <div class="col-md-12 ">
          <div class="login-or">
            <hr class="hr-or">
            <span class="span-or">or</span>
          </div>
        </div>
        <div class="col-md-12">
          <div class="text-center">
            <button type="button" class="btn btn-lg btn-primary signup-button" @click="goSignup">
              <span style="font-size: 0.85em;"><i class="fa fa-edit"/>&nbsp;&nbsp;간편 회원가입</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";
import { defineComponent, ref } from "vue";
import {kakaoAuth, logout} from "../api/auth.js";
import router from "@/routes/index.js";
import { Comment, Edit, ChevronLeft, UserCog } from "@vicons/fa";
import { useRoute } from "vue-router";

const pageInfo = {
  title: 'Sign in',
  category: '로그인이 필요한 서비스입니다',
};

const userInfo = ref({
  user_id: '',
  password: '',
});

export default defineComponent({
  created() {
    logout();
  },
  components:{
    CommonHeader,
    Comment,
    Edit,
    ChevronLeft,
    UserCog,
  },
  setup() {
    const route = useRoute();
    const agreeAll = ref(false);
    const agree1 = ref(false);
    const agree2 = ref(false);
    const login= ()=>{
      kakaoAuth(route);
    }
    const goLoginAdmin = ()=>{
      router.push('/adminLogin');
    }
    const goSignup= ()=>{
      router.push('/signup');
    }

    return {
      userInfo,
      pageInfo,
      agreeAll,
      agree1,
      agree2,
      login,
      goLoginAdmin,
      goSignup,
    }
  }
});

</script>

<style>
.login-button{
  background-color:#fee500!important;
  border: 5px solid #fee500!important;
  color: #181600!important;
}
.login-button:hover{
  background-color: #e0cd24!important;
  border: 5px solid #e0cd24!important;
  color: #181600!important;
}
.admin-login-button{
  border: 1px solid #989894 !important;
  color: #989894!important;
  height:56px;
}
.signup-button{
  min-width: 230px;
  height:56px;
}
.back-button{
  height:56px;
  margin-right:5px;
}
.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
div.n-card-header__main{
  font-weight: bold!important;
  font-size: 1.3em!important;
}
span.agree-text{
  font-size: 1.15em;
}
</style>