<template>
  <input
    :value="modelValue"
    type="text"
    placeholder="Do something..."
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  name: 'InputText',
  props: {
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>

<style>

</style>