<script setup>
  import { reactive, ref } from 'vue'
  import { useStore } from '@/store.js'

  const { saveTime, tasklist, writeStateToLS } = useStore()

  const btnSave = ref()
  const btnState = reactive({
    enabled: true,
    text: ''
  })

  const onSave = () => {
    if (saveTime.value) {
      writeStateToLS('tasklist')
      writeStateToLS('tasklistTotal')
    } else {
      // hacking around reactivity to prevent unintentional mutation of the original tasklist array...
      let template = JSON.parse(JSON.stringify(tasklist.value))
      template.map((task) => {
        task.taskTotal = 0
        return task
      })
      writeStateToLS('tasklist', template)
      writeStateToLS('tasklistTotal', 0)
    }

    btnSave.value.blur()

    btnState.enabled = false
    btnState.text = 'Task list saved &#10003;'

    setTimeout(() => {
      btnState.enabled = true
      btnState.text = ''
    }, 1500)
  }
</script>

<template>
  <button
    class="btn-scale flex items-center outline-none text-xs text-gray-mid hover:text-gray-dark focus:outline-none focus:shadow-outline"
    ref="btnSave"
    title="Save Task List to LocalStorage"
    @click="onSave"
    :disabled="!btnState.enabled"
  >
    <transition-group name="inner">
      <span
        v-if="btnState.text"
        class="text-gray-dark"
        v-html="btnState.text"
      />
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
        <circle cx="12" cy="14" r="2" />
        <polyline points="14 4 14 8 8 8 8 4" />
      </svg>
    </transition-group>
  </button>
</template>
