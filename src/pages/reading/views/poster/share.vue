<template>
    <div class="sharePages">
        <audio  ref="tryaudio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay"  @ended="musicEnded"></audio>
        <div class="shareContainer">
            <div class="bg">
                <div class="logo">
                    <span class="icon"></span>
                    <span class="name">一修读书</span>
                </div>
                <div class="content">
                    <div class="bookPic">
                        <img :src="info.bookImageUrl">
                    </div>
                    <div class="symbol"></div>
                    <div class="userInfo">
                        <div class="userIcon">
                            <img :src="info.userImgUrl  ">
                        </div>
                        <div class="bookInfo">
                            <p>今日读后感</p>
                            <h5 v-if="info.courseTitle">{{ bookNameInit(info.courseTitle,24) }}</h5>
                        </div>
                    </div>
                    <div class="text">
                        <div class="viewpoint">
                            <!-- <span class="big">{{ viewPoint_frist }}</span>
                            <span v-html="viewPoint_main"></span> -->
                            <span v-html="info.content"></span>
                        </div>
                        <p class="author">{{ info.userNickname }}</p>
                        <p class="time">写于{{info.releaseTime}}&nbsp;&nbsp;{{info.releaseTimeLabel}}</p>
                    </div>
                    <!--不是自己不渲染-->
                    <div class="insist" v-if="info.myself*1">
                        <span></span>这是我坚持读书的第{{info.clocks}}天
                    </div>
                </div>
                <div class="player">
                    <div class="audio" v-if="info.simpleAudition">
                        <div class="play" @click="clickFun($event,togglePlay)" :monitor-log="getMonitor('8002.'+bookID+'.0.0', '818.1.0')">
                            <img :src="info.bookImageUrl">
                            <div class="playIcon">
                                <i class="iconfont" :class="{'icon-play':!isPlaying,'icon-pause':isPlaying}"></i>
                            </div>
                        </div>
                        <div class="playInfo">
                            <p class="name" v-if="info.courseTitle"><span class="taste">试听</span>{{ bookNameInit(info.courseTitle,13) }}</p>
                            <div class="range">
                                <ranger />   
                            </div>
                            <div class="time"><span>{{current}}</span><span>{{duration}}</span></div>
                        </div>
                    </div>
                    <p class="intro" v-if="info.introduction">{{info.introduction}}</p>
                </div>    
            </div>
        </div>
        <div class="btn" v-if='info.nowRead' @click="clickFun($event,shareFriend)" :monitor-log="getMonitor('8002.'+bookID+'.0.0', '818.2.1')">分享朋友圈</div>
        <div class="btn" v-if='!info.nowRead' @click="clickFun($event,goToIndex)" :monitor-log="getMonitor('8002.'+bookID+'.0.0', '818.2.2')">了解一修读书</div>
        <shareBtn v-show="shareBtn" v-on:success="closeShare" />
    </div>
</template>

