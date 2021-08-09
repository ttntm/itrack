<script>
import BtnDefault from './button/BtnDefault.vue';
import BtnSave from './button/BtnSave.vue';
import InputText from './input/InputText.vue'
import Task from './Task.vue';

import { computed, reactive, ref } from 'vue';
import { useStore } from '../store.js';
import { formatTime, getDate } from '../utils.js'

export default {
  name: 'TaskList',
  components: {
    BtnDefault,
    BtnSave,
    InputText,
    Task
  },
  setup() {
    const { addTask, autoStart, deactivateAll, resetSavedTime, saveTime, setState, tasklist, tasklistTotal } = useStore();

    const newTask = reactive({
      id: '',
      name: '',
      taskActive: false,
      taskTotal: 0
    });

    const today = getDate();
    const total = computed(() => tasklistTotal.value);
    const totalDisplay = computed(() => { return formatTime(total.value) });

    const createNewTask = () => {
      if (newTask.name) {
        newTask.id = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        
        if (autoStart.value) {
          deactivateAll();
          newTask.taskActive = autoStart.value;
        }

        addTask({ ...newTask });

        newTask.id = '';
        newTask.name = '';
      } else {
        return alert('Please enter a task name!');
      }
    }

    const resetBtnClick = () => {
      if (confirm('This reset will stop tracking, reset all tracked time and save your task list - are you sure?')) {
        resetSavedTime();
      } else { 
        return
      }
    }

    const updateTotal = (minus) => {
      let calc = minus ? total.value - minus : total.value + 1;
      return setState('tasklistTotal', calc, saveTime.value)
    }

    return {
      createNewTask,
      tasklist,
      newTask,
      resetBtnClick,
      saveTime,
      today,
      total,
      totalDisplay,
      updateTotal
    }
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
    <transition-group name="list">
      <Task v-for="task in tasklist" :key="task.id" :task="task" @reduce:total="updateTotal($event)" @update:total="updateTotal" />
    </transition-group>
  </section>
  <transition name="fade">
    <section v-if="tasklist.length > 0 || total > 0" class="my-8">
      <p class="text-center text-xl font-bold tracking-wide text-gray-dark">All Tasks: {{ totalDisplay }}</p>
    </section>
  </transition>
  <section class="new-task my-8">
    <InputText v-model="newTask.name" class="input-task flex-grow mb-4 md:mb-0 md:mr-12" pch="Task Name, Ticket No., ..." @keyup.enter="createNewTask" />
    <BtnDefault @click="createNewTask">Add Task</BtnDefault>
  </section>
  <transition name="fade">
    <div v-if="saveTime && tasklist.length > 0" class="text-center text-gray-dark small mb-16">
      <button class="border-b-2 border-transparent hover:border-primary focus:outline-none focus:shadow-outline focus:border-transparent" @click="resetBtnClick">Reset Time Tracking</button>
    </div>
  </transition>
</template>