<template>
    <div class="loadEffect" v-if="loading">
        <img src="http://yun.dui88.com/youfen/images/201806/loading.svg" alt="">
    </div>
</template>
<script>
export default{
  props: {
    loading: {
      required: true,
      type: Boolean,
      default: false
    },
    empty: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data(){
      return {

      }
  },
  methods:{

  }
};
</script>
<style lang="less" scoped>
    @import '../../less/base';
    .loadEffect {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 999;
        img {
            width: 60/@rem;
            height: 60/@rem;
        }

        /*定义动画*/
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


        img {
            -webkit-animation: spin 1s linear infinite;/*infinite表示动画无限循环*/
            animation: spin 1s linear infinite;    
        }
    }





</style>
