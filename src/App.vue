<template>
  <!-- <img class="mx-auto" alt="itrack.work logo" src="./assets/logo.png" /> -->
  <h1 class="font-bold text-2xl text-center my-8">itrack.work</h1>
  <TaskList />
</template>

<script>
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskList
  }
}
</script>
