<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in navlist" :style="readMission ? 'width: 25%;' : 'width: 33.3%;'">
        <router-link :to="item.router">
          <p>
            <i class="iconfont" :class="item.icon"></i>
          </p>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
  export default {
    data () {
      return {
        // readMission: true,
        // navlist: [
        //   {
        //     title: '阅读',
        //     icon: 'icon-shouye',
        //     router: '/read/home'
        //   },
        //   {
        //     title: '打卡',
        //     icon: 'icon-yigou1',
        //     router: '/card'
        //   },
        //   {
        //     title: '观点',
        //     icon: 'icon-yigou1',
        //     router: '/opinion'
        //   },
        //   {
        //     title: '我的',
        //     icon: 'icon-wode',
        //     router: '/user'
        //   }
        // ]
      };
    },
    computed: {
      ...mapState(['readMission']),
      navlist () {
        if (this.readMission) {
          return [
            {
              title: '阅读',
              icon: 'icon-shouye',
              router: '/read/home'
            },
            {
              title: '打卡',
              icon: 'icon-yigou1',
              router: '/card'
            },
            {
              title: '观点',
              icon: 'icon-yigou1',
              router: '/opinion'
            },
            {
              title: '我的',
              icon: 'icon-wode',
              router: '/user'
            }
          ]
        } else {
          return [
            {
              title: '阅读',
              icon: 'icon-shouye',
              router: '/read/home'
            },
            {
              title: '观点',
              icon: 'icon-yigou1',
              router: '/opinion'
            },
            {
              title: '我的',
              icon: 'icon-wode',
              router: '/user'
            }
          ]
        }
      }
    }
  };
</script>
<style lang="less">
@import url('../../less/variable.less');
  .bottom-nav{
    position: fixed;
    z-index: 100;
    bottom: -1px;
    right: 0;
    left: 0;
    height: 70/@rem;
    padding: 14/@rem 0;
    background-color: #FFFFFF;
    box-shadow: 0 -5/@rem 5/@rem 0 rgba(150, 150, 150, 0.1);
    font-size: 22/@rem;
    ul {
      li{
        display: inline-block;
        text-align: center;
        p{
          line-height: 34/@rem;
        }
        i{
          font-size: 32/@rem;
        }
        .router-link-active{
          color: #FF3E44;
        }
      }
    }
  }
</style>
