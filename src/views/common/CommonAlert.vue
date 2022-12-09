<template>
  <div id="commonAlert"></div>
</template>
<script>
import { defineComponent } from "vue";
import { useMessage } from "naive-ui";

export default defineComponent({
  name: 'CommonAlert',
  setup(){
    const message = useMessage();
    const createMessage =(status, msg)=>{
      if(status==200) {
        message.create(
            msg + " 완료하였습니다.",
            {duration: 2000, type: "success"}
        );
      }else if(status==404){
          window.location.reload();
      }else{
        message.error(
            status?status:msg+": 오류가 발생하였습니다.",
            { duration: 2000, type: "error" }
        );
      }
    }
    return {
      createMessage,
      message,
    }
  }
});
</script>