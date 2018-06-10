<template>
    <div class="poster">
        <div class="poster-main">
            <!-- 跳转到推广规则 -->
            <router-link to="/personal/share/generalize-rule" class="pm-tip"><i class="iconfont icon-guize"></i></router-link>
            <div class="pm-playbill" :style="{backgroundImage:`url(${playbill})`,opacity:0}">
                <canvas id="qrccode-canvas" class="qrccode"></canvas>
                <img src="" alt="" id="cImg">
                <div class="pmp-info">
                    <img :src="portrait" alt="" class="pmpi-portrait">
                    <span class="pmpi-nick">Glacier</span>
                </div>
                <p class="pmp-description"></p>
            </div>
            <div class="pm-warp">
                <div class="pm-canvas">
                    <canvas id="myCanvas" class="canvas"></canvas>
                    <img src="" id="img">
                </div>
            </div>
            <p class="pm-notice">分享此海报给好友，好友通过该海报购买后，您将获得“<em>收益</em>”</p>
        </div>
        <div class="poster-swiper">
            <PosterSwiper :readPlanPostersArr=readPlanPostersArr @getSwiperIndex=getSwiperIndex />
            <div class="ps-fx">
                <img src="" alt="" id="fx_img">
                <i class="iconfont icon-finger"></i>
                <span>长按分享</span>
            </div>
        </div>
        <Loading :loading=loading />
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapState } from 'vuex';
import PosterSwiper from './Poster-swiper'
import sales from '../../../api/sales'
import Loading from '../../../components/basic/Loading'

