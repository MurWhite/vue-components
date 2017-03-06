<template>
  <div class="modals-wrap">
    <div>this is Dialog body</div>
    <btn class="btn btn_primary" @click="toggle">显示简单modal</btn>
    <btn class="btn btn_primary" @click="toggle('dialog')">显示对话框</btn>
    <modal :show="modal.show" :type="modal.type"
           @close="modal.show = false">
      <div slot="body">我是对话框的内容</div>
      <div slot="footer">
        <btn class="btn dp-orange">内容</btn>
      </div>
    </modal>
  </div>
</template>
<style lang="scss">
  @import "../../components/assests/reset.scss";
  @import "../../components/assests/debris.scss";
  .modals-wrap {
    z-index: 99;
  }
</style>
<script>
  import modal from '../../components/modal/modal.vue'
  import btn from '../../components/button/button.vue'

  export default{
    data () {
      return {
        modal:{
          show: false,
          title: "你好我是字符串title"
        }
      }
    },
    methods:{
      toggle(type){
        this.modal.show = true;
        this.modal.type = type;
      }
    },
    components: {modal, btn}
  }
</script>
