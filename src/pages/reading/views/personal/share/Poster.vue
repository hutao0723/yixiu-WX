<template>
    <div class="poster">
        <div class="poster-main">
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
            <p class="pm-notice">分享此海报给好友，好友通过该海报购买后,您将获得“<em>分红</em>”</p>
        </div>
        <div class="poster-swiper">
            <PosterSwiper :readPlanPostersArr=readPlanPostersArr @getSwiperIndex=getSwiperIndex />
            <div class="ps-fx">
                <img src="" alt="" id="fx_img">
                <i class="iconfont icon-finger"></i>
                <span>长按分享</span>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapState } from 'vuex';
import PosterSwiper from './Poster-swiper'
import sales from '../../../api/sales'

export default {
    components: {
        PosterSwiper
    },
    data () {
        return {
            playbill:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527313092411&di=570284fc80fbc68d6dd211ec7f11a871&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201409%2F13%2F20140913140805_EZYKn.jpeg',
            portrait:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527313812184&di=66835925969c776a10030dea414d2ece&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201507%2F09%2F20150709200521_nYZMX.thumb.700_0.jpeg',
            canvas:'',
            qrcUrl: 'www.baidu.com',
            swiperArr: [],
            // swiperImgAddress:'//u.bcwcdn.com/activity_img/2017/img_1208/1633_01.png',
            headimgurl:'',
            nickname:'',
            QrcodeAddress:'',
            basecode64:'',
            readPlanPostersArr:[],
            poster:'',
            swiperIndex:0
        };
    },
    computed: {
        ...mapState({})
    },
    created() {
 
        this.getUserInfo()
        this.qrcodeUrl()
        this.readPlanPosters()
    },
    mounted () {
        // myCanvas.toDataURL("image/png");
        this.showQrc()
        
    },
    methods: {

        async getUserInfo(){
            let obj = await sales.getUserInfo()
            this.headimgurl = obj.headimgurl
            this.nickname = obj.nickname
        },

        async qrcodeUrl(){
            this.QrcodeAddress = await sales.qrcodeUrl()  
        },

        async readPlanPosters(){
            this.readPlanPostersArr = await sales.readPlanPosters()
        },

        createQrc: function () {
            if (!this.qrcUrl) {
                window.alert('链接不能为空')
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

        showQrc: function(){
            new Promise((resolve, reject) => {
                this.$nextTick(function () {
                    // DOM操作
                    this.canvas = document.getElementById('qrccode-canvas')
                    resolve()
                })
            }).then(() => {
                this.createQrc();
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
        },

        getSwiperIndex(itemImg, index){
            this.poster = itemImg
            this.swiperIndex = index
            this.createCanvas()
        },
        createCanvas(){
            const self = this;
            const rpp = self.readPlanPostersArr[self.swiperIndex]
            function conversion(number) {
                return number
            };

            var myCanvas = document.getElementById('myCanvas');
            myCanvas.width = conversion(510);
            myCanvas.height = conversion(820);
            var ctx =  myCanvas.getContext('2d');
            
            let background = new Promise(function(resolve, reject){
                var BG_img = new Image();
                BG_img.crossOrigin = 'anonymous'; 
                BG_img.src = self.poster;  //背景图 --- 跨域
                BG_img.onload = function () {
                    ctx.drawImage(BG_img, 0, 0,myCanvas.width,myCanvas.height);
                    resolve('');
                };	
            });   
            
            function code(){
                return new Promise(function(resolve, reject){
                    var codeImg = new Image();
                    // codeImg.crossOrigin = 'anonymous';
                    codeImg.src = self.basecode64;
                    codeImg.onload = function () {
                        ctx.drawImage(codeImg, conversion(rpp.qrcodeLeftMargin),conversion(rpp.qrcodeTopMargin),conversion(rpp.qrcodeLength),conversion(rpp.qrcodeLength));
                        resolve('');
                    };
                });
            };
            function icon(){
                return new Promise(function(resolve, reject){
                    var iconImg = new Image();
                    iconImg.crossOrigin = 'anonymous'; 
                    iconImg.src = self.headimgurl;
                    iconImg.onload = function () {
                        ctx.drawImage(iconImg, conversion(rpp.portraitLeftMargin), conversion(rpp.portraitTopMargin),conversion(rpp.portraitLength),conversion(rpp.portraitLength));
                        resolve('');
                    };	
                });
            };
            background.then(code).then(icon).then(()=>{
                
                //self.readPlanPostersArr[this.swiperIndex].nicknameFontSize 中的字段不存在则跳过
                if(rpp.nicknameFontSize){
                    ctx.font = conversion(rpp.nicknameFontSize)+'px 宋体';
                    ctx.fillStyle = rpp.nicknameFontColor;
                    // ctx.textAlign = 'center';
                    ctx.fillText(self.nickname,(conversion(510) - rpp.nicknameWidth) / 2, conversion(rpp.nicknameTopMargin)+conversion(20),);
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
                        // console.log(self.swiperIndex)
                        ctx.fillStyle = rpp.ctitleFontColor;
                        for(let b = 0; b < row.length; b++){
                            ctx.font =conversion(rpp.ctitleFontSize)+"px 宋体";
                            ctx.textAlign = "center";
                            console.log(x)
                            ctx.fillText(row[b],conversion(255),y+(b)*conversion(40));
                        }
                    }

                    rpp.ctitleFontSize && drawText('那些你从小到大未见过未听过的故事，这些关于深海的秘密',conversion(rpp.ctitleLeftMargin),conversion(rpp.ctitleTopMargin),conversion(300));
                    
                    self.createdImg()
                }
                

        
            })
            

        }
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
            padding: 50/@rem 120/@rem 23/@rem;
            border-bottom: 1/@rem solid @borderColor;
            position: relative;
            .pm-playbill {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                width: 510/@rem;
                height: 820/@rem;
                padding: 54/@rem 59/@rem 89/@rem;
                position: relative;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                box-sizing: border-box;
                position: relative;
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
                margin-top: 24/@rem;
                .fontSize(25);
                color: @fontColor;
                em {
                    color: @deepRed;
                    font-style: normal;
                }
            }

            .pm-warp {
                position: relative;
                .pm-canvas {
                    position: absolute;
                    left: 0;
                    top: -820/@rem;
                    width: 510/@rem;
                    height: 820/@rem;
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
                        position: absolute;
                        left: 0;
                        top: 0;
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
    }
    
    
</style>

