<template>
  <picker :show="show" @mask="mask">
    <div class="picker-dt-wrap">
      <div class="picker-hd">
        <a>取消</a>
        <a>确定</a>
      </div>
      <div ref="PickerBody" class="picker-bd">
        <div picker-type="year" class="picker-group" @click="tapChoose($event)">
          <v-touch class="picker-mask"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <v-touch class="picker-chosen"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <div class="picker-content">
            <div v-for="y in years" class="picker-item">{{y}}年</div>
          </div>
        </div>
        <div picker-type="month" class="picker-group" @click="tapChoose($event)">
          <v-touch class="picker-mask"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <v-touch class="picker-chosen"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <div class="picker-content">
            <div v-for="m in months" class="picker-item">{{m+1}}月</div>
          </div>
        </div>
        <div picker-type="day" class="picker-group" @click="tapChoose($event)">
          <v-touch class="picker-mask"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <v-touch class="picker-chosen"
                   @panstart="touchStart($event)"
                   @panmove="touchMove($event)"
                   @panend="touchEnd($event)">
          </v-touch>
          <div class="picker-content">
            <div v-for="d in days" class="picker-item">{{d}}日</div>
          </div>
        </div>
      </div>
    </div>
  </picker>
</template>
<style lang="scss">
  @import "picker-dt.scss";
</style>
<script>
  import Vue from 'vue'
  const VueTouch = require('vue-touch')
  Vue.use(VueTouch, {name: 'v-touch'})

  import picker from '../picker/picker.vue'
  export default{
    data () {
      let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth();
      return {
        itemHeight: 40,
        chosenIndex: {
          year: 1,
          month: 2,
          day: 30
        },
        years: [1900, 2000, 2001, 2002],
        months: Array.apply(null, Array(12)).map((item, i)=> i),
        panData: {
          startY: 0
        }
      }
    },
    props: {
      show: {
        default: false
      },
    },
    created(){
    },
    updated(){
      // 修正滚轮位置
      this.$refs.PickerBody && this.fixPickerPosition();
    },
    watch: {
      chosenIndex: {
        deep: true,
        handler(){
          this.fixPickerPosition();
        }
      }
    },
    methods: {
      mask(){
        this.$emit('mask')
      },
      /* 根据chosenIndex来修正滚轮的位置 */
      fixPickerPosition(){
        if (this.$refs.PickerBody) {
          let parent = this.$refs.PickerBody;
          let children = this.$refs.PickerBody.children;
          for (let i = 0; i < children.length; i++) {
            let node = children[i],
              type = node.getAttribute('picker-type'),
              index = this.chosenIndex[type],
              targetNode = this.getContentNode(node);
            targetNode.style.top = `${(parent.offsetHeight - this.itemHeight) / 2 - index * this.itemHeight}px`;
          }
        } else {
          console.warn('picker没有dom实例，不能校准选择器位置')
        }
      },
      /* 获取到正确的滚轮节点 */
      getContentNode(groupNode){
        let node = groupNode.firstChild;
        while (!node.classList.contains('picker-content')) {
          node = node.nextElementSibling;
        }
        return node;
      },
      /* 滚轮的点击选择 */
      tapChoose(e){
        e.preventDefault();
        let tar = e.target;
        if (tar.classList.contains('picker-mask')) {
          let parent = tar.parentNode, parentH = parent.clientHeight,
            type = parent.getAttribute('picker-type');
          let distance = e.offsetY - (parentH - this.itemHeight) / 2;
          let disIndex = Math.floor(distance / this.itemHeight);
          let targetIndex = this.chosenIndex[type] + disIndex;
          targetIndex = targetIndex < 0 ? 0 : targetIndex;
          targetIndex = targetIndex >= this[`${type}s`].length ? this[`${type}s`].length - 1 : targetIndex;
          this.chosenIndex[type] = targetIndex;
          console.log(targetIndex)
        }
      },
      /* 处理滚轮的触摸滚动 */
      touchStart(e){
        e.preventDefault();
        let targetNode = this.getContentNode(e.target.parentNode);
        targetNode.style.transition = 'none';
        this.panData.startY = targetNode.style.top.slice(0, -2);
      },
      touchMove(e){
        e.preventDefault();
        let targetNode = this.getContentNode(e.target.parentNode);
        targetNode.style.top = `${parseInt(this.panData.startY) + e.deltaY}px`;
      },
      touchEnd(e){
        e.preventDefault();
        let parent = e.target.parentNode;
        let targetNode = this.getContentNode(parent),
          nowTop = parseInt(targetNode.style.top.slice(0, -2));

        let type = parent.getAttribute('picker-type');
        let targetIndex = Math.round((parent.clientHeight / 2 - nowTop) / this.itemHeight - 0.5);

        targetIndex = targetIndex < 0 ? 0 : targetIndex;
        targetIndex = targetIndex >= this[`${type}s`].length ? this[`${type}s`].length - 1 : targetIndex;

        targetNode.style.transition = null;
        this.chosenIndex[type] = targetIndex;
        this.fixPickerPosition();
      }
    },
    computed: {
      days: {
        get(){
          let year = this.years[this.chosenIndex.year],
            month = this.months[this.chosenIndex.month] + 1, days;
          if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
            days = Array.apply(null, Array(31)).map((item, i)=> i + 1);
          } else if (month == 2) {
            if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
              days = Array.apply(null, Array(29)).map((item, i)=> i + 1);
            } else {
              days = Array.apply(null, Array(28)).map((item, i)=> i + 1);
            }
          } else {
            days = Array.apply(null, Array(30)).map((item, i)=> i + 1);
          }
          if (this.chosenIndex.day - days.length > -1) {
            this.chosenIndex.day = days.length - 1;
          }
          return days;
        }
      }
    },
    components: {picker}
  }
</script>
