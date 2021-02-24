<template>
  <img class="w-64 mx-auto my-8 md:my-12" alt="aitrack.work logo" :src="logoSrc" />
  <BtnSwitchTheme />
  <p class="text-lg tracking-wide text-gray-dark text-center mt-8 mb-12 md:my-12">A simple task-based time tracker for everyday use.</p>
  <TaskList />
</template>

<script>
import BtnSwitchTheme from './components/button/BtnSwitchTheme.vue';
import TaskList from './components/TaskList.vue';

import { computed, onMounted } from 'vue';
import { useStore } from './store.js';
import { applyTheme } from './utils.js';

export default {
  name: 'App',
  components: {
    BtnSwitchTheme,
    TaskList
  },
  setup() {
    const { appTheme, deactivateAll, readStateFromLS } = useStore();

    const logoSrc = computed(() => {
      return appTheme.value !== 'dark' ? '/img/logo-light.svg' : '/img/logo-dark.svg';
    });

    onMounted(() => {
      const app = document.getElementById('app');
      app.style.opacity = '1';
      app.style.transition = 'opacity 1.5s ease';
      setTimeout(readStateFromLS(['appTheme', 'tasklist']), 50);
      setTimeout(deactivateAll(), 100); // just in case someone has saved the task list with a running task
      setTimeout(applyTheme(appTheme.value), 150);
    })

    return {
      appTheme,
      logoSrc
    }
  }
}
</script>