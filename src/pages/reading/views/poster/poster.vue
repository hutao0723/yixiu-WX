<template>
    <div class="share" >
		<img src="http://yun.dui88.com/youfen/images/201806/loading.svg" alt="" class="waiting" v-if="!imgUrl">
		<div class="content">
			<div class="canvas" v-if="!imgUrl">
				<div id="code"></div>
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
import QRcode from 'qrcodejs2'
export default {
  	data() {
		return {
			imgUrl: "",
			popup: false,
			info: {},
			isSelf: true,
			btn:false,
			codeUrl:'',
			code64:'',
		};
  	},
  	components: {
    	Popup
  	},
	mounted() {
		const _this = this;
		_this.popup = _this.$route.query.lastClock * 1;
		_this.isSelf = _this.$route.query.isClock * 1;

		_this.getInfo();

		// _this.info = {
		// 	"id": 58,
		// 	"userId": 100052000,
		// 	"userNickname": "💥",
		// 	"userImgUrl": "http://yun.dui88.com/yoofans/images/201806/poster_bg.jpg",
		// 	"courseId": 198,
		// 	"courseTitle": "课程-试听10s",
		// 	"courseSubTitle": "课程-试听10s-副标",
		// 	"courseUrl": "https://yun.dui88.com/youfen/images/lhk3dw0zk6.gif",
		// 	"courseVerticalCover": "https://yun.dui88.com/youfen/images/zbp2zkq154.jpg",
		// 	"courseLateralCover": "https://yun.dui88.com/youfen/images/2bmi5mohht.jpg",
		// 	"courseAuthor": "",
		// 	"readId": 9,
		// 	"readName": "阅读计划-测试1",
		// 	"readStageId": 9,
		// 	"readStageNum": 1,
		// 	"content": "觉得你You are running Vue in development mode发怒oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo发怒<br/>奶粉！仿佛个Make sure to turn on production mode when deploying for production.See more tips at大家都觉得觉Leaders",
		// 	"releaseTime": "2018-05-30 14:22:13",
		// 	"releaseTimeLabel": "深夜",
		// 	"praiseCount": 3,
		// 	"userPraise": false,
		// 	"myself": 0,
		// 	"listens": 0,
		// 	"clocks": 201,
		// 	"books": 0,
		// 	"loginDays": 2,
		// 	"readQrcodeImgUrl": "https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg",
		// 	"bookBgimgUrl": ""
		// }
		// //头部背景图
		// if (!_this.info.bookBgimgUrl) {
		// 	_this.info.bookBgimgUrl = "http://yun.dui88.com/yoofans/images/201806/poster_bg.jpg";
		// };
		// if(!_this.info.courseUrl){
		// 	_this.info.courseUrl = 'http://yun.dui88.com/youfen/images/read_course_none.png';
		// };
		// //默认观点
		// if(!_this.info.content){
		// 	_this.info.content = "不读书的人，思想就会停止。这是我在【一修读书】的第"+_this.info.clocks+"天。"
		// };
		// this.createdCanvas()
	},
  	methods: {
		createdCode() {
			let _this = this;
			let qrcode = new QRcode('code',{
				width:200,
				height:200,
				text:_this.codeUrl,
				colorDark:'#7f7f7f',
				foreground:"#fff"
			});
			let el = document.getElementById('code');
			let codeCanvas = el.getElementsByTagName('canvas')[0];
			_this.code64 = codeCanvas.toDataURL('image/jpeg');
			_this.getInfo() ;
		},
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
				//默认书籍
				if(!_this.info.courseUrl){
					_this.info.courseUrl = 'http://yun.dui88.com/youfen/images/read_course_none.png';
				};
				//默认观点
				if(!_this.info.content){
					_this.info.content = "不读书的人，思想就会停止。这是我在【一修读书】的第"+_this.info.clocks+"天。"
				};
				_this.createdCanvas();
			} else {
				console.log("获取数据失败");
			}
		},
		async getCodeUrl() {
			let _this = this;
			let params = {
				extParam:'&poster=1'
			};
			const url = `/poster/QRCodeUrl`;
			const res = await _this.$http.get(url, {
				params
			});
			if (res.data.success) {
				_this.codeUrl = res.data.data
				_this.createdCode()
			} else {
				console.log("获取二维码地址失败");
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
			ctx.font = _this.conversion(30) + "px PingFang SC";
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

			//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
			let line_number = 0;
			//计算行数
			function myPoint(){
				//考虑下面的
				line_number = 0;
				ctx.textBaseline = "top";
				ctx.textAlign = 'left'
				ctx.font = '29px pingFangSC-Light';
				let point = _this.info.content.split('<br/>');
				//处理换行文字
				point.forEach((item,index)=>{
					let string = item.split('');
					let num = 0;
					let x = _this.conversion(81)
					let y = _this.conversion(640)

					let test = /[0-9a-z]/i;
					// num是累计的宽度
					let A_Z = '';
					for(let i=0;i<string.length;i++){
						let string_w = 0;
						if(test.test(string[i])){
							if(string[i+1]){
								//后面跟着的是否字符串
								if(test.test(string[i+1])){
									A_Z = A_Z+string[i];
								}else{
									A_Z = A_Z+string[i];
									string_w = ctx.measureText(A_Z).width-1;
									if(string_w>_this.conversion(560)){
										let long_string = A_Z.split('');
										long_string.forEach((item)=>{
											string_w = ctx.measureText(item).width-1;
											ctx.fillText(item, x, y*1+line_number*_this.conversion(52));
											// 确定下一个字符的横坐标
											if(num<_this.conversion(560)){
												num = num + string_w ;
												x = x + string_w ;
											}else{
												x = _this.conversion(78);
												num = 0;
												line_number++;
											}
										})
									}else{
										if(num+string_w>_this.conversion(560)){
											x = _this.conversion(78);
											num = string_w;
											line_number++;
										}else{
											num = num + string_w ;
										}
										ctx.fillText(A_Z, x, y*1+line_number*_this.conversion(52));
										x = x + string_w ;
										A_Z = '';
									}
								}
							}else{
								A_Z = A_Z+string[i];
								string_w = ctx.measureText(A_Z).width-1;
								if(num+string_w>_this.conversion(560)){
									x = _this.conversion(78);
									num = string_w;
									line_number++;
								}else{
									num = num + string_w ;
								}
								ctx.fillText(A_Z, x, y*1+line_number*_this.conversion(52));
								x = x + string_w ;
								A_Z = '';
							}
						}else{
							string_w = ctx.measureText(string[i]).width-1;
							ctx.fillText(string[i], x, y*1+line_number*_this.conversion(52));
							// 确定下一个字符的横坐标
							if(num<_this.conversion(560)){
								num = num + string_w ;
								x = x + string_w ;
							}else{
								x = _this.conversion(78);
								num = 0;
								line_number++;
							}
						}
					}
					//开始的时候y轴坐标已经是从第一行开始计算的
					line_number++;
				})
			}
			myPoint();
			//响应高度，对应海报不同内容
			let responseHeight = 0;
			//如果文字大于3行，额外加高度
			if (line_number > 3) {
				responseHeight = (line_number - 3) * _this.conversion(52);
			}
			//判断是否是自己的分享，不是不显示打卡天数
			if (!_this.isSelf) {
				//无虚线的时候添加20
				responseHeight = responseHeight - _this.conversion(105)+_this.conversion(20)*1;
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
					ctx.shadowColor = "rgba(0,0,0,0.05)";
					ctx.shadowOffsetX = 0;
					ctx.shadowOffsetY = _this.conversion(5);
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
				ctx.setLineDash([8, 6]);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#ddd";
				ctx.beginPath();
				ctx.moveTo(_this.conversion(34),_this.conversion(896) * 1 + responseHeight * 1);
				ctx.lineTo(_this.conversion(718),_this.conversion(896) * 1 + responseHeight * 1);
				ctx.stroke();
				//文字
				ctx.beginPath();
				ctx.font = _this.conversion(26) + "px PingFang SC";
				ctx.fillStyle = "#777";
				ctx.textBaseline = "middle";
				let string = "这是我坚持读书的第";
				string = string.split('')
				let width = 0;
				string.forEach((el,index)=>{
					width = ctx.measureText(el).width;
					//字间距是2
					width = width*1+_this.conversion(2) * 1;
					ctx.fillText( el,_this.conversion(100)*1+index*width,_this.conversion(942) * 1 + responseHeight * 1);
				})
				let frist_w = width*string.length;
				ctx.font = _this.conversion(29) + "px PingFang SC";
				ctx.fillStyle = "#222";
				ctx.textBaseline = "middle";
				//额外加10撑开
				ctx.fillText( _this.info.clocks,_this.conversion(100)*1+frist_w*1+_this.conversion(5) * 1,_this.conversion(942) * 1 + responseHeight * 1);
				let day_w = ctx.measureText(_this.info.clocks).width;
				ctx.font = _this.conversion(26) + "px PingFang SC";
				ctx.fillStyle = "#777";
				ctx.textBaseline = "middle";
				//额外加10撑开
				ctx.fillText( "天",_this.conversion(100)*1+frist_w*1+day_w*1+_this.conversion(10) * 1,_this.conversion(942) * 1 + responseHeight * 1);
			}
			//绘制二维码
			function createdCode() {
				return new Promise((resolve, reject) => {
					ctx.font = _this.conversion(24) + "px PingFang SC";
					ctx.textBaseline = "top";
					ctx.fillStyle = "#444";
					ctx.fillText("一修读书·" + _this.info.readName,_this.conversion(126),_this.conversion(1071) * 1 + responseHeight * 1);
					ctx.fillStyle = "#999";
					ctx.font = _this.conversion(22) + "px PingFang SC";
					ctx.fillText("长按识别二维码",_this.conversion(126),_this.conversion(1108) * 1 + responseHeight * 1);
					let drawImg = new Image();
					drawImg.crossOrigin = "Anonymous";
					//drawImg.src = _this.code64;
					drawImg.src = 'http://yun.dui88.com/youfen/images/code_ewm.png';
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
						ctx.drawImage(drawImg,_this.conversion(64),_this.conversion(567),_this.conversion(80),_this.conversion(50));
						resolve();
					};
				});
			}
			//绘制头像
			function createdIcon() {
				return new Promise((resolve, reject) => {
					ctx.font = _this.conversion(24) + "px PingFang SC";
					ctx.fillStyle = "#444";
					ctx.textBaseline = "top";
					ctx.fillText( "今日读后感", _this.conversion(179), _this.conversion(405));
					//绘制书名
					ctx.font = _this.conversion(38) + "px PingFang SC";
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
						ctx.lineWidth = 1;
						ctx.arc(_this.conversion(113),_this.conversion(443),_this.conversion(45),0,Math.PI * 2,true);
						ctx.clip(); //裁剪上面的圆形
						ctx.drawImage(drawImg,_this.conversion(66),_this.conversion(398),_this.conversion(92),_this.conversion(92)); // 在刚刚裁剪的园上画图
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
					ctx.textBaseline = "top";
					ctx.textAlign = 'left'
					ctx.font = '29px pingFangSC-Light';
					let point = _this.info.content.split('<br/>');
					//处理换行文字
					myPoint()

					//绘制作者信息
					ctx.font = _this.conversion(24) + "px pingFangSC-Light";
					ctx.textBaseline = "top";
					let string_w = ctx.measureText(_this.info.userNickname).width;
					ctx.fillText(_this.info.userNickname,_this.conversion(668) - string_w,_this.conversion(660) + line_number * _this.conversion(52));
					//转换时间格式
					let createdTime = _this.info.releaseTime.replace(/-/g, "/");
					createdTime = new Date(createdTime);
					let year = createdTime.getFullYear();
					let month = createdTime.getMonth() + 1;
					let day = createdTime.getDate();
					let time ="于 " +year +"." +month +"." +day +" " +_this.info.releaseTimeLabel;
					string_w = ctx.measureText(time).width;
					ctx.fillText(time,_this.conversion(668) - string_w,_this.conversion(692) + line_number * _this.conversion(52));

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
			//绘制黄点
			function createdYellowPoint() {
				return new Promise((resolve, reject) => {
					ctx.beginPath();
					if (_this.isSelf) {
						let drawImg = new Image();
						drawImg.crossOrigin = "Anonymous";
						drawImg.src =  "http://yun.dui88.com/yoofans/images/201806/Oval7.png";;
						drawImg.onload = function() {
							ctx.drawImage(drawImg,_this.conversion(80),_this.conversion(936) * 1 + responseHeight * 1,_this.conversion(12),_this.conversion(12));
							resolve();
						};
					}else{
						resolve();
					}
				})

			}
			// 绘制所有canvas
			headerImg.then(createdBox).then(createdIcon).then(createdCode).then(createdComma).then(createdBook).then(createdLogo).then(createdYellowPoint).then(() => {
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
<style lang="less" scoped >
	@import "../../less/variable";
	@font-face{
		font-family: 'pingFangSC-Light';
		src: url('./../../assets/PingFang Light.ttf');
		font-weight: lighter;
	}
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
	canvas{
		width: 500px !important;
		height: 500px !important;
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
