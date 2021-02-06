<template>
  <button :class="{ 'control-active' : active }" class="btn btn-control" :title="btnTitle">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnPause',
  props: {
    active: Boolean,
    btnTitle: String
  }
}
</script>

<style lang="postcss" scoped>
  .control-active {
    @apply text-secondary bg-primary;
  }

  .control-active:hover {
    @apply text-primary bg-secondary;
  }
</style>