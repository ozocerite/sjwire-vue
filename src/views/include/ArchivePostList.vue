<template>
  <div class="row">
    <div class="col mb-lg-3">
      <!--              목록버튼          -->
      <n-button size="large" style="float:left;" @click="goToList" v-show="showListBtn">
        <i class="fa fa-list text-primary"></i>
        &nbsp;&nbsp;목록
      </n-button>
      <!--          작성버튼          -->
      <n-button size="large" style="float:right;" @click="openNew" v-show="isAdmin">
        <i class="fa fa-file-upload text-primary"></i>
        &nbsp;&nbsp;자료등록
      </n-button>
    </div>
  </div>
  <n-tabs
      class="list-tabs"
      default-value="postList"
      size="large"
      animated
      style="margin: 0 -4px"
      ref="tabs"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
    <!--          게시글 리스트 Tab          -->
    <n-tab-pane name="postList" tab="postList" style="overflow-x: auto;">
      <n-data-table
          size="large"
          :data="postList"
          :columns="columns"
          :row-props="rowProps"
          :pagination="pagination"
          ref="table"
          style="min-width:600px;"/>
    </n-tab-pane>
    <!--          게시글 상세 Tab           -->
    <n-tab-pane name="detail" tab="detail">
      <div class="container bd-example" style="min-height:600px;">
        <!--          제목/내용/글쓴이/업로드시각           -->
        <div class="row">
          <div class="col col-md-8">
            <h3>{{ postDetail.notice_yn=='Y'?'[공지] '+postDetail.title:postDetail.title }}</h3>
          </div>
          <div class="col col-md-4" style="padding-top:1em; text-align: right;">
            <p class="writer-info">
              <i class="fa fa-clock" v-show="postDetail.register_dt!=null&&postDetail.register_dt!= ''"></i>
              {{ postDetail.register_dt }}
            </p>
          </div>
          <n-divider style="margin-bottom: 0px;"/>
          <div class="row">
            <!--          첨부파일           -->
            <div class="col col-sm-1" style="padding-top: 24px;">
              <h6>첨부파일</h6>
            </div>
            <div class="col col-sm-11">
              <n-upload
                  abstract
                  :default-file-list="fileList"
                  :show-remove-button="false"
              >
                <n-card style="margin-top: 10px" v-show="fileList.length>0" :bordered="false" content-style="padding: 0;">
                  <n-upload-file-list />
                </n-card>
              </n-upload>
            </div>
          </div>
          <n-divider style="margin-top: 1em;"/>
        </div>
        <!--          수정/삭제 버튼           -->
        <div class="row" v-if="isAdmin">
          <div class="col-md-12" style="align-items: end;">
            <n-popover trigger="hover">
              <template #trigger>
                <!--          삭제 버튼(v-if 조건 : 관리자)           -->
                <n-button type="error" style="float:right;" v-if="isAdmin" @click="showDeleteModal=true" ghost circle>
                  <template #icon>
                    <n-icon :depth="2" :size="20" color="#d03050"><trash-outline-icon/></n-icon>
                  </template>
                </n-button>
              </template>
              <span>게시글 삭제</span>
            </n-popover>
            <n-modal
                v-model:show="showDeleteModal"
                preset="dialog"
                type="error"
                title="게시글 삭제"
                content="해당 게시글을 삭제하시겠습니까?"
                positive-text="삭제"
                negative-text="취소"
                @positive-click="remove"
                @negative-click="showDeleteModal=false"
            />
            <n-popover trigger="hover">
              <template #trigger>
                <!--          수정 버튼(v-if 조건 : 관리자)           -->
                <n-button style="margin-right: 0.5em; float:right;" v-if="isAdmin" @click="modify" ghost circle>
                  <template #icon>
                    <n-icon :depth="2" :size="20"><edit-icon/></n-icon>
                  </template>
                </n-button>
              </template>
              <span>게시글 수정</span>
            </n-popover>
          </div>
        </div>

        <div class="row">
          <div class="col col-md-12" style="min-height: 600px;padding-top:3em;">
            <p class="lh-lg" v-html="postDetail.content.replace(/(?:\r\n|\r|\n)/g, '<br/>')"></p>
          </div>
        </div>

      </div>

    </n-tab-pane>
  </n-tabs>
