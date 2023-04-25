<template>
    <div class="test"></div>
</template>
<script>
import meta from "../../../src/meta.js";
import components from "../../../src/index.js";
import mockcomponents from "../../../src/mock.js";

export default {

    data() {
        return {
            meta,
            components,
            mockcomponents
        };
    },

    created(){
        window.mytest = this
    }
};
</script>