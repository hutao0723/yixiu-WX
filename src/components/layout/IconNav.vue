<template>
  <div class="g-iconnav clearfix">
    <ul>
      <li v-for="(item, index) in iconlist">
        <router-link  v-if="item.router" :to="{ path: item.router }" class="title">
          <p class="icon-bg" :style="{'background-color': item.color}">
            <i class="iconfont icon" v-html="item.icon"></i>
          </p>
          <p>{{item.title}}</p>
        </router-link>
        <a :href="item.url || 'javascript:;'" v-else class="title">
          <p class="icon-bg" :style="{'background-color': item.color}">
            <i class="iconfont" v-html="item.icon"></i>
          </p>
          <p>{{item.title}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        iconlist: [
          {
            title: '龙头',
            icon: '&#xe601;',
            url: '',
            router: '/screening/index/01',
            color: '#CF3A2C'
          },
          {
            title: '陶瓷',
            icon: '&#xe687;',
            url: '',
            router: '/screening/index/02',
            color: '#873DEB'
          },
          {
            title: '浴缸',
            icon: '&#xe60f;',
            url: '',
            router: '/screening/index/03',
            color: '#E23A50'
          },
          {
            title: '淋浴房',
            icon: '&#xe796;',
            url: '',
            router: '/screening/index/04',
            color: '#ED752F'
          },
          {
            title: '卫浴家具',
            icon: '&#xe629;',
            url: '',
            router: '/screening/index/05',
            color: '#509CF0'
          },
          {
            title: '卫浴五金',
            icon: '&#xe61b;',
            url: '',
            router: '/screening/index/06',
            color: '#D75228'
          },
          {
            title: '水槽',
            icon: '&#xe606;',
            url: '',
            router: '/screening/index/07',
            color: '#F2A440'
          },
          {
            title: '污水升泵',
            icon: '&#xe645;',
            url: '',
            router: '/screening/index/08',
            color: '#F4B453'
          }
        ]
      };
    },
    mounted () {
    },
    methods: {
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .g-iconnav{
    background-color: #fff;
    padding-bottom: 20/@rem;
    ul{
      li {
        padding-top: 20/@rem;
        float: left;
        .icon-bg{
          width: 84/@rem;
          height: 84/@rem;
          margin-left: 50/@rem;
          border-radius: 50%;
          background-color: red;
          color:#fff;
          line-height: 84/@rem;
          text-align: center;
          .iconfont{
            .fontSize(42); 
          }
        }
        a{
          display: inline-block;
          width: 184/@rem;
          text-align: center;
          margin: 0 auto;
        }
        .title{
          line-height: 46/@rem;
        }
      }
    }
  }
</style>
