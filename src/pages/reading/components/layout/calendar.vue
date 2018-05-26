<template id="calendarTemplate">
  <div class="calendarTemplate_box">
    <div class="canlendarBgView">
      <div class="canlendarView">
        <div class="canlendarTopView">
          {{cur_year || "--"}}年{{cur_month || "--"}}月
        </div>

        <div class="dateBgView">
          <div class="dateEmptyView" v-for="item in empytGrids">{{item.index}}

          </div>
          <div v-for="(item,index) in days" :key="index"
               :class="[commonClass]"
               @click="clickDay(index)">
            <a href="javascript:;" >
              <div class="datesView" :class="[{'dateSelectView':item.isClick}]">
                <template v-if="_month == cur_month&&index == today-1">今</template>
                <template v-else>{{item.index+1}}</template>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  var calendarTemplate = {
    template: '#calendarTemplate'
  }
  export default {
    data() {
      return {
        hasEmptyGrid: false,
        cur_year: '',
        cur_month: '',
        weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
        empytGrids: [],
        days: [],
        commonClass: 'dateView',
        _month: '',
        today: '',
        index: '',
        mySwiper: null,
        maxMonthNum: 4,
        nowMonth: null,
        nowYear: null,
      }
    },
    mounted: function () {
      this.setNowDate();
    },
    created: function () {

    },
    methods: {
      setNowDate: function () {
        let date = new Date();
        let cur_year = date.getFullYear();
        /**年份 */
        let cur_month = date.getMonth() + 1;
        if (cur_month < 10) cur_month = "0" + cur_month;
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
        this.calculateEmptyGrids(cur_year, cur_month);
        /**调用计算空格子*/
        this.calculateDays(cur_year, cur_month);
      },

      clickDay: function (index) {
        for (let i =0 ;i<this.days.length;i++){
          this.days[i].isClick=false;
        }
        this.days[index].isClick=true;
      },
      getThisMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
      },
      getFirstDayOfWeek(year, month) {
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
          _this.empytGrids = empytGrids;
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
          days.push({index: i - 1,isClick:false});
        }
        for(let i= 0;i<days.length;i++){
          if(_this._month == _this.cur_month&&i == _this.today-1){
            console.info(days[i])
            days[i].isClick  = true;
          }
        }
        this.days = days;


        console.log(this.days)
      },
      oldMonth: function () {
        //上个月
        let cur_year = this.cur_year;
        let cur_month = this.cur_month;
        //阻止前面的的月份
        let firstYear = this.nowYear;
        let firstMonth = this.nowMonth;
        firstMonth = firstMonth - this.maxMonthNum;
        if (firstMonth <= 0) {
          firstYear = firstYear - 1;
          firstMonth = 12 + firstMonth;
        }
        if (firstYear === cur_year && firstMonth === cur_month) {
          return;
        }
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        this.cur_year = newYear;
        this.cur_month = newMonth;
      },
      nextMonth: function () {
        //下个月
        let cur_year = this.cur_year;
        let cur_month = this.cur_month;
        //阻止后面的月份
        if (this.nowYear === cur_year && this.nowMonth === cur_month) {
          return;
        }
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }
        this.calculateDays(newYear, newMonth);
        this.calculateEmptyGrids(newYear, newMonth);
        this.cur_year = newYear;
        this.cur_month = newMonth;
      }
    }
  }
</script>

<style lang="less">
  @import "../../less/variable";
  .calendarTemplate_box{
    height:auto;
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
    height:60/@rem;
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
