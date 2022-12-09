<template>
  <n-message-provider :duration="5000">
  <div id="app">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700;900&display=swap" rel="stylesheet">

      <!-- Icon Font Stylesheet -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    </head>
    <body>

    <!-- Topbar Start -->
    <div class="container-fluid bg-dark p-2">
      <div class="row gx-0 d-none d-lg-flex">
        <div class="col-lg-7 px-5 text-start">
          <div class="h-100 d-inline-flex align-items-center me-4">
            <small class="fa fa-map-marker-alt text-primary me-2"></small>
            <small>주소 : 경기도 화성시 팔탄면 푸른들판로 651</small>
          </div>
          <div class="h-100 d-inline-flex align-items-center">
            <small class="far fa-clock text-primary me-2"></small>
            <small>운영시간 : AM 8:30 - PM 6:00 (월~금)</small>
          </div>
        </div>
        <div class="col-lg-5 px-5 text-end">
          <div class="h-100 d-inline-flex align-items-center me-4">
            <small class="fa fa-phone-alt text-primary me-2"></small>
            <small>고객센터 : &nbsp; 031) 352-7086 &nbsp;&nbsp;/&nbsp;&nbsp;031) 352-7431</small>
          </div>
          <div class="h-100 d-inline-flex align-items-center me-4">
            <small class="fa fa-user-circle text-primary me-2" v-show="loginStatus"></small>
            <n-dropdown trigger="hover" :options="isAdmin?adminOption:userOption" @select="handleSelect" v-if="loginStatus">
              <router-link :to="isAdmin?`/admin/quotation`:`/my/info`"><small style="cursor:pointer;">{{ isAdmin?"관리자 메뉴":"My Menu" }}</small></router-link>
            </n-dropdown>
            <small class="fa fa-sign-in-alt text-primary me-2" v-show="!loginStatus"></small>
            <small style="cursor:pointer;" v-show="!loginStatus" @click="signin">로그인/회원가입</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 shadow-sm">
      <router-link to="/" class="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
        <img src="./assets/img/logo180x60.png" alt="">
      </router-link>
      <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav me-sm-auto p-4 p-lg-0">
          <router-link to="/" class="nav-item nav-link" active-class="active">Home</router-link>
          <div class="nav-item dropdown">
            <router-link to="/ceo" class="nav-link dropdown-toggle" active-class="active" name="company">회사소개</router-link>
            <div class="dropdown-menu bg-light m-0">
              <router-link to="/ceo" class="dropdown-item" active-class="active" name="company">인사말</router-link>
              <router-link to="/information" class="dropdown-item" active-class="active" name="company">개요</router-link>
              <router-link to="/history" class="dropdown-item" active-class="active" name="company">연혁</router-link>
            </div>
          </div>
          <div class="nav-item dropdown">
            <router-link to="/product/휀스/메쉬휀스" class="nav-link dropdown-toggle" active-class="active" name="product">제품</router-link>
            <div class="dropdown-menu bg-light m-0">
              <div v-for="category in productList" :key="category.key">
                <li><p class="dropdown-header"><small>{{ category.label }}</small></p></li>
                  <li v-for="product in category.children" :key="product.key">
                    <router-link class="dropdown-item" active-class="active" name="product" :to="`/product/${category.key}/${product.key}`">{{ product.label }}</router-link>
                  </li>
              </div>
            </div>
          </div>
          <div class="nav-item dropdown">
            <router-link to="/question/list" class="nav-link dropdown-toggle" active-class="active" name="customer">고객지원</router-link>
            <div class="dropdown-menu bg-light m-0">
              <router-link to="/question/list" class="dropdown-item" active-class="active" name="customer">Q&A</router-link>
              <router-link to="/archive/list" class="dropdown-item" active-class="active" name="customer">자료실</router-link>
            </div>
          </div>
          <router-link to="/contact" class="nav-item nav-link" active-class="active">Contact</router-link>
        </div>
        <router-link to="/quotation" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block btn-custom">견적신청<i class="fa fa-arrow-right ms-3"></i></router-link>
      </div>
    </nav>
    <!-- Navbar End -->

    <div style="min-height: 750px;">
      <!-- Spinner Start (임시 비활성화) -->
      <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <!-- Spinner End -->

      <!-- Router View -->
      <router-view :key="$route.fullPath"></router-view>

    </div>

    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-body footer mt-5 pt-5">
      <div class="container py-5">
        <div class="row g-5">
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-4">업체정보</h5>
            <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>주소 | 경기도 화성시 팔탄면 푸른들판로 651</p>
            <p class="mb-2"><i class="fa fa-user me-3"></i>대표 | 전흥순</p>
            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>Tel | 031) 352-7086, 031) 352-7431</p>
            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>FAX | 031) 352-7430</p>
            <p class="mb-2"><i class="fa fa-hashtag me-3"></i>사업자번호 | 0000000000</p>
            <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">제품</h5>
            <div class="row g-2">
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-1.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-2.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-3.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-4.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-5.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-6.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="copyright">
          <div class="row">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;Copyright <a href="https://sjwire.co.kr/">SEJIN WIRE CORPORATION</a>, All Right Reserved.
            </div>
            <div class="col-md-6 text-end">
              <a href="#">이용약관</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="#">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>
    <CommonAlert ref="alert"/>
    </body>
  </div>
  </n-message-provider>
