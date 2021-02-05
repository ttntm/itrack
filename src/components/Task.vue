<template>
  <div :class="{ 'active' : active, 'text-sm' : !active }" class="flex items-center justify-between rounded shadow px-8 py-6 mb-4">
    <p :class="{ 'font-bold' : active }" class="flex-grow">{{ task.name }}</p>
    <p class="ml-4">{{ timeSpent }}</p>
    <div class="relative px-8">
      <transition-group name="buttons">
        <BtnStart v-if="!active" btnTitle="Start Tracking" @click="startTracking" />
        <BtnPause v-else :active="active" btnTitle="Pause Tracking" @click="pauseTracking" />
      </transition-group>
    </div>
    <BtnDelete btnTitle="Delete Task" @click="deleteTaskFromList(task)" />
  </div>
</template>

<script>
import BtnDelete from './button/BtnDelete.vue';
import BtnPause from './button/BtnPause.vue';
import BtnStart from './button/BtnStart.vue';

import { computed, ref, watch } from 'vue';
import { useStore } from '../store.js';
import { formatTime } from '../utils.js'

export default {
  name: 'Task',
  components: {
    BtnDelete,
    BtnPause,
    BtnStart
  },
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

<style lang="postcss" scoped>
  .active {
    @apply shadow-lg border-l-4 border-teal-500;
    transform: scale(1.05);
  }

  .buttons-enter-active,
  .buttons-leave-active {
    transition: all .5s ease;
  }

  .buttons-enter-from,
  .buttons-leave-to {
    opacity: 0;
    transform: translateY(16px);
    transform: translateX(-16px);
  }
</style>