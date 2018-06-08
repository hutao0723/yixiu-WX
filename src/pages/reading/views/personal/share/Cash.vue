<template>
    <div class="cash">
        <p class="cash-tit">提现金额</p>
        <div class="cash-import">
            <div class="ci-warp iconfont icon-icon-test">
                <input type="number" v-model="cashNum" name="" id="" class="ciw-inp" :placeholder="`可提现${balance}元`" maxlength="8">
            </div>
            <span class="ci-tip">2小时内到账</span>
        </div>
        <div class="cash-remind">
            <p class="cr-hint">单笔不低于50元</p>
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
            record:[],
            cashNum:'', // 输入提现金额
            balance:'', // 可提现的额度
            promptText:'',  // 弹窗消息
        };
    },
    computed: {
        ...mapState({}),
    },
    created() {
        this.getBalance()
    },
    mounted () {
        
    },
    watch:{
        'cashNum':function(v){
            // 限制输入金额到小数点后两位
            this.cashNum = v.toString().replace(/(\d*)(\.\d{0,2})?.*/, (match, p1, p2) => {
                // p1整数部分，p2小数部分
                if(p1 == (0 || '')){
                    return ''                   
                }else{
                    return Number(p1) + (p2 || '');
                }
                
            });
        }
    },
    methods: {
        judgeCash(){// 判断是否达到提现的条件
            let money;
            this.cashNum = Number(this.cashNum)
                // 对传入的金额再次进行处理
                // money = this.dealWithMoney()
                // this.getData(money)
                
            if(this.cashNum < 50){// 提现不得小于50元
                this.promptText = '至少提现<em>50</em>元'
                this.dialog(this.promptText)
            }else if(this.cashNum > this.balance){ // 不得超过额度
                this.promptText = `最多可提现${this.balance}元`
                this.dialog(this.promptText)
            }else{
                // 对传入的金额再次进行处理
                money = this.dealWithMoney()
                this.getData(money)
            }
        },
        
        // 处理输入后的金额转成整数
        dealWithMoney(){
            let integerPart,decimalsPart,cash = this.cashNum.toString();
            if(cash.indexOf('.') < 0){ // 整数提现
                return cash + '00'
            }else{
                // 金钱的整数部分
                integerPart = cash.split('.')[0]
                // 金钱的小数部分,并取两位
                decimalsPart = cash.split('.')[1]
                if(decimalsPart.length >= 2){
                    // 小数点后两位
                    decimalsPart = decimalsPart.slice(0,2)
                }else if(decimalsPart.length == 1){
                    // 小数点后一位
                    decimalsPart = decimalsPart+'0'
                }else{
                    // 只带小数点
                    decimalsPart = decimalsPart+'00'
                }

                if(integerPart == 0){ // 提现小于1块
                    return decimalsPart
                }else{ // 提现大于1块且带小数
                    return integerPart + decimalsPart
                }
                
            }            
        },

        dialog(msg){ // 不满足提现条件时的弹窗
            this.$refs.dialog.confirm({
                text: msg,
                showConfirmButton:false,
                cancelButtonText:'我知道了'
            }).then((response) => {
                this.$refs.dialog.show = false
            }).catch((type) =>{
                console.log(type)
            })
        },

        allCashing(){
            // 全部提现
            this.cashNum = this.balance;
        },

        getData(money){
            // 进行提现操作
            sales.widthdraw(money).then((res) => {
                if(Boolean(res.desc)){
                    this.dialog(res.desc)
                }else{
                    this.$router.push('/personal/share/deposit-success')
                }
            })
        },
        getBalance(){
            // 刷新页面重新获取可提现金额
            sales.info().then((res) => {
                this.balance = res.balance
            })
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
            align-items: flex-end;
            margin-bottom: 28/@rem;
            border-bottom: 1/@rem solid @borderColor;
            padding-bottom: 6/@rem;
            .ci-warp {
                position: relative;
                    &::before {
                        // content: '¥';
                        .fontSize(50);
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
                    box-sizing: border-box;
                    &::-webkit-input-placeholder { /* WebKit browsers */
                        height: 126/@rem;
                        line-height: (126+25)/@rem;
                        vertical-align: middle;
                        .fontSize(30);
                        font-weight: normal;
                        color: @inputPlaceholderTextColor;
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
                padding-bottom: (42-10)/@rem;
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
            border: 0;
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
            padding: 0 33/@rem;
            box-sizing: border-box;
            .modal-body {
                padding: 45/@rem (113-33)/@rem 0;
                .notice {
                    line-height: (108/2)/@rem;
                    padding-bottom: 45/@rem;
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

