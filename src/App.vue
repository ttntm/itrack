<template>
  <img class="mx-auto" alt="Vue logo" src="./assets/logo.png" />
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
