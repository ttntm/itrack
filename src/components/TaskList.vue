<template>
  <section class="tasklist">
    <Task v-for="task in tasklist" :key="task.id" :task="task" @reduce:total="updateTotal($event)" @update:total="updateTotal" />
  </section>
  <section v-if="tasklist.length > 0 || total > 0" class="my-6">
    <p class="text-center text-gray-600">Total: {{ totalDisplay }}</p>
  </section>
  <section class="new-task mt-6">
    <InputText v-model="newTask.name" @keyup.enter="createNewTask" />
    <BtnCreateTask @click="createNewTask" />
  </section>
</template>

<script>
import BtnCreateTask from './button/BtnCreateTask.vue';
import InputText from './input/InputText.vue'
import Task from './Task.vue';

import { computed, reactive, ref } from 'vue';
import { useStore } from '../store.js';
import { formatTime } from '../utils.js'

export default {
  name: 'TaskList',
  components: {
    BtnCreateTask,
    InputText,
    Task
  },
  setup() {
    const { addTask, tasklist } = useStore();

    const newTask = reactive({
      id: '',
      name: '',
      taskActive: false
    });

    const total = ref(0);
    const totalDisplay = computed(() => { return formatTime(total.value) });

    const createNewTask = () => {
      if (newTask.name) {
        newTask.id = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

        addTask({ ...newTask });

        newTask.id = '';
        newTask.name= '';
      } else {
        alert('Please enter a task name!');
        return
      }
    }

    const updateTotal = (minus) => {
      if (minus) {
        total.value = total.value - minus;
      } else {
        total.value++
      }
    }

    return {
      createNewTask,
      tasklist,
      newTask,
      total,
      totalDisplay,
      updateTotal
    }
  }
}
</script>

<style lang="postcss" scoped>
  .new-task {
    @apply flex justify-around;
  }
</style>