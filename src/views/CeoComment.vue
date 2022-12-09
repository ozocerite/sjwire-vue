<template>
  <div id="ceoComment">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->

    <!-- About Start -->
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0 container-ceo">
      <div class="container about px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div class="col-lg-6 ps-lg-0 wow fadeIn" data-wow-delay="0.1s" style="min-height: 400px;">
            <div class="position-relative h-100">
              <img class="position-absolute img-fluid w-100 h-100" src="../assets/img/realshot/outdoor1.jpg" style="object-fit: cover;" alt="">
            </div>
          </div>
          <div class="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
            <div class="p-lg-5 pe-lg-0">
              <p>저희 세진철망은 1985년 설립 이래 철망 제조업에 주력하여 왔던바 <br>
                풍부한 노하우와 기술력으로 모든 공정의 자동화 및 회사의 괄목할만한 <br>
                성장을 이루게 되었습니다.<br>
                이는 그 동안 보내주신 고객님들의 깊은 성원과 격려 그리고 끊임없이 <br>
                노력한 보람이라고 생각됩니다.<br>
                그동안 내실위주의 경영이념으로 안정속의 성장르 거듭해 온 저희 세진산업이<br>
                신사옥설립 및 건설업 등록을 하게 되었습니다.<br>
                21세기 새로운 지식과 정보, 디지털 경영방식이 요구되는 시기입니다.<br>
                따라서 저희 세진건업주식회사는 모든 임직원은 철저한 Service Mind의 함양과 <br>
                고객위주의 새로운 공법의 기술개발로 선진형 현장운영에 최선의 노력을 <br>
                다하고자 합니다.<br>
                고객으로부터 사랑받는 기업, 사회환원을 선도하는 기업, 철저한 시공능력으로<br>
                혼신의 힘을 다하는 브랜드 이미지를 이어 나갈 것 입니다.<br>
                그 동안 물심양면으로 도움을 주신 고객 여러분과 협력업체의 모든 분들에게 진심을<br>
                감사의 말씀을 드립니다.<br>
                앞으로도 세진건업은 고객과 품질을 최우선으로 실천하는 기업이 되겠습니다.<br>
                감사합니다.<br><br>
                대표 전흥순</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "@/views/common/CommonHeader";

const pageInfo = {
  title: '세진철망에 오신 것을 환영합니다',
  category: '회사소개',
  menu: '대표 인사말'
}

export default defineComponent({
  name: 'CeoComment',
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

<style>
@media only screen and (max-width: 600px) {
  .container-ceo{
    padding:0 0 0 0!important;
  }
}
</style>