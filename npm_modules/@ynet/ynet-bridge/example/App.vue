<template>
  <div id="app" class="app_container">
    <keep-alive>
      <transition :name="transitionName">
          <router-view class="app_router_view"></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },

  created () {
    document.addEventListener('resume', (event) => {
      window.alert('收到resume事件：' + JSON.stringify(event))
    }, false)

    document.addEventListener('pause', (event) => {
      window.alert('收到pause事件：' + JSON.stringify(event))
    }, false)
  },

  watch: {
　　　'$route' (to, from) {
         // 监听路由变化时的状态为前进还是后退
　　　　　if(to.path == '/' && from.path != '/'){
　　　　　　　this.transitionName = 'app-slide-right'
　　　　　} else if(to.path != '/' && from.path == '/'){
　　　　　　  this.transitionName = 'app-slide-left'
　　　　　}
         window.scrollTo(0, 0)
  　  }
  }
}
</script>

<style lang="scss">

html, body{
  background: #F7F7F7;
  font-family: "PingFang SC", "Microsoft YaHei", Helvetica, sans-serif, Arial;
}

html, body, p, ul, li{
  padding: 0;
  margin: 0;
}

.app_container{
  position: relative;
}

.app_router_view{
  position: absolute;
  width: 100%;
  transition: all .4s ease;
}

.app-slide-left-enter,
.app-slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
 
.app-slide-left-leave-active,
.app-slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}

</style>
