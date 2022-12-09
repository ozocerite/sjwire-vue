<template>
  <div id="AdminMenu">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->
    <div class="container-xxl">
      <div class="row">
        <div class="col">
          <!--      관리자 메뉴       -->
          <n-menu
              :options="menuOption"
              :value="menuKey"
              @update:value="changeTab"
              @loadstart="changeTab"
          />
        </div>
        <div class="col col-sm-10">
          <ManageQuotation v-if="menuKey=='quotation'"></ManageQuotation>
          <ManageUserList v-if="menuKey=='user'"></ManageUserList>
          <ManageHistoryList v-if="menuKey=='history'"></ManageHistoryList>
        </div>
      </div>
    </div>
    <CommonAlert ref="alert"/>
  </div>
</template>

<script>
import {computed, defineComponent, h, ref} from "vue";
import { useStore } from "vuex";
import CommonHeader from "@/views/common/CommonHeader.vue";
import ManageQuotation from "@/views/include/ManageQuotation.vue";
import ManageUserList from "@/views/include/ManageUserList.vue";
import ManageHistoryList from "@/views/include/ManageHistoryList.vue";
import CommonAlert from "@/views/common/CommonAlert.vue"
import router from "@/routes/index.js";
import {NIcon} from "naive-ui";
import {
  ChevronForward as MenuIcon,
} from "@vicons/ionicons5";

const pageInfo = {
  title: ' ',
};

function renderIcon(icon) {
  return () => h(NIcon, { size:"17px", }, { default: () => h(icon) });
}

export default defineComponent({
  name:"AdminMenu",
  components:{
    CommonHeader,
    ManageQuotation,
    ManageUserList,
    ManageHistoryList,
    CommonAlert,
  },
  props:{
    tab_value: String,
  },
  mounted() {
    this.menuKey = this.tab_value;
    const store = useStore();
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    if(!isAdmin.value){
      router.push("/");
    }else{
      this.menuKey = this.tab_value;
    }
  },
  setup() {
    const alert = ref(null);
    const menuKey= ref("");
    const menuOption = [
      {
        label: "견적",
        key: "quotation",
        icon: renderIcon(MenuIcon),
      },
      {
        label: "회원",
        key: "user",
        icon: renderIcon(MenuIcon),
      },
      {
        label: "연혁",
        key: "history",
        icon: renderIcon(MenuIcon),
      },
      {
        label: "제품",
        key: "product",
        icon: renderIcon(MenuIcon),
      },
    ];
    return {
      pageInfo,
      alert,
      menuOption,
      menuKey,
      changeTab: (data)=>{
        router.push(data);
      }
    }
  }
});

</script>

<style>
.n-tab-pane-info{
  padding: 6% 0% 5% 3%!important;
}
</style>