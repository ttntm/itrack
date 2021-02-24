import { createApp } from 'vue'
import App from './App.vue'
import('./index.css');

const app = createApp(App);

let escHandler = null;
let handleOutsideClick = null;

app.directive('click-outside', {
  beforeMount(el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation();
      if(!el.contains(e.target) && !e.target.classList.contains('click-outside-ignore')) {
        binding.value();
      }
    }
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  }
});

app.directive('esc', {
  beforeMount(el, binding, vnode) {
    escHandler = (e) => {
      if (e.key=='Escape' || e.key=='Esc' || e.keyCode==27) {
        binding.value();
      }
    }
    document.addEventListener('keydown', escHandler);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', escHandler);
  }
});

app.mount('#app');