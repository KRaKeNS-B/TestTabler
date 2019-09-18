<template>
  <div
    class="schedule-card"
    :class="{'schedule-card__main' : schedule.isMain}"
  >
    {{schedule}}
    <div class="schedule-card__title">
      {{schedule.isMain ? workHours : schedule.name}}
    </div>
    <div class="schedule-card__state">
      {{new Date().getDay()}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  props: ['schedule'],
  data () {
    return {
      workHours: 'Часы работы' // TODO add the more info wrapper
    }
  }
}
</script>
