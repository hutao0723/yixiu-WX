<template>
    <div class="correspondent">
        <div class="co-tab">
            <span class="ct-item" :class="{'actives':initIndex == index}" v-for="(item,index) in bind" :key="item.router" @click="changTab(index)">{{item.text}}</span>
        </div>
        <div class="correspondent-main">
            <correspondentMain v-for="(item,index) in bind" :key="item.router" v-show="initIndex == index" :initIndex="Math.abs(index-1)" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CorrespondentMain from './CorrespondentMain'
export default {
    components: {
        CorrespondentMain
    },
    data () {
        return {
            bind:[
                {router:'/personal/share/correspondent/binding',text:'已邀请'},
                {router:'/personal/share/correspondent/unbind',text:'已失效'},
            ],
            initIndex:0
        };
    },
    computed: {
        ...mapState({})
    },
    created() {
      
    },
    mounted () {

    },
    methods: {
        changTab(index){
            this.initIndex = index
        },
        count(ms){
            return new Promise((resolve) => {setTimeout(resolve,ms)})
        }
    },
    beforeRouteEnter: (to, from, next) => {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
};  
</script>

<style lang="less">
    @import '../../../less/variable';
    @import '../../../less/base';
    @import '../../../less/icon';
    @mainColor:#F4F4F4;
	@setionBackgroundColor:#FFF;
    @fontColor:#333;
    @deepRed:#FF464A;
    @borderColor:#D8D8D8;
    @undertintBalackColor:#999;
    .co-tab {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 116/@rem;
        margin: 0 29/@rem 0 31/@rem;
        border-bottom: 1/@rem solid @borderColor;
        position: relative;
        background-color: #FFF;
        z-index: 1;
        .ct-item {
            align-content: center;
            height: 116/@rem;
            line-height: 116/@rem;
            padding: 0 55/@rem;
            .fontSize(30);
            font-weight: bold;
            position: relative;
            &:after {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                content: '';
                width: 52/@rem;
                height: 6/@rem;
                background-color: @setionBackgroundColor;
                border-radius: 10/@rem;
            }
        }
        .actives {
            color: @deepRed;
            &:after {
                background-color: @deepRed;
            }
        }
    }

</style>

