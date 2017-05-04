<template>
  <picker :show="show" @mask="emit('mask')" @afterShow="initPicker">
    <div class="picker-dt-wrap">
      <div class="picker-hd">
        <a href="javascript:;" @click="emit('cancel')">取消</a>
        <a href="javascript:;" @click="confirm">确定</a>
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
        month = now.getMonth(),
        day = now.getDate();
      return {
        itemHeight: 40,
        chosenIndex: {
          year: 5,
          month: month,
          day: day - 1
        },
        months: Array.apply(null, Array(12)).map((item, i)=> i),
        panData: {
          startY: 0,
          lastTs: 0,
          lastY: 0
        },
        dateRange: [
          {from: '', to: ''}
        ]
      }
    },
    props: {
      show: {
        default: false
      },
      years: {
        type: Array,
        default(){
          let nY = new Date().getFullYear();
          return Array.apply(null, Array(10)).map((item, i)=> nY + i - 5)
        }
      },
      range: {
        validator(val){
          let from, to;
          if (typeof val === 'string' || typeof val === 'number') {
            console.log('初始值：', val);
            let range = getRange(val);
            if (!range) {
              return false;
            }
          }
          else if (Object.prototype.toString.call(val) === '[object Array]') {
            console.log('初始数组是', val);
            let rangeArr = val.map(item=> {
              return getRange(item)
            });
            if (!rangeArr.every(item=>item !== null)) {
              return false
            }
          }
          else if (Object.prototype.toString.call(val) === '[object Object]') {
            console.log('初始对象是：', val);
            let range = getRange(val.from, val.to);
            if(!range) return false;
            if (range && range.to - range.from < 0) {
              console.error('结束时间不能小于开始时间', range);
              return false;
            }
          }
          else {
            console.warn(`range(${typeof val})不是合适的类型`);
            return false;
          }
          console.info('合法的时间啊')
          return true;

          function getRange(fromStr, toStr) {
            let from = getValidDate(fromStr, 'start');
            if (!from) {
              console.error(`${fromStr}不是合法的日期`);
              return null;
            }
            toStr = toStr || fromStr;
            let to = getValidDate(toStr, 'end');
            if (!to) {
              console.error(`${toStr}不是合法的日期`);
              return null;
            }
            return {from: from, to: to}
          }

          function getValidDate(date, trend) {
            date += '';
            let d = new Date(date);
            if (d == 'Invalid Date') {
              return null;
            }
            if (trend && trend === 'end') {
              let dArr = date.split('-');
              let month = dArr[2] ? (dArr[1] - 1) : dArr[1];
              // new Date(year,month,date)默认是本地早上0点
              // new Date(string)默认是格里尼治0点
              // 此处统一为格林尼治时间
              let offset = new Date().getTimezoneOffset() / 60;
              return new Date(dArr[0], dArr[1] ? month : 12, dArr[2] || -0, -offset);
            }
            return d;
          }
        }
      },
      value: String
    },
    watch: {
      chosenIndex: {
        deep: true,
        handler(){
          this.fixPickerPosition();
        }
      }
    },
//    model: {
//      prop: 'checked',
//      event: 'change'
//    },
    methods: {
      initPicker(){
        this.$refs.PickerBody && this.fixPickerPosition();
        console.log(this.range)
      },
      emit(action){
        this.$emit(action)
      },
      confirm(){
        this.$emit('confirm', {ts: this.chosenDate.getTime()})
      },

      /*日期修正的方法*/
      getValidDate(date){

        return null;
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
          this.$emit('input',this.chosenDate.getTime()+'')
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
        }
      },
      /* 处理滚轮的触摸滚动 */
      touchStart(e){
        e.preventDefault();
        let targetNode = this.getContentNode(e.target.parentNode);
        targetNode.style.transition = 'none';
        this.panData.startY = targetNode.style.top.slice(0, -2);

        /*惯性滑动处理*/
        this.panData.lastTs = e.timeStamp;
        this.panData.deltaY = 0;
      },
      touchMove(e){
        e.preventDefault();
        let targetNode = this.getContentNode(e.target.parentNode);
        targetNode.style.top = `${parseInt(this.panData.startY) + e.deltaY}px`;

        /*惯性滑动处理*/
        if (e.timeStamp - this.panData.lastTs > 300) {
          this.panData.lastTs = e.timeStamp;
          this.panData.deltaY = e.deltaY - this.panData.deltaY;
        }
      },
      touchEnd(e){
        e.preventDefault();
        let parent = e.target.parentNode;
        let targetNode = this.getContentNode(parent),
          nowTop = parseInt(targetNode.style.top.slice(0, -2));

        /*惯性滑动处理*/
        let dT = e.timeStamp - this.panData.lastTs, dS = e.deltaY - this.panData.deltaY;
        let dD = -Math.pow(dS / dT, 2) / (2 * -0.006);   // 加速度距离公式 v*v - v0*v0 = 2ax
        if (dS < 0) {
          dD = -dD
        }
        nowTop += dD;

        let type = parent.getAttribute('picker-type');
        let targetIndex = Math.round((parent.clientHeight / 2 - nowTop) / this.itemHeight - 0.5);

        targetIndex = targetIndex < 0 ? 0 : targetIndex;
        targetIndex = targetIndex >= this[`${type}s`].length ? this[`${type}s`].length - 1 : targetIndex;

        targetNode.style.transition = null;
        this.chosenIndex[type] = targetIndex;
        this.fixPickerPosition()
      }
    },
    computed: {
      days() {
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
      },
      chosenDate(){
        let chosen = this.chosenIndex,
          date = new Date(this.years[chosen.year], this.months[chosen.month], this.days[chosen.day]);
        return date;
      }
    },
    components: {picker}
  }
</script>
