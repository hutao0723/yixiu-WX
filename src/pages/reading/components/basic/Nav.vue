<template>
  <div class="bottom-nav" v-if="bottomNavToggle">
    <ul>
      <li v-for="(item, index) in navlist" :style="bottomNavType ? 'width: 25%;' : 'width: 33.33%;'" @click="clickFun($event)" :monitor-log="getMonitor(dpmB,10,item.dpm)" :monitor-log-get="isLog">
        <router-link :to="item.path" :class="item.path === $route.path ? 'active' : ''">
          <p>
            <!-- <i class="iconfont" :class="item.path === $route.path ? item.active : item.icon"></i> -->
            <img :src="item.imgUrl" alt="" v-show="item.path != $route.path">
            <img :src="item.imgActiveUrl" alt="" v-show="item.path == $route.path">
          </p>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {};
    },
    props : {
      dpmB: {
        default: false
      },
      dcmA: {
        default: false
      },
      isLog: {
        default: false
      }
    },
    computed: {
      ...mapState(['bottomNavType', 'bottomNavToggle']),
      navlist() {
        if (this.bottomNavType) {
          return [{
              dpm: 1,
              title: '阅读',
              icon: 'icon-book',
              active: 'icon-book active tag',
              path: '/index/home',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new02.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new01.png'
            },
            {
              dpm: 4,
              title: '打卡',
              icon: 'icon-date',
              active: 'icon-date active tag',
              path: '/index/card',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new08.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new07.png'
            },
            {
              dpm: 2,
              title: '感想',
              icon: 'icon-opinion',
              active: 'icon-opinion active tag',
              path: '/index/opinion',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new06.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new05.png'
            },
            {
              dpm: 3,
              title: '我的',
              icon: 'icon-user',
              active: 'icon-user active tag',
              path: '/index/user',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new04.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new03.png'
            }
          ]
        } else {
          return [{
              dpm: 1,
              title: '阅读',
              icon: 'icon-book',
              active: 'icon-book active tag',
              path: '/index/home',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new02.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new01.png'
            },
            {
              dpm: 2,
              title: '感想',
              icon: 'icon-opinion',
              active: 'icon-opinion active tag',
              path: '/index/opinion',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new06.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new05.png'
            },
            {
              dpm: 3,
              title: '我的',
              icon: 'icon-user',
              active: 'icon-user active tag',
              path: '/index/user',
              imgUrl: 'http://yun.dui88.com/youfen/images/read_icon_new04.png',
              imgActiveUrl: 'http://yun.dui88.com/youfen/images/read_icon_new03.png'

            }
          ]
        }
      }
    },
    methods: {
      // 获取monitor
      getMonitor(b, c, d) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': '0.0.0.0',
          'dpm': '157.' + b + '.' + c + '.' + d,
        });
      }
  }
}

</script>
<style lang="less">
  @import url('../../less/variable.less');
  .bottom-nav {
    position: fixed;
    z-index: 10;
    bottom: -1px;
    right: 0;
    left: 0;
    height: 70/@rem;
    padding: 15/@rem 0;
    background-color: #FFFFFF;
    border-top: 1/@rem solid #E5E5E5;
    font-size: 22/@rem;
    ul {
      li {
        display: inline-block;
        text-align: center;
        p {
          line-height: 34/@rem;
          color: #444444;
        }
        i {
          font-size: 32/@rem;
        }
        .active {
          color: #222222 !important;
          position: relative;
          p{
            color: #333;
          }
        }
        .tag {
          &:after {
            content: '';
            width: 22/@rem;
            height: 8/@rem;
            background-color: @color-main;
            position: absolute;
            bottom: 4/@rem;
            left: 6/@rem;
            z-index: 11;
          }
        }
        img{
          display: inline-block;
          width: 40/@rem;
          height: 40/@rem;
          text-align: center;
        }
      }
    }
  }

</style>

