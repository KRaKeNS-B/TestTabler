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
  props: {
    msg: String
  },
  data: function () {
    return {
      slug: ''
    }
  },
  methods: {
    onGetSchedules: function (slug) {
      if (typeof (slug) === 'string' && slug !== '') {
        alert(slug)
      }
    }
  }
}
</script>
