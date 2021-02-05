<template>
  <button class="btn btn-default">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BtnDefault'
}
</script>

<style lang="postcss" scoped>
  .btn-default {
    @apply bg-secondary-light text-primary-light border border-transparent shadow px-8 py-2
  }

  .btn-default:hover {
    @apply bg-primary-light text-secondary-light border-primary-light shadow-none;
  }
</style>