<template>
    <div class="poster" ref="poster">
        <div class="canvasContainer" ref="canvasContainer">
            <canvas id="poster" v-show='!imgUrl'></canvas>
            <img :src="imgUrl" v-show='imgUrl' crossorigin="Anonymous" >
        </div>
        <div class="save" @touchstart.prevent="showDeleteButton" @touchend="clearLoop">长按保存分享</div>
    </div>
</template>

<script>
    import flag from './flag.png'
    import poster from './../../api/poster.js'
    export default {
        data () {
            return {
                imgUrl:'',
                Loop:'',
                info:{
                }
            };
        },
        mounted () {
            this.abc()   
        },
        methods: {
            async abc(){
                let objs = await poster.getInfo();
                if(objs.success){
                    this.info = objs.data;
                    this.info.userImgUrl = flag;
                    this.info.courseUrl = flag;
                    this.myPoster ()
                }else{
                    console.log('获取海报信息失败');
                }      
            },
            showDeleteButton() {
                clearInterval(this.Loop);//再次清空定时器，防止重复注册定时器
                this.Loop=setTimeout(function(){
                    //长按处理
                },500);
            },
            clearLoop() {
                clearInterval(this.Loop);
            },
            change(){
                const myPoster = document.getElementById('poster');
                let  toBase64 = myPoster.toDataURL("image/png"); 
                this.imgUrl = toBase64;
            },
            conversion(data){
                return data*2
            },
            myPoster () {
                const _this = this;
                const myPoster = document.getElementById('poster');
                //设置画布宽、高
                myPoster.width = _this.conversion(640);
                myPoster.height = _this.conversion(1120);
                const ctx = myPoster.getContext('2d');

                // 绘制canvas背景
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, myPoster.width, myPoster.height);

                // 绘制两个边框
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#838383';
                ctx.strokeRect(_this.conversion(10), _this.conversion(24), _this.conversion(590) ,_this.conversion(1054));
                ctx.strokeRect(_this.conversion(33), _this.conversion(40), _this.conversion(590) ,_this.conversion(1054));

                // 绘制文字背景
                ctx.fillStyle = '#fed44c';
                ctx.fillRect(_this.conversion(40), _this.conversion(135), _this.conversion(500) ,_this.conversion(18));

                // 绘制文字
                ctx.font = _this.conversion(36)+'px 宋体';
                ctx.fillStyle = '#222';
                ctx.textBaseline = 'middle';
                //换算对齐线
                let text = _this.conversion(135)*1+_this.conversion(18)/2;
                ctx.fillText('这是我坚持阅读打卡的第', _this.conversion(40), text,_this.conversion(495));
                ctx.fillText('天',_this.conversion(490), text,);
                //绘制单独22
                ctx.font = _this.conversion(50)+'px 宋体';
                ctx.fillText(_this.info.dayNum,_this.conversion(435), text,);
                

                ctx.font = _this.conversion(26)+'px 宋体';
                ctx.textBaseline = 'top';
                ctx.fillText('已坚持阅读'+_this.info.books+'本书，累计'+_this.info.listens+'分钟', _this.conversion(40), _this.conversion(200));

                ctx.font = _this.conversion(22)+'px 宋体';
                ctx.textBaseline = 'top';
                ctx.fillText(_this.info.userNickname, _this.conversion(148), _this.conversion(310));
                ctx.fillText('写于'+_this.info.releaseTime, _this.conversion(148), _this.conversion(346));

                ctx.fillStyle = '#fed44c';
                ctx.fillRect(_this.conversion(45), _this.conversion(410), _this.conversion(540), _this.conversion(216));
                ctx.strokeStyle = '#1b1b1b';
                ctx.lineWidth = 3;
                ctx.strokeRect(_this.conversion(45), _this.conversion(410), _this.conversion(540), _this.conversion(216));

                function drawText(t,x,y,w){
                    //字符串切割成数组
                    let chr = t.split("");
                    let temp = "";              
                    let row = [];
                    //绘制字体设置
                    
                    //字符串拆分开
                    for(let a = 0; a < chr.length; a++){
                        if(a == 0){
                         row.push(chr[a]);  
                        }else{
                            if(row.length == 0){
                                if( ctx.measureText(temp).width*1+ctx.measureText(row[0]).width*1< w ){ 
                                }else{
                                    row.push(temp);
                                    temp = ""; 
                                }
                            }else if(row.length == 1){
                                if( ctx.measureText(temp).width*1< w-60 ){

                                }else{
                                    row.push(temp);
                                    temp = ""; 
                                }  
                            }else{
                                if( ctx.measureText(temp).width*1< w ){  }else{
                                    row.push(temp);
                                    temp = ""; 
                                } 
                            }
                            temp += chr[a];  
                        }
                    }
                    row.push(temp);
                    ctx.fillStyle = "#000";

                    for(let b = 0; b < row.length; b++){
                        if(b == 0){
                            ctx.font = _this.conversion(54)+"px 宋体";
                            ctx.textBaseline = "top";
                            ctx.fillText(row[b],x,_this.conversion(450));  
                        }else if(b == 1){
                            ctx.font = _this.conversion(26)+"px 宋体";
                            ctx.textBaseline = "top";
                            ctx.fillText(row[b],_this.conversion(120),y+(b)*_this.conversion(40));  
                        }else{
                            ctx.font = _this.conversion(26)+"px 宋体";
                            ctx.textBaseline = "top";
                            ctx.fillText(row[b],x,y+(b)*_this.conversion(40));  
                        }
                    }
                }
                //400单位是调试出来的
                drawText(_this.info.content,_this.conversion(65), _this.conversion(434),_this.conversion(400));

                // 绘制 书籍
                ctx.font = _this.conversion(20)+'px 宋体';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#131313';
                ctx.fillText('《'+_this.info.readName+'》', _this.conversion(115), _this.conversion(673));
                ctx.fillText(_this.info.courseAuthor, _this.conversion(122), _this.conversion(706));

                // 绘制 ‘一修阅读60天阅读训练营’
                ctx.font = _this.conversion(28)+'px 宋体';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#131313';
                ctx.fillText('一修·阅读60天阅读训练营', _this.conversion(320), _this.conversion(962));
                // 绘制 ‘一修阅读60天阅读训练营’
                ctx.fillText('长按识别二维码', _this.conversion(320), _this.conversion(995));

                //绘制书籍图片
                let drawBook = new Image();
                drawBook.crossOrigin = "Anonymous";
                drawBook.src = _this.info.courseUrl;
                let bookImage = new Promise(function(resolve, reject){
                    drawBook.onload = function () {
                        ctx.drawImage(drawBook, _this.conversion(48), _this.conversion(662),_this.conversion(58),_this.conversion(78));
                        resolve();
                    } 
                });


                //绘制二维码
                let codeImg = new Image();
                codeImg.crossOrigin = "Anonymous";
                codeImg.src = flag;
                //使其图片居中显示
                let sunWidth = 590+33+10;   // 590边框宽度 + 第二个边框距离边界 + 第一个边框的边界
                let codeImg_x = _this.conversion(sunWidth)/2;
                codeImg_x = codeImg_x - _this.conversion(110)/2;  //减去  图片的宽度/2
                let codeImage = new Promise(function(resolve, reject){
                    codeImg.onload = function () {
                        ctx.drawImage(codeImg, codeImg_x, _this.conversion(803),_this.conversion(110),_this.conversion(110));
                        resolve();
                    };
                });

                //绘制底部旗子
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#000';
                ctx.moveTo(_this.conversion(sunWidth)/2-175, _this.conversion(1078));
                ctx.lineTo(_this.conversion(sunWidth)/2+175, _this.conversion(1078));
                ctx.stroke();
                //绘制旗子图片
                let drawFlag = new Image();
                drawFlag.crossOrigin = "Anonymous";
                drawFlag.src = flag;
                let flagImage = new Promise(function(resolve, reject){
                    drawFlag.onload = function () {
                        ctx.drawImage(drawFlag, _this.conversion(sunWidth)/2, _this.conversion(1027),_this.conversion(40),_this.conversion(50));
                        resolve();
                    } 
                });

                //  绘制头像
                Promise.all([flagImage,bookImage,codeImage]).then(function(arr){
                    let userIcon = new Image();
                    userIcon.crossOrigin = "Anonymous";
                    userIcon.src = _this.info.userImgUrl;
                    // 保存当前ctx的状态
                    ctx.save();
                    ctx.arc(_this.conversion(86), _this.conversion(340), _this.conversion(36), 0, Math.PI*2, true);
                    ctx.clip(); 
                    ctx.drawImage(userIcon, _this.conversion(50), _this.conversion(304),_this.conversion(72),_this.conversion(72));
                    ctx.restore();
                    _this.change()
                },function(error){
                    console.log('加载图片失败')
                });
            }
        }
    };
</script>

<style lang="less">
    @import '../../less/variable';
    .poster {
        width: 750/@rem;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        padding: 80px 60/@rem 86/@rem 60/@rem;
        // z-index: 9;
        background: #f4f4f4;
        .canvasContainer{
            width: 100%;
            min-height: 100%;  
        }
        img{
            width: 100%;
        }
        .save{
            background: #fbdb31;
            line-height: 86/@rem;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            color: #3a3934;
            font-weight: 600;
            font-size: 30/@rem;;
        }
    }
</style>

