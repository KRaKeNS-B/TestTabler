<template>
  <div class="place-input">
    <label for="slug">Слаг заведения</label>
    <input type="text" v-model="slug" id="slug">
    <button @click="onGetSchedules(slug)">Обновить</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PlaceInput',
  data: function () {
    return {
      slug: 'cubalibrespb'
    }
  },
  methods: {
    onGetSchedules: function (slug) {
      if (typeof (slug) === 'string' && slug !== '') {
        axios
          .get(`https://tabler.ru/api/v1/places/${slug}`)
          .then(response => {
            this.$store.commit('setSchedules', response.data.data.place.schedules)
          })
      }
    }
  }
}
</script>
