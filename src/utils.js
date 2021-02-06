import { useStore } from './store.js';

const { appTheme } = useStore();

export const formatTime = (input) => {
  let min = input / 60;

  min = min.toString().split('.')[0];

  let sec = input - (min * 60);

  return `${(min < 10 ? '0' : '') + min}:${(sec < 10 ? '0' : '') + sec}`
}

export const applyTheme = (theme) => {
  if (appTheme.value) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}