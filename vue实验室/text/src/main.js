import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import enterReplace from '@/components/enterReplace.vue';
Vue.use(ElementUI);
Vue.component('enterReplace', enterReplace)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
