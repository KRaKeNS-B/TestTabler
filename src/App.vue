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
  margin: 40px;
  color: rgba(0, 0, 0, 0.89);
  font-size: 14px;
  line-height: 17px;
}
html, body{
  padding: 0;
  margin: 0;
}
* {
    font-family: 'Rubik', sans-serif;
}
* input{
  font-size: 14px;
  line-height: 17px;
}
</style>
