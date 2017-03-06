<template>
  <div>
    <router-link to="/">样式展示</router-link>
    <div class="btn-group">
      <btn class="btn">btn</btn>
      <btn class="btn disabled">btn disabled</btn>
      <btn class="btn btn_primary">btn btn_primary</btn>
      <btn class="btn btn_primary disabled">btn btn_primary disabled</btn>
      <btn class="btn dp-orange">btn dp-orange</btn>
      <btn class="btn dp-orange disabled">btn dp-orange disabled</btn>
      <btn class="btn mt-yellow">btn mt-yellow</btn>
      <btn class="btn mt-yellow disabled">btn mt-yellow disabled</btn>
      <btn class="btn mt-yellow disabled">
        <i class="icon icon-loading"></i>
        btn mt-yellow disabled icon-loading
      </btn>
    </div>
    <div>
      <btn class="btn btn_mini btn_primary">小按钮</btn>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../../components/assests/icon.scss";
  @import "../../components/animation/animation.scss";

  .btn-group {
    padding: 1rem;
  }

  .btn-group .btn {
    margin-top: 1rem;
  }
</style>
<script>
  import btn from '../../components/button/button.vue'

  export default{
    data () {
      return {}
    },
    components: {btn}
  }
</script>
