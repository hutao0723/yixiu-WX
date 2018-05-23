<template>
  <div>
    <div class="shelf-main" >
      <div v-for="(item, index) in components">
        <SwiperBar :param.sync="item" />
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
      <div class="book-table">
        <div class="book-cover">
          <img :src="bookUrl">
        </div>
        <div class="book-name line2">《{{bookName}}》</div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import SwiperBar from '../../components/layout/swiper_bar';

export default {
  components: {
    SwiperBar
  },
  data () {
    return {
      data: {},
      bookUrl: "//yun.dui88.com/youfen/images/cwjq38jknx.jpg",
      bookName: "今天的网红经济今天的网红经济今天的网红经济",
      components: {
        tabs: [
            {
                "pictureUrl": "//yun.dui88.com/youfen/images/cwjq38jknx.jpg",
                "title": "30天读书魔鬼训练营",
                "journey": 102,
                "content": "读书是通往梦想的一个途径，读一本好书，让我们 得以明净如水，开阔视野，丰富阅历，益于人生。"
            // },
            // {
            //     "pictureUrl": "//yun.dui88.com/youfen/images/cwjq38jknx.jpg",
            //     "title": "30天读书魔鬼训练营",
            //     "journey": 102,
            //     "content": "读书是通往梦想的一个途径，读一本好书，让我们 得以明净如水，开阔视野，丰富阅历，益于人生。"
            }
          ]
      }
    }
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  mounted () {
  },
  methods: {
    
  }
}
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.shelf-main{
  padding-top: 30/@rem;
}
.book-table{
  margin: 40/@rem 0 0 70/@rem ;
  width: 170/@rem;
  float: left;
  .book-cover{
    margin-bottom: 20/@rem;
    img{
      width: 170/@rem;
      height: 238/@rem;
      display: block;
      border-radius: 5/@rem;
    }
  }
  
  &:nth-child(3n-1){
    margin-left: 50/@rem;
  }
  .book-name{
    height: 66/@rem;
    .fontSize(24);
    color: @color-strong;
    line-height: 33/@rem;
  }
}
</style>

