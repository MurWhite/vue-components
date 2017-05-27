/**
 * Created by B on 2017/5/15.
 */
import pkDate from './picker-dt.vue';

module.exports = {
  install(Vue){
    let pkdComponent = Vue.extend({
      template: `<pk-date :range="{from:'2016-08-02',to:'2016-08-05'}" :show="true"></pk-date>`,
      components: {pkDate}
    });
    // new pkd().$mount().appendTo('body');
    let pkd = new pkdComponent().$mount();
    document.body.appendChild(pkd.$el)
  }
};
