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