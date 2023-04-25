<template>
    <div>
        <m-titleview title="获取用户会话令牌">
            获取用户会话令牌。返回登录会话信息中缓存的会话令牌
        </m-titleview>
        <m-sectionview>
            <m-cellview title="会话令牌" :value="sessionID" @valueClick="showAlert"></m-cellview>
            <m-buttonview @click="callApi('getSessionID')">获取会话ID</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {

    data () {
        return {
            sessionID: ''
        }
    },
    
    methods: {

        showAlert (event) {
            alert(event.value)
        },

        callApi(casename){
            switch(casename){
                case 'getSessionID':
                    api.getSessionID().then(sessionID => {
                        if(!sessionID){
                            window.alert('用户尚未登录')
                        }
                        this.sessionID = sessionID
                    })
                    break
            }
        }
    }
}
</script>
