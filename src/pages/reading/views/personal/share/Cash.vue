<template>
    <div class="cash">
        <p class="cash-tit">提现金额</p>
        <div class="cash-import">
            <div class="ci-warp">
                <input type="tel" v-model="cashNum" name="" id="" class="ciw-inp" :placeholder="`可提现${balance}元`" maxlength="8">
                <!-- <span class="ciw-placeholder" v-show="isPlaceholderShow">可提现214.5元</span> -->
            </div>
            <span class="ci-tip">2小时内到账</span>
        </div>
        <div class="cash-remind">
            <p class="cr-hint">今日提现最大金额2万元，单笔不低于20元</p>
            <a href="javascript:void(0)" class="cr-cashall" @click="allCashing">全部提现</a>
        </div>
        <button class="cash-btn" :disabled="!Boolean(this.cashNum)" @click="judgeCash">申请提现</button>
        <confirmDialog ref="dialog"></confirmDialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ConfirmDialog from '../../../components/basic/ConfirmDialog';
import sales from '../../../api/sales'
export default {
    components: {
        ConfirmDialog
    },
    data () {
        return {
            record:[
                {
                    text:'提交到微信 - 交易失败（微信未实名,请完善实名)',
                    date:'2018-05-01 17:23:30',
                    num:'0.00'
                },
            ],
            isPlaceholderShow:true,
            cashNum:'',
            balance:'',
            isCashBtnDisabled:false,
            promptText:'',
        };
    },
    computed: {
        ...mapState({}),
    },
    created() {
        this.balance = this.$route.query.balance
    },
    mounted () {
        
    },
    methods: {

        judgeCash(){
            let money;
            if(this.cashNum < 10){
                this.promptText = '至少提现<em>20</em>元'
                this.dialog(this.promptText)
            }else if(this.cashNum > this.balance){
                this.promptText = `最多可提现${this.balance}元`
                this.dialog(this.promptText)
            }else{
                money = this.cashNum + '00'
                this.getData(money)
            }
        },

        dialog(msg){
            this.$refs.dialog.confirm({
                text: msg,
                showConfirmButton:false,
                cancelButtonText:'我知道了'
            }).then((response) => {
                console.log(response)
                this.$refs.dialog.show = false
            }).catch((type) =>{
                console.log(type)
            })
        },

        allCashing(){
            this.cashNum = this.balance.split('.')[0];
        },

        getData(money){
            sales.widthdraw(money).then((res) => {
                if(Boolean(res.desc)){
                    this.dialog(res.desc)
                }else{
                    this.$router.push('/personal/share/deposit-success')
                }
            })
        }
    },
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
    
    @cashColor:#FF898C;
    @cashTextTipColor:#888888;
    @inputPlaceholderTextColor:#CCCCCC;
    @cashTextColor:#576B95;
    @cashBtnDisabled:#FF898C;
    @cashBtnabled:#FF595D;
    .cash {
        padding: 60/@rem 50/@rem;
        .cash-tit,.cash-import,.cash-remind {margin: 0 10/@rem;}
        .cash-tit {
            margin-bottom: 21/@rem;
            color: @fontColor;
            .fontSize(28);
        }
        .cash-import {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 28/@rem;
            border-bottom: 1/@rem solid @borderColor;
            .ci-warp {
                position: relative;
                    &::before {
                        content: '¥';
                        .fontSize(68);
                        font-weight: bold;
                        color: @fontColor;
                        padding-right: 22/@rem;
                    }
                .ciw-inp {
                    width: 403/@rem;
                    height: 126/@rem;
                    line-height: 126/@rem;
                    .fontSize(90);
                    color: @fontColor;
                    font-weight: bold;
                    border: 0;
                    outline: none;
                    padding: 0;
                    &::-webkit-input-placeholder { /* WebKit browsers */
                        height: 40px;  
                        vertical-align: middle;
                        .fontSize(30);
                    }
                    
                }
                .ciw-placeholder {
                    .fontSize(30);
                    color: @inputPlaceholderTextColor;
                    font-weight: normal;
                    position: absolute;
                    left: 41/@rem;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                    
                }
            }
            
            .ci-tip {
                color: @cashTextTipColor;
                .fontSize(26);
            }
        }
        .cash-remind {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 60/@rem;
            .fontSize(26);
            .cr-hint {
                color: @cashTextTipColor;
            }
            .cr-cashall {
                color: @cashTextColor;
            }
        }
        .cash-btn {
            width: 650/@rem;
            height: 90/@rem;
            .fontSize(36);
            background-color: @cashBtnabled;
            border-radius:10/@rem;
            color: @setionBackgroundColor;
            outline: none;
            font-weight: bold;
            &:disabled {
                background-color: @cashBtnDisabled;
                color:rgba(255,255,255,0.5);
            }
        }


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
                    .fontSize(36);
                    border:0;
                }
            }
        }
    }
</style>

