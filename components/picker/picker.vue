<template>
  <transition name="fade" v-on:enter="bgEnter">
    <div v-if="showBg" class="picker-wrap">
      <div class="mask" @click="maskClick"></div>
      <transition name="popup-fade"
                  v-on:after-enter="afterPickerEnter"
                  v-on:after-leave="afterPickerLeave">
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
        showPicker: false,
        showBg: false
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch:{
      show(to){
        if(to == false){
          this.showPicker = false;
        }else{
          this.showBg = true;
        }
      }
    },
    methods: {
      maskClick(){
        this.$emit('mask');
      },
      bgEnter(){
        this.showPicker = true
      },
      afterPickerLeave(){
        this.showBg = false;
      },
      afterPickerEnter(){
        this.$emit('afterShow')
      }
    },
    components: {}
  }
</script>
