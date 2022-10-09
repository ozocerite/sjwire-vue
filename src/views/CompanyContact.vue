<template>
  <div id="companyContact">

    <!-- Page Header Start -->
    <div v-show="headerShow">
      <CommonHeader :title="title"/>
    </div>
   <!-- Page Header End -->

    <div class="text-center mx-auto mt-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px; visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;">
      <h1 class="mt-5">오시는 길</h1>
    </div>

    <!-- Contact Start -->
    <div class="container-fluid bg-light overflow-hidden px-lg-0" style="margin: 3rem 0;">
      <div class="container contact px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div class="col-lg-5 contact-text py-5 wow fadeIn" data-wow-delay="0.5s" style="padding-left: 8%;">
            <div class="p-lg-5 ps-lg-0">
<!--              주소-->
              <div class="text-center mx-auto mt-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                <div class="d-flex justify-content-center mx-auto mb-3 col-lg-12">
                  <div class="btn-sm-square bg-primary rounded-circle" style="margin-right: 10px;">
                    <i class="bi bi-geo-alt-fill text-white"></i>
                  </div>
                  <h4 class="text-primary" style="margin-top: 3px;">주소</h4>
                </div>
                <p class="mb-4 lead" >경기도 화성시 푸른들판로 651</p>
              </div>
<!--              고객센터-->
              <div class="text-center mx-auto mt-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                <div class="d-flex justify-content-center mx-auto mb-3 col-lg-12">
                  <div class="btn-sm-square bg-primary rounded-circle" style="margin-right: 10px;">
                    <i class="bi bi-telephone-fill text-white"></i>
                  </div>
                  <h4 class="text-primary" style="margin-top: 3px;">고객센터</h4>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col col-sm-5">
                      <p class="lead text-end">Tel</p>
                    </div>
                    <div class="col">
                      <p class="lead text-start">031) 352-7086</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col col-sm-5">
                    </div>
                    <div class="col">
                      <p class="lead text-start">031) 352-7431</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col col-sm-5">
                      <p class="lead text-end">FAX</p>
                    </div>
                    <div class="col">
                      <p class="lead text-start">031) 352-7430</p>
                    </div>
                  </div>
                </div>
              </div>
<!--              운영시간-->
              <div class="text-center mx-auto mt-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 600px;">
                <div class="d-flex justify-content-center mx-auto mb-3 col-lg-12">
                  <div class="btn-sm-square bg-primary rounded-circle" style="margin-right: 10px;">
                    <i class="bi bi-clock-history text-white"></i>
                  </div>
                  <h4 class="text-primary" style="margin-top: 3px;">운영시간</h4>
                </div>
                <p class="lead">월~금 &nbsp;&nbsp;8:30 ~ 18:00</p>
              </div>
            </div>
          </div>
          <div class="col-lg-7 pe-lg-0" style="min-height: 400px;">
            <div class="position-relative h-100">
              <iframe class="position-absolute w-100 h-100" style="object-fit: cover;"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.4135460577095!2d126.8931056156545!3d37.166641954685275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b14c6abb18351%3A0xe600b90888983a6e!2z7IS47KeE7LKg66ed!5e0!3m2!1sko!2skr!4v1665249411502!5m2!1sko!2skr"
                      frameborder="0" allowfullscreen="" aria-hidden="false"
                      tabindex="0"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Contact End -->
  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";

export default {
  props: {
    headerShow:{
      type: Boolean,
      default: true
    }
  },
  data: function(){
    return{
        title: 'Contact Us',
    }
  },
  name: 'CompanyContact',
  components: {
    CommonHeader
  }
}
</script>

<style>
.lead{
  color:#1A2A36;
  margin-bottom: 0.2em;
}

</style>