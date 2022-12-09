<template>
  <div id="login">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->

    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2">
          <n-form
              label-placement="left"
              require-mark-placement="right-hanging"
              label-width="auto"
              size="large"
          >
            <span>ID</span>
            <n-input
                v-model:value="userInfo.user_id"
                placeholder=""
                @keyup="handleKeyUp"
            />
            <span>Password</span>
            <n-input
                v-model:value="userInfo.password"
                type="password"
                placeholder=""
                @keyup="handleKeyUp"
            />
          </n-form>
          <n-button size="large" style="float:right;margin-top: 1em;" type="primary" @click="login" strong secondary>
            &nbsp;&nbsp;로그인
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";
import { defineComponent, ref } from "vue";
import { useRoute } from 'vue-router'
import { auth, logout } from "../api/auth.js";
import router from "@/routes/index.js";
import {useMessage} from "naive-ui";

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
    CommonHeader
  },
  setup() {
    const route = useRoute();

    // 메시지 모달 function
    const message = useMessage();
    const login= ()=>{
      if(userInfo.value.user_id=='' || userInfo.value.password==''){
        message.error(
            '아이디 또는 비밀번호를 확인해주세요',
            { duration: 2000, type: "error" }
        );
      }else{
        auth(userInfo.value)
            .then((result)=>{
              if(!!result.response && result.response.status == 400){
                // 비밀번호 확인
                message.error(
                    result.response.data.msg,
                    { duration: 2000, type: "error" }
                );
              }else{
                if(!!route.query.redirect) {
                  router.push(route.query.redirect)
                      .then(()=>{
                        window.location.reload();
                      });
                }else{
                  router.push("/")
                      .then(()=>{
                        window.location.reload();
                      });
                }
              }
            })
      }
    }
    return {
      userInfo,
      pageInfo,
      login,
      handleKeyUp:(data)=>{
        if(!!data.key){
          if(data.key.toLowerCase()=='enter') login();
        }
      },
    }
  }
});

</script>

<style>

</style>