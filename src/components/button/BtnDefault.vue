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
    @apply border border-transparent shadow px-8 py-2;
    background-color: var(--buttonColor);
    color: var(--buttonText);
  }

  .btn-default:hover {
    @apply shadow-none;
    background-color: var(--buttonHoverColor);
    color: var(--buttonHoverText);
    border-color: var(--buttonHoverText);
  }
</style>