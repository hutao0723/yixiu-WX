<template>
    <div>
        <ul class="cm-list">
            <li class="cm-item" v-for="item in record" :key="item.num">
                <div class="cml-warp">
                    <img :src="item.headImgurl" alt="" class="cml-image">
                    <div class="cml-info">
                        <strong>{{item.nickName}}</strong>
                        <p class="cmli-date" v-if="Boolean(initIndex)">{{`有效时间${item.remainingBindTime}小时`}}</p>
                    </div>
                </div>
                <div class="cml-sum">
                    <p class="cmls-money cmls">共<em>{{item.totalPromotionEarnings}}</em>元</p>
                    <p class="cmls-count cmls">{{item.totalTradeNum}}笔</p>
                </div>
            </li>
        </ul>
        <div class="page-none" v-show="noData">
            <img src="http://yun.dui88.com/yoofans/images/201805/zanwukh.png" class="none-img" />
            <p class="none-text">您还没有客户，快去邀请吧</p>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" ></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import sales from '../../../api/sales'
export default {
    props:{
        //  initIndex: 1-绑定中 0-已解绑
        initIndex:{
            type: Number,
        }
    },
    components: {
        
    },
    data () {
        return {
            record:[
                // {
                //     name:'木小白',
                //     date:'有效时间23小时',
                //     money:'0.00',
                //     count:'9',
                //     imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
                // },
            ],
            bindPageNum:1,
            unbindPageNum: 1,
            pageSize:20,
            busy: true,
            noData: false,
        };
    },
    computed: {
        ...mapState({})
    },
    created() {
        
    },
    mounted () {
        this.getList();
    },
    methods: {
        //getBindUsers
        loadMore () {
            this.busy = true; // busy为true则暂停loaderMore
            if(this.initIndex){ // initIndex - 1获取绑定中用户的显示页面bindPageNum++，0获取未绑定用户的显示页面unbindPageNum++
                this.bindPageNum++;
            }else{
                this.unbindPageNum++
            }
            this.getList(); // 拉取用户列表数据
        },
        async getList() {
            let obj;
            if(this.initIndex){// initIndex - 1获取绑定中的用户列表，0获取未绑定的用户列表
                obj = await sales.getBindUsers(this.bindPageNum,this.pageSize,this.initIndex);
            }else{
                obj = await sales.getBindUsers(this.unbindPageNum,this.pageSize,this.initIndex);
            }
            // 返回的数据非空时加入this.record数组中
            if(obj.content && obj.content.length){
                this.record = [...this.record, ...obj.content]
            }
            // this.record为空时显示无数据占位图
            if (!this.record.length) this.noData = true;
        },
    },
    watch: {
        // $route (to, from) {
        //     // 路由变化执行获取bind状态操作
        //     this.getBind()
        // }
    }
};  
</script>

<style lang="less">
    @import '../../../less/variable';
    @import '../../../less/base';
    @import '../../../less/icon';
    
    @mainColor: #F4F4F4;
	@setionBackgroundColor: #FFF;
    @fontColor: #333;
    @deepRed: #FF464A;
    @borderColor: #D8D8D8;
    @undertintBalackColor: #999;
    .correspondent-main {
        .cm-list {
            border-bottom: 1/@rem solid @borderColor;
            .cm-item {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin: 0 30/@rem;
                height: 127/@rem;
                border-bottom: 1/@rem solid @borderColor;
                &:last-child {
                    border: 0;
                }
                strong {
                    font-weight: bold;
                    color: @fontColor;
                    .fontSize(36);
                }
                .cml-warp {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    .cml-image {
                        width: 84/@rem;
                        height: 84/@rem;
                    }
                    .cml-info {
                        margin-left: 36/@rem;
                        strong {
                            display: inline-block;
                            width: 100/@rem;
                            .fontSize(28);
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .cmli-date {
                            .fontSize(24);
                            color: @undertintBalackColor;
                        }
                    }
                }
                .cml-sum {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: flex-end;
                        .fontSize(28);
                        color: @fontColor;
                        
                        .cmls {
                            text-align: right;
                        }
                        .cmls-money {
                            em {
                                font-style: normal;
                                color: @deepRed;
                            }
                        }
                    }
            }
        }

        .page-none {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            p {text-align: center}
        }
    }

</style>

