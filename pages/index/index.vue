<template>
  <div class="wrap">
    <div>表单元素</div>
    <router-link to="buttons" class="index-a">按钮</router-link>
    <router-link to="modals" class="index-a">Dialogs</router-link>
    <transition name="slide-fade">
      <router-view class="drawer-wrap"></router-view>
    </transition>
  </div>
</template>
<script>
  export default{
    data () {
      return {}
    },
    components: {}
  }
</script>
<style lang="scss">
  @import "../../components/animation/animation.scss";

  .index-a{
    display: block;
  }
  .drawer-wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f8f8f8;
  }


</style>
