
import vue from 'vue'
import vuex from 'vuex'
import fastclick from '@ynet/fastclick'


fastclick.attach(document.body)
vue.config.productionTip = false

export default {
  vue, vuex, fastclick
}