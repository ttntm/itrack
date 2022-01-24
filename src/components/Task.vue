<script setup>
  import BtnDelete from '@/components/button/BtnDelete.vue'
  import BtnPause from '@/components/button/BtnPause.vue'
  import BtnStart from '@/components/button/BtnStart.vue'
  import BtnTaskEdit from '@/components/button/BtnTaskEdit.vue'
  import BtnTaskEditSave from '@/components/button/BtnTaskEditSave.vue'
  import InputText from '@/components/input/InputText.vue'

  import { computed, onMounted, reactive, watch } from 'vue'
  import { useStore } from '@/store.js'
  import { formatTime } from '@/utils.js'

  const props = defineProps({
    task: Object
  })

  const emit = defineEmits(['reduce:total','update:total'])

  const { removeTask, setActiveTask, setPausedTask, updateTask } = useStore()

  const editTask = reactive({
    editing: false,
    name: ''
  })
  
  const active = computed(() => props.task.taskActive)
  const taskTotal = computed(() => props.task.taskTotal)
  const timeSpent = computed(() => { return formatTime(taskTotal.value) })

  watch(active, () => active.value ? startTimerWorker() : stopTimerWorker())

  onMounted(() => {
    if (active.value) startTimerWorker()
  })

  let timer

  const startTimerWorker = () => {
    timer = new Worker('./timer-worker.js')
    timer.postMessage({ total: taskTotal.value })
    timer.onmessage = (e) => {
      updateTask(props.task.id, 'taskTotal', e.data)
      emit('update:total')
    }
  }

  const stopTimerWorker = () => { timer.terminate() }

  const events = {
    onDelete(current) {
      if (taskTotal.value <= 0)
        return removeTask(current)

      if (confirm('Do you really want to remove this task and the time spent on it?')) {
        if (active.value) stopTimerWorker()
        removeTask(current)
        emit('reduce:total', taskTotal.value)
      } else { 
        return 
      }
    },

    onEdit() {
      editTask.editing = !editTask.editing
      return editTask.editing ? editTask.name = props.task.name : ''
    },

    onPause() {
      setPausedTask(props.task.id)
    },
    
    onStart() {
      setActiveTask(props.task.id)
    },

    onUpdate() {
      if (editTask.name) {
        updateTask(props.task.id, 'name', editTask.name)
        events.onEdit()
      } else {
        return alert('Please enter a task name!')
      }
    }
  }
</script>

<template>
  <div :class="{ 'active' : active, 'text-sm' : !active }" class="task-item px-8 mb-4 py-6 lg:py-4">
    <div class="task-name flex flex-grow items-center justify-start lg:py-2">
      <BtnTaskEdit v-if="!editTask.editing" class="click-outside-ignore" @click="events.onEdit" />
      <div class="flex flex-grow items-center justify-start relative">
        <transition-group name="fade">
          <p v-if="!editTask.editing" :class="{ 'font-bold' : active }" class="absolute w-full overflow-hidden" style="max-height: 1.25rem;">{{ task.name }}</p>
          <InputText v-if="editTask.editing" v-model="editTask.name" v-esc="events.onEdit" class="input-task absolute w-full px-2 py-1" @keydown.enter="events.onUpdate" />
        </transition-group>
      </div>
      <transition name="fade">
        <BtnTaskEditSave v-if="editTask.editing" class="ml-2 click-outside-ignore" @click="events.onUpdate" />
      </transition>
    </div>
    <div class="separator h-px md:hidden my-4" />
    <div class="flex items-center justify-between">
      <p class="w-1/3 md:ml-8 md:mr-4">{{ timeSpent }}</p>
      <div class="w-1/3 relative md:px-8">
        <transition-group name="fade">
          <BtnStart v-if="!active" btnTitle="Start Tracking" @click="events.onStart" />
          <BtnPause v-else :active="active" btnTitle="Pause Tracking" @click="events.onPause" />
        </transition-group>
      </div>
      <div class="w-1/3">
        <BtnDelete class="ml-auto" btnTitle="Delete Task" @click="events.onDelete(task)" />
      </div>
    </div>
  </div>
</template>