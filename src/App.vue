<template>
  <img class="w-64 mx-auto my-8 md:my-12" alt="aitrack.work logo" :src="logoSrc" />
  <BtnSwitchTheme />
  <p class="text-lg tracking-wide text-gray-dark text-center my-8 md:my-12">A simple tracker for time spent on various tasks.</p>
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
    const { appTheme, readStateFromLS } = useStore();

    const logoSrc = computed(() => {
      return appTheme.value !== 'dark' ? '/img/logo-light.svg' : '/img/logo-dark.svg';
    });

    onMounted(() => {
      setTimeout(readStateFromLS(['appTheme', 'tasklist']), 50);
      setTimeout(applyTheme(appTheme.value), 150);
    })

    return {
      appTheme,
      logoSrc
    }
  }
}
</script>
