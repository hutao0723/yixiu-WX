<template>
  <div>
    <div class="shelf-main" >
      <div v-for="(item, index) in swipeList">
        <SwiperBar :param.sync="item" @newSwiperIndex="success"/>
      </div>
      <div class="book-table" v-for="(item, index) in bookList">
        <div class="book-cover">
          <img :src="item.imgUrl">
        </div>
        <div class="book-name line2">《{{item.title}}》</div>
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
      console.log(objs);
      if (objs.success) {
        this.swipeList = [objs.data.content]
      } else {
        console.log("获取数据失败")
      }
    },
    async success (readId){
      console.log(readId)
      let objs = await user.getBookList(readId);
      if (objs.success) {
        this.bookList = objs.data
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
</style>

