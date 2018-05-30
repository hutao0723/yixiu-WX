<template>
    <div class="deposit-success">
        <i class="ds-icon iconfont icon-yes"></i>
        <p class="ds-hint">正在申请提现中</p>
        <router-link class="ds-finish" to="/personal/share">完成</router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    components: {
        
    },
    data () {
        return {
            
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
    @undertintFontColor:#666;

    @depositSuccessColor:#FF634D;
    .deposit-success {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 132/@rem;
        .ds-icon {
            .fontSize(174);
            color: @depositSuccessColor;
        }
        .ds-hint {
            margin-top: 60/@rem;
            color: @undertintFontColor;
            .fontSize(32);
            font-weight: bold;
        }
        .ds-finish {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: 630/@rem;
            height: 80/@rem;
            background-color: @depositSuccessColor;
            color: @setionBackgroundColor;
            margin-top: 140/@rem;
            .fontSize(34);
            border-radius: 8/@rem;
        }

    }

</style>

