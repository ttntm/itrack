<script setup>
  import { reactive, ref } from 'vue'
  import { useStore } from '@/store.js'
  import { applyTheme } from '@/utils.js'
  
  import BtnDefault from '@/components/button/BtnDefault.vue'
  import InputToggle from '@/components/input/InputToggle.vue'

  const {
    appTheme,
    appThemeAuto,
    autoStart,
    enableDrag,
    saveTime,
    setState,
    toggleSettings
  } = useStore()

  const saved = ref(false)
  const settings = reactive({
    autoStart: autoStart.value,
    darkTheme: appTheme.value === 'dark' ? true : false,
    enableDrag: enableDrag.value,
    saveTaskTotal: saveTime.value
  })

  const events = {
    onRestoreAutoTheme() {
      // Restore automatic theme matching
      setState('appThemeAuto', true, true)
    },
    
    onSave() {
      let theme = settings.darkTheme ? 'dark' : 'light'
      
      if (theme !== appTheme.value) {
        // User choice overrides auto theme selection
        setState('appThemeAuto', false, true)
      }

      setState('appTheme', theme, true)
      setState('autoStart', settings.autoStart, true)
      setState('enableDrag', settings.enableDrag, true)
      setState('saveTime', settings.saveTaskTotal, true)

      applyTheme(appTheme.value)
      saved.value = true
  
      setTimeout(() => {
        toggleSettings()
      }, 1000)
    },

    onUpdate(key, value) { 
      settings[key] = value
    }
  }
</script>

<template>
  <div class="settings" v-click-outside="toggleSettings" v-esc="toggleSettings">
    <div v-if="!saved" class="flex items-center justify-between pt-4 mb-6">
      <h2 class="text-lg font-bold text-center ml-8">Settings</h2>
      <button class="btn rounded-full p-1 mx-3" title="Close Settings Menu" @click="toggleSettings">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div class="relative pb-8 px-8">
      <transition-group name="modal-inner">
        <div v-if="!saved">
          <InputToggle v-model="settings.autoStart" name="autostart" @update:modelValue="events.onUpdate('autoStart', $event)">Automatically start tracking for new tasks</InputToggle>
          <InputToggle v-model="settings.saveTaskTotal" name="save-total" @update:modelValue="events.onUpdate('saveTaskTotal', $event)">Save tasks with time tracked</InputToggle>
          <InputToggle v-model="settings.enableDrag" name="enable-drag" @update:modelValue="events.onUpdate('enableDrag', $event)">Enable drag & drop sorting</InputToggle>
          <InputToggle v-model="settings.darkTheme" name="theme" @update:modelValue="events.onUpdate('darkTheme', $event)">
            Use dark theme
            <span v-if="appThemeAuto" class="inline-block text-sm ml-1" title="Manually selecting a theme will disable automatic theme matching" style="cursor: help;">
              &#9432;
            </span>
          </InputToggle>
          <div v-if="!appThemeAuto" class="text-center">
            <p class="inline-block border-b-2 border-transparent hover:border-primary cursor-pointer text-sm italic click-outside-ignore" @click="events.onRestoreAutoTheme">
              Restore automatic theme matching
            </p>
          </div>
          <BtnDefault class="text-sm px-6 mt-6 mx-auto" @click="events.onSave">Save Settings</BtnDefault>
        </div>
        <p v-else class="text-lg text-center pt-16 pb-8">Settings saved &#10003;</p>
      </transition-group>
    </div>
  </div>
</template>