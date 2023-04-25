<template>
    <div class="v-buttonview">
        <button type="button" class="v-buttonview_button" @click="$emit('click', $event)">
            <slot/>    
        </button>
    </div>
</template>
<script>
export default {

    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.v-buttonview {
    text-align: center;

    .v-buttonview_button {
        width: 100%;
	    margin: 0 auto;
	    height: 0.96rem;
        line-height: 0.96rem;
	    background: #6161F2;
	    color: #FFFFFF;
	    text-align: center;
	    font-size: 0.32rem;
	    border-radius: 4px;
        cursor: pointer;
        border: 1px solid #6161F2;
        -webkit-user-select: none;

        &:active{
            opacity: 0.6;
        }
    }
}
</style>
