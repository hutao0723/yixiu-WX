<template>
    <div class="diploma-container">
        <div class=""><img :src="diplomaUrl">
        </div>
        <div class="save"  @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '833.1.0')">
            <div class="btn">长按保存分享</div>
            <img :src="diplomaUrl" class="btn-img">
        </div>
    </div>
</template>

<script>
    import user from './../../api/user.js'
    export default {
        data () {
            return {
                diplomaUrl: ""
            };
        },
        mounted () {
            this.getImage();
            let self = this;
            self.$nextTick(function () {
              setTimeout(() => {
                window.monitor && window.monitor.showLog(self);
              }, 100)
            })
        },
        methods: {
             getMonitor(dcm,dpm) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': dcm,
          'dpm': '157.' + dpm,
        });
      },
            // 获取证书图片
            async getImage (){
                let readId = this.$route.params.readId
                let objs = await user.getDiplomaImage(readId);
                console.log(objs)
                if (objs.success) {
                  this.diplomaUrl = objs.data;
                } else {
                  console.log("获取用户信息失败")
                }
            } 
        }
    };
</script>

<style lang="less">
    @import '../../less/variable';
    .diploma-container {
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
        padding: 136/@rem 0 0/@rem 0;
        // z-index: 9;
        background: #f4f4f4;
        img{
            width: 100%;
        }
        .save{
            width:750/@rem;
            height:86/@rem;
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
        .btn-img{
            opacity: 0;
            width:750/@rem;
            height:86/@rem;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 10;
        }
    }
</style>

