<template>
  <div class="flex justify-start items-center mb-4">
    <div 
      :class="{ 'bg-primary' : modelValue, 'bg-gray-mid' : !modelValue }"
      class="relative rounded-full w-12 h-6 flex-shrink-0 shadow-inner transition duration-200 ease-linear"
    >
      <label 
        :for="name"
        :class="{ 'translate-x-full border-primary' : modelValue, 'translate-x-0 border-gray-dark' : !modelValue }"
        class="absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full shadow-sm transition transform duration-100 ease-linear cursor-pointer" 
      ></label>
      <input type="checkbox" 
        :id="name" 
        :name="name" 
        :checked="modelValue" 
        class="appearance-none w-full h-full outline-none" 
        @click="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <span class="block ml-4">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'InputToggle',
  props: {
    modelValue: Boolean,
    name: String
  },
  emits: ['update:modelValue']
}
</script>