<template>
  <div class="row">
    <div class="col mt-lg-4">
      <n-input-group style="margin-bottom: 10px;">
        <n-button ghost type="primary" @click="addRow" :disabled="showSaveMoveBtn">
          <template #icon>
            <n-icon><add-icon /></n-icon>
          </template>
          추가
        </n-button>
        <n-button type="error" @click="saveMove" v-show="showSaveMoveBtn">
          <template #icon>
            <n-icon><save-icon /></n-icon>
          </template>
          순서저장
        </n-button>
        <n-button @click="cancelMove" v-show="showSaveMoveBtn">
          <template #icon>
            <n-icon><cancel-icon /></n-icon>
          </template>
          순서변경 취소
        </n-button>
      </n-input-group>
      <n-data-table
          size="large"
          :data="historyList"
          :columns="columns"
          :pagination="pagination"
          ref="table"
          style="min-width:600px;"
          ></n-data-table>
      <n-modal
          v-model:show="showDeleteModal"
          preset="dialog"
          type="error"
          title="사용자 탈퇴"
          :content="removeTarget.year+`년 `+removeTarget.month+`월 연혁 데이터를 삭제 처리 합니다`"
          positive-text="삭제"
          negative-text="취소"
          @positive-click="remove"
          @negative-click="showDeleteModal=false"
      />
      <CommonAlert ref="alert"/>
    </div>
  </div>

</template>

<script>
import { defineComponent, h, ref, reactive } from "vue";
import { NIcon, NButton, NInput, NSelect } from "naive-ui";
import { AddCircleSharp as AddIcon,
  CheckmarkSharp as SaveIcon,
  TrashOutline as RemoveIcon,
  Close as CancelIcon,
  PencilSharp as EditIcon,
  ArrowUpOutline as MoveUpIcon,
  ArrowDownOutline as MoveDownIcon,
} from '@vicons/ionicons5'
import { getHistoryList, addHistory, modifyHistory, moveHistorySeq, removeHistory, } from "@/api/history.js";
import CommonAlert from "@/views/common/CommonAlert.vue"
import router from "@/routes";

