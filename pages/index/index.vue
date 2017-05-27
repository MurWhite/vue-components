<template>
  <div class="wrap">
    <div>表单元素</div>
    <router-link to="buttons" class="btn btn_primary">按钮</router-link>
    <router-link to="modals" class="btn btn_primary">弹出层,使用mask遮罩</router-link>
    <router-link to="modals" class="btn btn_primary"></router-link>
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
  @import "../../components/assest/reset.scss";
  @import "../../components/animation/animation.scss";

  .wrap>.btn{
    margin: 1rem;
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
