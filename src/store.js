import { computed, reactive } from 'vue';

const ls = window.localStorage;

// keep the state object private so that we can have shared state across components!
const state = reactive({
  tasklist: []
});

export const useStore = () => {
  // getters
  const getTasklist = computed(() => state.tasklist);

  //actions
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

  const writeStateToLS = () => {
    ls.setItem('iState', JSON.stringify(state));
  }

  const readStateFromLS = () => {
    const stored = ls.getItem('iState');
    const storedState = JSON.parse(stored);

    if (storedState) {
      Object.keys(state).map(key => {
        if (storedState[key]) {
          state[key] = storedState[key];
        }
      })
    }
  }

  return {
    addTask,
    removeTask,
    setActiveTask,
    setPausedTask,
    tasklist: getTasklist,
    writeStateToLS,
    readStateFromLS
  };
}