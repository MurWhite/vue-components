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
        btn mt-yellow disabled icon-loading
      </btn>
    </div>
    <div>
      <btn class="btn btn_mini btn_primary" @click="toast">toast</btn>
      <btn class="btn btn_mini btn_primary" @click="loading('正在加载')">loading</btn>
      <btn class="btn btn_mini btn_primary" @click="loading">cancel loading</btn>
      <btn class="btn btn_mini btn_primary" @click="success">loading success</btn>
    </div>
  </div>
</template>
<style lang="scss">

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
      return {
        count: 0
      }
    },
    components: {btn},
    methods: {
      toast(){
        this.$toast('click' + this.count++)
      },
      loading(msg){
        this.$loading(msg)
      },
      success(msg){
        this.$loading('正在加载')
        setTimeout(()=>{
          this.$success('加载成功')
        },1000)
      }
    }
  }
</script>
