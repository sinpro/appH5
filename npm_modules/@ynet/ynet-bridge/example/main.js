import Vue from 'vue'
import FastClick from 'fastclick'
import router from './src/router';
import App from './App.vue';
import bridge from '../src/index';
import './components'

FastClick.attach(document.body)

const app = new Vue({
    router,
    ...App,
});

window.api = bridge

app.$mount('#app')