<template>
  <div>
    <div class="shelf-main" >
      <div v-if="!noData">
        <div v-for="(item, index) in swipeList">
          <SwiperBar :param.sync="item" @newSwiperIndex="success"/>
        </div>
        <div class="book-table" v-for="(item, index) in bookList" >
          <div @click="getdayNumInfo(item.id)">
            <div class="book-cover">
              <img :src="item.imgUrl">
            </div>
            <div class="book-name line2">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-book">
          <div class="book-container">
            <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png">
          </div>
          <div class="book-word">啊哦，暂无图书哦</div>
        </div>
      </div>  
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import SwiperBar from '../../components/layout/swiper_bar';
import user from '../../api/user';

export default {
  components: {
    SwiperBar
  },
  data () {
    return {
      data: {},

      noData: false,

      bookUrl: "//yun.dui88.com/youfen/images/cwjq38jknx.jpg",
      bookName: "今天的网红经济今天的网红经济今天的网红经济",
      swipeList: [],
      bookList: []
    }
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  async mounted () {
    await this.getSwipeInfo()
  },
  methods: {
    async getSwipeInfo() {
      let objs = await user.getSwipeList();
      if (objs.success) {
        if (objs.data.content && objs.data.content.length) {
          this.noData = false;
        }else{
          this.noData = true;
        }
        this.swipeList = [objs.data.content]
        
      } else {
        console.log("获取数据失败")
      }
    },
    // 获取书籍列表
    async success (readId){
      let objs = await user.getBookList(readId);
      if (objs.success) {
        this.bookList = objs.data
      } else {
        console.log("获取数据失败")
      }  
    },
    // 获取弹框列表
    async getdayNumInfo (bookId) {
      let objs = await user.getdayNum(bookId);
      console.log(objs)
      if (objs.success) {
        
      } else {
        console.log("获取数据失败")
      }  
    }
    
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
.no-book{
  .book-container{
    img{
      width: 310/@rem;
      height: 310/@rem;
      display: block;
      margin: 100/@rem auto 60/@rem;
    }
  }
  .book-word{
    text-align: center;
    .fontSize(30)
  }
}

</style>

