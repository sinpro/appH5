<template>
  <div class="demo-list">
    <!--基本样式-->
    <!-- <div v-if="item.name != 'index'"> -->
    <div>
      <ynet-cell
        v-for="(item,index) in demoList"
        :key="index "
        :title="
          item.header "
        is-link
        @click.native="jumpDemo(item.name) "
      />
    </div>
  </div>
</template>
<script>
import demo from '../../conf.json';
// import { Cell, Group } from 'vux';
import ynetCell from '@/common/components/ynet_cell';
export default {
  name: 'List',
  components: {
    ynetCell
  },
  data() {
    return {
      name: 'register',
      demoList: []
    };
  },
  created() {
    for (let key in demo) {
      if (key === this.name) {
        for (let val in demo[key]) {
          this.demoList.push({
            name: val,
            header: demo[key][val].title
          });
        }
      }
    }
  },
  mounted() {},
  methods: {
    jumpDemo(name) {
      app.api.pushWindow('/ynet_iteration_21__UI/' + this.name + '/' + name + '.html');
    }
  }
};
</script>
