<template>
    <div>
        <m-titleview title="关闭所有页面回到首页">
            回到首页的某个tab页签
        </m-titleview>
        <m-sectionview>
            <m-buttonview @click="callApi('closeToHomePage-home')">返回至首页</m-buttonview>
            <m-buttonview @click="callApi('closeToHomePage-me')">返回至我的</m-buttonview>
        </m-sectionview>
    </div>
</template>
<script>
export default {
    
    methods: {

        callApi(casename){
            switch(casename){
                case 'closeToHomePage-home':
                    api.closeToHomePage('home').then(result => alert(JSON.stringify(result)))
                    break
                case 'closeToHomePage-me':
                    api.closeToHomePage('me').then(result => alert(JSON.stringify(result)))
                    break
            }
        }
    }
}
</script>
