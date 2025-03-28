<script setup>
  import FileSaver from 'file-saver'
  import Papa from 'papaparse'
  import { ref } from 'vue'
  import { useStore } from '@/store.js'
  import { formatTime, getTimestamp } from '@/utils.js'

  const { tasklist } = useStore()

  const btnExport = ref()

  const onExport = () => {
    let data = JSON.parse(JSON.stringify(tasklist.value))
    data.forEach((t) => t.taskTotal = formatTime(t.taskTotal))

    const rows = Papa.unparse(data, { header: true })
    const rowsAsBlob = new Blob([rows], { type: 'text/plaincharset=utf-8' })

    FileSaver.saveAs(rowsAsBlob, `tasklist${getTimestamp()}.csv`)

    btnExport.value.blur()
  }
</script>

<template>
  <button
    class="btn-scale flex items-center outline-none text-xs text-gray-mid hover:text-gray-dark focus:outline-none focus:shadow-outline"
    title="Export Task List to CSV"
    ref="btnExport"
    @click="onExport"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
    </svg>
  </button>
</template>
