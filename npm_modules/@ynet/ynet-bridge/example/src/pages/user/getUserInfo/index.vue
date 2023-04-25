<template>
    <div>
        <m-titleview title="用户信息管理">
            获取用户信息/发起RPC查询最新用户信息/清除用户信息
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('getUserInfo')">获取用户信息</m-buttonview>
            <m-buttonview @click="callApi('updateUserInfo')">更新用户信息</m-buttonview>
            <m-buttonview @click="callApi('cleanUserInfo')">清除用户信息</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'getUserInfo':
                    api.getUserInfo().then(result => alert(JSON.stringify(result)), result => alert(result.errorMessage))
                    break
                case 'updateUserInfo':
                    api.updateUserInfo().then(result => alert(JSON.stringify(result)))
                    break
                case 'cleanUserInfo':
                    api.cleanUserInfo().then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
