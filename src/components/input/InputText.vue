<template>
  <input
    :value="modelValue"
    class="input-task"
    type="text"
    placeholder="Fancy task name..."
    v-focus="true"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'InputText',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue'],
  directives: {
    focus: {
      mounted(el, binding) {
        if (binding.value) {
          el.focus();
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  .input-task {
    @apply border-b-2 rounded-lg px-3 py-2;
    background-color: var(--inputColor);
    border-color: var(--inputBorder);
  }

  .input-task:hover {
    background-color: var(--inputHoverColor);
    border-color: var(--inputHoverBorder);
  }

  .input-task:focus {
    @apply outline-none shadow-outline;
    background-color: var(--inputHoverColor);
    border-color: var(--inputHoverBorder);
  }
</style>