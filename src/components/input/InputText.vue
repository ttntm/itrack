<script setup>
  import { onMounted, ref } from 'vue'

  const props = defineProps({
    modelValue: String,
    pch: String
  })

  const emit = defineEmits(['update:modelValue'])

  const input = ref()

  onMounted(() => input.value.focus())
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