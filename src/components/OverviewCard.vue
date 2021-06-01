<template>
  <div id="overview-card" class="p-3 border border-light my-2" @mouseover='hoverToThrob(true)' @mouseout='hoverToThrob(false)'>
    <b-row>
      <b-col class='col-5 align-self-center justify-content-center'>
        <b-icon :icon="iconName" :scale="iconScale" :animation="iconAnimation" :variant="iconVariant"></b-icon>
      </b-col>
      <b-col class="col-7">
        <b-row class="card-text-row">
          <p id='card-title' class="my-2">{{title}}</p>
        </b-row>
        <b-row class="card-text-row">
          <p class="mb-2">{{number}}</p>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: "OverviewCard",
  props: {
    title: String,
    number: Number,
    iconName: String,
    iconScale: Number,
    iconAnimation: String,
    iconVariant: String
  },
  methods: {
    hoverToThrob(active) {
      this.$emit('hoverToThrob', active);
    }
  }
}
</script>

<style>
#overview-card {
  background-color: white;
  border-radius:.70rem!important;
}

.card-text-row {
  text-align: left;
}

#card-title {
  color: rgba(0,0,0,0.45);
}
</style>

