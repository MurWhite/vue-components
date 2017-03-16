<template>
  <div class="modals-wrap">
    <div>this is Dialog body</div>
    <btn class="btn btn_primary" @click="show('modal')">显示最简单modal</btn>
    <btn class="btn btn_primary" @click="show('modal','dialog')">显示对话框</btn>
    <btn class="btn btn_primary" @click="show('picker','dialog')">选择器</btn>
    <btn class="btn btn_primary" @click="show('dtpicker')">日期选择器-年月日</btn>
    <modal :show="modal.show" :type="modal.type" title="标题"
           @close="modal.show = false" @mask="modal.show = false">
      <div slot="body" style="padding: 1rem">
        我是对话框的内容<br/>
        footer使用btn_group的className来展示flex布局，或者使用自己喜欢的样式<br/>
        这个只是比上一个内置了背景色，圆角和标题后的横线<br/>
        按钮使用的是button组件
      </div>
      <div slot="footer" class="btn_group">
        <btn class="btn btn_primary">按钮1</btn>
        <btn class="btn dp-orange">按钮1</btn>
        <btn class="btn mt-yellow">按钮2</btn>
      </div>
    </modal>
    <picker :show="picker.show" @mask="picker.show=false" />
    <keep-alive>
      <dtpicker :show="dtpicker.show" @mask="dtpicker.show=false"></dtpicker>
    </keep-alive>
  </div>
</template>
<style lang="scss">
  @import "../../components/assests/debris.scss";
  .modals-wrap {
    z-index: 99;
  }
  .modals-wrap>.btn{
    margin: 1rem;
  }
</style>
<script>
  import modal from '../../components/modal/modal.vue'
//  import btn from '../../components/button/button.vue'
  import btn from 'button'
  import picker from '../../components/picker/picker.vue'
  import dtpicker from '../../components/picker-dt/picker-dt.vue'

  export default{
    data () {
      return {
        modal:{
          show: false
        },
        picker:{
          show: false
        },
        dtpicker:{
          show: false
        }
      }
    },
    methods:{
      show(module,arg){
        this[module].show = true
        this[module].type = arg
      }
    },
    components: {modal, btn, picker, dtpicker}
  }
</script>
