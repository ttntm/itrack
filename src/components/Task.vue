<template>
  <div class="flex items-center justify-between rounded shadow p-4 mb-4">
    <p class="flex-grow">{{ task.name }}</p>
    <div class="flex mr-8">
      <p class="mr-4">{{ timeSpent }}</p>
      <button v-if="!active" title="Start Tracking" @click="startTracking">[+]</button>
      <button v-else title="Pause Tracking" @click="pauseTracking">[~]</button>
    </div>
    <button @click="deleteTaskFromList(task)">&times;</button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from '../store.js';
import { formatTime } from '../utils.js'

export default {
  name: 'Task',
  props: {
    task: Object
  },
  emits: ['reduce:total','update:total'],
  setup(props, { emit }) {
    const { removeTask, setActiveTask, setPausedTask } = useStore();

    const active = computed(() => props.task.taskActive);
    const taskTotal = ref(0);
    const timeSpent = computed(() => { return formatTime(taskTotal.value) });

    let increment;

    const deleteTaskFromList = (current) => {
      if (taskTotal.value > 0) {
        if(confirm('Do you really want to remove this task and the time spent on it?')) {
          removeTask(current);
          emit('reduce:total', taskTotal.value);
        } else { return }
      } else {
        removeTask(current);
      }
    }

    const startTracking = () => {
      setActiveTask(props.task.id);
    }

    const pauseTracking = () => {
      setPausedTask(props.task.id);
    }

    watch(active, () => {
      if (active.value) {
        increment = setInterval(() => {
          taskTotal.value++;
          emit('update:total');
        }, 1000);
      } else {
        clearInterval(increment);
      }
    })

    return {
      active,
      deleteTaskFromList,
      pauseTracking,
      startTracking,
      timeSpent
    }
  }
}
</script>

<style>

</style>