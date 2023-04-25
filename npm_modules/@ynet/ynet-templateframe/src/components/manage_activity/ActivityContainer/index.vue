<template>
  <div class="activity_container">
      <activity-header :title="title"/>
      <activity-frame :type="type" :options="options"/>
  </div>
</template>
<script>
import props from './utils/props'
import ActivityHeader from '../ActivityHeader'
import ActivityFrame from '../ActivityFrame'

export default {

  props,

  components: {
      ActivityHeader,
      ActivityFrame
  },

  data() {
    return {

    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss">
.activity_container{
    width: 320px;
    min-height: 666px; 
    border: 1px solid #F5F5FA;
    position: relative;
    background-color: #FFFFFF;
}
</style>
