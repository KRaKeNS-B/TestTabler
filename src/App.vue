<template>
  <div id="app">
    <PlaceInput/>
    <Schedules/>
  </div>
</template>

<script>
import PlaceInput from './components/PlaceInput.vue'
import Schedules from './components/Schedules.vue'

export default {
  name: 'app',
  components: {
    PlaceInput,
    Schedules
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
