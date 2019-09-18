<template>
  <div class="schedules" v-if='schedules.length > 0'>
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

<style>
.schedules {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 40px;
  width: 610px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.67);
}
</style>
