<template>
  <div id="app">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700;900&display=swap" rel="stylesheet">

      <!-- Icon Font Stylesheet -->
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    </head>
    <body>

    <!-- Topbar Start -->
    <div class="container-fluid bg-dark p-0">
      <div class="row gx-0 d-none d-lg-flex">
        <div class="col-lg-7 px-5 text-start">
          <div class="h-100 d-inline-flex align-items-center me-4">
            <small class="fa fa-map-marker-alt text-primary me-2"></small>
            <small>주소 : 경기도 화성시 팔탄면 푸른들판로 651</small>
          </div>
          <div class="h-100 d-inline-flex align-items-center">
            <small class="far fa-clock text-primary me-2"></small>
            <small>운영시간 : AM 9 - PM 6 (월~금)</small>
          </div>
        </div>
        <div class="col-lg-5 px-5 text-end">
          <div class="h-100 d-inline-flex align-items-center me-4">
            <small class="fa fa-phone-alt text-primary me-2"></small>
            <small>고객센터 : &nbsp; 031) 352-7086 &nbsp;&nbsp;/&nbsp;&nbsp;031) 352-7431</small>
          </div>

        </div>
      </div>
    </div>
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <a href="/" class="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
        <h2 class="m-0 text-primary">SJ Wire</h2>
      </a>
      <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav ms-auto p-4 p-lg-0">
          <router-link to="/" class="nav-item nav-link" active-class="active">Home</router-link>
          <div class="nav-item dropdown">
            <router-link to="/ceo" class="nav-link dropdown-toggle" active-class="active" name="company">회사소개</router-link>
            <div class="dropdown-menu bg-light m-0">
              <router-link to="/ceo" class="dropdown-item" active-class="active" name="company">대표 인사말</router-link>
              <router-link to="/history" class="dropdown-item" active-class="active" name="company">개요/연혁</router-link>
              <router-link to="/contact" class="dropdown-item" active-class="active" name="company">오시는길</router-link>
            </div>
          </div>
          <div class="nav-item dropdown">
            <router-link to="/product" class="nav-link dropdown-toggle" active-class="active" name="product">제품</router-link>
            <div class="dropdown-menu bg-light m-0">
              <router-link to="/product" class="dropdown-item" active-class="active" name="product">제품1</router-link>
              <router-link to="/product" class="dropdown-item" active-class="active" name="product">제품2</router-link>
              <router-link to="/product" class="dropdown-item" active-class="active" name="product">제품3</router-link>
            </div>
          </div>
          <div class="nav-item dropdown">
            <router-link to="/question" class="nav-link dropdown-toggle" active-class="active" name="customer">고객지원</router-link>
            <div class="dropdown-menu bg-light m-0">
              <router-link to="/question" class="dropdown-item" active-class="active" name="customer">Q&A</router-link>
              <router-link to="/archive" class="dropdown-item" active-class="active" name="customer">자료실</router-link>
            </div>
          </div>
          <router-link to="/contact" class="nav-item nav-link" active-class="active">Contact</router-link>
        </div>
        <router-link to="/quotation" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">견적신청<i class="fa fa-arrow-right ms-3"></i></router-link>
      </div>
    </nav>
    <!-- Navbar End -->

    <div>
      <!-- Spinner Start -->
<!--      <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>-->
      <!-- Spinner End -->

      <!-- Router View -->
      <router-view></router-view>

    </div>

    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-body footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
      <div class="container py-5">
        <div class="row g-5">
          <div class="col-lg-4 col-md-6">
            <h5 class="text-white mb-4">업체정보</h5>
            <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>주소 | 경기도 화성시 팔탄면 푸른들판로 651</p>
            <p class="mb-2"><i class="fa fa-user me-3"></i>대표 | 전흥순</p>
            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>Tel | 031) 352-7086, 031) 352-7431</p>
            <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>FAX | 031) 352-7430</p>
            <p class="mb-2"><i class="fa fa-hashtag me-3"></i>사업자번호 | 0000000000</p>
            <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="text-white mb-4">제품</h5>
            <div class="row g-2">
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-1.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-2.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-3.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-4.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-5.jpg" alt="">
              </div>
              <div class="col-4">
                <img class="img-fluid rounded" src="./assets/solartec-template/img/gallery-6.jpg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="copyright">
          <div class="row">
            <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;Copyright <a href="https://sjwire.co.kr/">SEJIN NETING CORPORATION</a>, All Right Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i class="bi bi-arrow-up"></i></a>

    </body>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

</style>
