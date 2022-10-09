<template>
  <div id="main">
    <!-- Carousel Start -->
    <carousel  :settings="settings" :breakpoints="breakpoints" :wrapAround="true">
      <slide v-for="slide in slideImg" :key="slide">
        <div class="owl-carousel-item position-relative" :data-dot="require(`@/assets/solartec-template/img/${slide}`)">
          <img class="img-fluid" :src="require(`@/assets/solartec-template/img/${slide}`)">
        </div>
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <!-- Carousel End -->

    <!-- Service Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
          <h1 class="text-primary">주요제품</h1>
          <h4 class="mb-4" style="color:#9e9d9b;">Best Products & Best Price</h4>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
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
    </div>
    <!-- Service End -->
  </div>
</template>

<script>
import {Carousel, Navigation, Pagination, Slide} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  data: () => ({
    slideImg:[
      'carousel-1.jpg',
      'carousel-2.jpg',
      'carousel-3.jpg'
    ],
    // carousel settings
    settings: {
      itemsToShow: 1,
      snapAlign: 'start',
      autoplay:4500,
    },
    // breakpoints are mobile first
    breakpoints: {
      700: {
        itemsToShow: 2,
        snapAlign: 'start',
      },
    },
  }),
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
}
</script>

<style>


</style>