<template>
  <div id="companyContact">
    <!-- Page Header Start -->
    <CommonHeader :header="header"/>
    <!-- Page Header End -->

    <!-- Contact Start -->
    <div class="container-fluid bg-light overflow-hidden px-lg-0" style="margin: 6rem 0;">
      <div class="container contact px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div class="col-lg-6 contact-text py-5 wow fadeIn" data-wow-delay="0.5s">
            <div class="p-lg-5 ps-lg-0">
              <h6 class="text-primary">주소</h6>
              <h5 class="mb-4">경기도 화성시 푸른들판로 651</h5>
              <h6 class="text-primary">주변 정류장</h6>
              <h5 class="mb-4">구장사거리앞</h5>
              <button type="button" class="btn btn-primary btn-sm">10</button>
              <button type="button" class="btn btn-primary btn-sm">10-5</button>
              <button type="button" class="btn btn-info btn-sm">340</button>
              <button type="button" class="btn btn-danger btn-sm">340-1</button>
              <button type="button" class="btn btn-danger btn-sm">340-2</button>
              <button type="button" class="btn btn-primary btn-sm">H10-4</button>
              <h5 class="mb-4">구장사거리</h5>
              <button type="button" class="btn btn-primary btn-sm">10-1</button>
              <button type="button" class="btn btn-primary btn-sm">10-5</button>
              <button type="button" class="btn btn-info btn-sm">11-1</button>
              <button type="button" class="btn btn-primary btn-sm">12</button>
              <button type="button" class="btn btn-primary btn-sm">12-1</button>
              <button type="button" class="btn btn-primary btn-sm">13-2</button>
              <button type="button" class="btn btn-primary btn-sm">13-4</button>
              <button type="button" class="btn btn-primary btn-sm">13-4A</button>
              <button type="button" class="btn btn-info btn-sm">H120A</button>
              <h5 class="mb-4">구장삼거리</h5>
              <button type="button" class="btn btn-primary btn-sm">10</button>
              <button type="button" class="btn btn-primary btn-sm">10-1</button>
              <button type="button" class="btn btn-primary btn-sm">10-2</button>
              <button type="button" class="btn btn-primary btn-sm">10-5</button>
              <button type="button" class="btn btn-info btn-sm">11-1</button>
              <button type="button" class="btn btn-primary btn-sm">12</button>
              <button type="button" class="btn btn-primary btn-sm">12-1</button>
              <button type="button" class="btn btn-primary btn-sm">13-2</button>
              <button type="button" class="btn btn-primary btn-sm">13-4</button>
              <button type="button" class="btn btn-primary btn-sm">13-4A</button>
              <button type="button" class="btn btn-info btn-sm">21</button>
              <button type="button" class="btn btn-info btn-sm">340</button>
              <button type="button" class="btn btn-danger btn-sm">340-1</button>
              <button type="button" class="btn btn-danger btn-sm">340-2</button>
              <button type="button" class="btn btn-info btn-sm">H120A</button>
            </div>
          </div>
          <div class="col-lg-6 pe-lg-0" style="min-height: 400px;">
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
import CommonHeader from "@/views/common/CommonHeader";

export default {
  name: 'CompanyContact',
  data: function(){
    return{
      header:{
        title: '회사 위치',
        category: '회사소개',
        name: '오시는 길'
      }
    }
  },
  components: {
    CommonHeader
  }
}
</script>