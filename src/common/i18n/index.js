import Vue from 'vue';
import VueI18n from 'vue-i18n'
import zh_cn from './lang/zh-cn';
import en from './lang/en';
import zh_hk from './lang/zh-hk';

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: window.localStorage.getItem('lang') || 'zh-cn',
    messages: {
        'zh-cn': zh_cn,
        'zh-hk': zh_hk,
        'en': en
    }
})

export default i18n;