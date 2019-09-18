<template>
  <div class="place-input">
    <div class="place-input__title">
      <label for="slug">Слаг заведения</label>
    </div>
    <div>
      <input
        class="place-input__input"
        type="text"
        v-model="slug"
        id="slug"
      >
    </div>
    <div>
      <button
        class="place-input__button"
        @click="onGetSchedules(slug)"
      >Обновить</button>
    </div>
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

<style>
.place-input__input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 3px;
  width: 300px;
  height: 30px;
  padding-left: 10px;
}
.place-input__title {
  margin-bottom: 5px;
}
.place-input__button {
  background: #EE514A;
  border-radius: 3px;
  border: none;
  width: 260px;
  height: 50px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 20px;
}
</style>
