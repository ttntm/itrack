<template>
  <img class="w-64 mx-auto my-12" alt="itrack.work logo" src="./assets/logo.svg" />
  <p class="text-lg tracking-wide text-gray-dark text-center mb-12">A simple tracker for time spent on various tasks.</p>
  <TaskList />
</template>

<script>
import TaskList from './components/TaskList.vue';

import { onMounted } from 'vue';
import { useStore } from './store.js';

export default {
  name: 'App',
  components: {
    TaskList
  },
  setup() {
    const { readStateFromLS } = useStore();

    onMounted(() => {
      setTimeout(readStateFromLS, 50);
    })
  }
}
</script>