<script>
    import ranger from './ranger'
    import shareBtn from '../../components/basic/Share'
    import { mapState } from 'vuex'
    import store from '../../vuex/store';

    export default {
        name:'share',
        data(){
            return{
                info:'',
                viewPoint_frist:'',
                viewPoint_main:'',
                isPlaying:false,
                playBookName:'',
                shareBtn:false,
                bookID:'',
                dataUpdated:false,
            }
        },
        computed: {
            ...mapState(['shareCurrentTime','shareDuration']),
            current() {
                return this.timerFomart(this.shareCurrentTime)
            },
            duration() {
                return this.timerFomart(this.shareDuration)
            }
        },
        async created(){
            let _this = this;
            //  初始化播放器值
            _this.$store.commit('setSharePlayWidth'); 
            
            let pageInfo = await this.getInfo();
            // 分享标题
            let shareContent = '';
            if (pageInfo.success) {
                _this.dataUpdated = true;

                // 内容为空，默认文本
                if(!pageInfo.data.content){
                    pageInfo.data.content = "不读书的人，思想就会停止。这是我在【一修读书】的第"+pageInfo.data.clocks+"天。"  
                }
                _this.info = pageInfo.data;
                shareContent = pageInfo.data.shareContent
                _this.dataInitail();
            } else {
                console.log("获取数据失败");
            }

            // 书籍ID
            _this.bookID = _this.info.readBookId;

            // 请求用户信息
            let userInfo=await _this.getUserInfo();
            let shareText = pageInfo.data.content;
            shareText = shareText.replace(/\<br\/\>/g,"");
            // 配置分享链接参数
            let msg = {
                title: userInfo.data.readState*1>=0?shareContent:'每天10分钟，轻松阅读，日有所得', // 分享标题
                desc: shareText, // 分享描述
                link: _this.delUrl(window.location.href,'lastClock'), // 分享链接 默认以当前链接
                imgUrl: pageInfo.data.bookImageUrl, // 分享图标
            }
            _this.wxShare(userInfo.data.userId,msg);


            // 曝光
            this.$nextTick(function () {
                setTimeout(() => {
                    // 埋点
                    window.monitor && window.monitor.showLog(_this);
                }, 100)
            })  
        },
        mounted(){
            
        },
        updated(){
            const _this = this;
            if(_this.dataUpdated){
                _this.playSetting();
                _this.dataUpdated = false;
                let el = _this.$refs.tryaudio;
                _this.$store.commit('getShareAudioElement',el)
            }
        },
        methods:{
            // 音频播放结束事件
            musicEnded () {
                this.$refs.tryaudio.load()
                this.$refs.tryaudio.pause()
                this.$store.commit('setSharePlayWidth'); 
                // 播放结束切换图标
                this.isPlaying = false;

                // 播放结束埋点事件
                
                // 获取公共字段
                let app_id = '157';
                let referer = store.getters.getReferer;
                let url = window.location.href.split('?')[0];
                let adzoneId = this.$route.query.dcd ? this.$route.query.dcd : ''; 
                let itemType = 4;
                // 发送埋点
                let dcm = '8002.'+this.bookID+'.0.0';
                let dpm = '157.818.1.0'
                //var {dpm, dcm} = JSON.parse(event.currentTarget.getAttribute('monitor-log'));
                let params = {app_id, referer, url, adzoneId, itemType, dcm, dpm};
                this.$http.post('https://embedlog.youfen666.com/embed/other', params).then((res) => {
                    // 埋点成功
                }, (res) => {
                    // 埋点失败
                });

            },
            // 音乐播放时间更新事件
            musicTimeUpdate () {
              store.dispatch({
                type: 'set_shareCurrentTime',
                time: Math.floor(this.$refs.tryaudio.currentTime)
              })
            },
            // 可以播放事件
            musicCanPlay () {
              store.dispatch({
                type: 'set_shareReadDuration',
                duration: Math.floor(this.$refs.tryaudio.duration)
              })
            },
            togglePlay() {
                if (this.isPlaying) {
                    this.isPlaying = false
                    this.$refs.tryaudio.pause()
                } else {
                    this.isPlaying = true
                    this.$store.commit('pause')
                    this.$refs.tryaudio.play()
                };
            },
            async getUserInfo() {
                let self = this;
                let params = {};
                const url = '/user/read/state';
                const res = await this.$http.get(url, {
                    params
                });
                return res.data;
            },
            async getInfo() {
                let _this = this;
                let params = {
                    commentId: _this.$route.query.commentId
                    //commentId: 71
                };
                const url = `/comment/h5/share`;
                const res = await _this.$http.get(url, {
                    params
                });
                return res.data;
            },
            dataInitail(){
                const _this = this;
                            
                // 时间格式转换
                let createdTime = _this.info.releaseTime.replace(/-/g, "/");
                createdTime = new Date(createdTime);
                let year = createdTime.getFullYear();
                let month = createdTime.getMonth() + 1;
                let day = createdTime.getDate();
                _this.info.releaseTime = year +"." +month +"." +day;
                
                // 观点字符串转换
                let viewPoint = _this.info.content.split('');
                _this.viewPoint_frist = viewPoint.shift();
                _this.viewPoint_main = viewPoint.join('') 
            },
            // 书名转换
            bookNameInit(str,l){
                let text = str
                if(str.length>l){
                    text = str.substring(0,l-1)
                    text = '《'+ text +'...》'    
                    return text
                }else{
                   return '《'+ text +'》'  
                }
            },
            playSetting(){
                const _this = this;
                // 设置播放元素数据
                this.$refs.tryaudio.src = _this.info.simpleAudition;
                
                // 这里，很迷，触发播放
                // this.$refs.tryaudio.load()
            },
            timerFomart (time) {
                if (isNaN(time)) return '00:00';
                let mm = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60);
                let ss = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60);
                return mm + ':' + ss;
            },
            goToIndex(){
                const _this = this;
                _this.$router.push({path:'/',query:{dcd:'c_94'}})
            },
            shareFriend(){
                this.shareBtn = true;   
            },
            closeShare(){
                this.shareBtn = false;
            },
            // 去除地址url中某个参数
            delUrl (url,ref) {
                if (url.indexOf(ref) == -1){
                    return url;
                };
                let arr_url = url.split('?');
                let base = arr_url[0];
                let arr_param = arr_url[1].split('&');
                let index = -1;
                for (let i = 0; i < arr_param.length; i++) {
                    let paired = arr_param[i].split('=');
                    if (paired[0] == ref) {
                        index = i;
                        break;
                    }
                }
                if (index == -1) {
                    return url;
                } else {
                    arr_param.splice(index, 1);
                    return base + "?" + arr_param.join('&');
                }
            },
            getMonitor(dcm,dpm) {
                // item tabindex dpmc
                return JSON.stringify({
                    'dcm': dcm,
                    'dpm': '157.' + dpm,
                });
            },
        },
        components:{ ranger,shareBtn }
    }
