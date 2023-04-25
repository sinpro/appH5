<template>
    <div>
        <m-titleview title="手势设置">
            获取/设置手势路径是否显示、设置手势开启、打开手势设置、设置手势token
        </m-titleview>
        <m-sectionview>
            <m-cellview title="手势是否开启" :value="gestureOpened"></m-cellview>
            <m-buttonview @click="callApi('getGestureOnOff')">手势验证是否开启</m-buttonview>
            <m-buttonview @click="callApi('getGesturePathShowState')">获取手势路径是否显示</m-buttonview>
            <m-buttonview @click="callApi('setGesturePathShowState')">开启手势路径显示</m-buttonview>
            <m-buttonview @click="callApi('setGesturePathShowState-1')">关闭手势路径显示</m-buttonview>
            <m-buttonview @click="callApi('pushGestureSetting')">进入设置手势密码</m-buttonview>
            <m-buttonview @click="callApi('pushGestureSetting-1')">进入修改手势密码</m-buttonview>
            <m-buttonview @click="callApi('pushGestureSetting-2')">清除手势密码</m-buttonview>
            <m-buttonview @click="callApi('setGestureToken')">设置手势token</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            gestureOpened: ''
        }
    },

    created () {
        api.getGestureOnOff().then(res => {
            this.gestureOpened = res.result ? '已开启' : '未开启'
        })
    },

    methods: {

        callApi(casename){
            switch(casename){
                case 'getGestureOnOff':
                    api.getGestureOnOff().then(res => {
                        let message = res.result ? '手势验证已开启' : '手势验证未开启'
                        window.alert(message)
                    })
                    break
                case 'getGesturePathShowState':
                    api.getGesturePathShowState().then(res => {
                        let message = res.result ? '手势路劲已开启' : '手势路劲未开启'
                        window.alert(message)
                    })
                    break
                case 'setGesturePathShowState':
                    api.setGesturePathShowState(true).then(res => {
                        window.alert('设置成功')
                    })
                    break
                case 'setGesturePathShowState-1':
                    api.setGesturePathShowState(false).then(res => {
                        window.alert('设置成功')
                    })
                    break
                case 'pushGestureSetting':
                    api.pushGestureSetting('1').then(res => {
                        window.alert('设置成功')
                    })
                    break
                case 'pushGestureSetting-1':
                    api.pushGestureSetting('2').then(res => {
                        window.alert('修改成功')
                    })
                    break
                case 'pushGestureSetting-2':
                    api.pushGestureSetting('3').then(res => {
                        window.alert('清除成功')
                    })
                    break
                case 'setGestureToken':
                    api.setGestureToken('TOKEN0000000000002').then(res => {
                        window.alert('设置成功')
                    })
                    break
            }
        }
    }
}
</script>

