<template>
  <div class="schedules">
    <Schedule
      v-for="schedule in schedules"
      v-bind:key="schedule.id"
      v-bind:schedule="schedule"
    />
  </div>
</template>

<script>
import Schedule from './Schedule.vue'

export default {
  name: 'Schedules',
  components: {
    Schedule
  },
  computed: {
    schedules () {
      return this.$store.state.schedules
    }
  }
}
</script>
