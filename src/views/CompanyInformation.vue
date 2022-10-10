<template>
  <div id="companyInformation">
    <!-- Page Header Start -->
    <CommonHeader :title="title" :category="category" :menu="menu"/>
    <!-- Page Header End -->

    <!-- Company Information Start -->
    <div class="container-fluid bg-light overflow-hidden my-5 px-lg-0">
      <div class="container about px-lg-0">
        <div class="row g-0 mx-lg-0">
          <div class="col-lg-5 ps-lg-0 wow fadeIn" data-wow-delay="0.1s" style="min-height: 400px;">
            <div class="position-relative h-100">
              <img class="position-absolute img-fluid w-100 h-100" src="../assets/solartec-template/img/about.jpg" style="object-fit: cover;" alt="">
            </div>
          </div>
          <div class="col-lg-7 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
            <div class="p-lg-5 pe-lg-0">
              <p class="text-primary lead animated slideInRight"><i class="fa fa-leaf" aria-hidden="true"></i> Eco-Friendly Company</p>
              <h2 class="text-primary animated slideInRight">사람과 자연이 함께하는 세진철망입니다</h2>
              <p class="lead" style="color:#767a76;">우수한 기술력과 환경보호를 위해 부단한 노력으로 미래를 지켜나가겠습니다.
                <br><br>~ 생산품목내역 표 ~
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Company Information End -->

    <companyContact :headerShow="false"/>

  </div>
</template>

<script>
import CommonHeader from "@/views/common/CommonHeader.vue";
import CompanyContact from "@/views/CompanyContact.vue";

export default {
  name: 'CompanyInformation',
  data: function(){
    return{
        title: '회사개요',
        category: '회사소개',
        menu: '개요'
    }
  },
  components: {
    CommonHeader,
    CompanyContact
  },
}
</script>

<style>
.card {
  border: none!important;
}

/* The actual timeline (the vertical ruler) */
.main-timeline {
  position: relative;
}

/* The actual timeline (the vertical ruler) */
.main-timeline::after {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #9f9f9f;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -1px;
}

/* Container around content */
.timeline {
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.timeline::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -13px;
  background-color: #9f9f9f;
  border: 3px solid #5f676e;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  padding: 0px 40px 20px 0px;
  left: 0;
}

/* Place the container to the right */
.right {
  padding: 0px 0px 20px 40px;
  left: 50%;
}

/* Add arrows to the left container (pointing right) */
.left::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  right: 30px;
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
}

/* Add arrows to the right container (pointing left) */
.right::before {
  content: " ";
  position: absolute;
  top: 18px;
  z-index: 1;
  left: 30px;
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -12px;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  /* Place the timelime to the left */
  .main-timeline::after {
    left: 31px;
  }

  /* Full-width containers */
  .timeline {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  /* Make sure that all arrows are pointing leftwards */
  .timeline::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after,
  .right::after {
    left: 18px;
  }

  .left::before {
    right: auto;
  }

  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}
</style>