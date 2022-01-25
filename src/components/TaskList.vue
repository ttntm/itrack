<script setup>
  import { computed, ref } from 'vue'
  import draggable from 'vuedraggable'
  import { useStore } from '@/store.js'
  import { formatTime, getDate } from '@/utils.js'

  import BtnDefault from '@/components/button/BtnDefault.vue'
  import BtnSave from '@/components/button/BtnSave.vue'
  import InputText from '@/components/input/InputText.vue'
  import Task from '@/components/Task.vue'

  const { addTask, autoStart, deactivateAll, enableDrag, resetSavedTime, saveTime, setState, tasklist, tasklistTotal } = useStore()

  const drag = ref(false)
  const taskName = ref('')

  const localList = computed({
    get: () => [...tasklist.value],
    set: (val) => {      
      const ordered = (arr) => arr.map((el, index) => {
        el.order = index
        return el
      })

      setState('tasklist', ordered(val), false)
    }
  })
  const total = computed(() => tasklistTotal.value)
  const totalDisplay = computed(() => { return formatTime(total.value) })
  
  const dragComponent = {
    tag: 'Task',
    type: 'transition-group',
    name: 'list'
  }
  const dragOptions = {
    animation: 500,
    ghostClass: 'ghost'
  }
  const today = getDate()

  const events = {
    onCreate() {
      if (!taskName.value) {
        return alert('Please enter a task name!')
      }

      const newTask = {
        id: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
        name: taskName.value,
        taskActive: false,
        taskTotal: 0,
        order: tasklist.value?.length || 0
      }
      
      if (autoStart.value) {
        deactivateAll()
        newTask.taskActive = autoStart.value
      }

      addTask({ ...newTask })

      taskName.value = ''
    },

    onReset() {
      const msg = 'This reset will stop tracking, reset all tracked time and save your task list - are you sure?'
      if (confirm(msg)) {
        resetSavedTime()
      } else { 
        return
      }
    },

    onUpdate(minus) {
      let calc = minus ? total.value - minus : total.value + 1
      return setState('tasklistTotal', calc, saveTime.value)
    }
  }
</script>

<template>
  <section class="tasklist-header mb-8">
    <h1 class="font-bold text-2xl uppercase">Task List</h1>
    <transition name="fade">
      <BtnSave v-if="tasklist.length > 0" />
    </transition>
    <transition name="fade">
      <div v-if="tasklist.length > 0" class="w-full order-last text-center tracking-wide text-gray-dark text-sm mt-4">{{ today }}</div>
    </transition>
  </section>
  <section v-if="tasklist.length > 0" class="tasklist">
    <draggable
      :component-data="dragComponent"
      :disabled="!enableDrag"
      item-key="order"
      tag="transition-group"
      v-model="localList"
      v-bind="dragOptions"
      @start="drag=true"
      @end="drag=false"
    >
      <template #item="{ element }">
        <Task :key="element.id" :task="element" @reduce:total="events.onUpdate($event)" @update:total="events.onUpdate" />
      </template>
    </draggable>
  </section>
  <transition name="fade">
    <section v-if="tasklist.length > 0 || total > 0" class="my-8">
      <p class="text-center text-xl font-bold tracking-wide text-gray-dark">All Tasks: {{ totalDisplay }}</p>
    </section>
  </transition>
  <section class="new-task my-8">
    <InputText v-model="taskName" class="input-task flex-grow mb-4 md:mb-0 md:mr-12" pch="Task Name, Ticket No., ..." @keyup.enter="events.onCreate" />
    <BtnDefault @click="events.onCreate">Add Task</BtnDefault>
  </section>
  <transition name="fade">
    <div v-if="saveTime && tasklist.length > 0" class="text-center text-gray-dark small mb-16">
      <button class="border-b-2 border-transparent hover:border-primary focus:outline-none focus:shadow-outline focus:border-transparent" @click="events.onReset">Reset Time Tracking</button>
    </div>
  </transition>
</template>

<style lang="postcss" scoped>
  .no-move {
    transition: transform 0s;
  }

  .ghost {
    @apply border-primary shadow-xl pointer-events-none;
  }
</style>