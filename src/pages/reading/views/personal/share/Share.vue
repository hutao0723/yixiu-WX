<template>
    <div class="share">
        <div class="share-main">
            <div class="sm-figure">
                <div class="smf-tip">
                    <router-link v-for="item in btnLink" :key="item.icon" :to="item.router"><i class="iconfont" :class="item.icon"></i></router-link>
                </div>
                <div class="smf-earnings">
                    <p>{{shareData.totalPromotionEarnings}}</p>
                    <em>累计收益金额(元)</em>
                </div>
            </div>
            <div class="sm-deposit" @click="withdrawDeposit">
                <span class="smd-cashnum">可提现(元)：<em>{{shareData.balance}}</em></span>
                <span class="smd-cash" @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '835.2.0')">提现<i class="iconfont icon-right"></i></span>
            </div>
        </div>
        <div class="share-list">
            <router-link v-for="(item,i) in data" :key="item.name" :to="item.router" @click.native="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', `${i == 0 ? '835.3.0':'835.4.0'}`)">
                <!-- showStatus:1显示，0隐藏，functionsType:用户红点功能类型集合：1:我的客户;2:收益记录 -->
                <span :class="it.showStatus && it.functionsType && it.functionsType == i+1  && 'sl-new'" v-for="(it,index) in redPointArr" :key="index" v-if="i == index">{{item.name}}</span>
                <i class="iconfont icon-right"></i>
            </router-link>
            <router-link to="/personal/share/poster" @click.native="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '835.5.0')">
                <span>分享赚钱</span>
                <i class="iconfont icon-right"></i>
            </router-link>
        </div>

        <div class="tip-modal">
            <confirmDialog ref="dialog"></confirmDialog>
        </div>
        <div class="c-modal">
            <confirmDialog ref="cdialog"></confirmDialog>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import ConfirmDialog from '../../../components/basic/ConfirmDialog'
    import sales from '../../../api/sales'
    export default {
        components: {
        },
        data() {
            return {
                // 500170000
                data: [{
                        name: '我的邀请',
                        router: '/personal/share/correspondent',
                        new: true
                    },
                    {
                        name: '收益记录',
                        router: '/personal/share/earnings-history'
                    },
                ],
                btnLink: [{
                        class: 'smft-rule',
                        icon: 'icon-guize',
                        router: '/personal/share/generalize-rule'
                    },
                    {
                        class: 'smft-record',
                        icon: 'icon-record',
                        router: '/personal/share/cash-history'
                    },
                ],
                cash: '122.90',
                shareData: {
                    'balance': '',
                    'totalPromotionEarnings': ''
                },
                redPointArr:[
                    {
                        functionsType: 1,
                        showStatus:''
                    },
                    {
                        functionsType: 2,
                        showStatus:''
                    }
                ],
                earningMoney:'' // 
            };
        },
        computed: {
            ...mapState({})
        },
        created() {

        },
        async mounted() {
            this.getDate()
            this.shouldCongratulationDialogShow()
            let self = this;
            let userState = await self.getThumbUp();
            self.wxShare(userState.data.userId);
        },
        methods: {
            async getThumbUp() {
                let self = this;
                let params = {};
                params = {

                }
                const url = `/user/read/state`;
                const res = await this.$http.get(url, {
                params
                });
                return res.data;
            },
            withdrawDeposit() { // 判断是否达到提现的条件
                if (Number(this.shareData.balance) < 20) {
                    this.$refs.dialog.confirm({
                        text: '可提现金额需满<em>20</em>元 才可提现',
                        showConfirmButton: false,
                        cancelButtonText: '我知道了',
                        monitorType:'835.6'
                    }).then((response) => {
                        console.log(response)
                        this.$refs.dialog.show = false
                    }).catch((type) => {
                        // console.log(type)
                    })
                } else {
                    this.$router.push({
                        path: '/personal/share/cash'
                    })
                }
            },
            shouldCongratulationDialogShow() { // 有收益到账时的弹窗触发条件
                this.earningMoney = this.$route.query.earningMoney
                // let earn = this.getStore('earningMoney')
                if (this.earningMoney && this.earningMoney != '0') {
                    this.congratulationDialog(this.earningMoney)
                }
            },
            congratulationDialog(sh) { // 收益到账时的弹窗
                this.$refs.cdialog.confirm({
                    text: `你有一笔收益到账<strong class="earn">${sh}</strong>元`,
                    cancelButtonText: '好的',
                    confirmButtonText: '查看',
                    monitorType:'835.1'
                }).then((response) => {
                    this.$router.push('/personal/share/earnings-history')
                    this.$refs.dialog.show = false
                    // 点击确定或者是查看，去掉url的收益字段
                    this.cutUrlParams()
                }).catch((type) => {
                    this.cutUrlParams()
                })
            },
            cutUrlParams(){ // 点击确定或者是查看，去掉url的收益字段
                let href = window.location.href
                href = href.split('?')[0]
                history.replaceState(null,null,href)
            },
            getDate() {
                // 用户红点功能类型集合：1:我的客户;2:收益记录
                let functionsTypes = '1,2';
                // 获取用户的提现金额和收益金额等信息
                sales.info().then((res) => {
                    this.shareData = res
                })
                
                //获取红点信息
                sales.redPoint(functionsTypes).then((res) => {
                    if(res.length){
                        this.redPointArr = JSON.parse(JSON.stringify(res))
                    }
                })
            },


            /**
             * 存储localStorage
             */
            setStore(name, content) {
                if (!name) return;
                if (typeof content !== 'string') {
                    content = JSON.stringify(content);
                }
                window.localStorage.setItem(name, content);
            },

            /**
             * 获取localStorage
             */
            getStore(name){
                if (!name) return;
                return window.localStorage.getItem(name);
            },
            // 获取monitor
            getMonitor(dcm,dpm) {
                console.log(dpm)
                // item tabindex dpmc
                return JSON.stringify({
                    'dcm': dcm,
                    'dpm': '157.' + dpm,
                });
            },


        },
        components: {
            ConfirmDialog
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
    @mainColor: #F4F4F4;
    @setionBackgroundColor: #FFF;
    @fontColor: #333;
    @deepRed: #FF464A;
    @borderColor: #D8D8D8;
    .share {
        height: 100%;
        .share-main {
            background-color: @deepRed;
            color: @setionBackgroundColor;
            .sm-figure {
                .smf-tip {
                    height: 81/@rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    padding: 39/@rem 44/@rem 0 0;
                    box-sizing: border-box;
                    i {
                        color: @setionBackgroundColor;
                        .fontSize(34);
                    }
                    a:first-child {
                        margin-right: 27/@rem;
                    }
                }
                .smf-earnings {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    p {
                        .fontSize(80);
                        font-weight: bold;
                        &::before {
                            display: inline-block;
                            content: '¥ ';
                            vertical-align: text-bottom;
                            margin-right: 10/@rem;
                        }
                    }
                    em {
                        .fontSize(26);
                        opacity: .7;
                        font-style: normal;
                        padding-bottom: 78/@rem;
                    }
                }
            }
            .sm-deposit {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 92/@rem;
                padding: 0 60/@rem 0 30/@rem;
                background-color: rgba(255, 255, 255, .1);
                .smd-cashnum,
                .smd-cash {
                    .fontSize(26);
                    em {
                        .fontSize(32);
                        font-style: normal;
                        font-weight: bold;
                        vertical-align: top;
                    }
                    i {
                        margin-left: 16/@rem;
                        .fontSize(26);
                    }
                }
            }
        }
        .share-list {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            border-top: 20/@rem solid @mainColor;
            a {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 60/@rem 0 30/@rem;
                height: 93/@rem;
                border-bottom: 1/@rem solid @borderColor;
                .fontSize(28);
                color: @fontColor;
                .sl-new {
                    position: relative;
                    &::after {
                        position: absolute;
                        top: -5/@rem;
                        right: -7.5/@rem;
                        width: 15/@rem;
                        height: 15/@rem;
                        background-color: @deepRed;
                        content: '';
                        border-radius: 7.5/@rem;
                        ;
                    }
                }
                i {
                    .fontSize(28);
                    color: RGBA(51, 51, 51, 0.9);
                }
            }
        }
        .tip-modal {
            .modal-dialog {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: stretch;
                width: 560/@rem;
                height: 320/@rem;
                padding: 0 33/@rem;
                box-sizing: border-box;
                .modal-body {
                    padding: 45/@rem (113-33)/@rem;
                    .notice {
                        height: 108/@rem;
                        line-height: (108/2)/@rem;
                        padding: 0;
                        .fontSize(34);
                        em {
                            color: @deepRed;
                            font-style: normal;
                        }
                    }
                }
                .modal-footer {
                    padding-bottom: 40/@rem;
                    border: none;
                    .button {
                        height: 82/@rem;
                        line-height: 82/@rem;
                        background-color: @deepRed;
                        color: @setionBackgroundColor;
                        border-radius: 10/@rem;
                        .fontSize(36)
                    }
                }
            }
        }
        .c-modal {
            .modal-dialog {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                width: 600/@rem;
                height: 772/@rem;
                top: 108/@rem;
                transform: translateX(-50%);
                background: url(http://yun.dui88.com/yoofans/images/201805/congrate.png) no-repeat bottom center;
                background-size: contain;
                .modal-body {
                    .notice{
                        width: 224/@rem;
                        height: 96/@rem;
                        line-height: (96/2)/@rem;
                        padding-bottom: 38/@rem;
                        color: #FFF341;
                        .fontSize(28);
                        .earn {
                            display: inline-block;
                            .fontSize(40)
                        }
                    }

                }
                .modal-footer {
                    display: flex;
                    flex-direction: row-reverse;
                    padding-bottom: 65/@rem;
                    border: 0;
                    a {
                        width: 150/@rem;
                        height: 50/@rem;
                        line-height: 50/@rem;
                        border-radius: 10/@rem;
                        border: 2/@rem solid @setionBackgroundColor;
                        color: @setionBackgroundColor;
                        .fontSize(28);
                        &.btn-default {
                            margin-left: 50/@rem;
                        }
                    }
                }
            }
        }
    }
</style>

