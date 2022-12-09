<template>
  <div id="userQuestionForm">
    <div class="row" style="margin-bottom: 20px;">
      <div class="col mb-lg-3">
        <!--              목록 버튼-->
        <n-button size="large" style="float:left;" @click="goToList">
          <i class="fa fa-list text-primary"></i>
          &nbsp;&nbsp;목록
        </n-button>
      </div>
    </div>
    <n-form
        label-placement="left"
        require-mark-placement="right-hanging"
        label-width="auto"
        size="large"
    >

      <!--      사용자 정보 입력 Form Start     -->
      <div v-if="showUserInform">
        <n-divider/>
        <div class="container" style="margin-bottom: 2em;">
          <span style="color: #dc3545;">※</span><span style="color: #343a40;"> 사용자 정보가 없습니다. 아래 정보를 입력해주세요. ( * : 필수입력 )</span>
        </div>
        <UserInformationForm ref="userForm" :readyInfo="readyInfo"/>
        <n-divider/>
      </div>
      <!--      사용자 정보 입력 Form End      -->

      <n-form-item label="제목" path="qnaInfo">
        <n-input
            :status="titleStatus"
            v-model:value="qnaInfo.title"
            placeholder="제목을 입력해주세요"
            @keydown="initInput"
        />
      </n-form-item>
      <n-form-item label="문의내용" path="qnaInfo">
        <n-input
            :status="contentStatus"
            v-model:value="qnaInfo.content"
            placeholder="내용을 입력해주세요"
            type="textarea"
            :autosize="{
                                  minRows: 20,
                                  maxRows: 30
                                }"
            @keydown="initInput"
        />
      </n-form-item>
      <n-form-item label="첨부파일">
      <n-upload
            ref="upload"
            :max="10"
            :default-upload="false"
            multiple
            v-model:file-list="fileList"
            @change="handleUploadChange"
            @before-upload="handleUploadNew"
            @remove="handleRemove"
      >
        <n-button>파일 추가</n-button>
        <span>&nbsp;&nbsp;※ 확장자 상관없이 최대 10개까지 등록할 수 있습니다. (현재 파일 수: {{ fileList.length }}개)</span>
      </n-upload>
      </n-form-item>
      <n-form-item label="비밀글 여부" path="switchValue">
        <n-switch v-model:value="secretTf"/> &nbsp;&nbsp;
        <span v-show="secretTf"><i class="bi bi-lock-fill"></i>&nbsp;비밀글</span>
        <span v-show="!secretTf"><i class="bi bi-unlock-fill"></i>&nbsp;전체공개</span>
      </n-form-item>
    </n-form>
  </div>
  <div class="row">
    <div class="col">
      <n-button size="large" style="float:right;" type="primary" @click="save" strong secondary>
        <i class="fa fa-check"></i>
        &nbsp;&nbsp;등록
      </n-button>
    </div>
  </div>
  <CommonAlert ref="alert"/>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import { useRoute } from "vue-router";
import router from "@/routes/index.js"
import UserInformationForm from "@/views/include/UserInformationForm.vue";
import CommonAlert from "@/views/common/CommonAlert.vue"
import { getQna, addQna, modifyQna } from '../../api/user_qna.js';
import {useStore} from "vuex";

