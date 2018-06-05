<template>
    <div class="graduation">
        等待结业海报
        <button @click="$router.go(-1)">返回</button>
        <canvas id="graduation" v-if="!imgUrl"></canvas>
        <img :src="imgUrl" v-if="imgUrl" />
    </div>
</template>

<script>
    export default {
        data () {
            return {
                imgUrl:'',
                info:{}
            };
        },
        
        mounted () {
            
        },
        methods: {
            
        }
    };
</script>

<style lang="less">
    @import '../../less/variable';
    .graduation {
        width: 750/@rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        // z-index: 9;
        background: #f4f4f4;
        img{
            width: 100%;
            display: block;
        }
    }
</style>

