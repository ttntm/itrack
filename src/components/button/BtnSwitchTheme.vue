<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from '@/store.js'
  import { applyTheme } from '@/utils.js'

  const { appTheme, setState } = useStore()

  const btn = ref()
  
  const btnTitle = computed(() => {
    return appTheme.value !== 'dark' ? `Dark Mode` : `Light Mode`
  })

  const onCLick = () => {
    appTheme.value === 'light' ? setState('appTheme', 'dark', true) : setState('appTheme', 'light', true)
    applyTheme(appTheme.value)
    setState('appThemeAuto', false, true) // User choice overrides auto theme selection
    btn.value.blur()
  }
</script>

<template>
  <button class="btn-theme-switch btn-scale" ref="btn" :title="`Switch to ${btnTitle}`" @click="onCLick">
    <svg v-if="appTheme === 'dark'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="12" cy="12" r="4" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-stars" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
      <path d="M19 11h2m-1 -1v2" />
    </svg>
  </button>
</template>