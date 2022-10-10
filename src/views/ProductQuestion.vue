<template>
  <div id="productQuestion">
    <!-- Page Header Start -->
    <CommonHeader :title="title" :category="category" :menu="menu"/>
    <!-- Page Header End -->

    <div class="container">
      <n-button>naive-ui</n-button>
    </div>

    </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";
import { NButton } from 'naive-ui'

export default {
  name: 'ProductQuestion',
  data: function(){
    return{
        title: '문의게시판',
        category: '고객지원',
        menu: 'Q&A'
    }
  },
  components: {
    CommonHeader,
    NButton
  }
}
</script>