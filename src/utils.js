import { useStore } from './store.js';

const { appTheme } = useStore();

export const applyTheme = (theme) => {
  if (appTheme.value) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export const formatTime = (input) => {
  let hrs = input / 3600;
  hrs = hrs.toString().split('.')[0];

  let min = (input / 60) - (hrs * 60);
  min = min.toString().split('.')[0];

  let sec = input - (min * 60) - (hrs * 3600);

  return hrs > 0 ?
    `${(hrs < 10 ? '0' : '') + hrs}:${(min < 10 ? '0' : '') + min}:${(sec < 10 ? '0' : '') + sec}` :
    `${(min < 10 ? '0' : '') + min}:${(sec < 10 ? '0' : '') + sec}`;
}

export const getDate = () => {
  const date = new Date();

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-US', dateOptions);
}