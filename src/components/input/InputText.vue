<template>
  <input
    :value="modelValue"
    class="input-task"
    type="text"
    placeholder="Do something..."
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
    @apply border-b-2 border-teal-500 rounded px-3 py-2;
  }

  .input-task:hover {
    @apply bg-gray-100;
  }

  .input-task:focus {
    @apply outline-none shadow-outline;
  }
</style>