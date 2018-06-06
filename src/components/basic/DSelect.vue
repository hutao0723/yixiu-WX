<template>
<div class="select-group" :class="{open: show}" ref="container" :disabled="disabled" >
  <a class="select-toggle" ref="trigger">
    {{selectItem && selectItem[keys]}}
    <i class="bicon"></i>
  </a >
  <ul class="select-menu" v-show="!disabled && show" :class="{'select-top': direction === 'top'}" :style="{'width': width}">
    <template v-if="options.length">
      <li v-if="search">
        <input type="text" v-model="iFilterKey" class="dselect-search" placeholder="请输入应用名称">
      </li>
      <li v-for="option in iFilteredData" :id="option.id || option[idName]" :class="{'active': isSelected(option)}">
        <a @click="select($event, (option.id || option[idName]))">
          {{ option.label || option[keys] }}
        </a>
      </li>
      <li class="no-data" v-if="search && !iFilteredData.length">无匹配数据</li>
    </template>
  </ul>
</div>

</template>

<script>
/* eslint-disable no-extra-boolean-cast */
import EventListener from '../utils/EventListener';
import coerceBoolean from '../utils/coerceBoolean';
// import messagebox from 'components/basic/MessageBox';

export default {
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    idName: {
      type: String,
      default: 'id'
    },
    isconfirm: {
      default: false
    },
    confirmparams: {
      default: null
    },
    confirmurl: {
      default: null
    },
    activitytype: {
      default: null
    },
    keys: {
      type: String,
      default: 'label'
    },
    value: {},
    options: {
      type: Array,
      default () {
        return [];
      }
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    search: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    disabled: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    confirm: {
      type: Object,
      default: null
    },
    method: {
      type: String,
      default: 'put'
    },
    selectval: {
      default: null
    },
    direction: {
      type: String,
      default: 'bottom'
    },
    // select 宽度
    width: {
      type: String,
      default: '160/@rem'
    }
  },
  data () {
    return {
      iFilterKey: '',
      show: false
    };
  },
  watch: {
    'value': function (val) {
      this.$emit('update:value', val);
    }
  },
  mounted () {
    const triger = this.$refs.trigger;
    const container = this.$refs.container;
    if (this.trigger === 'hover') {
      this._mouseenterEvent = EventListener.listen(triger, 'mouseenter', (e) => {
        this.show = true;
      });
      this._mouseleaveEvent = EventListener.listen(container, 'mouseleave', (e) => {
        this.show = false;
      });
    } else {
      let that = this;
      this._clickEvent = triger.addEventListener('click', function (event) {
        that.toggleDropdown(event);
      }, false);
      this._documentEvent = EventListener.listen(document, 'click', (e) => {
        if (e.target.className === 'dselect-search') {
          return false;
        }
        this.show = false;
      });
    }
  },
  computed: {
    selectItem (item) {
      if (this.value) {
        let item = this.options.filter((item) => {
          return (item.id || item[this.idName]) === this.value;
        });
        return item && item[0];
      } else {
        let first = this.options[0];
        this.value = this.idName ? (first && first[this.idName]) : (first && first.id);
        return first;
      }
    },
    'iFilteredData': function () {
      let filterKey = this.iFilterKey && this.iFilterKey.toLowerCase();
      let data = this.options;
      data = data.filter(function (row) {
        return Object.keys(row).some(function (key) {
          if (key === 'imgUrl') {
            return false;
          } else {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          }
        });
      });
      return data;
    }
  },
  methods: {
    /**
     * 选中某个值
     */
    select (e, v) {
      if (this.isconfirm) {
        this.selectval = v;
        return;
      }
      this.value = v;
      this.toggleDropdown(e);
      this.onSelect(v);
    },
    clickSelect () {
      var params;
      params = {
        id: this.confirmparams,
        activityType: this.activitytype
      };
      this.$http[this.method](this.confirmurl, params).then((res) => {
        res = res.json();
        if (res.success) {
          this.$dispatch('changeSuccess');
          // messagebox({
          //   title: '修改状态成功!',
          //   type: 'success'
          // });
        } else {
          // messagebox({
          //   title: res.message || '修改状态失败!',
          //   type: 'error'
          // });
        }
      }, (res) => {
        // error callback
        // messagebox({
        //   title: res.message || '网络错误！',
        //   type: 'error'
        // });
      });
      this.toggleDropdown();
    },
    /**
     * 当前是否选中
     */
    isSelected (option) {
      if (!this.value) {
        return this.options.indexOf(option) === 0;
      }
      return this.value === (option.id || option[this.idName]);
    },
    /**
     * 切换下拉框
     */
    toggleDropdown (e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.show = !this.show;
    }
  },
  beforeDestory () {
    if (this._mouseenterEvent) {
      this._mouseenterEvent.remove();
      this._mouseleaveEvent.remove();
    }
    if (this._clickEvent) {
      this._clickEvent.remove();
    }
  }
};
</script>
<style lang="less">
  @import '../../less/tool.less';
  .select-hidden {
    width: 1/@rem;
    heigit: 1/@rem;
    border: 0;
  }

  .select-group {
    height: 32/@rem;
    position: relative;
    display: inline-block;
  }

  .select-toggle {
    box-sizing: border-box;
    display: block;
    // background-color: #fff;
    height: 36/@rem;
    line-height: 35/@rem;
    font-size: 24/@rem;
    color: #666;
    padding: 0 26/@rem 0 14/@rem;
    position: relative;
    cursor: pointer;
    border-radius: 4/@rem;
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
    min-width: 87/@rem;
    text-align: right;
    .bicon {
      color: #666;
      font-size: 24/@rem;
    }
  }

  .select-menu {
    border: 1px solid #dedede;
    background-color: #fff;
    color: #666666;
    width: 300/@rem;
    max-height: 350/@rem;
    overflow-y: auto;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 32/@rem;
    z-index: 99;
    border-radius: 4/@rem;

    li {
      
      &:last-child {
        border: 0;
      }
      
      a{
        z-index: 999;
      }
    }

    a {
      display: block;
      position: relative;
      padding-left: 16/@rem;
      line-height: 40/@rem;
      font-size: 24/@rem;
      cursor: pointer;
      color: #666;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/

      &:hover {
        background-color: #f9f9f9;
        color: #444;
      }
    }
  }

  // 时间限制的select-group
  .time-limit .select-group {
    width: 90/@rem;
  }

  .select-group {
    position: relative;
  }
  .select-group .selblue {
    background-color: #59ace2;
    color: #fff !important;
  }
  .select-group .btn-default {
    color: #444 !important;
    text-decoration: none;
  }
  .select-top{
    bottom: 34/@rem;
    left: 0;
    top: auto;
  }
  .select-menu{
    .no-data{
      height: 34/@rem;
      line-height: 34/@rem;
      font-size: 14/@rem;
      padding-left: 32/@rem;
    }
  }
  .dselect-search {
    height: 34/@rem;
    line-height: 34/@rem;
    box-sizing: border-box;
    padding: 0 30/@rem;
    width: 100%;
    border: 1/@rem solid #fff;
    border-radius: 2/@rem;
    outline:none;
    margin-left: 5/@rem;
    font-size: 24/@rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAOVBMVEUAAAAcwq0cw60cw60Qv68bxa8bw60bw60bwq0cw6wYx68bw60awqwbw6wbxK0cwqwcw6wcw6wcw63OwJAyAAAAEnRSTlMA8IDAEDDQYKBAIOBQkHCwb6+kkFnsAAAGfUlEQVR42u1dWXbbMAwECIq7vPD+h23z0taviSUR3AS7ne8k0oQcLBQIQGf4pBR9APNPRPqJu1J+gZdBSMoR5k1EWpUH4QjWxVwEWpMGmfgkwYFZE0iDtpRrgE4SF23vuR7ohBgA7zA3Iq4BzoY1uQvcqYZM25i7gU6johXmrogWjiGfxklULOYhoLkmbKE8DG6ex9cujwTeYA5umAfDzDBggfIErDAaCfMUmMG+fs2zgCMtcTB5Hy9ivizmqTCDfEqB0X2F7aUrcg6iq/oDooqNafvzYL0FX/@rem1+onI/EURTygAZ8k8Onuwt70iPInJgqX6vITCv7jG0v2pp/OIlzAiRzZ6qtnFtcJYJmIwmbIeqCofFhyDyXAe0TY8Kaw4hUnA4fmpVvkI9wn+Q+kZuYEbzYMCdEGKYzOU+8GuStANR6cydmCceNVdve7B6qcGB8KITccfamCoN7yzs4W0/0SohNkVn4YBCGaA4Ndq6Q2Tpa9aZgaPWUxQ9/XouMBA7Pl5AjZoBg++sVTAxIVzdjaTCfPhGjnmfCYTYiqOua8mMkksV5g3webR2/bHPkq3MAmuh97t+Tx2mGBoV/oK86BNc7qoxqXOfYTqGxcEF5iKS6MJVgIE8okrY0kYC+JgNnQ8fhW+yYoapmNpCVRis0edYINd/YIQDAR/n+vq/DbAKbjUunfP+MUpMJW5opOj9E/4Ol+gUYgLOXQm1yqpRzgPS5Xcr+IWBIAq3kkzlDUNvsIfWGEm6xPEdwgkcEE2/70X2EQ4P51iRE2GTf302vULd285cbZ3d6ck5hJe4HQY3pYPosLF471leBIxcD4Cz7k7qTsL4MoSSZS6swAuHJEEoTbrAwtn1ychZydPgfkZ4CmUvMD3gSvjfMvJlciWSFJ5xIggAwsjLMfnGaUQMAQsMRV5gIqTKy9Z6xtqx3LrK+bC9nObWv6TYu5q2/wMvpyyFPhiIiTn6Lr8gCe9HpFyo0qCIy0eEdFuBADfhUjx++G7EJEdoWwZo/9EyvGfyAaoNMuIr0jkrc2vdCLlnl10prtF5J2DxqvUE+xPhH8vsVKSz+e2TuiWZ5Tf5fBhkft1ZNMWxRc8oIvlRjVKtr+a8aWHJJstz9gvq2S1K8bLKclqJ0ZNhs+Co63M2fdZ7pcezyrZIpklNR9QLN+wyixy+kBkGaIk9kP7wpIIaKHlWgArs6rRSN1bkRk+rULt1sK9DpMEXbgoqHOHbaBIn6j5r+VE1tApfil2knK76i/EimpkFLgktua/6wTWlMcaE+TlVfmnXOUUorglMXW6XWXdFQO4VF4ODd0aXI29vxdLvKik3H2tvjfss6RrVkvD25Ckm4gtL+OF3GZ/KL3WHUQR/QUeG6t6d1gJHR/2uz7o0phAxk1w19oi0E7utsN/DY6tOP1SzIKbCuGI7PS+DzrmDj0b3OlMdjpdJnaEc+bp/DYPYnqic9sHuW6dwgynwdVMHop9jn/imriefQHX85i4vA1fKbcTImHd+8EBGX2EB/Jod8j2jFEUSxzQX9bNH0VhcUTHX20YM4EmN/@remdR3Vav+vO28oM67lu8y5i1+11y7vApTUnmNO+eCEuD77gJyhFr/kAqdnNzpiedcMJo2EoH8EFaEIyU0bcaDN2KKONjLEww5lkS/@remzIWJm8JjBJMdbYFuqFTODx7yRSeamOSzi/HFD+poLcb8V2XuvYuUoq+B/IkwZK4YHZLyi2pFc+mZ+rb3Sk+bu0f37SK7gb4o5XgzT1mQPVC3RCh+RfmFD1oy4RN/@remIFL4TMeNnEeb7zRfYhzi14iUni2Y/AGVX+UBqm9I7KdtLxP2DnHbmWjKU6BKvyYuDdVT44G++JQNF8GTdb97uzAmdUwxN4E/48uPSoLVMNHHxDlTb2cSrrkfjgMPP/BgwvOlUp80+6FHLIvrvBqaUX3VlQmEflTifmBuBjMB3Uf20TKCozFMQNtW3aPzx09BBpMGLtTAInEDiqF1WOFicgWu5WNTDYNJG0JaWWRI+doyzfG1cbqQDCnf9LVmTm2cT8oRbuXwq/LLsAm/BAPgfVIfoN9j2v2DQSsTCfOpOjERVdXbxERWoXU9EykVpO1MRI3gqWPyFiL5i4nklggcJkKvf7KYvINGPpmcXgbbjYmQsvcOTN5AIr+YSG4awmMiuh9YGxMU00WLxyQKuD11DP7HGvOa6/G1IgdfJKfagl8JM9LjUOkHVk4058GD+XAAAAAASUVORK5CYII=') no-repeat left center;
    background-size: 20/@rem 20/@rem;
  }
</style>
