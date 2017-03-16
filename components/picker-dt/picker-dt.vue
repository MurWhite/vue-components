<template>
  <picker :show="show" @mask="mask">
    <div class="picker-dt-wrap">
      <div class="picker-hd">
        <a>取消</a>
        <a>确定</a>
      </div>
      <div ref="PickerBody" class="picker-bd">
        <div picker-type="year" class="picker-group" @click="choose($event)">
          <div class="picker-mask"></div>
          <div class="picker-chosen"></div>
          <div class="picker-content" style="top:104px">
            <div v-for="y in data.years" class="picker-item">{{y}}年</div>
          </div>
        </div>
        <div picker-type="month" class="picker-group" @click="choose($event)">
          <div class="picker-mask"></div>
          <div class="picker-chosen"></div>
          <div class="picker-content" style="top:104px">
            <div v-for="m in data.months" class="picker-item">{{m+1}}月</div>
          </div>
        </div>
        <div picker-type="day" class="picker-group" @click="choose($event)">
          <div class="picker-mask"></div>
          <div class="picker-chosen"></div>
          <div class="picker-content" style="top:104px">
            <div v-for="d in data.days" class="picker-item">{{d}}</div>
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
  import picker from '../picker/picker.vue'
  export default{
    data () {
      let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth();
      return {
        itemHeight: 30,
        data: {
          chosenIndex: {
            year: 1,
            month: 2,
            day: 1
          },
          years: [1900, 2000, 2001, 2002],
          months: Array.apply(null, Array(12)).map((item, i)=> i),
        }
      }
    },
    props: {
      show: {
        default: false
      },
      start: {
        validator(val){
        }
      },
      end: '',
    },
    created(){
    },
    updated(){
      // 修正滚轮位置
      this.$refs.PickerBody && this.fixPickerPosition();
    },
    watch: {
      'data.chosenIndex': {
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
      choose(e){
        e.preventDefault();
        e.stopPropagation();
        let tar = e.target;
        if (tar.classList.contains('picker-mask')) {
          let parent = tar.parentNode, parentH = parent.clientHeight,
            type = parent.getAttribute('picker-type');
          let distance = e.offsetY - (parentH - this.itemHeight) / 2;
          let disIndex = Math.floor(distance / this.itemHeight);

          let targetIndex = this.data.chosenIndex[type] + disIndex;
          targetIndex = targetIndex < 0 ? 0 : targetIndex;
          targetIndex = targetIndex >= this.data[`${type}s`].length ? this.data[`${type}s`].length - 1 : targetIndex;
          this.data.chosenIndex[type] = targetIndex;
        }
      },
      getContentNode(groupNode){
        let node = groupNode.firstChild;
        while (!node.classList.contains('picker-content')) {
          node = node.nextElementSibling;
        }
        return node;
      },
      fixPickerPosition(){
        if (this.$refs.PickerBody) {
          let parent = this.$refs.PickerBody;
          let children = this.$refs.PickerBody.children;
          for (let i = 0; i < children.length; i++) {
            let node = children[i],
              type = node.getAttribute('picker-type'),
              index = this.data.chosenIndex[type],
              targetNode = this.getContentNode(node);
            targetNode.style.top = `${(parent.offsetHeight - this.itemHeight) / 2 - index * this.itemHeight}px`;
          }
        } else {
          console.warn('picker没有dom实例，不能校准选择器位置')
        }
      },
      checkValiDate(date){
        if (typeof date == String) {
        }
      },
    },
    computed: {
      'data.days': {
        get(){
          let year = this.data.years[this.data.chosen.year],
            month = this.data.months[this.data.chosen.month], days;
          if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
            days = Array.apply(null, Array(31)).map((item, i)=> i + 1)
          } else if (month == 2) {
            if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
              days = Array.apply(null, Array(29)).map((item, i)=> i + 1);
            } else {
              days = Array.apply(null, Array(28)).map((item, i)=> i + 1);
            }
          }
          return days;
        }
      }
    },
    components: {picker}
  }
</script>
