<template lang="html">
  <div class="sizeItem">
    <span>尺寸：</span>
    <span v-for="(item,index) in sizeType" :class="{disabled: item.state === 2, active: item.state === 1}" @click="sizeItemClick(item)" :key="index">
        {{item.type}}
      </span>
  </div>
</template>

<script>
export default {
  name: 'sizeItem',
  props: ['sizeType'],
  data () {
    return {

    }
  },
  methods: {
    sizeItemClick (item) {
      this.$root.$emit('size-change', item)
    }
  }
}
</script>

<style lang="css" scoped>
  .sizeItem {
    width: 100%;
  }

  .sizeItem span:nth-child(n+2) {
    display: inline-block;
    width: 70px;
    text-align: center;
    border: 2px solid #000;
    margin: 5px;
    padding: 3px 5px;
    cursor: pointer;
  }

  .sizeItem span.active {
    border-color: red;
    color: red;
  }

  .sizeItem span.disabled {
    border: 2px dashed #ccc;
    color: #ccc;
  }
</style>
