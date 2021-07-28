<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from '../../store.js';

export default {
  name: 'BtnSave',
  setup() {
    const { saveTime, tasklist, writeStateToLS } = useStore();

    const btnSave = ref();
    const btnState = reactive({
      enabled: true,
      text: ''
    });

    const saveCurrentList = () => {
      if (saveTime.value) {
        writeStateToLS('tasklist');
        writeStateToLS('tasklistTotal');
      } else {
        let copy = JSON.stringify(tasklist.value); // hacking around reactivity to prevent unintentional mutation of the original tasklist array...
        let template = JSON.parse(copy);
        template.map((task) => {
          task.taskTotal = 0;
          return task
        })
        writeStateToLS('tasklist', template);
        writeStateToLS('tasklistTotal', 0);
      }
      
      btnSave.value.blur();

      btnState.enabled = false;
      btnState.text = 'Task list saved &#10003;';

      setTimeout(() => {
        btnState.enabled = true;
        btnState.text = '';
      }, 3000);
    }

    return {
      btnSave,
      btnState,
      saveCurrentList
    }
  }
}
</script>

<template>
  <button class="btn-scale flex items-center outline-none text-xs text-gray-mid hover:text-gray-dark focus:outline-none focus:shadow-outline" ref="btnSave" title="Save Task List to LocalStorage" @click="saveCurrentList" :disabled="!btnState.enabled">
    <transition-group name="inner">
      <span v-if="btnState.text" v-html="btnState.text" class="text-gray-dark" />
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
        <circle cx="12" cy="14" r="2" />
        <polyline points="14 4 14 8 8 8 8 4" />
      </svg>
    </transition-group>
  </button>
</template>