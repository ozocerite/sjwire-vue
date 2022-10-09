<template>
  <div id="productInfo">
    <!-- Page Header Start -->
    <CommonHeader :title="title" :category="category" :menu="menu"/>
    <!-- Page Header End -->

  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";

export default {
  name: 'ProductInfo',
  data: function(){
    return{
      title: '제품',
      category: '제품 분류명',
      menu: '제품 상세명'
    }
  },
  components: {
    CommonHeader
  }
}
</script>