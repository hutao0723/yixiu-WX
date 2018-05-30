<template>
  <div class="bottom-nav" v-if="bottomNavToggle">
    <ul>
      <li v-for="(item, index) in navlist" :style="bottomNavType ? 'width: 25%;' : 'width: 33.3%;'">
        <router-link :to="item.path" :class="item.path === $route.path ? 'active' : ''">
          <p>
            <i class="iconfont" :class="item.path === $route.path ? item.active : item.icon"></i>
          </p>
          <p >{{item.title}}</p>
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
      ...mapState(['bottomNavType','bottomNavToggle']),
      navlist () {
        if (this.bottomNavType) {
          return [
            {
              title: '阅读',
              icon: 'icon-book',
              active: 'icon-book active tag',
              path: '/index/home'
            },
            {
              title: '打卡',
              icon: 'icon-date',
              active: 'icon-date active tag',
              path: '/index/card'
            },
            {
              title: '观点',
              icon: 'icon-opinion',
              active: 'icon-opinion active tag',
              path: '/index/opinion'
            },
            {
              title: '我的',
              icon: 'icon-user',
              active: 'icon-user active tag',
              path: '/index/user'
            }
          ]
        } else {
          return [
            {
              title: '阅读',
              icon: 'icon-book',
              active: 'icon-book active tag',
              path: '/index/home'
            },
            {
              title: '观点',
              icon: 'icon-opinion',
              active: 'icon-opinion active tag',
              path: '/index/opinion'
            },
            {
              title: '我的',
              icon: 'icon-user',
              active: 'icon-user active tag',
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
    padding: 15/@rem 0;
    background-color: #FFFFFF;
    // box-shadow: 0 -5/@rem 5/@rem 0 rgba(150, 150, 150, 0.1);
    border-top: 1/@rem solid #E5E5E5;
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
          position: relative;
        }
        .tag{
          &:after {
            content: '';
            width: 28/@rem;
            height: 8/@rem;
            border-radius: 100%;
            background-color: @color-main;
            position: absolute;
            bottom: 4/@rem;
            left: 6/@rem;
            z-index: 11;
          }
        }
      }
    }
  }
</style>
