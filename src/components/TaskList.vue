<template>
  <section class="tasklist">
    <transition-group name="list">
      <Task v-for="task in tasklist" :key="task.id" :task="task" @reduce:total="updateTotal($event)" @update:total="updateTotal" />
    </transition-group>
  </section>
  <section v-if="tasklist.length > 0 || total > 0" class="my-8">
    <p class="text-center text-lg font-bold tracking-wider text-gray-500">Total across all tasks: {{ totalDisplay }}</p>
  </section>
  <section class="new-task mt-8">
    <InputText v-model="newTask.name" class="flex-grow mr-12" @keyup.enter="createNewTask" />
    <BtnDefault @click="createNewTask">
      Add Task
    </BtnDefault>
  </section>
</template>

<script>
import BtnDefault from './button/BtnDefault.vue';
import InputText from './input/InputText.vue'
import Task from './Task.vue';

import { computed, reactive, ref } from 'vue';
import { useStore } from '../store.js';
import { formatTime } from '../utils.js'

export default {
  name: 'TaskList',
  components: {
    BtnDefault,
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
    @apply flex items-center justify-between;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>