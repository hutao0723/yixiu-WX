<template>
    <div class="sharePages">
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
                            <h5>{{ info.courseTitle }}</h5>
                        </div>
                    </div>
                    <div class="text">
                        <div class="viewpoint">
                            <span class="big">{{ viewPoint_frist }}</span>
                            <span v-html="viewPoint_main"></span>
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
                        <div class="play" @click="clickFun($event,togglePlay)" :monitor-log="getMonitor('0.0.0.0', '818.1.0')">
                            <img :src="info.bookImageUrl">
                            <div class="playIcon">
                                <i class="iconfont" :class="{'icon-play':!isPlaying,'icon-pause':isPlaying}"></i>
                            </div>
                        </div>
                        <div class="playInfo">
                            <p class="name">{{ playBookName }}</p>
                            <div class="range">
                                <range />   
                            </div>
                            <div class="time"><span>{{current}}</span><span>{{duration}}</span></div>
                        </div>
                    </div>
                    <p class="intro" v-if="info.introduction">{{info.introduction}}</p>
                </div>    
            </div>
        </div>
        <div class="btn" v-if='info.nowRead' @click="clickFun($event,shareFriend)" :monitor-log="getMonitor('0.0.0.0', '818.2.1')">分享朋友圈</div>
        <div class="btn" v-if='!info.nowRead' @click="clickFun($event,goToIndex)" :monitor-log="getMonitor('0.0.0.0', '818.2.2')">了解一修读书</div>
        <shareBtn v-show="shareBtn" v-on:success="closeShare" />
    </div>
</template>

<script>
    import range from '../../components/basic/Range'
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
            }
        },
        computed: {
            ...mapState(['readAudio','readPlaying','readCurrentTime','readDuration','showCardModal','readLoadStart']),
            current() {
                return this.timerFomart(this.readCurrentTime)
            },
            duration() {
                return this.timerFomart(this.readDuration)
            }
        },
        async created(){
            let _this = this;
            //  初始化播放器值
            _this.$store.commit('setSharePlayWidth'); 
            
            let pageInfo = await this.getInfo();

            if (pageInfo.success) {
                _this.info = pageInfo.data;
                _this.playSetting();
                _this.dataInitail();
            } else {
                console.log("获取数据失败");
            }

            let userInfo=await _this.getUserInfo();
            // 配置分享链接参数
            console.log(_this.delUrl(window.location.href,'lastClock'))
            
            let msg = {
                title: '每天10分钟，轻松阅读，日有所得', // 分享标题
                desc: pageInfo.data.content, // 分享描述
                link: _this.delUrl(window.location.href,'lastClock'), // 分享链接 默认以当前链接
                imgUrl: pageInfo.data.bookImageUrl, // 分享图标
            }
            if(pageInfo.data.readState>=0){
                msg.title = info.shareConetent   
            }
            _this.wxShare(userInfo.data.userId,msg);
        },
        mounted(){
            const _this = this;
            this.$nextTick(function () {
                setTimeout(() => {
                    // 埋点
                    window.monitor && window.monitor.showLog(_this);
                }, 100)
            })   
        },
        methods:{
            togglePlay() {
                this.isPlaying = !this.isPlaying;
                store.commit('togglePlay');
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
                    // commentId: 71
                };
                const url = `/comment/h5/share`;
                const res = await _this.$http.get(url, {
                    params
                });
                return res.data;
            },
            dataInitail(){
                const _this = this;
                // 播放书名转换
                if(_this.info.courseTitle.length>15){
                    _this.playBookName = _this.info.courseTitle.substring(0,14)
                    _this.playBookName = _this.playBookName +'...》'    
                }else{
                    _this.playBookName = _this.info.courseTitle
                }
                            
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
            playSetting(){
                const _this = this;
                let readAudio = {};
                readAudio.isPrev = false;
                readAudio.isNext = false;
                // 获取播放地址
                readAudio.src = _this.info.simpleAudition;
                // 更新vx数据
                store.commit({ type: 'setAudio', readAudio: readAudio });
                // 设置播放元素数据
                store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
                // store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
                // 这里，很迷，触发播放
                store.getters.getAudioElement.load()
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
                console.log(dpm)
                // item tabindex dpmc
                return JSON.stringify({
                    'dcm': dcm,
                    'dpm': '157.' + dpm,
                });
            },
        },
        components:{ range,shareBtn }
    }
</script>

<style lang="less">
    @import '../../less/variable';
    .bg-image(@url) {
        background-image: url('@{url}@2x.png');
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
            background-image: url('@{url}@3x.png');
        }
    }
    .sharePages {
        height: 100%;
        letter-spacing:2/@rem;
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
                padding: 84/@rem 46/@rem 30/@rem;
                line-height: 84/@rem;
                height: 84/@rem;
                font-family:"SimSun";
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
                font-family:"SimSun";
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
                            font-size: 32/@rem;
                            color: #333;
                            line-height: 60/@rem;

                        }
                    }
                }
                .text{
                    padding: 0 56/@rem 56/@rem;
                    letter-spacing:4/@rem;
                    .viewpoint{
                        font-size: 0;
                        color: #444;
                        padding-bottom: 90/@rem;
                        span{
                            font-size: 30/@rem;
                            line-height: 44/@rem;
                            &.big{
                                font-size: 46/@rem;
                                line-height: 1;
                            }
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
                    border-top: 1px #C5C5C5 dashed;
                    line-height: 80/@rem;
                    font-size: 26/@rem;
                    color: #4D4D4D;
                    padding-bottom: 5/@rem;
                    span{
                        display: inline-block;
                        height: 10/@rem;
                        border-radius: 50%;
                        background: #000;
                        width: 10/@rem;
                        margin-right: 12/@rem;
                        vertical-align: middle;
                    }
                }
            }
            .player{
                width: 626/@rem;
                margin: 110/@rem auto 0;
                padding-bottom: 100/@rem;
                .audio{
                    display: flex;
                    flex-flow:row;
                    .play{
                        height: 108/@rem;
                        width: 108/@rem;
                        position: relative;
                        overflow: hidden;
                        background: #fff;
                        img{
                            display: block;
                            height: 100%;
                            margin: 0 auto;
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
                            }
                        }
                        
                    }
                    .playInfo{
                        padding-left: 30/@rem;
                        
                        color: #333;
                        flex:1;
                        p{
                            font-size: 30/@rem;
                            line-height: 1;
                        }
                        .range{
                            height: 60/@rem;
                        }
                        .time{
                            display: flex;
                            justify-content:space-between;
                            font-size: 22/@rem;
                            color: #B3B3B3;
                            line-height: 1;
                        }
                       
                    }
                }
                .intro{
                    font-size: 28/@rem;
                    color: #4D4D4D;
                    line-height: 42/@rem;
                    padding-top: 46/@rem;
                    padding-bottom: 80/@rem;
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

