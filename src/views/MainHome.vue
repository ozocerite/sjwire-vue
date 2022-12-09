<template>
  <div id="mainHome" style="background-color: #fbfcfa;">
    <!--    Main Page Text    -->
    <div class="carousel-text animated fadeInLeft">
      <h3>Since 1985</h3>
      <h1>세진철망 {{ (new Date()).getFullYear()-1985 }}년의 기술력,<br>사람과 자연이 함께합니다.</h1>
      <div class="col-12 mt-lg-5">
        <n-button class="btn-custom" type="success" round>제품 둘러보기</n-button>
      </div>
    </div>
    <!--    Main Page Text    -->
    <!-- Carousel Start -->
    <carousel :settings="settings" :breakpoints="breakpoints" :wrapAround="true">
      <slide v-for="slide in slideImg" :key="slide">
        <div class="carousel-inside">
          <img class="carousel-img" :src="require(`@/assets/img/carousel/${slide}`)">
        </div>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <!-- Carousel End -->
    <div class="container-xxl" style="padding-top: 5em;">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-1.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-solar-panel fa-3x"></i>
                </div>
                <h4 class="mb-3">Solar Panels</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-2.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-wind fa-3x"></i>
                </div>
                <h4 class="mb-3">Wind Turbines</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-3.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-lightbulb fa-3x"></i>
                </div>
                <h4 class="mb-3">Hydropower Plants</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-4.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-solar-panel fa-3x"></i>
                </div>
                <h4 class="mb-3">Solar Panels</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-5.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-wind fa-3x"></i>
                </div>
                <h4 class="mb-3">Wind Turbines</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
            <div class="service-item rounded overflow-hidden">
              <img class="img-fluid" src="../assets/solartec-template/img/img-600x400-6.jpg" alt="">
              <div class="position-relative p-4 pt-0">
                <div class="service-icon">
                  <i class="fa fa-lightbulb fa-3x"></i>
                </div>
                <h4 class="mb-3">Hydropower Plants</h4>
                <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p>
                <a class="small fw-medium" href="">Read More<i class="fa fa-arrow-right ms-2"></i></a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- Service End -->
    <CompanyContact :headerShow="false"></CompanyContact>
    <ProductQuotation :headerShow="false"></ProductQuotation>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CompanyContact from '@/views/CompanyContact.vue';
import ProductQuotation from "@/views/ProductQuotation.vue";
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import { WOW } from 'wowjs';

const pageInfo = {
  title: '회사 연혁',
  category: '회사소개',
  menu: '연혁'
}
const slideImg = [
  'slide1.jpg',
  'slide2.jpg',
  'slide3.jpg',
  'slide4.jpg',
  'slide5.jpg',
]

const settings = {
  itemsToShow: 1,
  snapAlign: 'start',
  autoplay:5000,
}
// breakpoints are mobile first
const breakpoints = {
  700: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
}

export default defineComponent({
  name: 'MainHome',
  mounted() {
    new WOW().init();
  },
  components: {
    ProductQuotation,
    CompanyContact,
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
@media only screen and (max-width: 600px) {
  div.carousel-inside{
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  div.carousel-text{
    position: absolute;
    z-index: 9999;
  }
  .carousel-text{
    display: none;
  }
}

.carousel-inside{
  height: 600px;
  overflow: hidden;
}
.carousel-text{
  top:300px;
  left:15%;
  position: absolute;
  z-index: 9999;
}
.carousel-img{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
.carousel-text>h1,.carousel-text>h3{
  color: #FFFFFF;
}
.n-button--success-type:hover{
  --n-color-hover: #0e5240!important;
  --n-border-hover:1px solid #0e5240!important;
}
.btn-primary:hover{
  border:1px solid #0e5240!important;
}
</style>