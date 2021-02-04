<template>
  <div class="flex justify-between">
    <p>{{ task.id }} - {{ task.name }}</p>
    <button @click="$emit('remove:task', task)">&times;</button>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object
  },
  emits: ['remove:task']
}
</script>

<style>

</style>