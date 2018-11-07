<template>
  <div class="setItemPop border-bottom">
    <span class="setProperty">{{setPro}}</span>
    <input type="text" class="setInfoInput" v-if="inputData !== undefined" v-model="inputData" readonly>
    <i class="setIcon" v-else></i>
  </div>
</template>
<script>
export default {
  props: {
    setPro: '',
    inputData: ''
  }
}
</script>
