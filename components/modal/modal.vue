<template>
  <transition name="fade">
    <div v-if="show" class="modal-wrap">
      <div class="mask" @click="mask"></div>
      <div v-if=" type=='' " class="modal">
        <slot>这只是一个modal，内容完全你自己决定，甚至背景色我都不管你，我只是帮你做了居中</slot>
      </div>
      <div v-else-if=" type=='dialog' " class="modal modal-dialog">
        <div v-if="title" class="modal-hd">{{title}}</div>
        <div class="modal-bd">
          <slot name="body">slot为body的内容出现在这里</slot>
        </div>
        <div class="modal-ft">
          <slot name="footer">slot为footer的内容出现在这里</slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
  @import "modal.scss";
  @import "../assests/mask.scss";
  @import "../../components/animation/animation.scss";
</style>
<script>
  export default{
    data () {
      return {
        pageScrollTop: 0
      }
    },
    props: {
      show: Boolean,
      type: {
        type: String,
        default: ''
      },
      title: String
    },
    watch: {
      show(to){
        /* 阻止滚动穿透 */
        if (to) {
          this.pageScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          document.body.classList.add('modal-show');
          document.body.style.top = -this.pageScrollTop + 'px';
        } else {
          document.body.classList.remove('modal-show');
          document.body.scrollTop = document.documentElement.scrollTop = this.pageScrollTop;
        }
      }
    },
    methods: {
      mask(e){
        e.preventDefault();
        e.stopPropagation();
        this.$emit('mask')
      },
      close(e){
        e.preventDefault();
        e.stopPropagation();
        this.$emit('close')
      }
    },
    components: {}
  }
</script>