export default {
    components: {
        PosterSwiper,
        Loading
    },
    data () {
        return {
            playbill:'',
            portrait:'',
            canvas:'',
            qrcUrl: '',
            swiperArr: [],
            // swiperImgAddress:'//u.bcwcdn.com/activity_img/2017/img_1208/1633_01.png',
            headimgurl:'',
            nickname:'', 
            // QrcodeAddress:'',
            basecode64:'',
            readPlanPostersArr:[],
            poster:'',
            swiperIndex:0,
            loading: true,
        };
    },
    computed: {
        ...mapState({})
    },
    created() {
        this.getUserInfo()
        this.readPlanPosters()
        
    },
    beforeMount(){

    },
    mounted () {

    },
    methods: {

        async getUserInfo(){ // 拉取微信用户的昵称和头像
            let obj = await sales.getUserInfo()
            this.headimgurl = obj.headimgurl
            this.nickname = obj.nickname
        },

        async qrcodeUrl(){ // 获取二维码地址
            this.qrcUrl = await sales.qrcodeUrl()
            if(this.qrcUrl){
                this.showQrc()
            }
        },

        async readPlanPosters(){ // 获取海报
            this.readPlanPostersArr = await sales.readPlanPosters()
            this.qrcodeUrl()
        },

        

        createQrc: function () { // 根据接口返回的URL创建二维码
            if (!this.qrcUrl) {
                // window.alert('链接不能为空')
                return false
            }
            QRCode.toCanvas(this.canvas, this.qrcUrl, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    // console.log('success')
                }
            })
        },

        showQrc: function(){ // 将创建完的二维码显示到页面中的canvas中
            new Promise((resolve, reject) => {
                this.$nextTick(function () {
                    // DOM操作
                    this.canvas = document.getElementById('qrccode-canvas')
                    resolve()
                })
            }).then(() => {
                this.createQrc();
                // 将canvas转成base64
                this.basecode64 = document.getElementById('qrccode-canvas').toDataURL("image/png");
                this.createCanvas()
            })
        },
        createdImg(){
            var img = document.getElementById('img');
            var myCanvas = document.getElementById('myCanvas');
            var fxImg = document.getElementById('fx_img');
            var toBase64 = myCanvas.toDataURL("image/png");
            img.setAttribute('src', toBase64)
            fxImg.setAttribute('src', toBase64)
            img.onload = () => {
                this.loading = false
            }
        },

        //  
        getSwiperIndex(itemImg, index){
            this.poster = itemImg
            this.swiperIndex = index
            this.createCanvas()
        },

        switchNumber(n){ // 根据屏幕计算出图片所需要的高度
            let getStyle = function(obj,attr){
                if(obj.currentStyle){
                    return obj.currentStyle[attr];
                }else{
                    return document.defaultView.getComputedStyle(obj,null)[attr];
                }
            }
            let documentHeight = document.body.clientHeight || document.documentElement.clientHeight;
            let ratio = documentHeight / 1334;  // 750设计图 - 1334
            let posterMain = document.querySelector('.poster-main');
            let swiperHeight = document.querySelector('.poster-swiper').offsetHeight;
            let pmNoticeHeight = document.querySelector('.pm-notice').offsetHeight;
            let posterMainPaddingTop = Number(getStyle(posterMain,'paddingTop').match(/[0-9]+/)[0]) * ratio
            let posterMainPaddingBottom = Number(getStyle(posterMain,'paddingBottom').match(/[0-9]+/)[0])
            // console.log(pmNoticeHeight)
            let bkImgHeight = documentHeight - swiperHeight - 96 - posterMainPaddingTop - posterMainPaddingBottom
            return bkImgHeight

        },
        createCanvas(){
            const self = this;
            const rpp = self.readPlanPostersArr[self.swiperIndex]
            if(!this.poster){
                this.poster = rpp.poster
            }

            // 图像大小适配
            function conversion(number) {
                return number 
            };
            var myCanvas = document.getElementById('myCanvas');
            var bkImgHeight = this.switchNumber()
            var bkImgWidth = bkImgHeight*510/820
            var scale = bkImgHeight/820 // 屏幕尺寸的缩放比例
            myCanvas.width = conversion(bkImgWidth);
            myCanvas.height = conversion(bkImgHeight);
            var ctx =  myCanvas.getContext('2d');
            // 绘制背景图
            let background = new Promise(function(resolve, reject){
                var BG_img = new Image();
                BG_img.crossOrigin = 'anonymous'; 
                BG_img.src = self.poster;  //背景图 --- 跨域
                BG_img.onload = function () {
                    ctx.drawImage(BG_img, 0, 0,myCanvas.width,myCanvas.height);
                    resolve('');
                    
                };	
            });   
            // 绘制二维码
            function code(){
                return new Promise(function(resolve, reject){
                    var codeImg = new Image();
                    // codeImg.crossOrigin = 'anonymous';
                    codeImg.src = self.basecode64;
                    codeImg.onload = function () {
                        ctx.drawImage(codeImg, conversion(rpp.qrcodeLeftMargin * scale),conversion(rpp.qrcodeTopMargin * scale),conversion(rpp.qrcodeLength* scale),conversion(rpp.qrcodeLength * scale));
                        resolve('');
                    };
                });
            };
            // 绘制微信头像
            function icon(){
                return new Promise(function(resolve, reject){
                    if(rpp.portraitDisplay){
                        var iconImg = new Image();
                        iconImg.crossOrigin = 'anonymous';
                        iconImg.src = self.headimgurl;
                        iconImg.onload = function () {

                            if(rpp.portraitRoundProportion && rpp.portraitRoundProportion > 0){
                                ctx.beginPath();
                                ctx.save(); // 保存当前ctx的状态
                                ctx.arc(conversion(rpp.portraitLeftMargin* scale + rpp.portraitLength* scale/2), conversion(rpp.portraitTopMargin* scale + rpp.portraitLength* scale/2), conversion(rpp.portraitLength* scale/2), 0, Math.PI*2, true); // 绘制圆
                                ctx.clip(); // 裁剪上面的圆形
                            }
                            
                            ctx.drawImage(iconImg, conversion(rpp.portraitLeftMargin* scale), conversion(rpp.portraitTopMargin* scale),conversion(rpp.portraitLength* scale),conversion(rpp.portraitLength* scale));
                            ctx.restore(); // 还原状态
                            resolve('')

                            
                        };
                    }else{
                        resolve('');
                    }
                    	
                });
            };
            
            // 图像绘制完后进行文字绘制
            background.then(code).then(icon).then(()=>{
                //self.readPlanPostersArr[this.swiperIndex].nicknameFontSize 中的字段不存在则跳过

                if(rpp.nicknameDisplay){ // 绘制昵称
                    ctx.font = conversion(rpp.nicknameFontSize* scale)+'px 宋体';
                    ctx.fillStyle = rpp.nicknameFontColor;
                    // ctx.textAlign = 'center';
                    ctx.fillText(self.nickname,conversion(rpp.nicknameLeftMargin* scale + rpp.nicknameWidth* scale/2), conversion(rpp.nicknameTopMargin* scale)+conversion(20* scale),);
                }

                function drawText(t,x,y,w){
                    let chr = t.split("");
                    let temp = "";              
                    let row = [];
                    for(let a = 0; a < chr.length; a++){
                        if( ctx.measureText(temp).width*1< w ){

                        }else{
                            row.push(temp);
                            temp = ""; 
                        }
                        temp += chr[a];
                    }
                    row.push(temp);
                    ctx.fillStyle = rpp.ctitleFontColor;
                    for(let b = 0; b < row.length; b++){
                        ctx.fillText(row[b],conversion(bkImgWidth/2),y+(b)*conversion(40* scale));
                    }
                }
                // 绘制签名
                ctx.font =conversion(rpp.ctitleFontSize* scale)+"px 宋体";
                // ctx.textAlign = 'right';
                rpp.ctitleDisplay && drawText('我在一修读书学习，邀请你成为我的同学，每天10分钟，养成读书习惯',conversion(rpp.ctitleLeftMargin* scale),conversion(rpp.ctitleTopMargin* scale),conversion(300* scale));
                    
                self.createdImg()
        
            })
            ctx.textAlign = "center";
            // 海报下面的文字宽度
            document.querySelector('.pm-notice').style.width = bkImgWidth+'px'
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
    @boldFontColor:#000;
    
    // @cashColor:#FF898C;
    // @cashTextTipColor:#888888;
    // @inputPlaceholderTextColor:#CCCCCC;
    // @cashTextColor:#576B95;
    // @cashBtnDisabled:#FF898C;
    // @cashBtnabled:#FF595D;

    .poster {
        .poster-main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 92/@rem 0 23/@rem;
            border-bottom: 1/@rem solid @borderColor;
            position: relative;
            .pm-tip {
                position: absolute;
                right: 42/@rem;
                top: 27/@rem;
                // width: 42/@rem;
                // height: 42/@rem;
                z-index: 1;
                i {
                .fontSize(42);
                }
            }
            .pm-playbill {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                // width: 510/@rem;
                // height: 820/@rem;
                // padding: 54/@rem 0 89/@rem;
                position: relative;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                top: 0;
                width: 0;
                height: 0;
                // .pmp-image {
                //     border: 0 none;
                //     width: auto\9;
                //     height: auto;
                //     max-width: 100%;
                //     vertical-align: top;
                //     -ms-interpolation-mode: bicubic;
                // }
                .pmp-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 277/@rem;
                    .pmpi-portrait {
                        width: 62/@rem;
                        height: 62/@rem;
                    }
                    .pmpi-nick {
                        margin-top: 4/@rem;
                        font-weight: bold;
                        color: @boldFontColor;
                        .fontSize(22);
                        
                    }
                }
                .pmp-description {
                    margin-bottom: 124/@rem;
                    text-align: center;
                    .fontSize(28);
                    color: @setionBackgroundColor;
                    
                }
            }
            .pm-notice {
                // width: 490/@rem;
                padding-top: 24/@rem;
                .fontSize(25);
                color: @fontColor;
                box-sizing: border-box;
                em {
                    color: @deepRed;
                    font-style: normal;
                }
            }

            .pm-warp {
                // position: relative;
                .pm-canvas {
                    // position: absolute;
                    // left: 0;
                    // top: -820/@rem;
                    // width: 510/@rem;
                    // height: 820/@rem;
                    z-index: 1;
                    .canvas {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 0;
                        height: 0;
                        opacity: 0;
                    }
                    img {
                        // position: absolute;
                        // left: 0;
                        // top: 0;
                        width: 100%;
                        height: 100%;
                        border: 0 none;
                        // width: auto\9;
                        // height: auto;
                        max-width: 100%;
                        z-index: 3;
                        vertical-align: top;
                        -ms-interpolation-mode: bicubic;
                    }
                }
            }
        }
        .poster-swiper {
            padding: 40/@rem 198/@rem 40/@rem 35/@rem;
            position: relative;
            .ps-fx {
                position: absolute;
                right: 0;
                top: 0;
                width: 198/@rem;
                height: 207/@rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                // padding: 0 39/@rem;
                background-color: @setionBackgroundColor;
                z-index: 1;
                i {
                    margin-bottom: 20/@rem;
                    .fontSize(70);
                    color: @setionBackgroundColor;
                    &::before {
                        padding: 20/@rem;
                        background-color: @deepRed;
                        border-radius: 60/@rem;
                    }
                }

                span {
                    .fontSize(25);
                    color: @fontColor;
                    font-weight: bold;
                }
                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    opacity: 0;
                }
            }
        }

        .qrccode {
            // opacity: 0;
        }

        .load {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
        }
    }
    
    
</style>

