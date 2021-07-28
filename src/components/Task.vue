<script>
import BtnDelete from './button/BtnDelete.vue';
import BtnPause from './button/BtnPause.vue';
import BtnStart from './button/BtnStart.vue';
import BtnTaskEdit from './button/BtnTaskEdit.vue';
import BtnTaskEditSave from './button/BtnTaskEditSave.vue';
import InputText from './input/InputText.vue';

import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from '../store.js';
import { formatTime } from '../utils.js';

export default {
  name: 'Task',
  components: {
    BtnDelete,
    BtnPause,
    BtnStart,
    BtnTaskEdit,
    BtnTaskEditSave,
    InputText
  },
  props: {
    task: Object
  },
  emits: ['reduce:total','update:total'],
  setup(props, { emit }) {
    const { removeTask, setActiveTask, setPausedTask, updateTask } = useStore();

    const active = computed(() => props.task.taskActive);
    const editTask = reactive({
      editing: false,
      name: ''
    });
    const taskTotal = computed(() => props.task.taskTotal);
    const timeSpent = computed(() => { return formatTime(taskTotal.value) });

    let timer;

    const deleteTaskFromList = (current) => {
      if (taskTotal.value > 0) {
        if (confirm('Do you really want to remove this task and the time spent on it?')) {
          stopTimerWorker();
          removeTask(current);
          emit('reduce:total', taskTotal.value);
        } else { return }
      } else {
        removeTask(current);
      }
    }

    const pauseTracking = () => { setPausedTask(props.task.id); }

    const startTimerWorker = () => {
      timer = new Worker('./timer-worker.js');
      timer.postMessage({ total: taskTotal.value });
      timer.onmessage = (e) => {
        updateTask(props.task.id, 'taskTotal', e.data);
        emit('update:total');
      }
    }

    const startTracking = () => { setActiveTask(props.task.id); }

    const stopTimerWorker = () => { timer.terminate(); }

    const toggleEdit = () => {
      editTask.editing = !editTask.editing;
      return editTask.editing ? editTask.name = props.task.name : ''
    }

    const updateCurrentTask = () => {
      if (editTask.name) {
        updateTask(props.task.id, 'name', editTask.name);
        toggleEdit();
      } else {
        return alert('Please enter a task name!');
      }
    }

    watch(active, () => {
      if (active.value) {
        startTimerWorker();
      } else {
        stopTimerWorker();
      }
    })

    onMounted(() => {
      if (active.value) startTimerWorker();
    })

    return {
      active,
      toggleEdit,
      editTask,
      deleteTaskFromList,
      pauseTracking,
      startTracking,
      timeSpent,
      updateCurrentTask
    }
  }
}
</script>

<template>
  <div :class="{ 'active' : active, 'text-sm' : !active }" class="task-item px-8 mb-4 py-6 lg:py-4">
    <div class="task-name flex flex-grow items-center justify-start lg:py-2">
      <BtnTaskEdit v-if="!editTask.editing" class="click-outside-ignore" @click="toggleEdit" />
      <div class="flex flex-grow items-center justify-start relative">
        <transition-group name="fade">
          <p v-if="!editTask.editing" :class="{ 'font-bold' : active }" class="absolute w-full">{{ task.name }}</p>
          <InputText v-if="editTask.editing" v-model="editTask.name" v-click-outside="toggleEdit" v-esc="toggleEdit" class="input-task absolute w-full px-2 py-1" @keydown.enter="updateCurrentTask" />
        </transition-group>
      </div>
      <transition name="fade">
        <BtnTaskEditSave v-if="editTask.editing" class="ml-2 click-outside-ignore" @click="updateCurrentTask" />
      </transition>
    </div>
    <div class="separator h-px md:hidden my-4" />
    <div class="flex items-center justify-between">
      <p class="w-1/3 md:ml-8 md:mr-4">{{ timeSpent }}</p>
      <div class="w-1/3 relative md:px-8">
        <transition-group name="fade">
          <BtnStart v-if="!active" btnTitle="Start Tracking" @click="startTracking" />
          <BtnPause v-else :active="active" btnTitle="Pause Tracking" @click="pauseTracking" />
        </transition-group>
      </div>
      <div class="w-1/3">
        <BtnDelete class="ml-auto" btnTitle="Delete Task" @click="deleteTaskFromList(task)" />
      </div>
    </div>
  </div>
</template>