</template>

<script>
import { defineComponent, ref, h, computed } from "vue";
import { useStore } from "vuex";
import router from "@/routes/index.js";
import { NIcon } from 'naive-ui';
import {
  Pencil as EditIcon,
  Person as PersonIcon,
  LogOutOutline as LogoutIcon,
  Build as BuildIcon,
} from "@vicons/ionicons5";
import { checkExpired, logout } from "@/api/auth.js";
import CommonAlert from "@/views/common/CommonAlert.vue";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

export default defineComponent({
  name: 'App',
  components: {
    CommonAlert,
  },
  created() {
    this.checkSignin();
    if(this.loginStatus){
      this.$store.dispatch('FETCH_USER', JSON.parse(session.getItem('user')))
          .then(()=>{
            this.options = this.isAdmin?this.adminOption:this.userOption;
          });
    }
  },
  setup(){
    const store = useStore();
    // 사용자 정보
    const loginStatus = ref(false); // true:로그인정보 있음, false:로그인정보 없음
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    // 알림창
    const alert = ref(null);

    const userOption = [
      {
        label: "내 정보",
        key: "myinfo",
        icon: renderIcon(PersonIcon),
      },
      {
        label: "작성글 관리",
        key: "mypost",
        icon: renderIcon(EditIcon),
      },
      {
        label: "로그아웃",
        key: "logout",
        icon: renderIcon(LogoutIcon),
      },
    ];

    const adminOption = [
      {
        label: "데이터관리",
        key: "quotation",
        icon: renderIcon(BuildIcon),
      },
      {
        label: "로그아웃",
        key: "logout",
        icon: renderIcon(LogoutIcon),
      },
    ];

    // 제품 리스트 -> 추후 store로 fetch해서 사용
    const productList = [
      {
        label: "휀스",
        key: "휀스",
        level: 1,
        children: [
          {
            label: "메쉬휀스",
            key: "메쉬휀스",
            level: 2,
          },
          {
            label: "경계용휀스",
            key: "2",
            level: 2,
          }
        ]
      },
      {
        label: "축사망",
        key: "축사망",
        level: 1,
        children: [
          {
            label: "견사망",
            key: "3",
            level: 2,
          },
        ]
      },
      {
        label: "낙석방지책",
        key: "낙석방지책",
        level: 1,
        children: [
          {
            label: "낙석방지책",
            key: "4",
            level: 2,
          },
        ]
      },
    ];

    const checkSignin = ()=>{
      if(checkExpired()){ // Login Info expired
        logout();
        loginStatus.value = false;
      }else{
        loginStatus.value = true;
      }
    }

    const signin =()=>{
      /*router.push("/login");*/
      router.push({
        path: '/login',
        query: { redirect: window.location.pathname }
      });
    }
    return{
      isAdmin,
      alert,
      loginStatus,
      productList,
      adminOption,
      userOption,
      checkSignin,
      signin,
      handleSelect(key) {
        if(key == 'logout'){
          logout();
          checkSignin();
          window.location.reload();
          alert.value.createMessage(200, "로그아웃");
        }else if(key == 'myinfo'){
          router.push("/my/info");
        }else if(key == 'mypost'){
          router.push("/my/post");
        }else if(key == 'quotation'){
          router.push("/admin/quotation");
        }
      },
    }
  }
});
</script>

<style>
div.n-message-container{
  top: 40%!important;
}
a.border-end{
  border-right:none!important;
}
a.btn-custom{
  font-size: 18px;
  height: 80px!important;
}
.dropdown-menu {
  font-size: 18px!important;
}
</style>
