<template>
  <div id="commonHeader">
    <!-- Page Header Start -->
    <div class="container-fluid page-header py-5 mb-5">
      <div class="container py-5">
        <h1 class="display-3 text-white mb-3 animated slideInDown">{{ this.title }}</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a class="text-white" href="#">{{ this.category }}</a></li>
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
  components: {
  },
}
</script>