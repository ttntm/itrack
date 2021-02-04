<template>
  <section class="tasklist">
    <Task v-for="task in tasklist" :key="task.id" :task="task" @remove:task="deleteTaskFromList($event)" />
  </section>
  <section class="new-task mt-8">
    <InputText v-model="newTask.name" @keyup.enter="createNewTask" />
    <BtnCreateTask @click="createNewTask" />
  </section>
</template>

<script>
import BtnCreateTask from './button/BtnCreateTask.vue';
import InputText from './input/InputText.vue'
import Task from './Task.vue';

import { computed, reactive } from 'vue';
import { useStore } from '../store.js';

export default {
  name: 'TaskList',
  components: {
    BtnCreateTask,
    InputText,
    Task
  },
  setup() {
    const store = useStore();

    const tasklist = computed(() => store.state.taskList);
    const newTask = reactive({
      id: '',
      name: ''
    });

    const createNewTask = () => {
      if (newTask.name) {
        newTask.id = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

        store.addTask({ ...newTask });

        newTask.id = '';
        newTask.name= '';
      } else {
        alert('Please enter a task name!');
        return
      }
    }

    const deleteTaskFromList = (task) => {
      store.removeTask(task);
    }

    return {
      createNewTask,
      deleteTaskFromList,
      tasklist,
      newTask
    }
  }
}
</script>

<style lang="postcss" scoped>
  .new-task {
    @apply flex justify-around;
  }
</style>