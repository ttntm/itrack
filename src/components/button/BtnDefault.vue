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
    @apply bg-teal-500 text-gray-200 border border-transparent shadow px-8 py-2
  }

  .btn-default:hover {
    @apply bg-transparent text-teal-500 border-teal-500 shadow-none;
  }
</style>