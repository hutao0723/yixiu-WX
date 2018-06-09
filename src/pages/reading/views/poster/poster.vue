<template>
    <div class="share" >
		<img src="http://yun.dui88.com/youfen/images/201806/loading.svg" alt="" class="waiting" v-if="!imgUrl">
		<div class="content">
			<div class="canvas" v-if="!imgUrl">
				<canvas id="sharePoster"></canvas>
			</div>
			<img :src="imgUrl" v-if="imgUrl"  class="pic"/>
		</div>
		<div class="btn" v-if="btn" >
			长按保存分享
			<img :src="imgUrl" />    
		</div>
		<Popup v-if="popup" v-on:success = "toCertificate" v-on:close = "closePopup"/>
	</div>
</template>

<script>
import Popup from "./../../components/basic/Diploma";
export default {
  	data() {
		return {
			imgUrl: "",
			popup: false,
			info: {},
			isSelf: true,
			btn:false
		};
  	},
  	components: {
    	Popup
  	},
	mounted() {
		const _this = this;
		_this.popup = _this.$route.query.lastClock * 1;
		_this.isSelf =  1;
		//_this.getInfo();
		this.info = {"id":58,"userId":100052000,"userNickname":"\uD83D\uDCA5","userImgUrl":"//yun.dui88.com/youfen/images/hfx1vc25bl.jpg","courseId":198,"courseTitle":"课程-试听10s","courseSubTitle":"课程-试听10s-副标","courseUrl":"https://yun.dui88.com/youfen/images/lhk3dw0zk6.gif","courseVerticalCover":"https://yun.dui88.com/youfen/images/zbp2zkq154.jpg","courseLateralCover":"https://yun.dui88.com/youfen/images/2bmi5mohht.jpg","courseAuthor":"","readId":9,"readName":"阅读计划-测试1","readStageId":9,"readStageNum":1,"content":"测试我的历程页面的感想，测试我的历程页面的感想，测试我的历程页面的感想，测试我的历程页面的感想，测试我的历程页面的感想，测试我的历程页面的感想","releaseTime":"2018-05-30 14:22:13","releaseTimeLabel":"深夜","praiseCount":3,"userPraise":false,"myself":0,"listens":0,"clocks":0,"books":0,"loginDays":2,"readQrcodeImgUrl":"https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg","bookBgimgUrl":""}
		//头部背景图
				if (!_this.info.bookBgimgUrl) {
					_this.info.bookBgimgUrl = "http://yun.dui88.com/yoofans/images/201806/poster_bg.jpg";
				};
				if(!_this.info.courseUrl){
					_this.info.courseUrl = 'http://yun.dui88.com/youfen/images/read_course_none.png';
				};
				//二维码写死
				_this.info.readQrcodeImgUrl = "http://yun.dui88.com/youfen/images/read_ewm3.png";
				//默认观点
				if(!_this.info.content){
					_this.info.content = "不读书的人，思想就会停止。这是我在【一修读书】的第"+_this.info.clocks+"天。"
				};
				_this.createdCanvas();
	},
  	methods: {
		async getInfo() {
			let _this = this;
			let params = {
				commentId: _this.$route.query.commentId
			};
			const url = `/comment/share`;
			const res = await _this.$http.get(url, {
				params
			});
			if (res.data.success) {
				_this.info = res.data.data;
				//头部背景图
				if (!_this.info.bookBgimgUrl) {
					_this.info.bookBgimgUrl = "http://yun.dui88.com/yoofans/images/201806/poster_bg.jpg";
				};
				if(!_this.info.courseUrl){
					_this.info.courseUrl = 'http://yun.dui88.com/youfen/images/read_course_none.png';
				};
				//二维码写死
				_this.info.readQrcodeImgUrl = "http://yun.dui88.com/youfen/images/read_ewm3.png";
				//默认观点
				if(!_this.info.content){
					_this.info.content = "不读书的人，思想就会停止。这是我在【一修读书】的第"+_this.info.clocks+"天。"
				};
				_this.createdCanvas();
			} else {
				console.log("获取数据失败");
			}
		},
		toCertificate(data) {
			this.$router.push("/graduation");
		},
		closePopup() {
			this.popup = false;
		},
		conversion(data) {
			return data;
		},
		createdCanvas() {
			const _this = this;
			const myCanvas = document.getElementById("sharePoster");
			const ctx = myCanvas.getContext("2d");
			// 测试文字高度
			ctx.font = _this.conversion(30) + "px 苹方字体";
			function stringHeight(string, w) {
				let chr = string.split("");
				let temp = "";
				let row = [];
				for (let a = 0; a < chr.length; a++) {
					//宽度根据设计稿固定值
					if (ctx.measureText(temp).width < _this.conversion(w)) {
					} else {
						row.push(temp);
						temp = "";
					}
					temp += chr[a];
				}
				row.push(temp);
				return row;
			}
			//得到拆分的字符串
			let stringLength = stringHeight(_this.info.content, 586);
			//响应高度，对应海报不同内容
			let responseHeight = 0;
			//如果文字大于3行，额外加高度
			if (stringLength.length > 3) {
				responseHeight = (stringLength.length - 3) * _this.conversion(50);
			}
			//判断是否是自己的分享，不是不显示打卡天数
			if (!_this.isSelf) {
				responseHeight = responseHeight - _this.conversion(105);
			}
			myCanvas.width = _this.conversion(750);
			myCanvas.height = _this.conversion(1200) * 1 + responseHeight;
			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

			// 绘制头部背景图
			let headerImg = new Promise((resolve, reject) => {
				let drawImg = new Image();
				drawImg.crossOrigin = "Anonymous";
				drawImg.src = _this.info.bookBgimgUrl;
				drawImg.onload = function() {
					ctx.drawImage(drawImg,0,0,_this.conversion(750),_this.conversion(545));
					resolve();
				};
			});
			// 绘制方框
			function createdBox() {
				return new Promise((resolve, reject) => {
					// 绘制阴影
					ctx.shadowBlur = _this.conversion(10);
					ctx.shadowColor = "rgba(0,0,0,0.12)";
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = _this.conversion(8);
					// 绘制圆角矩形
					function roundRect(x, y, w, h, r) {
						var min_size = Math.min(w, h);
						if (r > min_size / 2) r = min_size / 2;
						ctx.beginPath();
						ctx.moveTo(x + r, y);
						ctx.arcTo(x + w, y, x + w, y + h, r);
						ctx.arcTo(x + w, y + h, x, y + h, r);
						ctx.arcTo(x, y + h, x, y, r);
						ctx.arcTo(x, y, x + w, y, r);
						ctx.closePath();
						ctx.fillStyle = "#fff";
						ctx.fill();
					}
					roundRect(_this.conversion(34),_this.conversion(355),_this.conversion(680),_this.conversion(630) * 1 + responseHeight * 1,_this.conversion(10));
					//清除阴影效果
					ctx.shadowColor = "rgba(0,0,0,0)";
					resolve("");
				});
			}
			//绘制虚线
			function drawScreen() {
				//虚线
				ctx.setLineDash([15, 10]);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#d6d6d6";
				ctx.beginPath();
				ctx.moveTo(_this.conversion(34),_this.conversion(883) * 1 + responseHeight * 1);
				ctx.lineTo(_this.conversion(718),_this.conversion(883) * 1 + responseHeight * 1);
				ctx.stroke();
				// 两个黄色点
				ctx.beginPath();
				ctx.fillStyle = "#f9d61d";
				ctx.arc(_this.conversion(80),_this.conversion(939) * 1 + responseHeight * 1,_this.conversion(7),0,Math.PI * 2,true);
				ctx.fill();
				ctx.closePath();

				ctx.font = _this.conversion(26) + "px 苹方字体";
				ctx.fillStyle = "#777";
				ctx.textBaseline = "top";
				ctx.fillText( "这是我坚持阅读的第",_this.conversion(105),_this.conversion(926) * 1 + responseHeight * 1);
				let frist_w = ctx.measureText("这是我坚持阅读的第").width;
				ctx.font = _this.conversion(42) + "px 苹方字体";
				ctx.fillStyle = "#222";
				ctx.textBaseline = "middle";
				ctx.fillText( _this.info.clocks,_this.conversion(105)*1+frist_w*1,_this.conversion(939) * 1 + responseHeight * 1);
				let day_w = ctx.measureText(_this.info.clocks).width;
				ctx.font = _this.conversion(26) + "px 苹方字体";
				ctx.fillStyle = "#777";
				ctx.textBaseline = "top";
				ctx.fillText( "天",_this.conversion(105)*1+frist_w*1+day_w*1,_this.conversion(926) * 1 + responseHeight * 1);
			}
			//绘制二维码
			function createdCode() {
				return new Promise((resolve, reject) => {
					ctx.font = _this.conversion(24) + "px 苹方字体";
					ctx.textBaseline = "top";
					ctx.fillStyle = "#444";
					ctx.fillText("一修读书·" + _this.info.readName,_this.conversion(126),_this.conversion(1071) * 1 + responseHeight * 1);
					ctx.fillStyle = "#999";
					ctx.font = _this.conversion(22) + "px 苹方字体";
					ctx.fillText("长按识别二维码",_this.conversion(126),_this.conversion(1108) * 1 + responseHeight * 1);
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					drawImg.src = _this.info.readQrcodeImgUrl;
					drawImg.onload = function() {
						ctx.drawImage(drawImg,_this.conversion(600),_this.conversion(1051) * 1 + responseHeight * 1,_this.conversion(100),_this.conversion(100));
						resolve();
					};
				});
			}
			// 绘制逗号
			function createdComma() {
				return new Promise((resolve, reject) => {
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					drawImg.src = "http://yun.dui88.com/yoofans/images/201805/read/poster_comma.png";
					drawImg.onload = function() {
						ctx.drawImage(drawImg,_this.conversion(64),_this.conversion(565),_this.conversion(80),_this.conversion(50));
						resolve();
					};
				});
			}
			//绘制头像
			function createdIcon() {
				return new Promise((resolve, reject) => {
					ctx.font = _this.conversion(24) + "px 苹方字体";
					ctx.fillStyle = "#444";
					ctx.textBaseline = "top";
					ctx.fillText( "今日读后感", _this.conversion(179), _this.conversion(405));
					//绘制书名
					ctx.font = _this.conversion(38) + "px 苹方字体";
					let bookName = "《" + _this.info.courseTitle + "》";
					let string_h = stringHeight(bookName, 320);
					for (let b = 0; b < string_h.length; b++) {
						ctx.fillText(string_h[b],_this.conversion(179),_this.conversion(446) + b * _this.conversion(50));
					}
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					drawImg.src = _this.info.userImgUrl;

					drawImg.onload = function() {
						ctx.beginPath();
						ctx.save(); // 保存当前ctx的状态
						ctx.arc(_this.conversion(113),_this.conversion(443),_this.conversion(45),0,Math.PI * 2,true);
						ctx.clip(); //裁剪上面的圆形
						ctx.drawImage(drawImg,_this.conversion(68),_this.conversion(400),_this.conversion(90),_this.conversion(90)); // 在刚刚裁剪的园上画图
						ctx.restore(); // 还原状态
						resolve();
					};
				});
			}
			//绘制书籍
			function createdBook() {
				return new Promise((resolve, reject) => {
					//绘制观点文字
					ctx.fillStyle = "#222";
					for (let b = 0; b < stringLength.length; b++) {
						ctx.font = _this.conversion(30) + "px 苹方字体";
						ctx.textBaseline = "top";
						ctx.fillText(stringLength[b],_this.conversion(78),_this.conversion(640) + b * _this.conversion(50));
					}
					//绘制作者信息
					ctx.font = _this.conversion(24) + "px 苹方字体";
					ctx.textBaseline = "top";
					let string_w = ctx.measureText(_this.info.userNickname).width;
					ctx.fillText(_this.info.userNickname,_this.conversion(668) - string_w,_this.conversion(640) + stringLength.length * _this.conversion(50));
					//转换时间格式
					let createdTime = _this.info.releaseTime.replace(/-/g, "/");
					createdTime = new Date(createdTime);
					let year = createdTime.getFullYear();
					let month = createdTime.getMonth() + 1;
					let day = createdTime.getDate();
					let time ="于" +year +"." +month +"." +day +" " +_this.info.releaseTimeLabel;
					string_w = ctx.measureText(time).width;
					ctx.fillText(time,_this.conversion(668) - string_w,_this.conversion(672) + stringLength.length * _this.conversion(50));

					ctx.fillStyle = "#FFF";
					ctx.fillRect(_this.conversion(536),_this.conversion(320),_this.conversion(140),_this.conversion(190));
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					drawImg.src = _this.info.courseUrl;
					drawImg.onload = function() {
						ctx.drawImage(drawImg,_this.conversion(542),_this.conversion(326),_this.conversion(128),_this.conversion(178));
						resolve();
					};
				});
			}
			//绘制logo
			function createdLogo() {
				return new Promise((resolve, reject) => {
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					drawImg.src = "http://yun.dui88.com/yoofans/images/201806/yixiuLogo.png";
					drawImg.onload = function() {
						ctx.drawImage(drawImg,_this.conversion(40),_this.conversion(1056) * 1 + responseHeight * 1,_this.conversion(66),_this.conversion(88));
						resolve();
					};	
				})
			}
			// 绘制所有canvas
			headerImg.then(createdBox).then(createdIcon).then(createdCode).then(createdComma).then(createdBook).then(createdLogo).then(() => {
				if (_this.isSelf) {
					drawScreen();
				}
				const myPoster = document.getElementById("sharePoster");
				let toBase64 = myPoster.toDataURL('image/jpeg');
				_this.imgUrl = toBase64;
				this.$nextTick(function () {
					setTimeout(function(){
						_this.btn = true;
					},0)
				})
			});
		}
  	}
};
</script>