export default defineComponent({
  name: 'ManageHistoryList',
  components:{
    CommonAlert,
    AddIcon,
    SaveIcon,
    CancelIcon,
  },
  created() {
    this.fetchList();
  },
  setup(){
    // 알림창
    const alert = ref(null);

    // Show/Hide 삭제 모달
    const showDeleteModal = ref(false);
    // active 삭제 버튼
    const activeDeleteBtn = ref(true);
    // Show/Hide 순서저장 버튼
    const showSaveMoveBtn = ref(false);
    // edit 모드
    const editMode = ref(false);

    // 리스트 API
    const historyList = ref([]);
    const fetchList = () => {
      getHistoryList()
          .then(response => {
            historyList.value = response.data.list;
          })
          .catch(error =>{
            console.log(error);
            router.push({
              path: '/adminLogin',
              query: { redirect: window.location.pathname }
            });
          });
    }

    const cancelMove=()=>{
      fetchList();
      activeDeleteBtn.value=true;
      showSaveMoveBtn.value=false;
      editMode.value=false;
    }

    // 소속으로 검색
    const searchCompany = ref("");

    // 삭제 대상
    const removeTarget = ref({});

    // DataTable
    const tableRef = ref(null)
    const columns = reactive([
      {
        title: '연도',
        key: 'year',
        align:'center',
        width:'10%',
        render(obj, index){
          return obj.action=='modify'||obj.action=='add'?h(NInput, {
            onInput:(data)=>{
              historyList.value[index].year = data;
            },
            value:historyList.value[index].year,
            placeholder: '연도',
            maxlength:4,
          }):obj.year+"년"
        }
      },
      {
        title: '월',
        key: 'month',
        align:'center',
        width:'10%',
        render(obj, index){
          return obj.action=='modify'||obj.action=='add'?h(NSelect, {
            onUpdateValue:(data)=>{
              historyList.value[index].month = data;
            },
            value:historyList.value[index].month,
            options: [
              {
                label: "1월",
                value: '1',
              },
              {
                label: "2월",
                value: '2',
              },
              {
                label: "3월",
                value: '3',
              },
              {
                label: "4월",
                value: '4',
              },
              {
                label: "5월",
                value: '5',
              },
              {
                label: "6월",
                value: '6',
              },
              {
                label: "7월",
                value: '7',
              },
              {
                label: "8월",
                value: '8',
              },
              {
                label: "9월",
                value: '9',
              },
              {
                label: "10월",
                value: '10',
              },
              {
                label: "11월",
                value: '11',
              },
              {
                label: "12월",
                value: '12',
              },
              ],
            placeholder: '월',
          }):obj.month+"월"
        }
      },
      {
        title: '내용',
        key: 'content',
        width:'55%',
        render(obj, index){
          return obj.action=='modify'||obj.action=='add'?h(NInput, {
            onInput:(data)=>{
              historyList.value[index].content = data;
            },
            value:historyList.value[index].content,
            type:"textarea",
            placeholder: '상세 내용',
            autosize:{
              minRows: 1,
              maxRows: 3
              },
          }):h('div', { innerHTML: obj.content.replace(/(?:\r\n|\r|\n)/g, '</br>'),
            style: "padding:10px;",
          })
        }
      },
      {
        title: '작업',
        key: 'action',
        render(obj, index){
          return obj.action=='modify'||obj.action=='add'?[
              // 저장버튼
              h(NButton, {
                disabled:showSaveMoveBtn.value,
                onClick:()=>{
                  if(editMode.value){
                    modify(obj);
                  }else{
                    save(obj);
                  }
                }
              }, {
                default: () => h(NIcon, { size:'18px'}, {
                  default: () => h(SaveIcon)
                })
              }),
              // 취소버튼
              h(NButton, {
                style:"margin-left:10px;",
                ghost:true,
                onClick:()=>{
                  if(editMode.value){
                    editMode.value=false;
                    obj.action = null;
                  }else{
                    historyList.value.splice(index,1)
                  }
                }
              }, {
                default: () => h(NIcon, { size:'18px'}, {
                  default: () => h(CancelIcon)
                })
              }),
            ]:[
                // 이동버튼 (위)
                h(NButton, {
                  disabled:index==0?true:false,
                  onClick:()=>{
                    moveUp(index);
                    initRow();
                  }
                }, {
                  default: () => h(NIcon, { size:'18px'}, {
                    default: () => h(MoveUpIcon)
                  })
                }),
                // 이동버튼 (아래)
                h(NButton, {
                  style:"margin-left:2px;",
                  disabled:index==historyList.value.length-1?true:false,
                  onClick:()=>{
                    moveDown(index);
                    initRow();
                  }
                }, {
                  default: () => h(NIcon, { size:'18px'}, {
                    default: () => h(MoveDownIcon)
                  })
                }),
                // 수정버튼
                h(NButton, {
                  style:"margin-left:5px;",
                  type:"success",
                  ghost:true,
                  disabled:!activeDeleteBtn.value,
                  onClick:()=>{
                    if(editMode.value){
                      modify(obj);
                    }else{
                      editMode.value = true;
                      obj.action = 'modify';
                    }
                  }
                }, {
                  default: () => h(NIcon, { size:'18px'}, {
                    default: () => h(EditIcon)
                  })
                }),
                // 삭제버튼
                h(NButton, {
                  style:"margin-left:2px;",
                  type:"error",
                  ghost:true,
                  disabled:!activeDeleteBtn.value,
                  onClick:()=>{
                    removeTarget.value = obj;
                    showDeleteModal.value = true;
                  }
                }, {
                  default: () => h(NIcon, { size:'18px'}, {
                    default: () => h(RemoveIcon)
                  })
                }),
            ]
        }
      },
    ]);

    const addRow = ()=>{
      historyList.value.unshift({
        year:"",
        month:"",
        content:"",
        action:"add",
      });
    };

    const initRow=()=>{
      historyList.value = historyList.value.filter(e => e.action !== 'add')
    }

    const moveUp = (index) => {
      const up = historyList.value[index];
      const down = historyList.value[index - 1];

      historyList.value.splice(index - 1, 1, up);
      historyList.value.splice(index, 1, down);
      showSaveMoveBtn.value = true;
      activeDeleteBtn.value = false;
    }

    const moveDown = (index)=>{
      const up = historyList.value[index+1];
      const down = historyList.value[index];

      historyList.value.splice(index,1,up);
      historyList.value.splice(index+1,1,down);

      showSaveMoveBtn.value = true;
      activeDeleteBtn.value = false;
    }

    const save = (data)=>{
      delete data.action;
      addHistory(data)
          .then((response)=>{
            alert.value.createMessage(response.status, "연혁 추가");
            fetchList();
          })
    }

    const modify = (data) =>{
      delete data.action;
      modifyHistory(data)
          .then((response)=>{
            alert.value.createMessage(response.status, "연혁 수정");
            editMode.value = false;
            fetchList();
          })
    }

    const saveMove = () =>{
      moveHistorySeq(historyList.value)
          .then((response)=>{
            showSaveMoveBtn.value = false;
            activeDeleteBtn.value = true;
            alert.value.createMessage(response.status, "연혁 순서 수정");
            fetchList();
          })
    }

    const remove = () =>{
      removeHistory(removeTarget.value)
          .then((response)=>{
            alert.value.createMessage(response.status, "연혁 삭제");
            fetchList();
          })
    }

    return {
      alert,
      showDeleteModal,
      showSaveMoveBtn,
      searchCompany,
      removeTarget,
      historyList,
      columns,
      table: tableRef,
      pagination: ref({
        pageSize: 10
      }),
      fetchList,
      cancelMove,
      addRow,
      remove,
      saveMove,
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
th.n-data-table-th,td.n-data-table-td{
  padding: 10px!important;
}
i.n-base-icon.n-dialog__icon{
  margin-bottom: 7px!important;
}
</style>