import { computed, reactive } from 'vue'

/**
 * @typedef {Object} Task
 * @property {String} id - Task ID
 * @property {String} name - Task name based on user input
 * @property {Boolean} taskActive - Marks the task that is currently active in tracking 
 * @property {Number} taskTotal - Total time tracked for this specific task
 * @property {Number} order - Current 0-indexed position of the task in the list
 */

/**
 * Returns 'true' if a value is Boolean
 */
const isBoolean = val => 'boolean' === typeof val

const ls = window.localStorage

// keep the state object private so that we can have shared state across components!
const state = reactive({
  appTheme: 'light',
  appThemeAuto: true,
  autoStart: false,
  enableDrag: false,
  saveTime: false,
  showSettings: false,
  taskEditMode: false,
  tasklist: [],
  tasklistTotal: 0
})

export const useStore = () => {
  // getters -- readonly
  const getActiveTasks = computed(() => state.tasklist.filter(task => task.taskActive))
  const getAppTheme = computed(() => state.appTheme)
  const getAppThemeAuto = computed(() => state.appThemeAuto)
  const getAutoStart = computed(() => state.autoStart)
  const getEnableDrag = computed(() => state.enableDrag)
  const getSaveTime = computed(() => state.saveTime)
  const getSettingsDisplay = computed(() => state.showSettings)
  const getTaskEditMode = computed(() => state.taskEditMode)
  const getTasklist = computed(() => state.tasklist)
  const getTasklistTotal = computed(() => state.tasklistTotal)

  //actions
  /**
   * Adds a task to the tasklist.
   * @param {Task} task - the new task object.
   */
  const addTask = task => state.tasklist.push(task)

  /**
   * Deactivates tracking for all tasks in the tasklist.
   */
  const deactivateAll = () => state.tasklist.forEach(task => task.taskActive = false)

  /**
   * Initialize tasklistTotal.
   * Runs when the app starts and makes sure that the correct total time gets calculated and displayed.
   * Will calculate and set the tasklistTotal based on the saved tasks obtained from localStorage or set it to 0 if there are none.
   */
  const initTasklist = () => {
    let newTotal = 0
    
    if (state.saveTime && state.tasklist.length > 0) {
      state.tasklist.forEach(task => newTotal += task.taskTotal)
    }
    
    setState('tasklistTotal', newTotal, true)
  }

  /**
   * Reads one or more keys from localStorage.
   * @param {String[]} storedKeys - a list of keys to obtain from localStorage.
   */
  const readStateFromLS = (storedKeys) => {
    storedKeys.forEach((sKey) => {
      let stored = ls.getItem(sKey)
      let storedState = JSON.parse(stored)

      if ((storedState || isBoolean(storedState)) && sKey in state) {
        state[sKey] = storedState
      }
    })
  }

  /**
   * Removes a task from the tasklist based on its ID.
   * @param {Task} toRemove - the task object that should be removed from the tasklist. 
   */
  const removeTask = (toRemove) => {
    const filtered = (source) => source.filter(task => task.id !== toRemove.id)
    let savedTasks = JSON.parse(ls.getItem('tasklist'))

    state.tasklist = filtered(state.tasklist)

    if (savedTasks?.length > 0) writeStateToLS('tasklist', filtered(savedTasks)) // remove saved tasks so they don't come back on reload
  }

  /**
   * Resets all tracked time.
   */
  const resetSavedTime = () => {
    deactivateAll()
    state.tasklist.forEach(task => task.taskTotal = 0)
    writeStateToLS('tasklist')
    setState('tasklistTotal', 0, true)
  }

  /**
   * Sets a task to active, thereby starting time tracking.
   * @param {String} id - The ID of the task the should be activated.
   */
  const setActiveTask = (id) => {
    state.tasklist.forEach(task => {
      task.id === id ? task.taskActive = true : task.taskActive = false
    })
  }

  /**
   * Sets a task to paused, thereby stopping time tracking.
   * @param {String} id - The ID of the task the should be stopped.
   */
  const setPausedTask = (id) => {
    state.tasklist.forEach(task => {
      if (task.id === id) {
        task.taskActive = false
      }
    })
  }

  /**
   * Sets the value of a specific state key. Can optionally also update localStorage
   * @param {String} key - The name of the state key.
   * @param {(Boolean|Number|Task[]|String)} val - The new value for the specified key.
   * @param {Boolean} ls - Controls whether or not to write the state update into localStorage.
   */
  const setState = (key, val, ls) => {
    state[key] = val
    if (ls) writeStateToLS(key, val) // save key to LS as well
  }

  /**
   * Contols taskEditMode
   * @param {Boolean} isActive Current state
   */
  const setTaskEditMode = (isActive) => {
    state.taskEditMode = isActive
  }

  /**
   * Show/hide the settings menu.
   */
  const toggleSettings = () => { state.showSettings = !state.showSettings }

  /**
   * Updates a specific property on a specific task object.
   * @param {String} id - The ID of the task that should be updated.
   * @param {String} key - The task's property name to update.
   * @param {(Boolean|Number|String)} value - The new value for the updated property.
   */
  const updateTask = (id, key, value) => {
    state.tasklist.forEach(task => {
      if (task.id === id) {
        task[key] = value
      }
    })
  }

  /**
   * Updates information stored in localStorage. Can be used to update all state keys (no params) or to update a single key.
   * Can be used with or without an updated value when updating a single key.
   * @param {String} [targetKey] - The state key to write to localStorage.
   * @param {(Boolean|Number|Task[]|String)} [update] - The updated value for the specified key.
   */
  const writeStateToLS = (targetKey, update) => {
    if (update || isBoolean(update) || typeof update == 'number') {
      ls.setItem(targetKey, JSON.stringify(update))
    } else if (targetKey) {
      ls.setItem(targetKey, JSON.stringify(state[targetKey]))
    } else {
      Object.keys(state).map(key => {
        ls.setItem(key, JSON.stringify(state[key]))
      })
    }
  }

  return {
    activeTasks: getActiveTasks,
    appTheme: getAppTheme,
    appThemeAuto: getAppThemeAuto,
    autoStart: getAutoStart,
    enableDrag: getEnableDrag,
    saveTime: getSaveTime,
    settingsShown: getSettingsDisplay,
    taskEditMode: getTaskEditMode,
    tasklist: getTasklist,
    tasklistTotal: getTasklistTotal,
    addTask,
    deactivateAll,
    initTasklist,
    readStateFromLS,
    removeTask,
    resetSavedTime,
    setActiveTask,
    setPausedTask,
    setState,
    setTaskEditMode,
    toggleSettings,
    updateTask,
    writeStateToLS
  }
}