<template>
  <div class="row">
    <div class="col mt-lg-4" style="padding-top: 8px;">
      <n-data-table
          size="large"
          :data="quotationList"
          :columns="columns"
          :pagination="pagination"
          :render-expand-icon="renderExpandIcon"
          ref="table"
          style="min-width:600px;"
          ></n-data-table>
      <n-modal
          v-model:show="showDeleteModal"
          preset="dialog"
          type="error"
          title="견적 삭제"
          :content="removeTarget.name+`(`+(removeTarget.user_id?removeTarget.user_id:`비회원`)+`) 님의 견적신청을 삭제합니다`"
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
import { NIcon, NCheckbox, NButton } from "naive-ui";
import { getQuotationList, modifyQuotation, removeQuotation } from "@/api/quotation.js";
import DocumentSearch24Regular from "@vicons/fluent/DocumentSearch24Regular";
import { TrashOutline as TrashOutlineIcon, } from "@vicons/ionicons5";
import CommonAlert from "@/views/common/CommonAlert.vue"
import router from "@/routes";

export default defineComponent({
  name: 'ManageQuotation',
  components:{
    CommonAlert,
  },
  created() {
    this.fetchList();
  },
  setup(){
    // 알림창
    const alert = ref(null);

    // Show/Hide 삭제 모달
    const showDeleteModal = ref(false);

    // 견적리스트 API
    const quotationList = ref([]);
    const fetchList = () => {
      getQuotationList()
          .then(response => {
            quotationList.value = response.data.list;
          })
          .catch(error =>{
            console.log(error);
            router.push({
              path: '/adminLogin',
              query: { redirect: window.location.pathname }
            });
          });
    }

    // 삭제 대상 견적
    const removeTarget = ref({});

    // 견적리스트 DataTable
    const tableRef = ref(null)
    const columns = reactive([
      {
        title: 'No',
        key: 'qt_id',
        align: 'center',
        width: '6%',
      },
      {
        title: '내용',
        align: 'center',
        width: '6%',
        type: 'expand',
        expandable: () => true,
        renderExpand: (obj)=>{
          return h('div', { innerHTML: obj.content.replace(/(?:\r\n|\r|\n)/g, '</br>'),
                                        style: "padding:10px;",
                  });
        },
      },
      {
        title: '신청자 (ID)',
        key: 'user_id',
        render: (obj)=>{
          return obj.user_id==null||obj.user_id==""?obj.name+" (비회원)":obj.name+" ("+obj.user_id+")"
        }
      },
      {
        title: '연락처',
        key: 'contact',
      },
      {
        title: '소속(회사)',
        key: 'company',
      },
      {
        title: '요청일시',
        key: 'register_dt',
        render: function(obj){
          return new Date(obj.register_dt).toISOString().replace(/T|\.[0-9]*[a-z]*/gi,' ');
        },
      },
      {
        title: '회신',
        key: 'callback_yn',
        render(obj) {
          return h(
              NCheckbox,
              {
                size:'large',
                checked:obj.callback_yn=="Y"?true:false,
                onClick: () => {
                  if(obj.callback_yn=="Y"){
                    obj.callback_yn="N"
                  }else{
                    obj.callback_yn="Y"
                  }
                  modifyQuotation(obj);
                }
              },
              {
                default: () => obj.callback_yn=="Y"?'회신완료':'대기'
              }
          );
        },
      },
      {
        render(obj){
          return h(
              NButton,
              { type: 'error',
                ghost: true,
                style:'padding:0px 6px 0px 6px',
                onclick: ()=>{
                     showDeleteModal.value = true;
                     removeTarget.value = obj;
                },
              },
              {
                default: () => h(NIcon, { size:'18px'}, {
                  default: () => h(TrashOutlineIcon)
                })
              }
          )
        },
      },
    ]);

    const remove = () =>{
      removeQuotation(removeTarget.value)
          .then((response)=>{
            alert.value.createMessage(response.status, "견적신청 삭제");
            fetchList();
          })
    }
    return {
      alert,
      showDeleteModal,
      removeTarget,
      quotationList,
      columns,
      table: tableRef,
      pagination: ref({
        pageSize: 10
      }),
      fetchList,
      renderExpandIcon:()=>{
        return h(NIcon, {size: "18px", color:"#18a058"}, {
          default: () => h(DocumentSearch24Regular)
        });
      },
      remove,
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