<template>
  <div id="companyInformation">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->

    <!-- Company Information Start -->
    <div class="container">
      <div class="row">
        <div class="col mt-lg-4 wow fadeInUp">
          <div style="text-align: center;">
            <p class="text-primary lead"><i class="fa fa-leaf" aria-hidden="true"></i> Eco-Friendly Company</p>
            <h2 class="text-primary">사람과 자연이 함께하는 세진철망입니다</h2>
            <p class="lead" style="color:#767a76;">우수한 기술력과 환경보호를 위해 부단한 노력으로 미래를 지켜나가겠습니다. </p>
            <div class="col mt-lg-5">
              <img src="../assets/img/goal.png" alt="">
            </div>
          </div>
          <div class="m-5">
            <n-table size="large">
              <tbody>
              <tr>
                <th>상호명</th>
                <td>세진건업주식회사 (세진철망)</td>
                <th>대표이사</th>
                <td>전 흥 순</td>
              </tr>
              <tr>
                <th>본점소재지</th>
                <td>경기도 화성시 팔탄면 구장리 113-15 (세진건업) <br> 경기도 화성시 팔탄면 구장리 113-10 (세진철망)</td>
                <th>연락처</th>
                <td>TEL : 031) 352-7086 <br> FAX : 031) 352-7431</td>
              </tr>
              <tr>
                <th>설립일</th>
                <td>1985년 07월</td>
                <th>주요사업</th>
                <td>1) 금속구조물 및 창호공사업<br>
                  - 낙석보호망, 낙석방지책, 녹생토, 각종 휀스 등<br>
                  2) 체인링크철망, 낙석보호망, 녹생토망, 돌망태, 개비온, 와이어메쉬, 메쉬휀스, 각종휀스 생산</td>
              </tr>
              <tr>
                <th>업체성격</th>
                <td>주식회사</td>
                <th>불입자본금</th>
                <td>225,000,000원</td>
              </tr>
              </tbody>
            </n-table>
          </div>
        </div>
      </div>
    </div>

    <!-- Company Information End -->

    <!-- Carousel Start -->
    <div class="row carousel-company">
      <carousel :settings="settings" :breakpoints="breakpoints" :wrapAround="true">
        <slide v-for="slide in slideImg" :key="slide">
          <div class="carousel-inside">
            <img class="carousel-img" :src="require(`@/assets/img/realshot/${slide}`)">
          </div>
        </slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
    </div>
    <!-- Carousel End -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CommonHeader from "@/views/common/CommonHeader";
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import { WOW } from 'wowjs';

const pageInfo = {
  title: '회사개요',
  category: '회사소개',
  menu: '개요'
}

const slideImg = [
    'KakaoTalk_20221117_205815412.jpg',
    'KakaoTalk_20221117_205815412_01.jpg',
    'KakaoTalk_20221117_205815412_02.jpg',
    'KakaoTalk_20221117_205815412_03.jpg',
    'KakaoTalk_20221117_205815412_04.jpg',
    'KakaoTalk_20221117_205815412_05.jpg',
    'KakaoTalk_20221117_205815412_06.jpg',
]

const settings = {
  itemsToShow: 2,
  snapAlign: 'start',
  autoplay:10000,
}
// breakpoints are mobile first
const breakpoints = {
  700: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
}

export default defineComponent({
  name: 'CompanyInformation',
  components: {
    CommonHeader,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  mounted() {
    new WOW().init();
  },
  setup() {
    return {
      pageInfo,
      slideImg,
      settings,
      breakpoints,
    };
  }
});
</script>

<style>
@media only screen and (max-width: 900px) {

}
.carousel-img{
  height: 600px;
}
</style>