<style lang="less" scoped>
	@import "../../less/variable";
	@-webkit-keyframes spin { /*兼容性写法。spin是关键帧的动画名称*/
		from { /*动画起始状态*/
		-webkit-transform: rotate(0deg);
		}
		to { /*动画结束状态*/
		-webkit-transform: rotate(360deg);
		}
	}
	@keyframes spin {
		from {
		transform: rotate(0deg);
		}
		to {
		transform: rotate(360deg);
		}
	}
	.share {
		right: 0;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		// z-index: 9;
		background: #f4f4f4;
		.waiting{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -0.4rem;
    		margin-left: -0.4rem;
			width: 60/@rem;
			height: 60/@rem;
			-webkit-animation: spin 600ms linear infinite;/*infinite表示动画无限循环*/
			animation: spin 600ms linear infinite;
		}
		.content{
			position: relative;
			height: 100%;
			width: 100%;
			overflow-x: hidden;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			padding: 42/@rem 55/@rem 142/@rem;
			box-sizing: border-box;
			.canvas {
				opacity: 0;
			}
			.pic {
				width: 100%;
				display: block;
			}
		}
		.btn {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100 / @rem;
			background: #fbdb31;
			text-align: center;
			line-height: 100 / @rem;
			z-index: 10;
			font-size: 32 / @rem;
			font-weight: 600;
			overflow: hidden;
			img {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				width: 100%;
			}
		}
	}
</style>

