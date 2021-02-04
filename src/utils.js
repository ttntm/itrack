export const formatTime = (input) => {
  let min = input / 60;
  min = min.toString().split('.')[0];
  let sec = input - (min * 60);
  return `${min}:${sec}`
}