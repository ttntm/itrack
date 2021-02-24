<template>
  <input
    :value="modelValue"
    type="text"
    :placeholder="pch"
    v-focus="true"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'InputText',
  props: {
    modelValue: String,
    pch: String
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