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
    @apply bg-transparent border-b-2 border-gray-mid rounded-lg px-3 py-2;
  }

  .input-task:hover {
    @apply bg-white border-secondary-light;
  }

  .input-task:focus {
    @apply border-secondary-light outline-none shadow-outline;
  }
</style>