<template>
  <div id="companyArchive">
    <!-- Page Header Start -->
    <CommonHeader :title="title" :category="category" :menu="menu"/>
    <!-- Page Header End -->

  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";

export default {
  name: 'CompanyArchive',
  data: function(){
    return{
      title: '자료실',
      category: '고객지원',
      menu: '자료실'
    }
  },
  components: {
    CommonHeader
  }
}
</script>