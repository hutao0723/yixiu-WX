<template>
    <div class="generalize-rule">
        <h1>推广规则</h1>
        <div class="gr-warp">
            <h2>1.怎么赚钱？</h2>
            <p>通过分享专属海报/页面链接，好友在有效期内支付购买了课程，你将会得到相应的现金分红</p>
        </div>
        <div class="gr-warp">
            <h2>2.分销可赚多少钱？</h2>
            <p>好友购买后，可获得相应比例的课程金额</p>
        </div>
        <div class="gr-warp">
            <h2>3.怎么查看我挣了多少钱？</h2>
            <p>在“我的收益”页面也可看到收益</p>
        </div>
        <div class="gr-warp">
            <h2>4.提现规则：</h2>
            <p>可提现金额满20元即可提现微信账户</p>
        </div>
        <div class="gr-warp">
            <h2>5.我发链接/海报给我自己买，可以有钱赚吗？</h2>
            <p>自己不能成为自己的客户，所以不能赚自己的钱</p>
        </div>
        <div class="gr-warp">
            <h2>6.遇到其他问题，可在个人中心联系客服</h2>
            <p></p>
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

<style lang="less">
    @import '../../../less/variable';
    @import '../../../less/base';
    @import '../../../less/icon';

    @titleColor: #222;
    @paragraphColor:#444;
    .generalize-rule {
        height: 100%;
        padding: 52/@rem 50/@rem;
        background-color: #EFEFF4;
        overflow: hidden;
        box-sizing: border-box;
        h1 {
            .fontSize(38);
            color: @titleColor;
            font-weight: bold;
            padding-bottom: 50/@rem;
            
        }
        .gr-warp {
            padding-left: 10/@rem;
            padding-bottom: 66/@rem;
            h2 {
                padding-bottom: 29/@rem;
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
    }
</style>
