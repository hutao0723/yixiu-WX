<template>
    <div class="generalize-rule">
        <h1>推广规则</h1>
        <div class="gr-warp">
            <h2>1.怎么赚钱？</h2>
            <p>当你购买了读书营课程后，通过分享你的【专属海报】或【任意页面】，好友在有效期内支付购买了课程，你将会得到相应的现金分红</p>
        </div>
        <div class="gr-warp">
            <h2>2.分销可赚多少钱？</h2>
            <p>每个好友购买，你可获得相应比例的课程金额（20元-50元），有效人数无上限。</p>
        </div>
        <div class="gr-warp">
            <h2>3.怎么查看我挣了多少钱？</h2>
            <p>在“我的收益”页面也可看到收益</p>
        </div>
        <div class="gr-warp">
            <h2>4.提现规则：</h2>
            <p>“可提现金额”满50元即可提现微信账户；每笔邀请收益在3日后即可提现</p>
        </div>
        <div class="gr-warp">
            <h2>5.我发链接/海报给我自己买，可以有钱赚吗？</h2>
            <p>自己不能成为自己的客户，所以不能赚自己的钱</p>
        </div>
        <div class="gr-warp">
            <h2>6.遇到其他问题，可在个人中心联系客服</h2>
            <p></p>
        </div>
        <div class="grw-last">
            <p class="">本活动最终解释权归一修读书所有</p>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter: (to, from, next) => {
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
}
</script>

<style lang="less" scoped>
    @import '../../../less/variable';
    @import '../../../less/base';
    @import '../../../less/icon';

    @titleColor: #222;
    @paragraphColor:#444;
    body *{ max-height: 999999px; }
    .generalize-rule {

        width: 750/@rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        // overflow-x: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        max-height: 9999px;
        -webkit-overflow-scrolling: touch;

        // height: 100%;
        padding: 52/@rem 50/@rem 30/@rem;
        background-color: #EFEFF4;
        // overflow: hidden;
        box-sizing: border-box;
        h1 {
            .fontSize(38);
            color: @titleColor;
            font-weight: bold;
            padding-bottom: 50/@rem;
            
        }
        .gr-warp {
            padding-left: 10/@rem;
            padding-bottom: 50/@rem;
            h2 {
                padding-bottom: 20/@rem;
                .fontSize(30);
                color: @paragraphColor;
                font-weight: bold;
                
            }
            p {
                padding-left: 20/@rem;
                .fontSize(30);
                color: @paragraphColor;
            }
        
        }
        .grw-last {
            margin-top: 60/@rem;
            p {
                .fontSize(24);
                color: #555;
                text-align: center;
            }

        }
    }
</style>
