<template>
  <div id="archiveUploadForm">
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
      <n-form-item label="공지사항 여부" path="switchValue">
        <n-switch v-model:value="noticeTf"/> &nbsp;&nbsp;
        <span v-show="noticeTf">&nbsp;공지글</span>
        <span v-show="!noticeTf">&nbsp;일반 게시글</span>
      </n-form-item>
      <n-form-item label="제목" path="postInfo">
        <n-input
            :status="titleStatus"
            v-model:value="postInfo.title"
            placeholder="제목을 입력해주세요"
            @keydown="initInput"
        />
      </n-form-item>
      <n-form-item label="내용" path="postInfo">
        <n-input
            :status="contentStatus"
            v-model:value="postInfo.content"
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
            :max="10"
            ref="upload"
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
import {getArchivePost, addArchivePost, modifyArchivePost} from "@/api/archive.js";
import CommonAlert from "@/views/common/CommonAlert.vue"
import { useStore } from "vuex";

export default defineComponent({
  name: 'ArchiveUploadForm',
  components:{
    CommonAlert,
  },
  mounted() {
    const route = useRoute();
    if(!!route.query.post_id){
      this.fetchPostInfo(route.query.post_id);
    }
    const store = useStore();
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    if(!isAdmin.value){
      router.push('list');
      this.message.create(
          "권한이 없습니다.",
          { duration: 2000, type: "error" }
      );
    }
  },
  setup(){
    // 업로드 게시글 정보
    const postInfo = ref({
      title: '',
      content: '',
      notice_yn: 'N',
    });
    // 공지글여부 Switch
    const noticeTf = ref(false);

    // 목록 버튼 action
    const goToList = () =>{
      router.push('list');
    }

    // 메시지 모달
    const alert = ref(null);

    // 수정 화면일 경우 세팅
    const fetchPostInfo = (post_id) =>{
      getArchivePost(post_id)
          .then((response)=>{
            postInfo.value = response.data.postInfo[0];
            noticeTf.value = postInfo.value.notice_yn=='Y'?true:false;
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
              query: { redirect: '/archive/form/?post_id='+post_id }
            });
          });
    }

    //// 게시글 입력 폼 /////
    // 입력 input 상태
    const titleStatus = ref("success");
    const contentStatus = ref("success");
    // 입력 input 상태 초기화
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
      if(postInfo.value.title==''){
        titleStatus.value = "error";
        alert.value.createMessage("게시글의 제목을 입력해주세요");
      }else if(postInfo.value.content=='') {
        contentStatus.value = "error";
        alert.value.createMessage("게시글의 내용을 입력해주세요");
      }else{
          postInfo.value.notice_yn = noticeTf.value?'Y':'N';

          const formData = new FormData();
          formData.append("title", postInfo.value.title);
          formData.append("content", postInfo.value.content);
          formData.append("notice_yn", postInfo.value.notice_yn);

          if(!!postInfo.value.post_id){
            // 수정
            formData.append("post_id", postInfo.value.post_id);
            formData.append("removed", removedFileList.value); // 삭제된 파일리스트
            for(var i=0; i<appendedFileList.value.length; i++){
              formData.append("FILE"+i, appendedFileList.value[i].file);
            }
            modifyArchivePost(formData)
                .then((response)=>{
                  alert.value.createMessage(response.status, "게시글 수정");
                  router.push('/archive/list');
                })
                .catch((error)=>{
                  alert.value.createMessage(error.code, "게시글 수정");
                });
          }else{
            // 신규등록
            for(var i=0; i<fileList.value.length; i++){
              formData.append("FILE"+i, fileList.value[i].file);
            }
            addArchivePost(formData)
                .then((response)=>{
                  alert.value.createMessage(response.status, "신규 게시글 작성");
                  router.push('/archive/list');
                })
                .catch((error)=>{
                  alert.value.createMessage(error.code, "신규 게시글 작성");
                });
          }
        }
      }

    return{
      alert,
      postInfo,
      noticeTf,
      titleStatus,
      contentStatus,
      // 파일 업로드 관련 리턴
      fileList,
      removedFileList,
      appendedFileList,
      initInput,
      fetchPostInfo,
      save,
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