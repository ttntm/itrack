import { computed, reactive } from 'vue';

const ls = window.localStorage;

// keep the state object private so that we can have shared state across components!
const state = reactive({
  appTheme: 'light',
  tasklist: []
});

export const useStore = () => {
  // getters
  const getActiveTasks = computed(() => state.tasklist.filter(task => task.taskActive));
  const getAppTheme = computed(() => state.appTheme);
  const getTasklist = computed(() => state.tasklist);

  //actions
  const addTask = task => state.tasklist.push(task);

  const deactivateAll = () => state.tasklist.forEach(task => task.taskActive = false);

  const editTaskName = (id, newName) => {
    state.tasklist.forEach(task => {
      if (task.id === id) {
        task.name = newName;
      }
    });
  }

  const removeTask = (toRemove) => {
    const filtered = (source) => source.filter(task => task.id !== toRemove.id);
    let savedTasks = JSON.parse(ls.getItem('tasklist'));

    state.tasklist = filtered(state.tasklist);

    if (savedTasks.length > 0) writeStateToLS('tasklist', filtered(savedTasks)); // remove saved tasks so they don't come back on reload
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

  const setTheme = (theme) => {
    state.appTheme = theme;
    writeStateToLS('appTheme'); // save theme settings
  }

  const writeStateToLS = (targetKey, update) => {
    if (targetKey) {
      const current = update || state[targetKey] || null; // parameter 'update' is an optional override - if missing, the whole state of 'targetKey' will be written to LS
      if (current) {
        ls.setItem(targetKey, JSON.stringify(current));
      }
    } else {
      Object.keys(state).map(key => {
        ls.setItem(key, JSON.stringify(state[key]));
      });
    }
  }

  const readStateFromLS = (storedKeys) => {
    storedKeys.forEach((sKey) => {
      const stored = ls.getItem(sKey);
      const storedState = JSON.parse(stored);

      if (storedState && sKey in state) {
        state[sKey] = storedState;
      }
    });
  }

  return {
    activeTasks: getActiveTasks,
    appTheme: getAppTheme,
    tasklist: getTasklist,
    addTask,
    deactivateAll,
    editTaskName,
    removeTask,
    setActiveTask,
    setPausedTask,
    setTheme,
    writeStateToLS,
    readStateFromLS
  }
}