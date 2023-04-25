<template>
    <div class="v-cellview">
        <div class="v-cellview_row">
            <div class="v-cellview_title">{{title}}</div>
            <div class="v-cellview_value" @click="valueClick">
                <span class="v-cellview_text">{{value}}</span>
                <slot/>
            </div>
        </div>
        <div class="v-cellview_line"/>
    </div>
</template>
<script>
export default {

    props: {

        value: {
            type: String,
            default: ''
        },

        title: {
            type: String,
            default: ''
        }

    },

    methods: {

        valueClick () {
            this.$emit('valueClick', {title:this.title, value:this.value})
        }
    }
}
</script>

<style lang="scss" scoped>
.v-cellview {
    width: 100%;

    .v-cellview_row{
        display: flex;
        height: 0.96rem;
        align-items: center;
        justify-content: space-between;
    
        .v-cellview_title{
            font-size: 0.32rem;
            color: #333333;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .v-cellview_value{
            font-size: 0.32rem;
            color: #333333;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            overflow: hidden;
            text-align: right;

            &:active{
                background: none;
            }

            .v-cellview_text{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    .v-cellview_line{
        width:  100%;
        height: 1px;
        background: #F6F6F6;
    }
}
</style>
