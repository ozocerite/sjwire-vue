<template>
  <div id="userInformationForm">
    <n-form label-placement="left"
            require-mark-placement="right-hanging"
            label-width="auto"
            size="large"
            :style="{
                    maxWidth: '450px'
                  }">
      <n-form-item :span="6" label="이름 *">
          <n-input type="text"
                   placeholder=""
                   :status="statusName"
                   v-model:value="savedUserInfo.name"
                   clearable/>
      </n-form-item>
      <n-form-item :span="9" label="연락처 *">
        <n-input type="text"
                 maxlength="13"
                 placeholder="-를 제외하고 입력해주세요."
                 :status="statusContact"
                 @input="contactHandleInput"
                 v-model:value="savedUserInfo.contact"
                 clearable/>
      </n-form-item>
      <n-form-item :span="9" label="이메일">
        <n-input type="text"
                 placeholder=""
                 v-model:value="savedUserInfo.email"
                 clearable/>
      </n-form-item>
      <n-form-item :span="6" label="사용자 유형 *">
        <n-select placeholder=""
                  :options="typeOptions"
                  default-value="개인"
                  @update-value="typeChangeHandle"
                  v-model:value="savedUserInfo.type"
        >
        </n-select>
      </n-form-item>
      <n-form-item :span="9" label="회사명 *">
        <n-input type="text"
                 placeholder="회사, 관공서 소속일 경우 입력해주세요."
                 :status="statusCompany"
                 :disabled="disabledCompanyInput"
                 v-model:value="savedUserInfo.company"
                 clearable/>
      </n-form-item>
    </n-form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { getMask } from "@/assets/js/util.js"

export default defineComponent({
  props:{
    readyInfo: JSON,
  },
  mounted() {
    this.savedUserInfo = this.readyInfo;
    if(this.savedUserInfo.type == ""){
      this.savedUserInfo.type = "개인";
    }else{
      this.typeChangeHandle(this.savedUserInfo.type)
    }
  },
  setup(){
    // 저장데이터셋
    const savedUserInfo = ref({
      user_id:'',
      name:'',
      contact:'',
      email:'',
      type:'개인',
      company:'',
    });
    // Input status
    const statusName     = ref("success");
    const statusContact  = ref("success");
    const statusCompany  = ref("success");
    const tempCompany = ref("");
    // 사용자 유형 Select Option 리스트
    const typeOptions = [
      {
        label:'개인',
        value:'개인'
      },
      {
        label:'회사',
        value:'회사'
      },
      {
        label:'관공서',
        value:'관공서'
      },
      {
        label:'기타',
        value:'기타'
      },
    ];
    // 회사 Input Disabled 여부
    const disabledCompanyInput = ref(true);
    // 사용자유형 Change 이벤트
    const typeChangeHandle = (data) =>{
      savedUserInfo.value.type = data;
      if(data === '회사' || data === '관공서'){
        disabledCompanyInput.value = false;
        if(tempCompany.value != "") savedUserInfo.value.company = tempCompany.value;
      }else{
        disabledCompanyInput.value = true;
        tempCompany.value = savedUserInfo.value.company;
        savedUserInfo.value.company = "";
      }
    }

    // validation check
    const validation = () =>{
      statusName.value = "success";
      statusContact.value = "success";
      statusCompany.value = "success";

      if(!savedUserInfo.value.name || savedUserInfo.value.name == ''){
        statusName.value = "error";
        return false;
      }else if(!savedUserInfo.value.contact || savedUserInfo.value.contact == ''){
        statusContact.value = "error";
        return false;
      }else if((savedUserInfo.value.type == '회사'||savedUserInfo.value.type == '관공서') && (!savedUserInfo.value.company || savedUserInfo.value.company == '')){
        statusCompany.value = "error";
        return false;
      }else{
        return true;
      }
    }

    return{
      savedUserInfo,
      statusName,
      statusContact,
      statusCompany,
      typeOptions,
      disabledCompanyInput,
      contactHandleInput(data){
        // 연락처 자동 하이픈 입력
        savedUserInfo.value.contact = getMask(data);
      },
      typeChangeHandle,
      validation,
    }
  }
});

</script>