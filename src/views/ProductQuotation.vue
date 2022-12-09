<template>
  <div id="companyQuotation">
    <!-- Page Header Start -->
    <div v-show="headerShow">
      <CommonHeader :title="pageInfo.title" :category="pageInfo.category" ref="header"/>
    </div>
    <!-- Page Header End -->

    <div class="container-fluid bg-light overflow-hidden px-lg-0 container-quotation" style="margin: 6rem 0;">
      <div class="container contact px-lg-0 wow fadeInUp" data-wow-delay="0.5s">
        <div class="row g-0 mx-lg-0">
          <div class="col-lg-6 contact-text py-5">
            <div class="p-lg-5 ps-lg-0">
              <h1 class="mb-4">무료견적신청서 작성</h1>
              <p class="mb-4">각종 휀스, 보호망 견적을 요청해주시면 친절하게 답변해드리겠습니다. <br> <p v-show="!userInfo.user_id" class="text-danger"> ※ 신청 전 회원가입을 하시면 신청 내역을 확인하실 수 있습니다. </p></p>
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="form-floating">
                      <n-input class="input-quotation" type="text" size="large" placeholder="성함" v-model:value="quotation.name" :status="nameStatus" :disabled="!active" clearable round/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <n-input class="input-quotation" type="text" size="large" placeholder="연락처 또는 이메일" v-model:value="quotation.contact" :status="contactStatus" :disabled="!active" clearable round/>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating">
                      <n-input class="input-quotation" type="text" size="large" placeholder="회사 (개인일 경우 공란)" v-model:value="quotation.company" :disabled="!active" clearable round/>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-floating">
                      <n-input type="textarea"
                               :autosize="{
                                            minRows: 5
                                          }"
                               size="large"
                               placeholder="견적내용"
                               v-model:value="quotation.content"
                               :status="contentStatus"
                               :disabled="!active"
                               clearable round/>
                    </div>
                  </div>
                  <div class="col-12">
                    <n-button size="large" class="btn-custom" type="success" @click="showModal=true" :disabled="!active" round>신청</n-button>
                  </div>
                  <n-modal
                      v-model:show="showModal"
                      preset="dialog"
                      title="견적서 신청"
                      content="해당 내용으로 견적서를 신청하시겠습니까?"
                      positive-text="신청"
                      negative-text="취소"
                      @positive-click="confirmSubmit"
                      @negative-click="showModal=false"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 pe-lg-0 container-quotation-img" style="min-height: 400px;">
            <div class="position-relative h-100">
              <div class="quotation-img"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <CommonAlert ref="alert"/>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import CommonHeader from "@/views/common/CommonHeader";
import CommonAlert from "@/views/common/CommonAlert";
import { addQuotation } from "@/api/quotation.js"
import {useStore} from "vuex";

const pageInfo = {
  title: '견적신청',
}

export default defineComponent({
  name: 'ProductQuotation',
  components: {
    CommonAlert,
    CommonHeader,
  },
  props: {
    headerShow:{
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if(!!this.userInfo) {
      if(!!this.userInfo.user_id) this.quotation.user_id = this.userInfo.user_id;
      if(!!this.userInfo.name) this.quotation.name = this.userInfo.name;
      if(!!this.userInfo.contact) this.quotation.contact = this.userInfo.contact;
      if(!!this.userInfo.company) this.quotation.company = this.userInfo.company;
    }
  },
  setup() {

    const store = useStore();
    // 사용자정보
    const userInfo = computed(() => {
      return store.state.userInfo;
    });

    const quotation = ref({
      user_id: "",
      name: "",
      contact: "",
      company: "",
      content: "",
    });
    const nameStatus = ref("success");
    const contactStatus = ref("success");
    const contentStatus = ref("success");
    const alert = ref(null);
    const showModal = ref(false);
    const active = ref(true);

    const confirmSubmit=()=>{
      nameStatus.value = "success";
      contactStatus.value = "success";
      contentStatus.value = "success";

      if(quotation.value.name==""){
        nameStatus.value = "error";
      }
      if(quotation.value.contact==""){
        contactStatus.value = "error";
      }
      if(quotation.value.content==""){
        contentStatus.value = "error";
      }
      if(quotation.value.name!="" && quotation.value.contact!="" && quotation.value.content!=""){
        addQuotation(quotation.value).then((response)=>{
          alert.value.createMessage(response.status, "견적 신청");
          active.value = false;
        });
      }
    }
    return {
      userInfo,
      alert,
      pageInfo,
      quotation,
      nameStatus,
      contactStatus,
      contentStatus,
      showModal,
      active,
      confirmSubmit,
    };
  }
});
</script>

<style>
@media only screen and (max-width: 600px) {
  div.container-quotation{
    padding: 0 5px 0 5px!important;
  }
  div.container-quotation-img{
    display: none;
  }
}

.input-quotation{
  padding: .5rem!important;
  height: calc(3.5rem + 2px)!important;
}

.btn-custom{
  height:56px;
  font-weight: 500;
  line-height: 1.5;
  transition: .5s;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-right: 3rem !important;
  padding-left: 3rem !important;
  background-color: #3a9d91;
  --n-border: 0px!important;
}

.quotation-img{
  /* The image used */
  background-image: url("../assets/img/realshot/KakaoTalk_20221117_205815412_17.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>