<template id="calendarTemplate">
  <div>
  <div class="calendarTemplate_box" v-for="(item1,index1) in caledarArr">
    <div class="canlendarBgView">
      <div class="canlendarView">
        <div class="canlendarTopView">
          {{item1.cur_year || "--"}}年{{item1.cur_month || "--"}}月
        </div>
        <div class="dateBgView">
          <div class="dateEmptyView" v-for="item2 in empytGrids[index]">{{item2.index}}
          </div>
          <div class="dateView" v-for="(item3,index) in days[index1]" :key="index" @click="clickDay(index1,index,item3)">
            <a href="javascript:;" >
              <div class="datesView" :class="[
              {'isClock':item3.isClock},
              {'isClick':item3.isClick},
              {'isNotClock':item3.isRange&&!item3.isClock},
              {'borderClick':item3.isClock&&item3.isClick||!item3.isClock&&item3.isClick}]">
                <template v-if="_month == item1.cur_month&&index == today-1">今</template>
                <template v-else>{{item3.index+1}}</template>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div></div>
</template>
<script type="text/javascript">
  var calendarTemplate = {
    template: '#calendarTemplate'
  }
  export default {
    props: ['calendarDate'],
    data() {
      return {
        hasEmptyGrid: false,
        cur_year: '',
        cur_month: '',
        weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
        empytGrids: [],
        days: [],
        _month: '',
        today: '',
        index: '',
        mySwiper: null,
        maxMonthNum: 4,
        nowMonth: null,
        nowYear: null,
        caledarArr: []
      }
    },
    mounted: function () {

      this.setNowDate();
    },
    created: function () {

    },
    methods: {
      setNowDate: function () {//当月
        let date = new Date();
        let cur_year = date.getFullYear();
        let _this = this
        /**年份 */
        let cur_month = date.getMonth() + 1;
        if (cur_month < 10) cur_month = "0" + cur_month;
        let caledarArr=[];
        //筛选创建日历数组
        for(let x =0;x < _this.calendarDate.length;x++){
          let _a = true
          for(let y = 0;y < caledarArr.length;y++){
            if(caledarArr[y].cur_year == _this.calendarDate[x].date.split('-')[0] && caledarArr[y].cur_month == _this.calendarDate[x].date.split('-')[1]){
              _a = false
            } else {
              _a = true
            }
          }
          if(_a){
            caledarArr.push({cur_year: _this.calendarDate[x].date.split('-')[0],cur_month:_this.calendarDate[x].date.split('-')[1]})
          }
        }
        _this.caledarArr = caledarArr
        /**月 */
        this.nowYear = cur_year;
        this.nowMonth = cur_month;
        let today = date.getDate();
        /**日 */

        let date2 = new Date();
        let _month = date2.getMonth() + 1;
        this.cur_year = cur_year;
        this.cur_month = cur_month;
        this._month = _month;
        this.today = today;
        for(let i = 0;i<_this.caledarArr.length;i++){
          this.calculateEmptyGrids(_this.caledarArr[i].cur_year, _this.caledarArr[i].cur_month);
          /**调用计算空格子*/
          this.calculateDays(_this.caledarArr[i].cur_year, _this.caledarArr[i].cur_month);
        }

      },

      clickDay: function (index1,index,item) { //点击态
        this.$emit('getDate',item)
        for(let j=0;j<this.days.length;j++){
          for (let i =0 ;i<this.days[j].length;i++){
            this.days[j][i].isClick=false;
          }
        }
        this.days[index1][index].isClick=true;
      },
      getThisMonthDays(year, month) { //月 天数
        return new Date(year, month, 0).getDate();
      },
      getFirstDayOfWeek(year, month) { //第一天星期几
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
      },
      calculateEmptyGrids(year, month) {
        /**计算空格子*/
        let _this = this;
        var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        var empytGrids = []
        if (firstDayOfWeek > 0) {
          for (var i = 0; i < firstDayOfWeek; i++) {
            empytGrids.push({index: i});
          }
          _this.hasEmptyGrid = true;
          _this.empytGrids.push(empytGrids);
        } else {
          _this.hasEmptyGrid = false;
          _this.empytGrids = []
        }
      },
      calculateDays(year, month) {
        let _this = this;
        let days = [];
        let thisMonthDays = this.getThisMonthDays(year, month);
        for (let i = 1; i <= thisMonthDays; i++) {
          days.push({index: i - 1,isClock:false,isClick:false,isRange:false,date:year+'-'+month+'-'+(i>=10?i:('0'+i))});
        }
        for(let i= 0;i<days.length;i++){  //循环对比 对应打卡状态
          for(let j = 0;j < _this.calendarDate.length; j++){
            if(month == _this.calendarDate[j].date.split('-')[1] && i == (_this.calendarDate[j].date.split('-')[2]-1)&&_this.calendarDate[j].clockState){
             //范围 并打卡
              days[i].isClock = true;
            }
            if(month == _this.calendarDate[j].date.split('-')[1] && i == (_this.calendarDate[j].date.split('-')[2]-1)){
              //日期范围
              days[i].isRange = true;
              if(days[i].isRange){
                days[i].courseId = _this.calendarDate[j].courseId
                days[i].dayNum = _this.calendarDate[j].dayNum
              }

            }
          }
        }
        console.log(days)
        this.days.push(days);
      }
    }
  }
</script>

<style lang="less">
  @import "../../less/variable";
  .calendarTemplate_box{
    height:auto;
    .isClick{ /*点击style*/
      background: #B1E9FF;
      color:#333 !important;
    }
    .isClock{ /*已打卡style*/
      background: #9688FF;
      color:#fff !important;
    }
    .isNotClock{  /*未打卡style*/
      background: #E8E8E8;
      color:#777 !important;
    }
    .borderClick{
      border:5/@rem solid #B1E9FF;
    }
  }
  .show_box_cal {
    visibility: inherit;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .hidden_box {
    visibility: hidden;
  }
  .calendar_box {
    height: 100%;
    background: #ffffff;
  }
  .canlendarBgView {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
  }
  .canlendarView {
    display: flex;
    flex-direction: column;
    width:100%;
  }
  .canlendarTopView {
    font-size: 28/@rem;
    text-align: right;
    padding-right: 20/@rem;
    position: relative;
    color:#999;
    margin-bottom: 20/@rem;
    line-height: 40/@rem;
  }
  .canlendarTopView:after{
    position: absolute;
    content: '';
    width:8/@rem;
    height:22/@rem;
    background: #999999;
    right:0;
    top:50%;
    margin-top: -11/@rem;
  }



  .dateBgView {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .dateEmptyView {
    width: 14.28571%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    float: left;
    height:60/@rem;
    margin-bottom: 26/@rem;
  }
  .dateView {
    width: 14.28571%;
    display: flex;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    position: relative;
    text-align: center;
    float: left;
    height:65/@rem;
    margin-bottom: 26/@rem;
  }

  .datesView {
    color: #828080;
    font-size: 30/@rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width:60/@rem;
    height:60/@rem;
    border-radius: 50%;
    line-height:60/@rem;
    text-align: center;
    margin: 0 auto;
  }
  .dateSelectView {
    background: #B1E9FF;
  }






</style>
