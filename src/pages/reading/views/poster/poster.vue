<template>
    <div class="share">
        <canvas id="sharePoster" v-if="!imgUrl"></canvas>
        <img :src="imgUrl" v-if="imgUrl" />
        <Popup v-if="popup" v-on:success = "listenChild"/>
    </div>
</template>

<script>
    import Popup from './../../components/basic/Diploma' 
    export default {
        data () {
            return {
                imgUrl:'',
                popup:false,
                info:{}
            };
        },
        components:{
            Popup,
        },
        mounted () {
            const _this = this;
            _this.popup = _this.$route.params.lastClock*1;
            _this.createdCanvas();
        },
        methods: {
            // async getInfo() {
            //     let _this = this;
            //     let params = {
            //         commentId: "50" // _this.$route.params.commentId
            //     }
            //     const url = `/api/comment/share`;
            //     const res = await _this.$http.get(url, {
            //         params
            //     });
            //     if(res.data.success){
            //         _this.info = res.data.data;
            //         _this.createdCanvas ();
            //     }else{
            //         console.log('获取数据失败')
            //     }
            // },
            listenChild(data){
                if(data){
                    //this.push()
                }else{
                    this.popup = false;
                }
            },
            conversion(data){
                return data
            },
            createdCanvas () {
                const _this = this;
                const myCanvas = document.getElementById('sharePoster');
                
                const ctx = myCanvas.getContext('2d');
                // 测试文字高度
                ctx.font = _this.conversion(30)+'px 宋体';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#282828';
                ctx.fillText('杀寇决卡视角三大空间', _this.conversion(0), _this.conversion(0));
                //测试文字高度   字符串、宽度
                function stringHeight(string,w){
                    let chr = string.split("");
                    let temp = "";
                    let row = [];
                    for(let a = 0; a < chr.length; a++){
                        //宽度根据设计稿固定值   
                        if( ctx.measureText(temp).width< _this.conversion(w) ){ 
                        }else{
                            row.push(temp);
                            temp = ""; 
                        }
                        temp += chr[a];  
                    }
                    row.push(temp);
                    return row
                }
                let stringLength = stringHeight('氨基酸的放得开了世快乐开积分看电视啦',586);
                let viewpointHeight = 0;
                if(stringLength.length>3){
                    viewpointHeight = (stringLength.length-3)*_this.conversion(50);
                }
                myCanvas.width = _this.conversion(750);
                myCanvas.height = _this.conversion(1200)*1+viewpointHeight; 
                ctx.fillStyle = "#fff";
                ctx.fillRect(0,0, myCanvas.width, myCanvas.height);  
                
                // 绘制头部背景图
                let headerImg = new Promise((resolve,reject) => {
                    let drawImg = new Image();   
                    drawImg.crossOrigin = "Anonymous";
                    drawImg.src = 'https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg';
                    drawImg.onload = function () {
                        ctx.drawImage(drawImg, 0, 0,_this.conversion(750),_this.conversion(545));
                        resolve();
                    } 
                });
                // 绘制方框
                function createdBox(){
                    return new Promise((resolve,reject) =>{
                        // 绘制阴影
                        ctx.shadowBlur=50;
                        ctx.shadowColor="#888";
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 20;
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
                            ctx.fillStyle = "#fff"
                            ctx.fill();
                        }
                        roundRect(_this.conversion(34), _this.conversion(355), _this.conversion(680), _this.conversion(660)*1+viewpointHeight*1,_this.conversion(10)); 
                        //清除阴影效果 
                        ctx.shadowColor="rgba(0,0,0,0)";
                        resolve("");
                    })
                };
                //绘制虚线
                function drawScreen() { 
                    ctx.setLineDash([15,10]); 
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#d6d6d6'; 
                    ctx.beginPath(); 
                    ctx.moveTo(_this.conversion(34),  _this.conversion(883)*1+viewpointHeight*1); 
                    ctx.lineTo(_this.conversion(714), _this.conversion(883)*1+viewpointHeight*1);
                    ctx.stroke(); 
                    // 文字 打卡天数
                    ctx.beginPath()
                    ctx.fillStyle = "#f9d61d"
                    ctx.arc(_this.conversion(93), _this.conversion(926)*1+viewpointHeight*1, _this.conversion(7), 0, Math.PI*2, true);
                    ctx.arc(_this.conversion(93), _this.conversion(976)*1+viewpointHeight*1, _this.conversion(7), 0, Math.PI*2, true);
                    ctx.fill();//画实心圆
                    ctx.closePath();

                    ctx.font = _this.conversion(30)+"px 宋体";
                    ctx.fillStyle = "#222";  
                    ctx.textBaseline = 'top';
                    ctx.fillText("这是我坚持阅读的第22天",  _this.conversion(110), _this.conversion(913)*1+viewpointHeight*1); 
                    ctx.fillText("已坚持阅读120本书，累计1200分钟",  _this.conversion(110), _this.conversion(963)*1+viewpointHeight*1);   

                }
                //绘制二维码
                function createdCode(){
                    return new Promise((resolve,reject) =>{
                        ctx.font = _this.conversion(24)+"px 宋体";
                        ctx.textBaseline = 'top';
                        ctx.fillStyle = "#444";  
                        ctx.fillText("长按识别二维码", _this.conversion(227), _this.conversion(1109)*1+viewpointHeight*1);  
                        ctx.fillText("一修读书·60天阅读训练营", _this.conversion(227), _this.conversion(1151)*1+viewpointHeight*1); 
                        let drawImg = new Image();   
                        drawImg.crossOrigin = "Anonymous";
                        drawImg.src = 'https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg';
                        drawImg.onload = function () {
                            ctx.drawImage(drawImg, _this.conversion(80), _this.conversion(1057)*1+viewpointHeight*1,_this.conversion(117),_this.conversion(117));
                            resolve();
                        }    
                    })
                }
                //绘制头像
                function createdIcon(){
                    return new Promise((resolve,reject) =>{
                        ctx.font = _this.conversion(24)+"px 宋体";
                        ctx.fillStyle = "#444";  
                        ctx.textBaseline = 'top';
                        ctx.fillText("今日读后感",  _this.conversion(179), _this.conversion(405));  
                        //绘制书名
                        ctx.font = _this.conversion(38)+"px 宋体";
                        let string_h = stringHeight("《书名书名书名书名》",320)
                        for(let b = 0; b < string_h.length; b++){
                            ctx.fillText(string_h[b],_this.conversion(179),_this.conversion(446)+(b)*_this.conversion(50));  
                        }
                        //ctx.fillText("一修读书·60天阅读训练营", _this.conversion(179), _this.conversion(447));  
                        
                        let drawImg = new Image();   
                        drawImg.crossOrigin = "Anonymous";
                        drawImg.src = 'https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg';        
                        
                        drawImg.onload = function () {
                            ctx.beginPath();
                            ctx.save(); // 保存当前ctx的状态
                            ctx.arc(_this.conversion(113), _this.conversion(443), _this.conversion(45), 0, Math.PI*2, true);
                            ctx.clip(); //裁剪上面的圆形
                            ctx.drawImage(drawImg, _this.conversion(68), _this.conversion(400), _this.conversion(90), _this.conversion(90)); // 在刚刚裁剪的园上画图
                            ctx.restore(); // 还原状态
                            resolve();
                        }
                    })
                }
                //绘制书籍
                function createdBook(){
                    return new Promise((resolve,reject) =>{
                        //绘制观点文字
                        for(let b = 0; b < stringLength.length; b++){
                            ctx.font = _this.conversion(30)+"px 宋体";
                            ctx.textBaseline = "top";
                            ctx.fillText(stringLength[b],_this.conversion(78),_this.conversion(640)+(b)*_this.conversion(50));  
                        }
                        //绘制作者信息
                        ctx.font = _this.conversion(24)+"px 宋体";
                        ctx.textBaseline = "top";
                        let string_w = ctx.measureText("苏小琴").width;
                        ctx.fillText("苏小琴",_this.conversion(668)-string_w,_this.conversion(792)*1+viewpointHeight*1);
                        string_w = ctx.measureText("于2018.5.20 深夜").width;
                        ctx.fillText("于2018.5.20 深夜",_this.conversion(668)-string_w,_this.conversion(824)*1+viewpointHeight*1);

                        ctx.fillStyle = '#FFF';
                        ctx.fillRect(_this.conversion(536), _this.conversion(320), _this.conversion(140),_this.conversion(190));
                        let drawImg = new Image();   
                        drawImg.crossOrigin = "Anonymous";
                        drawImg.src = 'https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg';
                        drawImg.onload = function () {
                            ctx.drawImage(drawImg, _this.conversion(542), _this.conversion(326),_this.conversion(128),_this.conversion(178));
                            resolve();
                        }    
                    })    
                }
                // 绘制所有canvas
                headerImg.then(createdBox).then(createdIcon).then(createdCode).then(createdBook).then(() =>{
                    drawScreen();
                    const myPoster = document.getElementById('sharePoster');
                    let  toBase64 = myPoster.toDataURL("image/png"); 
                    _this.imgUrl = toBase64;
                })                
            }
        }
    };
</script>

<style lang="less">
    @import '../../less/variable';
    .share {
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
        // z-index: 9;
        background: #f4f4f4;
        img{
            width: 100%;
            display: block;
        }
    }
</style>

