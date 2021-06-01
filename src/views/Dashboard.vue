<template>
  <div>
    <p>this is the dashboard</p>
    <component :is="currentRole" />
  </div>
</template>

<script>
import adminDashboard from './Admin'
import opsDashboard from './Ops'
export default {
  components: {adminDashboard, opsDashboard},
  data() {
    return {
      currentRole: 'adminDashboard',
      roles: 'adminDashboard'
    }
  },
  created() {
    if(this.roles == 'adminDashboard') {
      this.currentRole  = "adminDashboard"
    } else {
      this.currentRole  = "opsDashboard"
    }
  }

}
</script>