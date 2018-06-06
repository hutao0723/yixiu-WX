<template>
	<div class="personal">
		<div class="personal-info">
			<!-- <i class="pi-portrait"></i> -->
			<div class="pi-main">
				<img :src="imageUrl" alt="" class="pi-portrait">
				<span class="pi-name">美少女</span>
			</div>
		</div>

		<div class="personal-main">
			<router-link v-for="item in list" class="pm-list" :class="item.class" :key="item.class" :to="{path:item.router,query:{'earningMoney':'0.1'}}">
				<span class="pm-text iconfont" :class="item.icon">{{item.text}}</span>
				<i class="iconfont icon-right" :class="item.icon"></i>
			</router-link>

			<!-- <div class="share"></div>
			<div class="recommend"></div>
			<div class="support-center"></div> -->
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	components: {
		
	},
	data() {
		return {  
			list:[
				{icon:'icon-recom', text:'我的优惠券',router:'/personal/coupon', class:'coupon',router:'/personal/share'},
				{icon:'icon-spread', text:'分享赚钱',router:'/personal/share',class:'share',router:'/personal/share'},
				{icon:'icon-shouye', text:'推荐给好友',router:'/personal/recommend',class:'recommend',router:'/personal/share'},
				{icon:'icon-shouye', text:'帮助中心',router:'/personal/support',class:'support-center',router:'/personal/share'}
			],
			imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
		}
	},
	computed: {
		...mapState({})
	},
	created() {},
	mounted() {},
	methods: {}
};
</script>

<style lang="less" scoped>
	@import "../../less/variable";
	@import "../../less/base";
	@import "../../less/icon";
	@mainColor:#F4F4F4;
	@setionBackgroundColor:#FFF;
	@fontColor:#333;
	.personal {
		height: 100%;
		background: @mainColor;
		.personal-info {
			height: 329/@rem;
			position: relative;
			background: @setionBackgroundColor;
			.pi-main {
				width: 150/@rem;
				// height: 222/@rem;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				text-align: center;
				.pi-name {
					margin-top: 22px;
					.fontSize(36);
					color: #444;
					// font-weight: bold;
				}
			}
		}
		.personal-main {
			margin-top: 20/@rem;
			.pm-list {
				height: 111/@rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 0 69/@rem 0  32/@rem;
				background-color: @setionBackgroundColor;
				position: relative;
				&::after {
					position: absolute;
					right: 0;
					bottom: 0;
					width: 600/@rem;
					height: 1/@rem;
					background-color: @mainColor;
					content: '';
				}
				&:last-child {
					margin-top: 27/@rem;
				}
				.iconfont {
					color: @fontColor;
					.fontSize(28);
				}
				.pm-text {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					.fontSize(28);
					color: @fontColor;
					&::before {
						color: #A28FF7;
						.fontSize(36);
						padding-right: 32/@rem;
					}
				}
			}
		}
	}
</style>

