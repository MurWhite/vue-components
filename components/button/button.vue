<template>
  <a href="javascript:;" @click="handleClick" :class="{'disabled':disabled}">
    <span v-if="disabled && loadingText">
      {{loadingText}}
    </span>
    <slot v-else></slot>
  </a>
</template>
<style lang="scss">
  @import "button.scss";
</style>
<script>

  export default{
    data () {
      return {
      }
    },
    props:{
      loadingText: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed:{
    },
    methods:{
      handleClick(){
        // 自定义一些预先处理
        this.$emit('click')
      }
    }
  }
</script>
