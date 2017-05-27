<template>
  <transition name="toast-ts">
    <div v-if="show" class="toast-wrap">{{msg}}</div>
  </transition>
</template>
<style scoped>
  .toast-wrap {
    position: fixed;
    z-index: 2050;
    top: 0;
    left: 50%;
    max-width: 70%;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 1.4rem;
    line-height: 1.2;
    padding: .8rem 1.5rem;
    border-radius: .2rem;
    transition: all 300ms ease;
    transform: translate3d(-50%, 2rem, 0);
  }

  .toast-ts-enter, .toast-ts-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }
</style>
<script>
  export default{
    data () {
      return {
        show: false,
        msg: '',
        duration: '',
        ts: '',
        closeEmit: undefined
      }
    },
    watch: {
      ts(){
        this.initCloseEmit();
      },
      show(to){
        if(to){
          this.initCloseEmit();
        }
      }
    },
    methods: {
      initCloseEmit(){
        if (this.closeEmit) {
          clearTimeout(this.closeEmit);
        }
        this.closeEmit = setTimeout(() => {
          this.show = false;
          this.closeEmit = undefined;
        }, this.duration || 2000);
      }
    }
  }
</script>
