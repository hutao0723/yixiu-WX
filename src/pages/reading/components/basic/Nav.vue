<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in navlist" :style="readMission ? 'width: 25%;' : 'width: 33.3%;'">
        <router-link :to="item.path">
          <p>
            <i class="iconfont" :class="item.path === $route.path ? item.active : item.icon"></i>
          </p>
          <p :class="item.path === $route.path ? 'active' : ''">{{item.title}}</p>
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
              active: 'icon-shouye active',
              path: '/index/home'
            },
            {
              title: '打卡',
              icon: 'icon-yigou1',
              active: 'icon-shouye active',
              path: '/index/card'
            },
            {
              title: '观点',
              icon: 'icon-yigou1',
              active: 'icon-shouye active',
              path: '/index/opinion'
            },
            {
              title: '我的',
              icon: 'icon-wode',
              active: 'icon-shouye active',
              path: '/index/user'
            }
          ]
        } else {
          return [
            {
              title: '阅读',
              icon: 'icon-shouye',
              active: 'icon-shouye active',
              path: '/index/home'
            },
            {
              title: '观点',
              icon: 'icon-yigou1',
              active: 'icon-shouye active',
              path: '/index/opinion'
            },
            {
              title: '我的',
              icon: 'icon-wode',
              active: 'icon-shouye active',
              path: '/index/user'
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
          color: #B3B3B3;
        }
        i{
          font-size: 32/@rem;
        }
        .active{
          color: #222222 !important;
        }
      }
    }
  }
</style>
