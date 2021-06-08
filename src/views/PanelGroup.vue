<template>
  <b-container class="my-5">
    <b-row>
      <b-col lg=3 xl=3 md=4 sm=6 xm=6 @click="showPieChart">
        <OverviewCard :title= "message[0]" :number= "number[0]" :iconName= "iconLabel[0]" :iconScale= "iconScale[0]" iconVariant="warning" @hoverToThrob='hoverToThrob' />
      </b-col>
      <b-col lg=3 xl=3 md=4 sm=6 xm=6>
        <OverviewCard :title= "message[1]" :number= "number[1]" :iconName= "iconLabel[1]" :iconScale= "iconScale[1]" iconVariant="info" @hoverToThrob='hoverToThrob1' />
      </b-col>
      <b-col lg=3 xl=3 md=4 sm=6 xm=6 @click="showBarChart">
        <OverviewCard :title= "message[2]" :number= "number[2]" :iconName= "iconLabel[2]" :iconScale= "iconScale[2]" iconVariant="success" @hoverToThrob='hoverToThrob2'/>
      </b-col>
      <b-col lg=3 xl=3 md=4 sm=6 xm=6>
        <OverviewCard :title= "message[3]" :number= "number[3]" :iconName= "iconLabel[3]" :iconScale= "iconScale[3]" iconVariant="primary" @hoverToThrob='hoverToThrob3' />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import OverviewCard from "../components/OverviewCard.vue"
import store from "../store/index"
export default {
  components: {
    OverviewCard
  },
  data() {
    return {
      message: ["Total Posts", "Messages", "Total Customers", "Booked Service"],
      number: [250, 45, 13500, 3],
      iconScale: [3,3,3,3],
      iconLabel: ["file-post", "chat-text", "person-circle", "calendar2-check"]
    }
  },
  methods: {
    hoverToThrob(mouseStatus) {
      this.iconScale = mouseStatus ? [5,3,3,3] : [3,3,3,3]
    },
    hoverToThrob1(mouseStatus) {
      this.iconScale = mouseStatus ? [3,5,3,3] : [3,3,3,3]
    },
    hoverToThrob2(mouseStatus) {
      this.iconScale = mouseStatus ? [3,3,5,3] : [3,3,3,3]
    },
    hoverToThrob3(mouseStatus) {
      this.iconScale = mouseStatus ? [3,3,3,5] : [3,3,3,3]
    },
    showBarChart() {
      store.commit('switchFigure', 'BarChart');
    },
    showPieChart() {
      store.commit('switchFigure', 'PieChart');
    }
  }
}
</script>
