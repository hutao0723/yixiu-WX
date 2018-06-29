<template>
  <div class="coupon-main">
    <!--优惠券1:未使用，2已使用，3已过期-->
    <div class="clearfix tab-box" v-if="!noListData">
      <div class="fl tabber-list" @click="checkTabList(1)">
        <div class="tabber" :class="pitch == 1?'active':''">未使用</div>
      </div>
      <div class="fl tabber-list" @click="checkTabList(2)">
        <div class="tabber" :class="pitch == 2?'active':''">已使用</div>
      </div>
      <div class="fl tabber-list" @click="checkTabList(3)">
        <div class="tabber" :class="pitch == 3?'active':''">已过期</div>
      </div>
    </div>
    <!--优惠券列表-->
    <div class="coupon-container" v-if="!noData">
      <div class="coupon-list" v-for="(item, $index) in couponList" @click="jumpIndex(item)">
        <div class="clearfix">
          <div class="fl coupon-color" :class="pitch == 1?'coupon-red':'coupon-grey'">
            <div class="prize-box" :class="pitch == 1?'h118':'h230'"><span class="prize">{{item.couponPrice/100}}</span>元</div>
            <div v-if="pitch == 1">
              <div class="border" v-if="item.couponStatus == 2"><div class="coupon-btn ft22">立即使用</div></div>
              <div class="border" v-if="item.couponStatus == 0"><div class="coupon-btn ft26" @click="waiting()">待生效</div></div>
              <div class="border" v-if="item.couponStatus == 3"><div class="coupon-btn ft26" @click="unavailable()">暂不可用</div></div>
            </div>
          </div>
          <div class="fr coupon-right">
            <div class="coupon-title c222">{{item.couponTemplateTitle}}</div>
            <div class="coupon-service c555">{{item.useScopeTypeDesc}}</div>
            <div class="coupon-time c999">{{item.validityDate}}</div>
          </div>
        </div>
        <div class="right-img" :class="pitch !=1 && pitch == 2 ? 'used':''"></div>
        <div class="right-img" :class="pitch !=1 && pitch == 3 ? 'outdate':''"></div>
      </div>
      <div class="modal-mask" v-show="uselessToggle">
        <div class="one-line">暂无可用的训练营</div>
      </div>
      <div class="modal-mask" v-show="waitingToggle">
        <div>优惠券还没有到使用的</div>
        <div>时间哦</div>
      </div>
    </div>
    <!--暂无优惠券-->
    <div class="no-coupon-main" v-if="noData">
      <div class="no-coupon">
        <img src="https://yun.dui88.com/yoofans/images/201806/noCoupon.png">
        <div class="coupon-word">暂时没有优惠券哦</div>
      </div>
    </div> 
    <div class="modal-mask" v-show="popup">
         <div>你还在训练营中</div>
         <div>下次报名新训练营再使用</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import user from '../../api/user';

