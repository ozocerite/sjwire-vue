<template>
  <div id="productQuestion">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "@/views/common/CommonHeader.vue";

const pageInfo = {
  title: '제품 및 서비스 문의',
  category: '고객지원',
  menu: 'Q&A',
};

export default defineComponent({
  name: 'ProductQuotation',
  components: {
    CommonHeader,
  },
  setup() {
    return{
      pageInfo,
    }
  }
});

</script>

<style>
</style>