<template>
  <div class="row">
    <div class="col mb-lg-3">
      <!--              목록버튼          -->
      <n-button size="large" style="float:right;" @click="goToList" v-show="showListBtn">
        <i class="fa fa-list text-primary"></i>
        &nbsp;&nbsp;목록
      </n-button>
    </div>
  </div>
  <n-tabs
      class="list-tabs"
      default-value="boardList"
      size="large"
      animated
      ref="tabs">
    <!--          문의 리스트 Tab          -->
    <n-tab-pane name="boardList" tab="boardList" style="overflow-x: auto;">
      <n-data-table
          size="large"
          :data="quotationList"
          :columns="columns"
          :row-props="rowProps"
          :pagination="pagination"
          ref="table"
          style="min-width:600px;"></n-data-table>
    </n-tab-pane>
    <!--          문의 상세 Tab           -->
    <n-tab-pane name="detail" tab="detail">
      <div class="container bd-example" style="min-height:600px;">
        <!--          제목/내용/글쓴이/업로드시각           -->
        <div class="row">
          <div class="col col-md-8">
            <h3>{{ detailInfo.title }}</h3>
          </div>
          <div class="col col-md-4" style="padding-top:1em; text-align: right;">
            <p class="writer-info">
              <i class="fa fa-clock" v-show="detailInfo.register_dt!=null&&detailInfo.register_dt!= ''"></i>
              {{ detailInfo.register_dt }}
            </p>
          </div>
          <n-divider />
        </div>
        <!--          수정/삭제 버튼           -->
        <div class="row">
          <div class="col-md-12" style="align-items: end;">
            <n-popover trigger="hover">
              <template #trigger>
                <!--          삭제 버튼        -->
                <n-button type="error" style="float:right;" @click="showDeleteModal=true" ghost circle>
                  <template #icon>
                    <n-icon :depth="2" :size="20" color="#d03050"><trash-outline-icon/></n-icon>
                  </template>
                </n-button>
              </template>
              <span>삭제</span>
            </n-popover>
            <n-modal
                v-model:show="showDeleteModal"
                preset="dialog"
                type="error"
                title="문의글 삭제"
                content="해당 문의글을 삭제하시겠습니까?"
                positive-text="삭제"
                negative-text="취소"
                @positive-click="remove"
                @negative-click="showDeleteModal=false"
            />
            <n-popover trigger="hover">
              <template #trigger>
                <!--          수정 버튼       -->
                <n-button style="margin-right: 0.5em; float:right;" @click="modify" ghost circle>
                  <template #icon>
                    <n-icon :depth="2" :size="20"><edit-icon/></n-icon>
                  </template>
                </n-button>
              </template>
              <span>수정</span>
            </n-popover>
          </div>
        </div>

        <div class="row">
          <div class="col col-md-12" style="min-height: 600px;">
            <p class="lh-lg" v-html="detailInfo.content.replace(/(?:\r\n|\r|\n)/g, '<br/>')"></p>
          </div>
        </div>
        <div class="row">
          <!--          첨부파일           -->
          <div class="col col-md-12">
            <n-upload
                abstract
                :default-file-list="fileList"
                :show-remove-button="false"
            >
              <n-card style="margin-top: 10px" title="첨부파일" v-show="fileList.length>0">
                <n-upload-file-list />
              </n-card>
            </n-upload>
          </div>
          <n-divider style="margin-top: 4em;"/>
        </div>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>

<script>
import {defineComponent, h, ref, reactive, computed} from "vue";
import router from "@/routes/index.js"
import { NIcon, NTag, NSpace, useMessage } from "naive-ui";
import { Pencil as EditIcon,
  TrashOutline as TrashOutlineIcon, } from "@vicons/ionicons5";
import LockClosed12Regular from "@vicons/fluent/LockClosed12Regular";
import Attach12Regular from "@vicons/fluent/Attach12Regular";
import { getQnaMyList, removeQna } from "@/api/user_qna.js";
import {useStore} from "vuex";

