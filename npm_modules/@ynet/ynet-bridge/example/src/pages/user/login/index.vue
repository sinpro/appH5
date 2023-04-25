<template>
    <div>
        <m-titleview title="用户信息管理">
            获取用户信息/发起RPC查询最新用户信息/清除用户信息
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('login')">登录</m-buttonview>
            <m-buttonview @click="callApi('login-pageUrl')">登录并跳转</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'login':
                    api.login().then(result => alert(JSON.stringify(result)))
                    break
                case 'login-pageUrl':
                    api.login({pageUrl: '/demo_ynet/index/index.html'}).then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
