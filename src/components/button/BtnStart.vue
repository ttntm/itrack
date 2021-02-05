<template>
  <button class="btn btn-control" :title="btnTitle">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 4v16l13 -8z" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnStart',
  props: {
    btnTitle: String
  }
}
</script>