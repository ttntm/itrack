<script setup>
  import { onMounted, ref } from 'vue'

  const props = defineProps({
    autofocus: Boolean,
    modelValue: String,
    pch: String
  })

  const emit = defineEmits(['update:modelValue'])

  const input = ref()

  onMounted(() => {
    if (props.autofocus) input.value.focus()
  })
</script>

<template>
  <input
    :value="modelValue"
    type="text"
    :placeholder="pch"
    ref="input"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>