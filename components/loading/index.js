import loadingComponent from './index.vue'

module.exports = {
  install(Vue, options){
    let instance = {
      entity: null
    };

    Vue.prototype.$loading = function (options) {
      let msg = '';
      if (typeof options === 'object') {
        msg = options.msg || msg;
      } else if (typeof options === 'string' || typeof options === 'number') {
        msg = options;
      }
      if (options === null || options === undefined) {
        instance.entity && (instance.entity.show = false);
        return;
      }
      if (instance.entity) {
        instance.entity.msg = msg;
        instance.entity.type = 'loading';
        instance.entity.show = true;
      } else {
        instance.entity = new Vue(loadingComponent);
        document.body.appendChild(instance.entity.$mount().$el);
        instance.entity.msg = msg;
        instance.entity.type = 'loading';
        instance.entity.show = true;
      }
    };

    Vue.prototype.$success = function (options) {
      let msg = '';
      if (typeof options === 'object') {
        msg = options.msg || msg;
      } else if (typeof options === 'string' || typeof options === 'number') {
        msg = options;
      }
      if (options === null || options === undefined) {
        instance.entity && (instance.entity.show = false);
        return;
      }
      if (instance.entity) {
        instance.entity.msg = msg;
        instance.entity.type = 'success';
        instance.entity.show = true;
        setTimeout(()=>{
          instance.entity.show = false;
        }, 800)
      } else {
        instance.entity = new Vue(loadingComponent);
        document.body.appendChild(instance.entity.$mount().$el);
        instance.entity.msg = msg;
        instance.entity.type = 'success';
        instance.entity.show = true;
      }
    }
  }
};