</script>

<style lang="less">
    @import '../../less/variable';
    @font-face{
		font-family: 'pingFangSC-Light';
		src: url('./../../assets/PingFang Light.ttf');
		font-weight: lighter;
	}
    .bg-image(@url) {
        background-image: url('@{url}@2x.png');
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
            background-image: url('@{url}@3x.png');
        }
    }
    .sharePages {
        height: 100%;
        .shareContainer{
            display: block;
            width: 10rem;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            background: #fff;
            z-index: 100;
        }
        .bg{
            width: 100%;
            height: 482/@rem;
            background: #FFC936;
            .logo{
                padding: 84/@rem 46/@rem 25/@rem;
                line-height: 84/@rem;
                height: 84/@rem;
                font-family:"pingFangSC-Light";
                .icon{
                    height: 84/@rem;
                    width: 64/@rem;
                    display: inline-block;
                    //background-image: url('http://yun.dui88.com/logo.png');
                    .bg-image('http://yun.dui88.com/logo');
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
                .name{
                    font-size: 36/@rem;
                    color: #323333;
                    padding-left: 10/@rem;
                    line-height: 84/@rem;
                    vertical-align: middle
                }
            }
            .content{
                font-family:"pingFangSC-Light";
                width: 690/@rem;
                margin: 0 auto;
                background: #fff;
                border-radius: 10/@rem;
                position: relative;
                box-shadow: 8/@rem  13/@rem 32/@rem rgba(166,166,166,0.29); 
                .bookPic{
                    position: absolute;
                    right: 22/@rem;
                    top: -86/@rem;
                    width: 166/@rem;
                    height: 222/@rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .symbol{
                    position: absolute;
                    top: 214/@rem;
                    left: 38/@rem;
                    width: 72/@rem;
                    height: 58/@rem;
                    // background: url('http://yun.dui88.com/symbol.png') no-repeat;
                    .bg-image('http://yun.dui88.com/symbol');
                    background-size: 100% 100%;
                }
                .userInfo{
                    padding: 66/@rem 178/@rem 0 22/@rem;
                    font-size: 0;
                    height: 245/@rem;
                    display: flex;
                    flex-flow:row;
                    .userIcon{
                        display: inline-block;
                        height: 70/@rem;
                        width: 70/@rem;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                    .bookInfo{
                        flex: 1; 
                        padding-left: 16/@rem;
                        vertical-align: top;
                        p{
                            font-size: 26/@rem;
                            color: #333;
                            line-height: 1;
                        }  
                        h5{
                            font-size: 30/@rem;
                            color: #333;
                            line-height: 42/@rem;
                            letter-spacing:0/@rem;
                            margin-left: -12/@rem;
                            margin-top: 14/@rem;

                        }
                    }
                }
                .text{
                    padding: 0 56/@rem 56/@rem;
                    letter-spacing:1/@rem;
                    .viewpoint{
                        font-size: 0;
                        color: #222;
                        padding-bottom: 90/@rem;
                        span{
                            font-size: 29/@rem;
                            line-height: 46/@rem;
                            letter-spacing: 1/@rem;
                            word-wrap: break-word;
                            // &.big{
                            //     font-size: 40/@rem;
                            //     line-height: 1;
                            // }
                        }
                    }
                    .author,.time{
                        font-size: 24/@rem;
                        color: #4D4D4D;
                        line-height: 40/@rem;
                        text-align: right;
                    }
                }
                .insist{
                    width: 632/@rem;
                    margin: 0 auto;
                    //border-top: 1px #C5C5C5 dashed;
                    background: url('http://yun.dui88.com/Line-5_02.png') repeat-x top left;
                    line-height: 80/@rem;
                    font-size: 26/@rem;
                    color: #4D4D4D;
                    padding-bottom: 5/@rem;
                    span{
                        display: inline-block;
                        height: 10/@rem;
                        border-radius: 50%;
                        background: #666;
                        width: 10/@rem;
                        margin-right: 12/@rem;
                        vertical-align: middle;
                    }
                }
            }
            .player{
                width: 626/@rem;
                margin: 90/@rem auto 0;
                padding-bottom: 150/@rem;
                .audio{
                    display:flex;
                    flex-flow:row;
                    box-sizing: border-box;
                    .play{
                        height: 108/@rem;
                        width: 108/@rem;
                        position: relative;
                        overflow: hidden;
                        background: #fff;
                        margin-right: 26/@rem;
                        img{
                            display: block;
                            width: 100%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%)
                        }
                        .playIcon{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            width: 68/@rem;
                            height: 68/@rem;
                            border-radius: 50%;
                            background: rgba(0,0,0,0.52);
                            text-align: center;
                            line-height: 68/@rem;
                            .iconfont{
                                font-size: 30/@rem;
                                color: #fff;
                                padding-left: 3/@rem;
                            }
                        }
                        
                    }
                    .playInfo{
                        color: #333;
                        flex:1;
                        overflow: hidden;
                        p{
                            line-height: 32/@rem;
                            font-size: 30/@rem;
                            white-space: nowrap;
                            .taste{
                                background: #FF464A;
                                color: #fff;
                                border-radius: 3/@rem;
                                font-size: 22/@rem;
                                display: inline-block;
                                height: 32/@rem;
                                width: 54/@rem;
                                line-height: 32/@rem;
                                text-align: center;
                                vertical-align: top;
                                padding: 0 7/@rem;
                                
                            }
                        }
                        .range{
                            height: 60/@rem;
                            padding: 0 7/@rem;
                        }
                        .time{
                            display: flex;
                            justify-content:space-between;
                            font-size: 22/@rem;
                            color: #B3B3B3;
                            line-height: 1;
                            padding: 0 7/@rem;
                        }
                       
                    }
                }
                .intro{
                    font-size: 28/@rem;
                    color: #4D4D4D;
                    line-height: 42/@rem;
                    padding-top: 46/@rem;
                    
                    letter-spacing: 0/@rem;
                }
            }
        }
        .btn{
            position: fixed;
            z-index: 200;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            height: 100/@rem;
            background: #FF4848;
            line-height: 100/@rem;
            font-size: 36/@rem;
            font-family: SourceHanSansSC-Regular;
            color: #fff;
        }
    }
</style>

