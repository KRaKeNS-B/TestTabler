<template>
  <div
    class="schedule-card"
    :class="{'schedule-card__main' : schedule.isMain}"
  >
    <div class="schedule-card__title">
      {{schedule.isMain ? workHours : schedule.name}}
    </div>
    <div class="schedule-card__state">
      {{isActive()}}
    </div>
    <div
      v-for="item in uniqueSchedules"
      v-bind:key="item.time"
    >
      {{item.day + ' ' + item.time}}
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
      },
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }
  },
  computed: {
    uniqueSchedules () {
      let schedules = {}
      let weekend = '1234567'

      for (let item of this.schedule.items) {
        let itemSchedule = `${item.startAt} - ${item.endAt}`

        if (itemSchedule === '00:00 - 23:59') {
          itemSchedule = 'круглосуточно'
        }

        if (schedules[itemSchedule] === undefined) {
          schedules[itemSchedule] = '' + item.dayOfWeek
        } else {
          schedules[itemSchedule] += item.dayOfWeek
        }
        weekend = weekend.replace(item.dayOfWeek, '')
      }

      let result = []
      for (let key in schedules) {
        result.push({
          day: this.getDays(schedules[key].split('').sort()),
          time: key
        })
      }

      if (weekend !== '') {
        result.push({
          day: this.getDays(weekend.split('')),
          time: 'выходной'
        })
      }

      return result
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
      day = day === 0 ? 7 : day
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
    },
    getDays (days) {
      if (days.length > 2 && days[days.length - 1] - days[0] === days.length - 1) {
        return this.weekdays[days[0] - 1] + ' - ' + this.weekdays[days[days.length - 1] - 1]
      }
      return days.map(el => {
        return this.weekdays[el-1]
      }).join(',')
    }
  }
}
</script>
