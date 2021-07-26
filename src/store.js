import { computed, reactive } from 'vue';

const isBoolean = val => 'boolean' === typeof val

const ls = window.localStorage;

// keep the state object private so that we can have shared state across components!
const state = reactive({
  appTheme: 'light',
  autoStart: false,
  saveTime: false,
  showSettings: false,
  tasklist: [],
  tasklistTotal: 0
});

export const useStore = () => {
  // getters
  const getActiveTasks = computed(() => state.tasklist.filter(task => task.taskActive));
  const getAppTheme = computed(() => state.appTheme);
  const getAutoStart = computed(() => state.autoStart);
  const getsaveTime = computed(() => state.saveTime);
  const getSettingsDisplay = computed(() => state.showSettings);
  const getTasklist = computed(() => state.tasklist);
  const getTasklistTotal = computed(() => state.tasklistTotal);

  //actions
  const addTask = task => state.tasklist.push(task);

  const deactivateAll = () => state.tasklist.forEach(task => task.taskActive = false);

  const readStateFromLS = (storedKeys) => {
    storedKeys.forEach((sKey) => {
      const stored = ls.getItem(sKey);
      const storedState = JSON.parse(stored);

      if (storedState && sKey in state) {
        state[sKey] = storedState;
      }
    });
  }

  const removeTask = (toRemove) => {
    const filtered = (source) => source.filter(task => task.id !== toRemove.id);
    let savedTasks = JSON.parse(ls.getItem('tasklist'));

    state.tasklist = filtered(state.tasklist);

    if (savedTasks.length > 0) writeStateToLS('tasklist', filtered(savedTasks)); // remove saved tasks so they don't come back on reload
  }

  const resetSavedTime = () => {
    state.tasklist.forEach(task => task.taskTotal = 0);
    state.tasklistTotal = 0;
    writeStateToLS('tasklist');
    writeStateToLS('tasklistTotal');
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

  const setState = (key, val, ls) => {
    state[key] = val;
    if (ls) writeStateToLS(key, val); // save key to LS as well
  }

  const toggleSettings = () => { state.showSettings = !state.showSettings }

  const updateTask = (id, key, value) => {
    state.tasklist.forEach(task => {
      if (task.id === id) {
        task[key] = value;
      }
    });
  }

  const writeStateToLS = (targetKey, update) => {
    if (update || isBoolean(update) || typeof update == 'number') {
      ls.setItem(targetKey, JSON.stringify(update));
    } else if (targetKey) {
      ls.setItem(targetKey, JSON.stringify(state[targetKey]));
    } else {
      Object.keys(state).map(key => {
        ls.setItem(key, JSON.stringify(state[key]));
      });
    }
  }

  return {
    activeTasks: getActiveTasks,
    appTheme: getAppTheme,
    autoStart: getAutoStart,
    saveTime: getsaveTime,
    settingsShown: getSettingsDisplay,
    tasklist: getTasklist,
    tasklistTotal: getTasklistTotal,
    addTask,
    deactivateAll,
    updateTask,
    removeTask,
    resetSavedTime,
    setActiveTask,
    setState,
    setPausedTask,
    toggleSettings,
    writeStateToLS,
    readStateFromLS
  }
}