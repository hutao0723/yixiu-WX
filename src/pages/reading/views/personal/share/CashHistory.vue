<template>
    <div class="cash-record" ref="recordMain">
        <ul class="cr-list">
            <li class="cr-item" v-for="(item,index) in historyList" :key="index">
                <div class="crl-info">
                    <strong>{{item.content}}</strong>
                    <p class="crli-date">{{item.gmtCreate}}</p>
                </div>
                <strong class="crl-num" :class="symbolClass">{{item.withdrawAmount}}</strong>
            </li>
        </ul>
        <div class="page-none" v-show="noData">
            <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/zanwushuju.png" class="none-img" />
            <p class="none-text">暂无数据</p>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" ></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import sales from '../../../api/sales'
export default {
    components: {
        
    },
    data () {
        return {
            record:[
                {
                    content:'',
                    gmtCreate:'',
                    withdrawAmount:''
                },
            ],
            symbolClass:'cash-history',
            historyList: [],
            noData: false,
            id: '',
            pageNum: 1,
            pageSize: 20,
            busy: true,
            lastCreateDate:'' //当前页最后一个创建时间
        };
    },
    computed: {
        ...mapState({})
    },
    created() {
        
    },
    async mounted () {
        await this.getList()
    },
    methods: {

        // 获取更多数据
        async getList() {
            // if(this.historyList.length){
            //     this.lastCreateDate = this.historyList[this.historyList.length-1].gmtCreate
            // }
            let obj = await sales.record(this.pageNum, this.pageSize)

            if (obj.content && obj.content.length) {
                this.historyList = [...this.historyList, ...obj.content];
                this.busy = false;
            } else {
                this.busy = true
            };

            if (!this.historyList.length) this.noData = true;
        },
        loadMore () {
            this.busy = true;
            this.pageNum ++;
            this.getList();
        },
    },

    beforeRouteEnter (to, from, next) {

        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }
        
        next(vm => {
            // 通过 `vm` 访问组件实例
            if(to.path.indexOf('earnings-history') > 0){
                vm.symbolClass = 'earnings-history'
            }
        })

        
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
    .cash-record {
        width: 750/@rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        // z-index: 9;
        background: #fff;
        .cr-list {
            border-bottom: 1/@rem solid @borderColor;
            .cr-item {
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
                .crl-info {
                    strong {
                        display: inline-block;
                        width: 496/@rem;
                        .fontSize(28);
                        overflow: hidden;
                        content-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .crli-date {
                        .fontSize(24);
                        color: @undertintBalackColor;
                    }
                }
                .crl-num {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    
                }
                // .cash-history {
                //     &::before {
                //         display: inline-block;
                //         content:'¥';
                //     }
                // }
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

