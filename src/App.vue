<script setup>
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useStore } from '@/store.js'
  import { applyTheme } from '@/utils.js'

  import BtnSettings from '@/components/button/BtnSettings.vue'
  import BtnSwitchTheme from '@/components/button/BtnSwitchTheme.vue'
  import Settings from '@/components/Settings.vue'
  import TaskList from '@/components/TaskList.vue'

  const {
    activeTasks,
    appTheme,
    appThemeAuto,
    deactivateAll,
    initTasklist,
    readStateFromLS,
    setState,
    setTaskEditMode,
    settingsShown
  } = useStore()

  const logoSrc = computed(() => {
    return appTheme.value !== 'dark' ? '/img/logo-light.svg' : '/img/logo-dark.svg'
  })

  onMounted(() => {
    const appNode = document.getElementById('app')
    appNode.style.opacity = '1'
    appNode.style.transition = 'opacity 1.5s ease'

    const preferDark = window.matchMedia('(prefers-color-scheme: dark)')

    setTimeout(readStateFromLS(['appTheme', 'appThemeAuto', 'autoStart', 'enableDrag', 'saveTime', 'tasklist', 'tasklistTotal']), 50)
    setTimeout(deactivateAll(), 100) // just in case someone has saved the task list with a running task
    setTimeout(() => {
      if (appThemeAuto.value) {
        // User did not choose a theme, set automatically
        setAutoTheme(preferDark)
      } else {
        // User chose a theme, use that
        applyTheme(appTheme.value)
      }
    }, 150)

    initTasklist()

    preferDark.addEventListener('change', setAutoTheme)
    window.addEventListener('beforeunload', onAppClose)
    document.addEventListener('keydown', onESC)
  })

  onUnmounted(() => {
    preferDark.removeEventListener('change', setAutoTheme)
    window.removeEventListener('beforeunload', onAppClose)
    document.removeEventListener('keydown', onESC)
  })

  const onAppClose = (e) => {
    if (activeTasks.value && activeTasks.value.length !== 0) {
      e.preventDefault() // FF
      e.returnValue = '' // Chrome
    } else {
      delete e['returnValue']
    }
  }

  const onESC = (e) => {
    if (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) {
      setTaskEditMode(false)
    }
  }

  const setAutoTheme = (e) => {
    if (e.matches) {
      setState('appTheme', 'dark', true)
      applyTheme('dark')
    } else {
      setState('appTheme', 'light', true)
      applyTheme('light')
    }
  }
</script>

<template>
  <img class="w-64 mx-auto mt-8 mb-4 md:my-12" alt="aitrack.work logo" :src="logoSrc" />
  <BtnSettings />
  <transition name="modal">
    <Settings v-if="settingsShown" />
  </transition>
  <TaskList />
  <BtnSwitchTheme />
</template>