export default defineComponent({
  name: 'UserQuestionForm',
  components: {
    UserInformationForm,
    CommonAlert,
  },
  mounted() {
    const route = useRoute();
    if(!!route.query.qna_id){
      this.fetchQnaInfo(route.query.qna_id);
    }
    // 사용자정보 (이름/연락처/유형) 공란일 시, 입력 폼 보이기
    if(this.userInfo.name=='' || this.userInfo.contact=='' || this.userInfo.type==''){
      this.showUserInform = true;
      this.readyInfo = this.userInfo;
    }
  },
  setup(){
    const store = useStore();
    // 사용자정보
    const userInfo = computed(() => {
      return store.state.userInfo;
    });
    // Show/Hide 사용자 정보 입력 폼
    const showUserInform = ref(false);
    const readyInfo = ref({});
    const userForm = ref(null);
    // 비밀글 여부
    const secretTf = ref(true);
    // 문의글 상세정보
    const qnaInfo = ref({
      user_id : userInfo.value.user_id,
      title	: '', // 제목
      content	: '', // 내용
      secret_yn	: 'Y', //비공개 여부
    });

    // 목록 버튼 action
    const goToList = () =>{
      router.push('list');
    }

    // 메시지 모달
    const alert = ref(null);

    // 수정 화면일 경우 세팅
    const fetchQnaInfo = (qna_id) =>{
      // Qna ID로 상세 조회
      getQna(qna_id)
          .then((response)=>{
            qnaInfo.value = response.data.qnaInfo[0];
            secretTf.value= qnaInfo.value.secret_yn=='Y'?true:false;
            fileList.value = [];
            for(var i=0;i < response.data.fileList.length; i++){
              var fileInfo = response.data.fileList[i];
              var filenames = (fileInfo.file).split('/');
              fileList.value.push({
                qna_id:fileInfo.qna_id,
                file:decodeURI(fileInfo.file),
                id:fileInfo.file_id,
                name:decodeURI(filenames[filenames.length-1]),
                status:"finished",
                type: "text/plain"
              })
            }
          })
          .catch(()=>{
            router.push({
              path: '/login',
              query: { redirect: '/question/form/?qna_id='+qna_id }
            });
          });
    }

    //// 문의글 입력 폼 /////
    // 입력 input 상태
    const titleStatus = ref("success");
    const contentStatus = ref("success");

    const initInput =()=>{
      titleStatus.value = "success";
      contentStatus.value = "success";
    }

    // 파일 업로드
    const fileList = ref([]);
    const removedFileList = ref([]);
    const appendedFileList = ref([]);

    // 저장
    const save = () => {
      titleStatus.value = "success";
      contentStatus.value = "success";

      // validation check
      if(qnaInfo.value.title==''){
        titleStatus.value = "error";
        alert.value.createMessage("문의글의 제목을 입력해주세요");
      }else if(qnaInfo.value.content=='') {
        contentStatus.value = "error";
        alert.value.createMessage("문의글의 내용을 입력해주세요");
      }else if (showUserInform.value && userForm.value.validation()==false){
        alert.value.createMessage("문의자 정보를 입력해주세요");
      }else {
        qnaInfo.value.secret_yn = secretTf.value?'Y':'N';

        const formData = new FormData();
        formData.append("user_id", qnaInfo.value.user_id);
        formData.append("title", qnaInfo.value.title);
        formData.append("content", qnaInfo.value.content);
        formData.append("secret_yn", qnaInfo.value.secret_yn);

        formData.append("user_info", showUserInform.value);
        // 사용자 정보 setting
        if(showUserInform.value){
          formData.append("user_id", userForm.value.savedUserInfo.user_id);
          formData.append("user_name", userForm.value.savedUserInfo.name);
          formData.append("user_contact", userForm.value.savedUserInfo.contact);
          formData.append("user_email", userForm.value.savedUserInfo.email);
          formData.append("user_type", userForm.value.savedUserInfo.type);
          formData.append("user_company", userForm.value.savedUserInfo.company);
        }

        if(!!qnaInfo.value.qna_id){
          // 수정
          formData.append("qna_id", qnaInfo.value.qna_id);
          formData.append("removed", removedFileList.value); // 삭제된 파일리스트
          for(var i=0; i<appendedFileList.value.length; i++){
            formData.append("FILE"+i, appendedFileList.value[i].file);
          }
          modifyQna(formData)
              .then((response)=>{
                alert.value.createMessage(response.status, "문의글 수정");
                router.push('/question/list');
              })
              .catch((error)=>{
                alert.value.createMessage(error.code, "문의글 수정");
              });
        }else{
          // 신규등록
          for(var i=0; i<fileList.value.length; i++){
            formData.append("FILE"+i, fileList.value[i].file);
          }
          addQna(formData)
              .then((response)=>{
                alert.value.createMessage(response.status, "문의글 작성");
                router.push('/question/list');
              })
              .catch((error)=>{
                alert.value.createMessage(error.code, "문의글 작성");
              });
        }
      }
    }

    return{
      alert,
      qnaInfo,
      userInfo,
      readyInfo,
      userForm,
      showUserInform,
      secretTf,
      titleStatus,
      contentStatus,
      // 파일 업로드 관련 리턴
      fileList,
      removedFileList,
      appendedFileList,
      initInput,
      save,
      fetchQnaInfo,
      goToList,
      handleUploadChange(data) {
        fileList.value = data.fileList;
      },
      handleUploadNew(data){
        appendedFileList.value.push(data.file)
      },
      handleRemove(data) {
        removedFileList.value.push(data.file.id)
      },
    }
  },
});

</script>

<style>

</style>