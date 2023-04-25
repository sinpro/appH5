<template>
  <div id="app" class="app_container">
    <m-headerview class="app_container_header" title="猎豹模板库"/>
    <m-menuview class="app_container_menu" :iMenuList="iMenuList" @node-click="selectMenu" AUTOHEIGHT/>
    <div class="app_container_body" AUTOHEIGHT>
      <router-view class="app_router_view"></router-view>
    </div>
  </div>
</template>
<script>
import mHeaderview from './src/core/components/mHeaderview'
import mMenuview from './src/core/components/mMenuview'

export default {

  components: {
    mHeaderview,
    mMenuview
  },

  data () {
    return {
      iMenuList: [
        {menuName: '模板开发测试', children: [
          {menuName: '楼层模板开发', url: '/template'},
          {menuName: '活动模板开发', url: '/activity'}
        ]}
      ]
    }
  },

  mounted () {
      this.initSize()
  },

  methods: {

    initSize () {
      let adjustSize = () => {
        let targetDOMs = document.querySelectorAll('[AUTOHEIGHT]')
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        targetDOMs.forEach(targetDOM => {
            targetDOM.style.height = (clientHeight - 64) + 'px'
        });
      }

      adjustSize()
      window.addEventListener('resize', adjustSize, false);
    },

    selectMenu (event) {
      this.$router.push({path:event.url})
    }
  }
}
</script>

<style lang="scss">

html, body{
  background: #F7F7F7;
  font-family: "PingFang SC", "Microsoft YaHei", Helvetica, sans-serif, Arial;
  height: 100%;
  overflow: hidden;
}

html, body, p, ul, li{
  padding: 0;
  margin: 0;
}

.app_container{
  position: relative;
  height: 100%;

  .app_container_header{
    height: 64px;
  }

  .app_container_menu{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 160px;
    height: 100%;
    background: #323c41;
    margin-top: 64px;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .app_container_body{
    margin-left: 160px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #FFFFFF;
  }
}
</style>
