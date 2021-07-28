<script>
import BtnDefault from './button/BtnDefault.vue';
import InputToggle from './input/InputToggle.vue';

import { reactive, ref } from 'vue';
import { useStore } from '../store.js';
import { applyTheme } from '../utils.js';

export default {
  name: 'Settings',
  components: {
    BtnDefault,
    InputToggle
  },
  setup() {
    const { appTheme, autoStart, saveTime, setState, toggleSettings } = useStore();

    const saved = ref(false);

    const settings = reactive({
      autoStart: autoStart.value,
      darkTheme: appTheme.value === 'dark' ? true : false,
      saveTaskTotal: saveTime.value
    });

    const saveSettings = () => {
      let theme = settings.darkTheme ? 'dark' : 'light';
      
      setState('autoStart', settings.autoStart, true);
      setState('saveTime', settings.saveTaskTotal, true);
      setState('appTheme', theme, true);
      
      applyTheme(appTheme.value);

      saved.value = true;

      setTimeout(() => {
        toggleSettings();
      }, 1250)
    }

    const updateSettings = (key, value) => { settings[key] = value }

    return {
      saved,
      saveSettings,
      settings,
      toggleSettings,
      updateSettings
    }
  }
}
</script>

<template>
  <div class="settings" v-click-outside="toggleSettings" v-esc="toggleSettings">
    <div class="flex items-end justify-between mb-6">
      <h2 class="text-lg font-bold text-center ml-8">Settings</h2>
      <button class="btn btn-scale p-4" title="Close Settings Menu" @click="toggleSettings">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div class="relative pb-8 px-8">
      <transition-group name="modal-inner">
        <p v-if="saved" class="text-lg text-center">Settings saved &#10003;</p>
        <div v-if="!saved">
          <InputToggle v-model="settings.autoStart" name="autostart" @update:modelValue="updateSettings('autoStart', $event)">Automatically start tracking for new tasks</InputToggle>
          <InputToggle v-model="settings.saveTaskTotal" name="save-total" @update:modelValue="updateSettings('saveTaskTotal', $event)">Save tasks with time tracked</InputToggle>
          <InputToggle v-model="settings.darkTheme" name="theme" @update:modelValue="updateSettings('darkTheme', $event)">Use dark theme</InputToggle>
          <BtnDefault class="text-sm px-6 mt-6 mx-auto" @click="saveSettings">Save Settings</BtnDefault>
        </div>
      </transition-group>
    </div>
  </div>
</template>