<template>
  <div class="cart-main">
    已购
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      number: 1,
      data: {},
      selectAll: false,
      priceTogether: 0
    };
  },
  watch: {
    data: {
      handler: function (newVal) {
        const self = this;
        if (!newVal) {
          return;
        }
        self.priceTogether = 0;
        newVal.forEach(function (item) {
          var motherPrice = item.goodsQuantity * item.price;
          var childPrice = 0;
          if (item.childInfo && item.childInfo.length) {
            item.childInfo.forEach(function (data) {
              childPrice = childPrice + data.childQuantity * data.childPrice;
            });
          }
          item.totalPrice = motherPrice + childPrice;
          if (item.isSelected) {
            self.priceTogether += item.totalPrice;
          }
        });
      },
      deep: true
    }
  },
  mounted () {
    this.getShopCarInfo();
  },
  computed: {
    ...mapState({
      shopId: state => state.shopId
    }),
    price: function () {
      return 1;
    }
  },
  beforeRouteLeave (to, from, next) {
    this.shopCarUpdate(next());
  },
  methods: {
    numberChange: function (type, item) {
      if (type === 'add') {
        item.goodsQuantity = parseInt(item.goodsQuantity) + 1;
      } else {
        if (parseInt(item.goodsQuantity) === 0) {
          return;
        }
        item.goodsQuantity = parseInt(item.goodsQuantity) - 1;
      }
      item.transactUnitTotalPrice = item.goodsQuantity * item.price;
    },
    childNumberChange: function (type, item) {
      if (type === 'add') {
        item.childQuantity = parseInt(item.childQuantity) + 1;
      } else {
        if (parseInt(item.childQuantity) === 0) {
          return;
        }
        item.childQuantity = parseInt(item.childQuantity) - 1;
      }
      item.childTotalPrice = item.childQuantity * item.childPrice;
    },
    // 查询购物车信息
    getShopCarInfo () {
      this.$http.get('/datainter/dataFillServlet?tradeType=31', {
        params: {
          shopId: this.shopId
        }
      }).then(res => {
        res = res.body;
        const data = res.data;
        if (res.result === 1) {
          if (data.length) {
            data.forEach(function (item) {
              item.isSelected = false;
              item.transactUnitTotalPrice = item.goodsQuantity * item.price;
              var child = item.childInfo;
              for (let i = 0; i < child.length; i++) {
                child[i].childTotalPrice = parseInt(child[i].childQuantity) * child[i].childPrice;
              }
            });
          }
          this.data = data;
        }
      }).catch(e => {
        console.log(e);
      });
    },
    // 更新订单信息
    shopCarUpdate (cb = () => {}) {
      let params = {data: this.dataFormat(this.data)};
      params = JSON.stringify(params);
      this.$http.get('/datainter/dataFillServlet?tradeType=34', {params: {json: params, shopId: this.shopId}}).then(res => {
        res = res.body;
        if (res.result === 1) {
          cb();
        }
      }).catch(e => {
        console.log(e);
      });
    },
    changeSelect (item) {
      item.isSelected = !item.isSelected;
    },
    selectAllFn () {
      const self = this;
      self.priceTogether = 0;
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.data.forEach(function (item) {
          item.isSelected = true;
          self.priceTogether += item.totalPrice;
        });
      } else {
        self.priceTogether = 0;
        this.data.forEach(function (item) {
          item.isSelected = false;
        });
      }
    },
    goToPay () {
      let arr = [];
      this.data.forEach(function (item) {
        if (item.isSelected) {
          arr.push(item);
        }
      });
      if (!arr.length) {
        return;
      }
      this.$store.dispatch('setConfirmOrder', this.data);
      this.$router.push('/settlement');
    },
    dataFormat (d) {
      let data = d;
      for (let m = 0; m < data.length; m++) {
        for (const p in data[m]) {
          if (p === 'profileImage') {
            let proImgs = data[m]['profileImage'];
            const arr = proImgs.split('/');
            data[m]['profileImage'] = arr[arr.length - 1];
          }
          if (p === 'detailImage') {
            data[m]['detailImage'] = '';
          }
          if (p === 'childInfo') {
            let childInfos = data[m]['childInfo'];
            for (let k = 0; k < childInfos.length; k++) {
              delete data[m]['childInfo'][k].childTotalPrice;
              for (const v in childInfos[k]) {
                if (v === 'childDetailImage') {
                  childInfos[k]['childDetailImage'] = '';
                }
                if (v === 'childProfileImage') {
                  const arr1 = childInfos[k]['childProfileImage'].split('/');
                  childInfos[k]['childProfileImage'] = arr1[arr1.length - 1];
                }
              }
            }
          }
        }
        data[m].shopId = this.shopId;
        data[m].discount = data[m].discount;
        data[m].transactUnitTotalPrice = String(data[m].transactUnitTotalPrice);
        delete data[m].isSelected;
        delete data[m].totalPrice;
      }
      return data;
    }
  }
};
</script>

