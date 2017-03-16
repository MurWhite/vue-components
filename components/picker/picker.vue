<template>
  <transition name="fade" v-on:enter="enter">
    <div v-if="show" class="picker-wrap">
      <div class="mask" @click="mask"></div>
      <transition name="popup-fade" v-on:after-leave="afterLeave">
        <div v-if="showPicker" class="picker">
          <slot>空白的popup</slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<style lang="scss">
  @import "../assests/mask.scss";
  @import "picker.scss";
  @import "../../components/animation/animation.scss";
</style>
<script>
  export default{
    data () {
      return {
        showPicker: false
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      mask(){
        this.showPicker = false;
      },
      enter(){
        this.showPicker = true
      },
      afterLeave(){
        this.$emit('mask');
      }
    },
    components: {}
  }
</script>
