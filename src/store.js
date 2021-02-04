import { computed, reactive } from 'vue';

const state = reactive({
  tasklist: []
});

export const useStore = () => {
  const getTasklist = computed(() => state.tasklist);

  const addTask = (task) => {
    state.tasklist.push(task);
  }

  const removeTask = (toRemove) => {
    state.tasklist = state.tasklist.filter(task => task.id !== toRemove.id);
  }

  const setActiveTask = (id) => {
    state.tasklist.forEach(task => {
      task.id === id ? task.taskActive = true : task.taskActive = false;
    });
  }

  const setPausedTask = (id) => {
    state.tasklist.forEach(task => {
      if (task.id === id) {
        task.taskActive = false;
      }
    });
  }

  return {
    addTask,
    removeTask,
    setActiveTask,
    setPausedTask,
    tasklist: getTasklist
  };
}