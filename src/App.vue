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
    const { activeTasks, appTheme, deactivateAll, readStateFromLS } = useStore();

    const logoSrc = computed(() => {
      return appTheme.value !== 'dark' ? '/img/logo-light.svg' : '/img/logo-dark.svg';
    });

    const onAppClose = (e) => {
      if (activeTasks.value && activeTasks.value.length !== 0) {
        console.log(activeTasks.value)
        e.preventDefault(); // FF
        e.returnValue = ''; // Chrome
      } else {
        delete e['returnValue'];
      }
    }

    onMounted(() => {
      const appNode = document.getElementById('app');
      appNode.style.opacity = '1';
      appNode.style.transition = 'opacity 1.5s ease';

      setTimeout(readStateFromLS(['appTheme', 'tasklist']), 50);
      setTimeout(deactivateAll(), 100); // just in case someone has saved the task list with a running task
      setTimeout(applyTheme(appTheme.value), 150);

      window.addEventListener('beforeunload', onAppClose);
    })

    return {
      appTheme,
      logoSrc
    }
  }
}
</script>

<template>
  <img class="w-64 mx-auto my-8 md:my-12" alt="aitrack.work logo" :src="logoSrc" />
  <BtnSwitchTheme />
  <p class="text-lg tracking-wide text-gray-dark text-center mt-8 mb-12 md:my-12">A simple task-based time tracker for everyday use.</p>
  <TaskList />
</template>