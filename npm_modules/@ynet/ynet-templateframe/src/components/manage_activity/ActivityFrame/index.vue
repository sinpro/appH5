<template>
  <div class="activity_frame">
      <component v-if="componentType" :is="componentType" :options="options"/>
  </div>
</template>
<script>
import flipCard from '../../templates_activity/activities/flipCard'
import fruitMachine from '../../templates_activity/activities/fruitMachine'
import goldenEggs from '../../templates_activity/activities/goldenEggs'
import guess from '../../templates_activity/activities/guess'
import redPacket from '../../templates_activity/activities/redPacket'
import scratch from '../../templates_activity/activities/scratch'
import shake from '../../templates_activity/activities/shake'
import turntable from '../../templates_activity/activities/turntable'

export default {
  props: {
    type: {
        type: String,
        default () {
            return ''
        }
    },
    options: {
        type: Object,
        default () {
            return {}
        }
    }
  },

  components: {
    fruitMachine,
    flipCard,
    goldenEggs,
    guess,
    redPacket,
    scratch,
    shake,
    turntable
  },

  data() {
    return {
      componentType:'',
    }
  },
  watch: {
    options(val,old){
      this.refresh()
    }
  },
  created(){
    this.initComponent()
  },
  methods: {
    initComponent () {
      let type = this.type
      if(type == '01'){
          this.componentType = 'goldenEggs'
      }else if(type == '02'){
          this.componentType = 'turntable'
      }else if(type == '03'){
          this.componentType = 'fruitMachine'
      }else if(type == '04'){
          this.componentType = 'shake'
      }else if(type == '05'){
          this.componentType = 'guess'
      }else if(type == '06'){
          this.componentType = 'scratch'
      }else if(type == '07'){
          this.componentType = 'flipCard'
      }else{
          this.componentType = 'redPacket'
      }
    },
    refresh () {
        this.componentType = ''
        this.$nextTick(() => {
            this.initComponent()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.activity_frame{
  position: relative;
}
</style>

