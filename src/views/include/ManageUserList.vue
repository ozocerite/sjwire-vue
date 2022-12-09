<template>
  <div class="row">
    <div class="col mt-lg-4" style="padding-top: 8px;">
      <n-input-group style="margin-bottom: 10px;">
        <n-input
            v-model:value="searchCompany"
            placeholder="소속으로 검색"
            @keyup="handleKeyUp"
            style="max-width:200px;"
        />
        <n-button @click="search">
          <template #icon>
            <n-icon><search-icon /></n-icon>
          </template>
        </n-button>
      </n-input-group>

      <n-data-table
          :data="userList"
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
          :content="removeTarget.user_id+` 님을 탈퇴 처리 합니다`"
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
import { NIcon, NButton } from "naive-ui";
import { Search as SearchIcon } from '@vicons/ionicons5'
import { getUserList, removeUser } from "@/api/user.js";
import { TrashOutline as TrashOutlineIcon, } from "@vicons/ionicons5";
import CommonAlert from "@/views/common/CommonAlert.vue"
import router from "@/routes";

export default defineComponent({
  name: 'ManageUserList',
  components:{
    CommonAlert,
    SearchIcon,
  },
  created() {
    this.fetchList();
  },
  setup(){
    // 알림창
    const alert = ref(null);

    // Show/Hide 삭제 모달
    const showDeleteModal = ref(false);

    // 리스트 API
    const userList = ref([]);
    const fetchList = () => {
      getUserList()
          .then(response => {
            userList.value = response.data.list;
          })
          .catch(error =>{
            console.log(error);
            router.push({
              path: '/adminLogin',
              query: { redirect: window.location.pathname }
            });
          });
    }

    // 소속으로 검색
    const searchCompany = ref("");

    // 삭제 대상
    const removeTarget = ref({});

    // DataTable
    const tableRef = ref(null)
    const companyColumn = reactive({
      title: '소속',
      key: 'company',
      render: function(obj){
        return obj.type=='개인'||!obj.type?obj.type:obj.type+"/"+obj.company
      },
      filterOptionValue: null,
      filter(value, row) {
        return !!~(row.type=='개인'||!row.type?row.type:row.type+" "+row.company).indexOf(value.toString());
      },
    })
    const columns = reactive([
      {
        title: 'ID',
        key: 'user_id',
      },
      {
        title: '이름',
        key: 'name',
      },
      {
        title: '연락처',
        key: 'contact',
      },
      companyColumn,
      {
        title: '이메일',
        key: 'email',
      },
      {
        title: '가입일시',
        key: 'signup_dt',
        render: function(obj){
          return new Date(obj.signup_dt).toISOString().replace(/T|\.[0-9]*[a-z]*/gi,' ');
        },
        sorter: 'default',
        defaultSortOrder:'descend',
      },
      {
        title: '최근접속',
        key: 'last_login',
        render: function(obj){
          return new Date(obj.last_login).toISOString().replace(/T|\.[0-9]*[a-z]*/gi,' ');
        },
        sorter: 'default'
      },
      {
        render(obj){
          return obj.is_staff?null:h(
              NButton,
              { type: 'error',
                ghost: true,
                style:'padding:0px 6px 0px 6px',
                onclick: ()=>{
                  removeTarget.value = obj;
                  showDeleteModal.value = true;
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
      removeUser(removeTarget.value)
          .then((response)=>{
            alert.value.createMessage(response.status, "회원 탈퇴");
            fetchList();
          })
    }

    const search = () =>{
      companyColumn.filterOptionValue = searchCompany.value;
    }

    return {
      alert,
      showDeleteModal,
      searchCompany,
      removeTarget,
      userList,
      columns,
      table: tableRef,
      pagination: ref({
        pageSize: 10
      }),
      fetchList,
      remove,
      search,
      handleKeyUp: (data)=>{
        if(data.key.toLowerCase()=='enter'){
          search();
        }
      },
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