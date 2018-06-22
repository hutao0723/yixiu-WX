<template>
    <div class="share">
        <div class="bg">
            <div class="logo">
                <span class="icon"></span>
                <span class="name">一修读书</span>
            </div>
            <div class="content">
                <div class="bookPic"></div>
                <div class="userInfo">
                    <div class="userIcon">
                        <img src="./logo.png">
                    </div>
                    <div class="bookInfo">
                        <p>今日读后感</p>
                        <h5>《高效能七个习惯》</h5>
                    </div>
                </div>
                <p class="text"><span>很</span>测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问测试文字问·</p>
            </div>
        </div>
        <div class="btn">了解一修读书</div>
    </div>
</template>
<script>
export default {
    
}
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
        background: #f4f4f4;
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
                    background-image: url('./logo.png');
                    background-size: 100% 100%;
                }
                .name{
                    font-size: 36/@rem;
                    color: #323333;
                    padding-left: 10/@rem;
                   line-height: 84/@rem;
                }
            }
            .content{
                width: 690/@rem;
                margin: 0 auto;
                background: #fff;
                height: 10rem;
                border-radius: 10/@rem;
                position: relative;
                .bookPic{
                    position: absolute;
                    right: 12/@rem;
                    top: -86/@rem;
                    width: 166/@rem;
                    height: 222/@rem;
                    background: red;
                }
                .userInfo{
                    padding: 66/@rem 178/@rem 0 22/@rem;
                    font-size: 0;
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
                        display: inline-block; 
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
                            line-height: 1;
                        }
                    }
                    .text{
                        font-size: 30/@rem;
                        color: #444;
                        span{
                            font-size: 46/@rem;
                        }
                    }
                    
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
