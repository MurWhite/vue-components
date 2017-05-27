<template>
  <transition name="loading-ts">
    <div v-if="show" class="loading-wrap">
      <img v-if="type==='loading'" src="../assest/gif-loading.gif">
      <i v-else-if="type==='success'" class="iconfont icon-circle-check"></i>
      <p v-show="msg">{{msg}}</p>
    </div>
  </transition>
</template>
<style scoped>
  @import "../debris/iconfont.scss";
  .loading-wrap {
    position: fixed;
    z-index: 2051;
    min-width: 4rem;
    max-height: 80%;
    top: 50%;
    left: 50%;
    max-width: 70%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 1.5rem;
    border-radius: .2rem;
    transition: opacity 300ms ease;
    transform: translate3d(-50%, -50%, 0);
    opacity: 1;
  }

  .loading-wrap img {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    display: block;
  }

  .loading-wrap p {
    min-width: 5rem;
    margin: .5rem 0 0 0;
    padding: 0;
    font-size: 1.4rem;
    line-height: 1.5rem;
    word-wrap: break-word;
    overflow: hidden;
  }
  .loading-wrap .iconfont{
    font-size: 3.7rem;
    line-height: 4rem;
  }

  .loading-ts-enter, .loading-ts-leave-active {
    opacity: 0;
  }
</style>
<script>
  export default{
    data () {
      return {
        show: false,
        msg: '',
        type: 'loading'
      }
    }
  }
</script>
