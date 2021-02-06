import { computed, reactive } from 'vue';

const ls = window.localStorage;

// keep the state object private so that we can have shared state across components!
const state = reactive({
  appTheme: '',
  tasklist: []
});

export const useStore = () => {
  // getters
  const getAppTheme = computed(() => state.appTheme);
  const getTasklist = computed(() => state.tasklist);

  //actions
  const addTask = (task) => {
    state.tasklist.push(task);
  }

  const removeTask = (toRemove) => {
    state.tasklist = state.tasklist.filter(task => task.id !== toRemove.id);
    writeStateToLS('tasklist'); // remove tasks so they don't come back on reload
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

  const writeStateToLS = (targetKey) => {
    if (targetKey) {
      const current = targetKey in state ? state[targetKey] : null;
      if (current) {
        ls.setItem(targetKey, JSON.stringify(current));
      }
    } else {
      Object.keys(state).map(key => {
        ls.setItem(key, JSON.stringify(state[key]));
      })
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
    appTheme: getAppTheme,
    tasklist: getTasklist,
    addTask,
    removeTask,
    setActiveTask,
    setPausedTask,
    setTheme,
    writeStateToLS,
    readStateFromLS
  };
}