export default {
  components: {
    
  },
  data () {
    return {
      data: {},
      // tab的状态
      pitch: 1,

      uselessToggle: false,
      waitingToggle: false,

      noData: false,
      noListData: false,

      couponList: [],

      couponObj:{},
        userState:false,
        popup:false,


      //优惠券弹框
      // CouponDialog: false,
      // resultCode: null,
      // awards:[],
      // distributorName: '',
      // distributorHeadImgurl: '',
      // titleText:'',
      // frameTitleClass:'',
      // classNameId:''

    };
  },
  computed: {
    ...mapState({})
  },
  async created() {
        const _this = this;
        this.getTabList()
        this.userState =  await _this.getUsetState();
  },
  mounted () {
  },
  methods: {
    // 获取用户状态
    async getUsetState() {
        let self = this;
        let params = {};
        const url = '/user/read/state';
        const res = await this.$http.get(url, {
            params
        });

        return res.data;
    },
    checkTabList(num) {
      this.couponList = []
      this.pitch = num;
      if(this.pitch == 1){
        if (this.couponObj.unUseCoupons && this.couponObj.unUseCoupons.length) {
          this.noData = false;
          this.couponList = this.couponObj.unUseCoupons
        }else{
          this.noData = true;
        }
      }
      if(this.pitch == 2){
        if (this.couponObj.usedCoupons && this.couponObj.usedCoupons.length) {
          this.noData = false;
          this.couponList = this.couponObj.usedCoupons
        }else{
          this.noData = true;
        }
      }
      if(this.pitch == 3){
        if (this.couponObj.expiredCoupons && this.couponObj.expiredCoupons.length) {
          this.noData = false;
          this.couponList = this.couponObj.expiredCoupons
        }else{
          this.noData = true;
        }
      }
    },
    getTabList() {
      const url = `/coupon/info/list`;
      this.$http.get(url, {}).then((res) => {
        let objs = res.data
        let arr = Object.keys(objs.data);
        // 判断对象是否为空
        if(arr.length == 0){
          this.noListData = true
          this.noData = true
          return
        }
        if (objs.success) {
          this.couponObj = objs.data
          this.checkTabList(this.pitch)
        } else {
          console.log("获取数据失败")
        } 
      });
    },
    jumpIndex(item) {
        const _this = this;
        if(_this.userState.data.readState*1>=1 && _this.userState.data.readState*1<=2){
            _this.popup = true;
            setTimeout(() => {
                _this.popup = false;
            }, 3000)    
        }else{
            if(item.couponStatus == 2 && this.pitch == 1){
                if(item.items != undefined){
                    this.$router.push("/index/home?planId=" + item.items[0].itemId +"&couponId="+item.couponId+'&readId=' + item.items[0].itemId);
                }else{
                    this.$router.push("/index/home?planId=0&couponId="+item.couponId);
                }
            }
        }   
    },
    waiting() {
      this.waitingToggle = true
      let that = this 
      setTimeout(() => {that.waitingToggle = false} ,3000)
    },
    unavailable() {
      this.uselessToggle = true
      let that = this 
      setTimeout(() => {that.uselessToggle = false} ,3000)
    },

  }
};
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.coupon-main{
  width: 750/@rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #F4F4F4;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.modal-mask{
  padding: 18/@rem 0;
  position: fixed;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  top: 490/@rem;
  width: 450/@rem;
  height: 120/@rem;
  background: rgba(0,0,0,0.8);
  border-radius: 14/@rem;
  color: #fff;
  text-align: center;
  .fontSize(30);
  line-height: 42/@rem;
  box-sizing: border-box;
  .one-line{
      line-height: 84/@rem;
  }
}
.coupon-container{
  width:750/@rem;
  box-sizing: border-box;
  padding-top: 10/@rem;
}
.tab-box{
  width: 100%;
    .tabber-list{
      width: 33.33%;
      text-align: center;
      background: #fff;
      .tabber{
        width: 110/@rem;
        height: 100/@rem;
        line-height: 100/@rem;
        color: #828282;
        margin: 0 auto;
        .fontSize(29);
        box-sizing: border-box;
        &.active{
          .fontSize(34);
          color: #222;
          border-bottom: 8/@rem solid #FFDB43;
        }
      }
    }
  }
.coupon-list{
  margin:20/@rem auto 0;
  position: relative;
  width: 690/@rem;
  height: 230/@rem;
  background: rgba(255,255,255,1);
  border-radius: 8/@rem;
  .coupon-color{ 
    width: 230/@rem;
    height:230/@rem;
    border-radius: 8/@rem 0 0 8/@rem ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.coupon-red{
      background-image: url('https://yun.dui88.com/yoofans/images/201806/red.png');
    }
    &.coupon-grey{
      background-image: url('https://yun.dui88.com/yoofans/images/201806/grey.png');
    }
  }
  
  .prize-box{
    color: #fff;
    text-align: center;
    .fontSize(34);
    .prize{
      .fontSize(70);
    }
    &.h118{
      height:118/@rem;
      line-height: 118/@rem;
    }
    &.h230{
      height: 230/@rem;
      line-height: 230/@rem;
    }
  }
  
  .border{
    width:142/@rem;
    padding: 28/@rem 5/@rem 0 5/@rem;
    margin: 0 auto;
    border-top: 1px solid #fff;
    .coupon-btn{
      width: 132/@rem;
      height: 41/@rem;
      background: #fff;
      border-radius: 20/@rem;
      line-height: 41/@rem;
      text-align: center;
      color: #FE4931;
      &.ft22{
        .fontSize(22);
      }
      &.ft26{
        .fontSize(26);
      }
    }
  }
  .coupon-right{
    width: 460/@rem;
    box-sizing: border-box;
    .coupon-title{
      height: 50/@rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-top: 35/@rem;
      padding-left: 50/@rem;
      .fontSize(36);
      line-height: 50/@rem;
    }
    
    .coupon-service{
      height: 33/@rem;
      padding-left: 50/@rem;
      .fontSize(24);
      line-height: 33/@rem;
      margin-bottom: 36/@rem;
    }
    .coupon-time{
      box-sizing: border-box;
      height: 70/@rem;
      padding-left: 40/@rem;
      line-height: 70/@rem;
      .fontSize(24);
      border-top: 1px dashed #ccc;
    }
    .c222{
      color: #222;
    }
    .c555{
      color: #555;
    }
    .c999{
      color: #999;
    }
  }
  .right-img{
    position: absolute;
    right: 10/@rem;
    top: 10/@rem;
    width: 97/@rem;
    height: 95/@rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.used{
      background-image: url('https://yun.dui88.com/yoofans/images/201806/used.png');
    }
    &.outdate{
      background-image: url('https://yun.dui88.com/yoofans/images/201806/outdate.png');
    }
  }
}
.no-coupon-main{
  .no-coupon{
    padding-top: 167/@rem;
    text-align: center;
    img{
      display: block;
      width: 196/@rem;
      margin:0 auto;
      height: 150/@rem;
      margin-bottom: 90/@rem;
    }
    .coupon-word{
      height: 45/@rem;
      .fontSize(32);
      color: #888;
      line-height: 45/@rem;
    }
  }
}

