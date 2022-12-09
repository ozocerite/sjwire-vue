<template>
  <div id="adminAnswerForm">
    <!--          답변/업로드시각           -->
    <div class="row" v-show="detailInfo.answer_dt!==null && showAnswerForm==false">
      <div class="col col-md-8">
        <h5><i class="bi bi-arrow-return-right"></i>&nbsp;답변</h5>
      </div>
      <div class="col col-md-4" style="text-align: right;padding-top:1em;">
        <p class="answer-info">
          <i class="fa fa-user"></i>
          관리자
          &nbsp;&nbsp;
          <i class="fa fa-clock"></i>
          {{ detailInfo.answer_dt }}
        </p>
      </div>
      <div class="col col-md-12" style="min-height: 400px;">
        <p class="lh-lg" v-html="detailInfo.answer.replace(/(?:\r\n|\r|\n)/g, '<br/>')"></p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="align-items: end;">
        <n-button size="large" style="float:right;margin-left:5px;" @click="showAnswerForm=false" v-show="showAnswerForm">
          닫기
        </n-button>
        <n-button size="large" style="float:right;margin-left:5px;" type="primary" @click="save" v-show="showAnswerForm">
          <i class="bi bi-file-earmark-check-fill"></i>
          &nbsp;&nbsp;저장
        </n-button>
        <n-button size="large" style="float:right;" type="error" @click="showAnswerForm=true" v-show="isAdmin && !showAnswerForm" ghost>
          <i class="bi bi-chat-dots-fill"></i>
          &nbsp;&nbsp;{{!!detailInfo.answer_dt?'답변수정':'답변작성'}}
        </n-button>
      </div>
    </div>
    <n-form v-show="showAnswerForm">
      <n-form-item label="" path="">
        <n-input
            :status="answerStatus"
            v-model:value="detailInfo.answer"
            placeholder="답변 내용을 입력해주세요"
            type="textarea"
            :autosize="{
                                  minRows: 20,
                                  maxRows: 30
                                }"
            @keydown="initInput"
        />
      </n-form-item>
    </n-form>
    <CommonAlert ref="alert"/>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { updateAnswer } from '../../api/user_qna.js';
import CommonAlert from "@/views/common/CommonAlert.vue"


export default defineComponent({
  props: {
    detailInfo: JSON,
    fetchList: Function,
  },
  components:{
    CommonAlert,
  },
  setup(props){
    const store = useStore();
    // Show/Hide 답변 폼
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    const showAnswerForm = ref(false);
    // 답변 input 상태
    const answerStatus = ref("success");
    const initInput =()=>{
      answerStatus.value = "success";
    }

    // 메시지 모달
    const alert = ref(null);

    // 답변 저장
    const save =()=>{
      if(!!props.detailInfo.answer){
        props.detailInfo.answer_dt = (new Date()).toISOString();
        updateAnswer(props.detailInfo)
            .then((response)=>{
              alert.value.createMessage(response.status, "답변 등록");
              answerStatus.value = "success";
              showAnswerForm.value = false;
              props.fetchList();
              // 답변 시각 다시 세팅해주기 (타임존이 안 맞아서 맞춰줌)
              var timezoneOffset = new Date().getTimezoneOffset() * 60000;
              var timezoneDate = new Date(new Date(props.detailInfo.answer_dt) - timezoneOffset);
              props.detailInfo.answer_dt = timezoneDate.toISOString().replace(/T|\.[0-9]*[a-z]*/gi,' ')
            })
            .catch((error)=>{
              alert.value.createMessage(error.code, "답변 등록");
            });
      }else{
        answerStatus.value = "error";
      }
    }

    return{
      alert,
      detailInfo:props.detailInfo,
      isAdmin,
      showAnswerForm,
      answerStatus,
      initInput,
      save,
    }
  },
});
</script>