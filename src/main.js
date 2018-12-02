import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import numeral from 'numeral'
import Toasted from 'vue-toasted'
import Moment from 'vue-moment'

Vue.use(Moment)
Vue.use(BootstrapVue)
Vue.use(Toasted, {
  position:'top-center',
  duration:5000,
  iconPack:"fontawesome"
})
Vue.config.productionTip = false

Vue.filter("formatNumber",function(value){
  return numeral(value).format("0,0");
})

Vue.filter("timeConvert",function(value){
  var minutes = Math.floor(value / 60000);
  var seconds = ((value % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
})

// automatically capture failed requests and refresh token
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  const originalRequest = error.config;

  if (error.response.status >= 400 && !originalRequest._retry) {

    originalRequest._retry = true;

    // const refreshToken = window.localStorage.getItem('refreshToken');
    const refreshToken = store.state.refreshToken
    return axios.get('http://localhost:8888/refresh?refreshToken=' + refreshToken)
      .then(({data}) => {
        store.state.accessToken = data.accessToken
        store.state.refreshToken = data.refreshToken
        
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
        return axios(originalRequest);
      });
  }

  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

