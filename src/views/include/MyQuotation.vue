<template>
  <div class="row">
    <div class="col mt-lg-4" style="padding-top: 8px;">
      <n-data-table
          size="large"
          :data="quotationList"
          :columns="columns"
          :pagination="pagination"
          :row-props="rowProps"
          :render-expand-icon="renderExpandIcon"
          ref="table"
          style="min-width:600px;"
          ></n-data-table>
    </div>
  </div>

</template>

<script>
import {defineComponent, h, ref, reactive, computed} from "vue";
import {NIcon, NTag, useMessage} from "naive-ui";
import { getQuotationMyList } from "@/api/quotation.js";
import DocumentSearch24Regular from "@vicons/fluent/DocumentSearch24Regular";
import {useStore} from "vuex";
export default defineComponent({
  name: 'MyQuotation',
  components:{
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

    // 견적리스트 API
    const quotationList = ref([]);
    const fetchList = () => {
      getQuotationMyList(userInfo.value.user_id)
          .then(response => {
            quotationList.value = response.data.list;
          })
          .catch(error =>{
            console.log(error);
          });
    }

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
        key: 'content',
        width: '45%',
        ellipsis: true,
      },
      {
        title: '상세',
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
        title: '작성일시',
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
              NTag,
              {
                size:'large',
                round:true,
                type:obj.callback_yn=="Y"?'success':''
              },
              {
                default: () => obj.callback_yn=="Y"?'회신완료':'대기'
              }
          );
        },
      },
    ]);

    // 견적 상세내용
    const detailInfo = ref({
      qt_id : 0,	       // 견적 ID
      user_id : '',       //	사용자 ID
      name: '',           //	견적신청자 이름
      contact: '',        //	견적신청자 연락처
      company: '',        //	견적신청자 소속회사
      content	: '',       // 내용
      callback_yn	: 'Y',  //회신 여부
      register_dt	: '',  //등록일시
    });

    const message = useMessage();

    return {
      message,
      userInfo,
      quotationList,
      columns,
      detailInfo,
      table: tableRef,
      pagination: ref({
        pageSize: 10
      }),
      fetchList,
      rowProps: (row) => {
        return {
          style: "cursor: pointer;",
          onClick: () => {
            detailInfo.value.content = row.content;
            detailInfo.value.qt_id = row.qt_id;
            detailInfo.value.user_id = row.user_id;
            detailInfo.value.name = row.name;
            detailInfo.value.contact = row.contact;
            detailInfo.value.company = row.company;
            detailInfo.value.callback_yn = row.callback_yn;
            detailInfo.value.register_dt = row.register_dt;
          }
        };
      },
      renderExpandIcon:()=>{
        return h(NIcon, {size: "18px", color:"#18a058"}, {
          default: () => h(DocumentSearch24Regular)
        });
      }
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