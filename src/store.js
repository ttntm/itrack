import { reactive, readonly } from 'vue';

export const useStore = () => {
  const state = reactive({
    taskList: []
  });

  const addTask = (task) => {
    state.taskList.push(task);
  }

  const removeTask = (toRemove) => {
    state.taskList = state.taskList.filter(task => task.id !== toRemove.id);
  }

  return {
    addTask,
    removeTask,
    state: readonly(state)
  };
}