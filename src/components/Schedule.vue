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
      {{isActive()}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  props: ['schedule'],
  data () {
    return {
      workHours: 'Часы работы',
      placeState: {
        open: 'открыто',
        closed: 'закрыто'
      }
    }
  },
  methods: {
    isActive () {
      let now = Date.now()
      let item = this.getCurrentDay(new Date().getDay())

      if (item !== false) {
        if (this.getFullDateTime(item.startAt) <= now && this.getFullDateTime(item.endAt) >= now) {
          return this.placeState.open
        }
      }

      return this.placeState.closed
    },
    getCurrentDay (day) {
      day = day === 0 ? 6 : day - 1
      for (let item of this.schedule.items) {
        if (item.dayOfWeek === day) {
          console.log(day)
          return item
        }
      }
      // Date.parse(new Date().toDateString() + ' ' + '22:00')
      return false
    },
    getFullDateTime (time) {
      return Date.parse(new Date().toDateString() + ' ' + time)
    }
  }
}
</script>
