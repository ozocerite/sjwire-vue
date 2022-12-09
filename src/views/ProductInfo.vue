<template>
  <div id="productInfo">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->
    <div class="container-xxl">
      <n-tabs :default-value="cat_id" justify-content="space-evenly" type="line" size="large" @update:value="changeTab">
        <n-tab-pane :name="product.label" :tab="product.key" v-for="product in productList">
          <div class="row">
            <div class="col">
              <n-menu
                  :default-expand-all="true"
                  :options="product.children"
                  :value="prd_id"
                  @update:value="changeMenu"
                  @loadstart="changeMenu"
              />
            </div>
            <div class="col col-sm-10">
              <div class="col-12 prd-image">
                <img class="ms-4" :src="image" alt=""/>
              </div>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, h } from "vue";
import router from "@/routes/index.js";
import { NIcon } from "naive-ui";
import {
  Remove as ProductIcon,
} from "@vicons/ionicons5";
import CommonHeader from "@/views/common/CommonHeader.vue";

function renderIcon(icon) {
  return () => h(NIcon, { size:"17px", }, { default: () => h(icon) });
}

export default defineComponent({
  name: 'productInfo',
  components: {
    CommonHeader,
  },
  props:{
    cat_id: String,
    prd_id: String,
  },
  computed:{
    image(){
      return require(`@/assets/img/product/${this.prd_id}.png`);
    },
  },
  setup(prop) {
    const pageInfo = ref({
      title: '제품 소개',
      category: '',
      menu: '',
    });

    // 제품 메뉴트리 ( # 서버에서 불러오기로 추후 수정 )
    const productList = [
      {
        label: "휀스",
        key: "휀스",
        level: 1,
        children: [
          {
            parent : "휀스",
            label : "메쉬휀스",
            key : "메쉬휀스",
            level : 2,
            icon: renderIcon(ProductIcon),
          },
          {
            parent : "휀스",
            label : "경계용휀스",
            key : "2",
            level : 2,
            icon: renderIcon(ProductIcon),
          }
        ]
      },
      {
        label: "축사망",
        key: "축사망",
        level: 1,
        children: [
          {
            parent : "축사망",
            label: "견사망",
            key : "3",
            level : 2,
            icon: renderIcon(ProductIcon),
          },
        ]
      },
      {
        label: "낙석방지책",
        key: "낙석방지책",
        level: 1,
        children: [
          {
            parent : "낙석방지책",
            label : "낙석방지책",
            key : "4",
            level : 2,
            icon: renderIcon(ProductIcon),
          },
        ]
      },
    ];
    return {
      pageInfo,
      prd_id: prop.prd_id,
      cat_id: prop.cat_id,
      productList,
      changeMenu(key, item) {
        router.push("/product/"+item.parent+"/"+key);
      },
      changeTab(key){
        var cat_id = Array.from(productList).find(e => e.key === key);
        router.push("/product/"+key+"/"+cat_id.children[0].key);
      }
    };
  }
});

</script>

<style>
.container-fluid{
  padding-left: 15%!important;
}
.prd-image{
  overflow-x: auto;
}
</style>