<template>
  <div
    class="schedule-card"
  >
    <div
      class="schedule-card__row"
      :class="{'schedule-card__main' : schedule.isMain}"
    >
      <div
        class="schedule-card__title"
      >
        {{schedule.isMain ? workHours : schedule.name}}
      </div>
      <div
        class="schedule-card__state"
        :class="{'schedule-card__open' : isActive() === 'открыто'}"
      >
        {{isActive()}}
      </div>
    </div>
    <div
      class="schedule-card__row"
      v-for="item in uniqueSchedules"
      v-bind:key="item.time"
    >
      <div
        class="schedule-card__day"
      >
        {{item.day}}
      </div>
      <div
        class="schedule-card__time"
      >
        {{item.time}}
      </div>
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
        return this.weekdays[el - 1]
      }).join(', ')
    }
  }
}
</script>

<style>
.schedule-card {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 5px;
}
.schedule-card:first-child{
  border-top: none;
  margin-top: 0px;
}
.schedule-card__row {
  display: grid;
  grid-template-areas:
  "title state";
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 5px;
}
.schedule-card__row:first-child{
  margin-top: 10px;
}
.schedule-card__title {
  color: rgba(0, 0, 0, 0.89);
}
.schedule-card__title,
.schedule-card__day {
  grid-area: title;
}
.schedule-card__main {
  grid-template-columns: auto 1fr;
  margin-bottom: 14px;
  font-size: 18px;
  line-height: 21px;
}
.schedule-card__main.schedule-card__row {
  margin-top: 0px;
}
.schedule-card__state,
.schedule-card__time {
  grid-area: state;
  text-align: right;
}
.schedule-card__state::before {
	content: "";
	display: inline-block;
	border-radius: 50%;
	width: 10px;
	height: 10px;
	margin: auto;
  background-color: #737373;
}
.schedule-card__open.schedule-card__state::before {
  background-color: #EE514A;
}
.schedule-card__main .schedule-card__state::before{
  display: none;
}
.schedule-card__main .schedule-card__state {
  text-align: left;
}
.schedule-card__open {
  color: #EE514A;
}
</style>
