<template>
    <div class="sharePages">
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
                        <h5>{{ info.courseSubTitle }}</h5>
                    </div>
                </div>
                <div class="text">
                    <div class="viewpoint">
                        <span class="big">{{ viewPoint_frist }}</span>
                        <span>{{info.content}}</span>
                    </div>
                    <p class="author">{{ info.userNickname }}</p>
                    <p class="time">写于{{info.releaseTime}}&nbsp;&nbsp;{{info.releaseTimeLabel}}</p>
                </div>
                <!--不是自己不渲染-->
                <div class="insist" v-if="$route.query.isClock * 1">
                    <span></span>这是我坚持读书的第{{info.clocks}}天
                </div>
            </div>
            <div class="player">
                <div class="audio">
                    <div class="play" @click="togglePlay">
                        <img :src="info.bookImageUrl">
                        <div class="playIcon">
                            <i class="iconfont" :class="{'icon-sanjiaoxing':!isPlaying,'icon-pause':isPlaying}"></i>
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
                <p class="intro">{{info.introduction}}</p>
            </div>
            
        </div>
        <div class="btn" @click='seeYixiu'>了解一修读书</div>
        <shareBtn v-show="shareBtn" v-on:success="sharePage" />
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
    created(){
        this.getInfo();
        // _this.popup = _this.$route.query.lastClock * 1;
		// _this.isSelf = _this.$route.query.isClock * 1;
    },
    methods:{
        togglePlay() {
            this.isPlaying = !this.isPlaying;
            store.commit('togglePlay');
        },
        async getInfo() {
			let _this = this;
			let params = {
                // commentId: _this.$route.query.commentId
                commentId: 71
			};
			const url = `/api/comment/h5/share`;
			const res = await _this.$http.get(url, {
				params
			});
			if (res.data.success) {
                _this.info = res.data.data;

                _this.playSetting();
                _this.dataInitail();
			} else {
				console.log("获取数据失败");
			}
        },
        dataInitail(){
            const _this = this;
            // 播放书名转换
            if(_this.info.courseSubTitle.length>15){
                _this.playBookName = _this.info.courseSubTitle.substring(0,14)
                _this.playBookName = _this.playBookName +'...》'    
            }else{
                _this.playBookName = _this.info.courseSubTitle.length    
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
            _this.info.content = viewPoint.join('') 
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
        seeYixiu(){
            const _this = this;
            // 判断是否购买过书籍
            if(_this.info.userBuy){
                _this.shareBtn = true;   
            }else{
                 _this.$router.push({path:'/'})
            }
        },
        sharePage(){
            this.shareBtn = false;
        }
    },
    components:{ range,shareBtn }
}
</script>

<style lang="less">
    @import '../../less/variable';
    .sharePages {
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
        background: #fff;
        .bg{
            width: 100%;
            height: 482/@rem;
            background: #FFC936;
            .logo{
                padding: 84/@rem 46/@rem 30/@rem;
                line-height: 84/@rem;
                height: 84/@rem;
                .icon{
                    height: 84/@rem;
                    width: 64/@rem;
                    display: inline-block;
                    background-image: url('http://yun.dui88.com/logo.png');
                    background-size: 100% 100%;
                    vertical-align: middle
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
                width: 690/@rem;
                margin: 0 auto;
                background: #fff;
                border-radius: 10/@rem;
                position: relative;
                box-shadow: 8/@rem  14/@rem 32/@rem #A6A6A6; 
                .bookPic{
                    position: absolute;
                    right: 12/@rem;
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
                    background: url('http://yun.dui88.com/symbol.png') no-repeat;
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
                        img{
                            display: block;
                            width: 100%;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%)
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
