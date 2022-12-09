<template>
  <div id="myMenu">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->
    <div class="container">
    <!--      회원 메뉴       -->
      <n-tabs type="line" :size="'large'" :value="tabValue" @update:value="changeTab">
        <n-tab-pane class="n-tab-pane-info" name="info" tab="회원정보 수정">
          <UserInformationForm ref="userForm" :readyInfo="readyInfo"/>
          <div class="row">
            <div class="col" style="max-width: 480px;">
              <n-button size="large" style="float: right;" type="primary" @click="save" strong secondary>
                <i class="fa fa-check"></i>
                &nbsp;&nbsp;저장
              </n-button>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="post" tab="작성글">
          <n-tabs type="card" style="padding-top: 2%;">
            <n-tab-pane name="qna" tab="Q&A">
              <MyQuestion></MyQuestion>
            </n-tab-pane>
            <n-tab-pane name="quotation" tab="견적요청">
              <MyQuotation></MyQuotation>
            </n-tab-pane>
          </n-tabs>
        </n-tab-pane>
        <n-tab-pane name="resign" tab="회원탈퇴">
          <div class="row">
            <p>세진철망 사이트 내에서 내 회원 정보를 삭제합니다.</p>
          </div>
          <n-button size="large" style="float: left;" type="error" @click="showModal=true" strong secondary>
            <template #icon>
              <n-icon><RemoveIcon/></n-icon>
            </template>
            &nbsp;&nbsp;회원탈퇴
          </n-button>
          <n-modal
              v-model:show="showModal"
              preset="dialog"
              title="회원탈퇴"
              content="회원탈퇴 하시겠습니까?"
              positive-text="탈퇴"
              negative-text="취소"
              @positive-click="resign"
              @negative-click="showModal=false"
          />
        </n-tab-pane>
      </n-tabs>
    </div>
    <CommonAlert ref="alert"/>
  </div>
</template>

<script>
import { computed, watch, defineComponent, ref } from "vue";
import CommonHeader from "@/views/common/CommonHeader.vue";
import UserInformationForm from "@/views/include/UserInformationForm.vue";
import MyQuestion from "@/views/include/MyQuestion.vue";
import MyQuotation from "@/views/include/MyQuotation.vue";
import CommonAlert from "@/views/common/CommonAlert.vue"
import router from "@/routes/index.js";
import { modifyUser, removeUser } from "@/api/user.js";
import { logout } from "@/api/auth.js"
import { useStore } from "vuex";
import { RemoveCircle as RemoveIcon} from "@vicons/ionicons5";

const pageInfo = {
  title: ' ',
};

export default defineComponent({
  name:"MyMenu",
  components:{
    CommonHeader,
    UserInformationForm,
    MyQuestion,
    MyQuotation,
    CommonAlert,
    RemoveIcon,
  },
  props:{
    tab_value: String,
  },
  mounted() {
    this.tabValue = this.tab_value;
  },
  setup() {
    const store = useStore();
    const readyInfo = computed(() => {
      return store.state.userInfo;
    });
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });

    watch(() => isAdmin.value, function() {
      if(isAdmin.value){
        // Check Admin
        router.push("/admin/quotation");
      }
    });

    const alert = ref(null);
    const tabValue= ref("");
    const userForm = ref(null);
    const showModal = ref(false);

    const save = ()=>{
      modifyUser(userForm.value.savedUserInfo)
          .then((response)=>{
            alert.value.createMessage(response.status, "회원정보 수정");
          });
    }

    const resign= ()=>{
      removeUser(readyInfo.value)
          .then((response)=>{
            alert.value.createMessage(response.status, "회원 탈퇴");
            logout();
            window.location.reload();
          })
    }

    return {
      pageInfo,
      alert,
      readyInfo,
      isAdmin,
      tabValue,
      userForm,
      showModal,
      save,
      resign,
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