<!-- The ref attr used to find the swiper instance -->
<template>
    <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
        <!-- slides -->
        <swiper-slide class="swiper-slide" :class="{'active': index == tabIndex}" v-for="(item,index) in readPlanPostersArr" :style="{'background-image':`url(${item.smallPoster})`}" :key="index+1" @click.native="clickFun($event,selectSwiper, {index:index,poster:item.poster})" :monitor-log="getMonitor('8002.0.0.0', `836.1.${index}`)">
            <i class="iconfont icon-duihao"></i>
        </swiper-slide>
    </swiper>
</template>
 
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    props:{
        readPlanPostersArr:{
            type:Array
        },
    },
    name: 'carrousel',
    data() {
        return {
            swiperOption: {
                // 所有的参数同 swiper 官方 api 参数
                // slidesPerView: '3.646',  750
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
            tabIndex:'0'
        }
    },
    computed: {
        // 获取当前的swiper对象
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    created() {
        
    },
    mounted() {
    },
    methods:{
        // 点击到某张图片时，符合条件则进行滚动，并将 index和itemImg传回父组件
        selectSwiper (obj) {
            // console.log(obj.index)
            this.tabIndex = obj.index
            this.swiper.slideTo(obj.index-1, 1000, false)
            this.$emit('getSwiperIndex', obj.poster,obj.index)
            window.monitor && window.monitor.showLog(this);
        },
        getMonitor(dcm, dpm){
            return JSON.stringify({
                'dcm': dcm,
                'dpm': '157.' + dpm,
            });
        }
    },
    components:{
        swiper, 
        swiperSlide
    }
}
</script>

<style lang="less">
    @import '../../../less/base';
    @import '../../../less/variable';
    @import '../../../assets/swiper.min.css';
    @setionBackgroundColor:#FFF;
    @deepRed:#FF464A;
    .mySwiper {
        .swiper-slide {
            width: 120/@rem;
            height: 120/@rem;
            border-radius:10/@rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            overflow: hidden;
            i {
                display: none;
            }
            // img {
            //     border: 0 none;
            //     width: auto\9;
            //     height: auto;
            //     max-width: 100%;
            //     vertical-align: top;
            //     -ms-interpolation-mode: bicubic;
            // }
        }
        .active {
            // background-color:rgba(0,0,0,0.4);
            position: relative;
            i {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color:rgba(0,0,0,0.4);
                color: @setionBackgroundColor;
                .fontSize(20);
                &:before{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    width: 48/@rem;
                    height: 48/@rem;
                    background: @deepRed;
                    border-radius: 24/@rem;
                }
            }
        }
    }
    
</style>