</template>
<script>
import {computed, defineComponent, h, reactive, ref} from "vue";
import router from "@/routes/index.js"
import { Pencil as EditIcon,
  TrashOutline as TrashOutlineIcon, } from "@vicons/ionicons5";
import { getArchiveFileList, removeArchivePost } from "@/api/archive.js"
import {NIcon, NSpace, useMessage} from "naive-ui";
import Speaker216Filled from "@vicons/fluent/Speaker216Filled";
import Attach12Regular from "@vicons/fluent/Attach12Regular";
import {useStore} from "vuex";

export default defineComponent({
  name: 'ArchivePostList',
  components:{
    EditIcon,
    TrashOutlineIcon,
  },
  mounted() {
    this.fetchList();
  },
  setup(){
    const store = useStore();
    // 관리자 여부
    const isAdmin = computed(() => {
      return store.state.isAdmin;
    });
    // Show/Hide 목록 버튼
    const showListBtn = ref(false);
    // Show/Hide 모달
    const showDeleteModal = ref(false);

    // 게시글 리스트
    const postList = ref([]);
    // 게시글 상세
    const postDetail = ref({
      title: '',
      content: '',
      register_dt: '',
    });
    // 데이터테이블
    const tableRef = ref(null)
    const columns = reactive([
      {
        title: 'No',
        key: 'post_id',
        align: 'center',
        width: '6%',
      },
      {
        title: '',
        key: 'notice_yn',
        render(obj) {
          return obj.notice_yn=='Y'?h(
              NIcon,
              {
                color:'#3a9d91',
                component:Speaker216Filled,
              },
              {
                default: () => ''
              }
          ):'';
        },
        width: '2%',
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
        title: '작성일시',
        key: 'register_dt',
        width: '30%',
      },
        ]);

    // 첨부파일
    const allFileList = ref([]);
    const fileList = ref([]);
    const fetchList = ()=>{
      getArchiveFileList().then((response)=>{
        postList.value = response.data.postList;
        for(var i=0;i < response.data.fileList.length; i++){
          var fileInfo = response.data.fileList[i];
          var filenames = (fileInfo.file).split('/');
          allFileList.value.push({
            post_id:fileInfo.post_id,
            file:decodeURI(fileInfo.file),
            id:fileInfo.file_id,
            name:decodeURI(filenames[filenames.length-1]),
            status:"finished",
            type: "text/plain",
            url:process.env.VUE_APP_API_URL+"/api/archive/download/?file="+fileInfo.file_id,
          })
        }
      });
    }
    // 버튼 동작 (목록)
    const goToList = () => { // Go to List button
      $('div[data-name=postList]').click();
      showListBtn.value = false;
    }
    const openNew = ()=>{
      router.push('form');
    }
    // 게시글 수정
    const modify = () =>{
      router.push('form?post_id='+postDetail.value.post_id);
    }
    // 게시글 삭제
    const message = useMessage();
    const remove = () =>{
      removeArchivePost(postDetail.value)
          .then(()=>{
            message.create(
                "게시글을 삭제하였습니다.",
                { duration: 2000, type: "success" }
            );
            fetchList();
            goToList();
          })
          .catch(()=>{
            message.error(
                "게시글 삭제 중 오류가 발생하였습니다.",
                { duration: 2000, type: "error" }
            );
          });
    }
    return {
      isAdmin,
      showListBtn,
      showDeleteModal,
      postList,
      postDetail,
      allFileList,
      fileList,
      table: tableRef,
      columns,
      fetchList,
      goToList,
      rowProps: (row) => {
        return {
          style: "cursor: pointer;",
          onClick: () => {
            postDetail.value.post_id = row.post_id;
            postDetail.value.title = row.title;
            postDetail.value.content = row.content;
            postDetail.value.notice_yn = row.notice_yn;
            postDetail.value.register_dt = row.register_dt;
            showListBtn.value = true;
            fileList.value = [];
            for(var i=0;i < allFileList.value.length; i++){
              var fileInfo = allFileList.value[i];
              if(fileInfo.post_id == row.post_id){
                fileList.value.push(fileInfo);
              }
            }
            $('div[data-name=detail]').click();

          }
        };
      },
      openNew,
      modify,
      remove,
      pagination: ref({
        pageSize: 10
      }),
    }

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