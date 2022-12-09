<template>
  <div id="companyArchive">
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
import CommonHeader from "@/views/common/CommonHeader";

const pageInfo = {
  title: '자료실',
  category: '고객지원',
  menu: '자료실'
}

export default defineComponent({
  name: 'CompanyArchive',
  components: {
    CommonHeader,
  },
  setup() {
    return {
      pageInfo,
    };
  }
});

</script>