export default defineComponent({
  name: 'UserQuestion',
  components:{
    EditIcon,
    TrashOutlineIcon,
  },
  created() {
    this.fetchList(); // call QnA List
  },
  setup(){
    const store = useStore();
    // 사용자정보
    const userInfo = computed(() => {
      return store.state.userInfo;
    });

    // 버튼 Show/Hide 옵션
    const showListBtn = ref(false);

    // 버튼 동작 (목록)
    const goToList = () => { // Go to List button
      $('div[data-name=boardList]').click();
      showListBtn.value = false;
    }

    // 문의리스트 API
    const quotationList = ref([]);
    const allFileList = ref([]);
    const fileList = ref([]);
    const fetchList = () => {
      getQnaMyList(userInfo.value.user_id)
          .then(response => {
            quotationList.value = response.data.qnaList;
            for(var i=0;i < response.data.fileList.length; i++){
              var fileInfo = response.data.fileList[i];
              var filenames = (fileInfo.file).split('/');
              allFileList.value.push({
                qna_id:fileInfo.qna_id,
                file:decodeURI(fileInfo.file),
                id:fileInfo.file_id,
                name:decodeURI(filenames[filenames.length-1]),
                status:"finished",
                type: "text/plain",
                url:process.env.VUE_APP_API_URL+"/api/user_qna/download/?file="+fileInfo.file_id,
              })
            }
          })
          .catch(error =>{
            console.log(error);
          });
    }

    // 문의리스트 DataTable
    const tableRef = ref(null)

    const columns = reactive([
      {
        title: 'No',
        key: 'qna_id',
        align: 'center',
        width: '8%',
      },
      {
        title: '제목',
        key: 'title',
        ellipsis: {
          tooltip: true
        },
        render(obj) {
          return obj.file_cnt>0?
              h(
                  NSpace,
                  {},
                  {
                    default: () => [
                      obj.title,
                      h(
                          NIcon,
                          {
                            color: 'gray',
                            component: Attach12Regular,
                          },
                          {
                            default: () => obj.title
                          },
                      )
                    ]
                  }
              )
              :obj.title;
        },
      },
      {
        title: '',
        key: 'secret_yn',
        align: 'center',
        width: '6%',
        render(obj) {
          return obj.secret_yn=='Y'?h(
              NIcon,
              {
                color:'#b5b5b5',
                component:LockClosed12Regular,
              },
              {
                default: () => ''
              }
          ):'';
        },
      },
      {
        title: '작성일',
        key: 'register_dt',
        render: function(obj){
          return obj.register_dt.split(' ')[0];
        },
        width: '17%',
      },
      {
        title: '답변',
        key: 'answer',
        render(obj) {
          return h(
              NTag,
              {
                size:'large',
                round:true,
                type:obj.answer!=null&&obj.answer!=''?'success':''
              },
              {
                default: () => obj.answer!=null&&obj.answer!=''?'완료':'대기'
              }
          );
        },
        width: '17%',
      },
    ]);

    // 문의 상세내용
    const detailInfo = ref({
      qna_id : 0,	// 문의 ID
      user_id : '', //	사용자 ID
      title	: '', // 제목
      content	: '', // 내용
      secret_yn	: 'Y', //비공개 여부
      register_dt	: '', //등록일시
      answer	: '', //답변
      answer_dt	: '', //답변일시
    });

    const message = useMessage();
    const remove = () =>{
      removeQna(detailInfo.value)
          .then(()=>{
            message.create(
                "문의글을 삭제하였습니다.",
                { duration: 2000, type: "success" }
            );
            fetchList();
            goToList();
          })
          .catch(()=>{
            message.error(
                "문의글 삭제 중 오류가 발생하였습니다.",
                { duration: 2000, type: "error" }
            );
          });
    }

    // 문의글 수정
    const modify = () =>{
      router.push('/question/form?qna_id='+detailInfo.value.qna_id);
    }

    return {
      message,
      userInfo,
      quotationList,
      columns,
      detailInfo,
      showListBtn,
      allFileList,
      fileList,
      table: tableRef,
      pagination: ref({
        pageSize: 10
      }),
      showDeleteModal: ref(false),
      goToList,
      fetchList,
      rowProps: (row) => {
        return {
          style: "cursor: pointer;",
          onClick: () => {
            detailInfo.value.title = row.title;
            detailInfo.value.content = row.content;
            detailInfo.value.qna_id = row.qna_id;
            detailInfo.value.user_id = row.user_id;
            detailInfo.value.secret_yn = row.secret_yn;
            detailInfo.value.register_dt = row.register_dt;
            detailInfo.value.answer = row.answer;
            detailInfo.value.answer_dt = row.answer_dt;
            showListBtn.value = true;
            fileList.value = [];
            for(var i=0;i < allFileList.value.length; i++){
              var fileInfo = allFileList.value[i];
              if(fileInfo.qna_id == row.qna_id){
                fileList.value.push(fileInfo);
              }
            }
            $('div[data-name=detail]').click();
          }
        };
      },
      remove,
      modify,
    };
  }
});

</script>

<style>
.n-data-table-th--hover{
  background-color: rgba(250, 250, 252, 1)!important;
}

.n-data-table-td--hover{
  background-color: #fff!important;
}
.list-tabs>span.n-data-table-sorter{
  display:none!important;
}
.list-tabs>div.n-tabs-nav{
  display: none!important;
}
.writer-info,.answer-info{
  color: #7e7e7e;
}
th.n-data-table-th,td.n-data-table-td{
  padding: 10px!important;
}
i.n-base-icon.n-dialog__icon{
  margin-bottom: 7px!important;
}
div.n-upload-file-info__name>a{
  color: #343a40!important;
  text-decoration: none!important;
}
</style>