// 弹框
// .coupon-mask {
//   width: 750/@rem;
//   height: 100%;
//   position: fixed;
//   background: rgba(0, 0, 0, 0.8);
//   z-index: 1000;
//   top: 0;
//   left: 0;
// }
// .frame-box{
//   width: 640/@rem;
//   position: fixed;
//   z-index: 1001;
//   box-sizing: border-box;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%,-50%);
//   .delete{
//     position: absolute;
//     width: 56/@rem;
//     height: 56/@rem;
//     position: absolute;
//     right:0;
//     top:0;
//     background:rgba(0,0,0,0.5);
//     border-radius: 50%;
//   }
//   .delete-icon{
//     color: #fff;
//     .fontSize(19);
//   }
//   .frame-line1{
//     height: 605/@rem;
//     width: 100%;
//     background-size: 100%;
//     margin-top: 95/@rem;
//     background-image: url('https://yun.dui88.com/yoofans/images/201806/line1.png');
//     position:relative;
//     background-repeat:no-repeat; 
//   }
//   .frame-line2{
//     height: 742/@rem;
//     width: 100%;
//     background-size: 100%;
//     margin-top: 95/@rem;
//     background-image: url('https://yun.dui88.com/yoofans/images/201806/line2.png');
//     position:relative;
//     background-repeat:no-repeat; 
//   }
//   .frame-line3{
//     height: 605/@rem;
//     width: 100%;
//     background-size: 100%;
//     margin-top: 50/@rem;
//     background-image: url('https://yun.dui88.com/yoofans/images/201806/circle.png');
//     position:relative;
//     background-repeat:no-repeat; 
//   }
//   .frame-user{
//     position: absolute;
//     left:50%;
//     transform: translateX(-50%);
//     top: -70/@rem;
//     img{   
//       border-radius: 50%;
//       display: block;
//       width: 140/@rem;
//       height: 140/@rem;
//       box-shadow:0px 4/@rem 4/@rem 0 rgba(0,0,0,0.33);
//     }
//   }
//   .frame-title{
//     padding-top: 84/@rem;
//     font-size: 38/@rem;
//     color: #fff;
//     line-height: 53/@rem;
//     text-align: center;
//     margin:0 auto;
//     width: 517/@rem;
//   }
//   .frame-detail{
//     width: 562/@rem;
//     margin:100/@rem auto 0;
//     height: 170/@rem;
//     background-size: 100%;
//     background-image: url('https://yun.dui88.com/yoofans/images/201806/box.png');
//     background-repeat:no-repeat;
//     .frame-prize{
//       width: 173/@rem;
//       line-height: 170/@rem;
//       color: #FF2B38;
//       .fontSize(26);
//       text-align: center;
//       .word{
//         .fontSize(64);
//       }
//     }
//     .frame-fr-title{
//       margin: 23/@rem 0 0 37/@rem; 
//       position: relative;
//       color: #333;
//       padding-left: 13/@rem;
//       .fontSize(28);
//       &::before{
//         content:"";
//         width: 3/@rem;
//         height: 22/@rem;
//         position:absolute;
//         top: 9/@rem;
//         left: 0;
//         border-radius:2px;
//         background: #FF831B;
//       }
//     }
//     .frame-fr-service{
//       margin: 4/@rem 0 0 50/@rem; 
//       color: #333;
//       .fontSize(23);
//     }
//     .frame-fr-time{
//       margin: 24/@rem 0 0 50/@rem; 
//       color: #999;
//       .fontSize(20);
//     }
//   }
//   .frame-btn{
//     margin: 62/@rem auto 0;
//     width: 560/@rem;
//     height: 86/@rem;
//     line-height: 86/@rem;
//     background: #FFFA1E;
//     border-radius: 20/@rem;
//     text-align: center;
//     .fontSize(40);
//     color: #FF2B39;
//   }

// }

  
</style>