<style lang="less">
  @import '../../../less/tool.less';
  @mcheck: 'data:image/png;base64,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';
  @mchecked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAABDlBMVEUAAAD4TUTpTUXpTUX/QkLpTUXpTUXtR0LpTUXqTUXpTUXoTUXpTkXqTUXyS0PoTUXoTUXqTUXpTUTpTkXpTUXpTUXqTUXrTUXpTUXqTUXqTUXpTUXpTkbpTUXtTkPrS0TsSUPpTUboTUXpTUXoTUXpTkXpTUXsTUXsTUPpTUbqTETqTUb/SDnpTUXpTUXrTETuS0LoTUXpTUbqTUXpTUXrTETpTUXpTEXpTkXpTkb////pUEf3u7j1rKn3wL32sa72tLD4xML2trP5y8j4wsD4x8T0op72ubb1q6f3vrvwg330qKTueXPsZV7qWVH+8/P85eP609Htbmf++vn60tD50M73v7zzm5fylZDwiIOPsqiCAAAAOXRSTlMACeW9A9OtDqZY/PfNjRLs329Q8dq2eSCyaWDIoYQpJBfp4cOcljg0Gu5IQgf0mT0ckop1ZDGALfqYIsvQAAAGtUlEQVR42uXdh1bbMBgF4Ju9d0IIZEACSSCMAi30OozSXbp3+/4v0vZ0uKGuE9uSLLXfG9wjy7KGf0GSbvXocLO9HFtN9LfIrX5iNZZsbx4eVbswxI1Jq9Ao00W9cdiajKGzXitZ4oKi6ZtN6GhtpR2lR+W9TBFa2T6o06dEYR962Km2txjI+t4kjrAN92oUYL3QRYhSlQSFWV2JIBzNg10KVeqsQb1RkhK0e1Cru0w5shtjqNNMU57cQRFqRApZSrV7FIcCK1FKV59Atu6ASqTXMMuwp8pWq8QhTbVPhRK3IEcqSbWyHSmNsh+lcvkehCswFC2ItZZnSNI7EGi4ztDkxxCmxTCV9g3vHr/czkCEeJKhO0JwqRg1sImgiglqIR1HIDfq1ERjBwH0otTGIALfuuvUyKrvJDc0ao9vYj6frrUyNbMchw9Fbfq5LQ3v4qvUUAeepamlDDxaop5yI3iyTV2VbsCD5i61lY9jYRFNPrCcbWBhy9TaChZ0RM3dwkJGWWqunMICUpp9YTlJYgENGuAm5lqhCXI3MEdqi0ZIYo4NGmIbroY0RX8HbrQe0mcdw0WF5sg1XSa3NRokZtxk6m+q5vf078pGj+kLfAbfomnq/0iD/GUpYkTzJOBAg/0cIS+uHk2Uxx/aNNIE16xpP79dcHg/pKF6mBEv0VAFzMjQVLU4fqfFHrSAQbFJTTx/9uw5vYlpuIlw9dr66vUVPVmDLU8dnFs/nNOLlm5P1gPrlwt6ENPryZp+zWF7w8Vli/hJh33PmRzWKRdnz6+KDN+lNeMlPUjrMxpOL61rXnBxNX0WTy6t657TgyG+qzFcdnvYpvSgo8eig1OOV/RioMc66X3rTw/pSUSDybpTe1gvX9CTfXxTonruOaxP9GYp/FWHc8vBPXq0HPYoMnXM8X5Kj6L4qkPl3HPcm9KzosTzGgpzfO/tZcqhMgdbQIpheWI5eEBcheckbox-allcheckbox-allfNqWO68rag4wBVYZDaA7WQ/tAORWag1nggLIozEGOlb593XNcMoChyvm6e44HUwZQlTmMKMzBmzKnhwpzcAmUR2EOHoKK3bUc3GdQG2AgL559+nj1nC7U5GASDODN6x9LBVd0pC4HB8jSt2dvrZ8+0pV7jimDS+A2PbNz2M7oQFl7kFHk6NP0lWXNSaIuB3OgX1fWrMec447l4AMF8d8id635SdTl2MUWfbpnXfeULi4sB08oyhbW6YO9M7NoP7mQ0j9sUUTp00NrbhJ1OdhHnT49t2xz+olzjlMKlPA1H7F7r3s/UZeDgyAzxLN5baIuB5No078zy72fSH9f2fZQYAAX7k+XuhzsYIlBnFnztpseWw4eUbQKMgzkYk6SMyXtQVYxZBDuSdTl4AnWGIh7kjPJz5VtB8gyoLt/SaIyR0nI30h3nJM49/O7lGFVzAEO5zaR/76ybYg5rOWcRGEOViBog+Q03BzcF3YO8DTUHEyJOxz0yJrrDmUpi/yT5zS8HEwLPZp5GloOtvDNPgU5DysHu/gmfptiTM9DyrEr+oT/9DyUHEwKP788PQ8hh33w94TCTM9DyMEiflinMNNL9Tnycuoj3HdYjZCrI6d20/RScQ6O8MsuRZpJ8pSylWX9TTmT5DOlO4StSpHsOe7LK8o3wm9qFOvNxft37+49fUH5yvjdJo21hN+d0FTZIgDt/nvzIYlZN2mobcyKGFLF6bo6rjumkVZwXSpHA5Xj+hVV96WFP41pnvUIvjN9UKzASdO4+hWliOH15346gk3LOgMLN4iut0F4dBN/EzGg+qctj98ZXFXkBLNMLStyADe92zRENAJXHRoiA3eRPo0QwzxVmiDbNLaE/6wK5otoeDnEdQ0soqv9FCuagjPTFiKGht90YU8LF7Wjdf3iNBZ3o0Zt5XfgwYS6crq2w8Si0n9epGJo3fUqvIpr+UV/DO9SGr662v/IhVyN+P99RRrQ+0curQOaGk2zYhEEMNbmmz4Z/zeu2mz/I5efdhBcPPxbrbIr8EzHjZPcNv7KpC/I6AjC7JcYmtUiBBrnGZLNOMQ6YBhqGQg3WadygzEkKDaoVm4pDjkyUSo06EGa1GaWipRWINUoTyX2UpCtVaJ0+RMoUNzLUqr1m1Cku0x5ascpqDMaUI5coQi1JjJapVYYQ73uRo5C9SsphGNtqU9hGhmEaZLOUYDy8RhhS2WSuwykfjiEHiLVjSh9GhyfQCvdVnKLHiUK2xHo6NZRY5cLqm9mitBZb7uyF4vSRT7ZWRmmYIbIrcxSYS+9HMsn+ltkqZwYNJLtg05luwk5vgD1RlT1/VXjKQAAAABJRU5ErkJggg==';
  .cart-main{
    margin-bottom: 160/@rem;
    .iconfont{
      .fontSize(32);
    }
    .icon-delete{
      margin-right: 180/@rem;
      .iconfont {
        color: #ea625b;
      }
    }
  }
  .goods-item {
    align-items: center;
    background-color: #fff;
    padding: 30/@rem 0/@rem;
    box-sizing: border-box;
    border-bottom: 20/@rem solid #f5f5f5;
    .chk-box {
      margin-top: 50/@rem;
      .m-check {
        width: 36/@rem;
        height: 36/@rem;
        background-size: contain;
        background-repeat: no-repeat;
        display: block;
        background-image: url(@mcheck);
        &.checked{
          background-image: url(@mchecked);
        }
      }
    }
    .product-img{
      width: 140/@rem;
      height: 140/@rem;
      margin: 0 17/@rem;
      overflow: hidden;
      img{
        width: 140/@rem;
        height: 140/@rem;
      }
    }
    input {
      box-shadow: none;
      outline: none;
      width: 130/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
      -webkit-appearance: none;
      color: #333;
      padding: 0 5/@rem;
      border: 1px solid #B9B9C6;
      border-radius: 5/@rem;
    }
    .item-detail{
      position: relative;
      width: 500/@rem;
      height: 140/@rem;
      .fontSize(26);
      p {
        line-height: 40/@rem;
        margin-bottom: 7/@rem;
      }
      .price {
        line-height: 48/@rem;
        color: #ea625b;
        font-weight: 700;
        .fontSize(36);
        span {
          .fontSize(30);
        }
      }
      .handle{
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        .change{
          text-align: center;
          line-height: 40/@rem;
        }
        .input-piece{
          width: 40/@rem;
          text-align: center;
        }
        .child-number {
          padding: 0;
        }
        .tool {
          display: inline-block;
          width: 40/@rem;
          height: 40/@rem;
          border-radius: 20/@rem;
          text-align: center;
          margin: 0 10/@rem;
          background-color: #ff6700;
          color: #fff;
          .fontSize(32);
        }
        .input-dis{
          box-shadow: none;
          outline: none;
          width: 130/@rem;
          height: 40/@rem;
          line-height: 40/@rem;
          -webkit-appearance: none;
          margin-top: 15/@rem;
          color: #333;
          padding: 0 5/@rem;
          border: 1px solid #B9B9C6;
          border-radius: 5/@rem;
        }
        .usearea-select{
          margin-top: 8/@rem;
        }
      }
      .item-area {
        position: absolute;
        right: 0;
        top: 100/@rem;
        text-align: left;
        width: 273/@rem;
        select {
          width: 130/@rem;
          color: #333;
        }
      }
    }
    .item-info-input {
      margin-left: 50/@rem;
      margin-top: 20/@rem;
      input {
        width: 180/@rem;
      }
      .mr70 {
        margin-right: 70/@rem;
      }
    }
    .item-info{
      padding: 10/@rem 20/@rem;
      border-bottom: 1px solid #f5f5f5;
    }

    // 下单
    .shopcar{
      position: fixed;
      height: 80/@rem;
      overflow: hidden;
      bottom: 112/@rem;
      left: 0;
      right: 0;
      z-index: 99;
      box-shadow: 0px -2px 3px 0px rgba(204, 204, 204, 0.1);
      background-color: #fff;
      
      .checkbox-all{
        position: relative;
        box-sizing: border-box;
        width: 390/@rem;
        height: 80/@rem;
        padding: 0 20/@rem;
        .m-check{
          width: 36/@rem;
          height: 36/@rem;
          background-size: contain;
          background-repeat: no-repeat;
          display: block;
          background-image: url(@mcheck);
          &.checked{
            background-image: url(@mchecked);
          }
        }
        &>div {
          position: absolute;
          right: 20/@rem;
          top: 20/@rem;
        }
        .icon-select {
          position: absolute;
          top: 20/@rem;
          left: 20/@rem;
        }
        .total {
          height: 30/@rem;
          line-height: 0.52rem;
        }
      }
      
      .handle{
        width: 350/@rem;
        background-color: #ff6700;
        height: 80/@rem;
        line-height: 81/@rem;
        text-align: center;
        color: #fff;
        .fontSize(28);
      }
    }
    // 字购物车
    .child-info{
      margin: 10/@rem 0;
      padding: 10/@rem 20/@rem;
      border-bottom: 1px solid #f5f5f5;
      padding-left: 50/@rem;
      overflow: hidden;
      .product-img{
     }
    }
  }
</style>

