<template>
  <div id="companyInformation">
    <!-- Page Header Start -->
    <CommonHeader :title="pageInfo.title" :category="pageInfo.category" :menu="pageInfo.menu" ref="header"/>
    <!-- Page Header End -->

    <!--    Time Line Start-->
    <section style="background-color: #F0F2F5;">
      <div class="container py-5">
        <div class="main-timeline">
          <div :class="log.class" v-for="log in historyList">
            <div class="card">
              <div class="card-body p-4">
                <h4>{{ log.date }}</h4>
                <p class="mb-0" style="font-size: 1.08em;color: #6c6c6c;" v-html="log.content.replace(/(?:\r\n|\r|\n)/g, '<br/>')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--    Time Line End-->

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import CommonHeader from "@/views/common/CommonHeader";
import {getHistoryList} from "@/api/history";
import router from "@/routes";

const pageInfo = {
  title: '회사 연혁',
  category: '회사소개',
  menu: '연혁'
}

export default defineComponent({
  name: 'CompanyInformation',
  components: {
    CommonHeader,
  },
  mounted() {
    getHistoryList()
        .then(response => {
          const origin = response.data.list;
          this.historyList = [];
          for(var i=0; i<origin.length; i++){
            const history = {
              date: origin[i].year+'년 '+origin[i].month+'월',
              class: 'timeline '+(i%2==1?'right':'left'),
              content: origin[i].content,
            }
            this.historyList.push(history);
          }
        })
        .catch(error =>{
          console.log(error);
        });
  },
  setup() {
    const historyList = ref([]);
    return {
      historyList,
      pageInfo,
    };
  }
});
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
  width: 15px;
  height: 15px;
  right: -8px;
  background-color: #f0f2f5;
  border: 3px solid #5f676e;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the container to the left */
.left {
  padding: 0px 40px 20px 15%!important;
  left: 0;
}

/* Place the container to the right */
.right {
  padding: 0px 15% 20px 40px!important;
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
  left: -7px;
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