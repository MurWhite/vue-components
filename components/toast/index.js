import toastComponent from './index.vue'

module.exports = {
  install(Vue, options){
    let instance = {
      entity: null,
      duration: 2000,
    };
    if (options) {
      instance.duration = options.duration || 2000;
    }

    Vue.prototype.$toast = function (options) {
      let msg = '', duration = options.duration || instance.duration;
      if (typeof options === 'object') {
        msg = options.msg || instance.msg;
        duration = options.duration || instance.duration;
      } else if (typeof options === 'string' || typeof options === 'number') {
        msg = options;
      }
      if (msg === '') {
        return;
      }
      if (instance.entity) {
        instance.entity.show = true;
        instance.entity.msg = msg;
        instance.entity.ts = new Date().getTime();
      } else {
        instance.entity = new Vue(toastComponent);
        document.body.appendChild(instance.entity.$mount().$el);
        instance.entity.msg = msg;
        instance.entity.duration = duration;
        instance.entity.show = true;
      }
    }
  }
};
