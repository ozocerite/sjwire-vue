<template>
  <div id="productInfo">
    <!-- Page Header Start -->
    <CommonHeader :title="title" :category="category" :menu="menu"/>
    <!-- Page Header End -->
    <div class="container-fluid">
      <div class="row row-cols-auto">
        <div class="col">
          <SidebarMenu class="animated slideInLeft" :menu="productList" :theme="'white-theme'" :relative="true" :hideToggle="true"/>
        </div>
        <div class="col-9 m-lg-4">
          <h4 class="mb-4" style="color:#9e9d9b;">~ 관련 내용 ~</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

export default {
  name: 'ProductInfo',
  data: function(){
    return{
      title: '제품 소개',
      category: '제품 분류명',
      menu: '제품 상세명',
      productList: [
        {
          header: '',
          hiddenOnCollapse: true,
        },
        {
          href: '/product?id=1',
          title: '제품분류1',
          child: [
            {
              href: '/product?id=1',
              title: '제품1',
            },
            {
              href: '/product?id=2',
              title: '제품2',
            }
          ]
        },
        {
          href: '/product?id=3',
          title: '제품분류2',
          child: [
            {
              href: '/product?id=3',
              title: '제품3',
            },
            {
              href: '/product?id=4',
              title: '제품4',
            }
          ]
        },
      ]
    }
  },
  components: {
    CommonHeader,
    SidebarMenu,
  }
}
</script>

<style>
.container-fluid{
  padding-left: 15%!important;
}

.v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--link_level-1.vsm--link_open{
  background-color: #ffffff;
  color: #262626;
}

.v-sidebar-menu.vsm_white-theme .vsm--dropdown {
  background-color: #FFFFFF;
  margin-left: 6%;
}

.v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active{
  box-shadow: inset 3px 0 0 0 #32C36C;
}

.vsm--link.vsm--link_level-2.vsm--link_active>.vsm--title>span{
  color: #656565;
  font-weight: 450;
}

</style>