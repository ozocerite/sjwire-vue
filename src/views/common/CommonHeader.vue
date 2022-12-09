<template>
  <div id="commonHeader">
    <!-- Page Header Start -->
    <div class="container-fluid page-header py-5 mb-5">
      <div class="container py-5">
        <h6 class="display-6 text-white mb-3 animated slideInDown">{{ this.title }}</h6>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb">
            <li v-show="this.category!==''&&this.category!==null" class="breadcrumb-item"><a class="text-white" href="#">{{ this.category }}</a></li>
            <li v-show="this.menu!==''&&this.menu!==null" class="breadcrumb-item text-white active" aria-current="page">{{ this.menu }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header End -->

  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ""
    },
    menu: {
      type: String,
      default: ""
    },
  },
}
</script>

<style>
div.page-header{
  width: 100%;
  background:
  linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0) 10%,
      rgba(20, 20, 20, 0.25) 25%,
      rgba(20, 20, 20, 0.5) 50%,
      rgba(20, 20, 20, 0.65) 65%,
      rgba(20, 20, 20,1) 100%
  ),
  url('@/assets/img/AdobeStock_307623899.jpeg');
/* Center and scale the image nicely */
  background-attachment: fixed;
  background-size: cover;
}

</style>