<template>
  <div id="productQuestion">
    <!-- Page Header Start -->
    <CommonHeader :header="header"/>
    <!-- Page Header End -->

    </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";

export default {
  name: 'ProductQuestion',
  data: function(){
    return{
      header:{
        title: '문의게시판',
        category: '고객지원',
        name: 'Q&A'
      }
    }
  },
  components: {
    CommonHeader
  }
}
</script>