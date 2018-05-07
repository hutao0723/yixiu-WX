<template>
  <div class="modal-list" v-if="show">
    <template v-if="type === 'alert'">
      <div class="modal alert" :class="className">   
        <div class="modal-dialog" ref="modal" :style="{'margin-top': mt + compensate + 'px'}" @click="close">
          <div class="modal-header">{{title}}</div>
          <div class="modal-footer">
            <span class="modal-true percent-100"> {{trueButton || '确定'}}</span>
          </div>
        </div> 
      </div>
    </template>
    <template v-if="type === 'confirm'">
      <div class="modal confirm" :class="className">
        <div class="modal-dialog" ref="modal" :style="{'margin-top': mt + compensate + 'px'}" @click="close">
          <div class="modal-header">
             <p class="title">{{title}}</p>
             <div class="subtitle">{{section}}</div>
          </div>
         
          <div class="modal-footer">
            <span class="modal-false" @click="close">{{falseButton || '取消'}}</span>
            <span class="modal-true" @click="save">{{trueButton || '确认'}}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type === 'loading'">
      <div class="modal loading" :class="className">
        <div class="modal-dialog" ref="modal" :style="{'margin-top': mt + compensate + 'px'}" @click="close">
          <div class="modal-header">
            <img src="../../images/myzone/icon_loading.png">
            <p class="modal-title">{{title}}</p>
            <a v-if="link" :href="link">{{linkButton}}</a>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type === 'hint'">
      <div class="modal hint" :class="className"  @click="close">
        <div class="modal-dialog" ref="modal" :style="{'margin-top': mt + compensate + 'px'}">
          <div class="modal-close" v-if="!closeHidden" @click="close"></div>
          <div class="modal-header">{{title}}</div>
        </div>
      </div>
    </template>
    <template v-if="type === 'message'">
      <div class="modal message" :class="className"  @click="close">
        <div class="modal-dialog" :class="messageType" :style="{'margin-top': mt + compensate + 'px'}" ref="modal">
          <template v-if="messageType === 'success'">
            <div class="modal-header">
              <img src="../../images/myzone/icon_success.png">
            </div>
            <div class="modal-body">
              {{title}}
            </div>
          </template>
          <template v-if="messageType === 'error'">
            <div class="modal-header">
              <img src="../../images/myzone/icon_fail.png">
            </div>
            <div class="modal-body">
              {{title}}
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-if="type === 'popup'">
      <div class="modal popup" :class="className">
        <div class="modal-popup" ref="modal" :style="{'margin-top': mt + compensate + 'px'}">
          <slot name="modal-body"></slot>
        </div>
      </div>
    </template>
    <div class="modal-mask" @click="close"></div>
  </div>
</template>
<script>
  export default{
    name: 'modal',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'alert'
      },
      isMessage: {
        type: Boolean,
        default: false
      },
      section: {
        type: String,
        default: ''
      },
      messageType: {
        type: String,
        default: 'success'
      },
      trueButton: {
        type: String,
        default: '确认'
      },
      falseButton: {
        type: String,
        default: '取消'
      },
      compensate: {
        type: Number,
        default: 0
      },
      cb: {
        type: Function,
        default: () => {}
      },
      time: {
        // type: Number,
        default: 2000
      },
      title: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: ''
      },
      closeHidden: {
        type: Boolean,
        default: true
      },
      link: {
        type: String,
        default: ''
      },
      linkButton: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        mt: 0
      };
    },
    mounted () {
      this.showInit();
    },
    methods: {
      showInit: function () {
        var $modal = this.$refs.modal;
        if (window.parent !== window && window.$parentHeight !== undefined && window.$parentScrollY !== undefined) {
          $modal.style.top = window.$parentHeight / 2 + window.$parentScrollY;
        }
        var mHeight = $modal.offsetHeight;
        this.mt = -mHeight / 2;
        if (this.isMessage && this.time) {
          setTimeout(() => {
            this.$emit('show', false);
          }, +this.time);
        }
      },
      close: function () {
        this.cb('close');
        this.$emit('show', false);
      },
      save: function () {
        this.cb('save');
        this.$emit('show', false);
      }
    }
  };
</script>
<style lang="less">
  @import '../../less/tool.less';
  /*modal*/
  .modal-mask {
    position: fixed;
    z-index: 98;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7) !important;
  }
  .modal-dialog {
    position: fixed;
    z-index: 99;
    top: 50%;
    right: 0;
    left: 0;
    width: 500/@rem;
    height: 280/@rem;
    box-shadow:0 2/@rem 6/@rem 0 rgba(0,0,0,0.24);
    border-radius:8/@rem;
    margin: 0 auto;
    -webkit-border-radius: 10/@rem;
    border-radius: 10/@rem;
    background-color: #fff;

    &.loading {
      width: 160/@rem;
      padding: 15/@rem;
      text-align: center;

      img {
        width: 28/@rem;
        height: 28/@rem;
      }
      p {
        font-size: 14/@rem;
        margin-top: 15/@rem;
        color: #000;
      }
    }
  }
  .modal-dialog .modal-close{
    position: absolute;
    top: -84/@rem;
    right: 0;
    // background-color:#fff;
    width:54/@rem;
    height:54/@rem;
    border-radius:100%;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAABGZJREFUaAXdmr9PGzEUxx1ouwWGzqiJRMVA2dqOTVKh/gWobJWQkGABCQkyAQssIBAMdOwfwBzRSB1a1AlKWVAZaIcGITFUiYAwlYKu3+/1Xno5knA/fOHIk15sn332+/g59p3PMaVRDMOIobon0DS0F9oDfQTtgMahlHNoGXoIPYDuQzeh32KxmIEwGkIYaAr6DvoL6ld4L+tIQdlBtyNsHDoI/Q7VLayTdTcXEA1moDvQsIVtZEJ3HRpJQt+HTVOjfraZDAUQFaehxRqNNusS205rhUOFI9CLZhE0aIc2jASGQyXt0LUGDd1WFm1q9w0YUSjpzDVfYLibwy/qUndY1lwnQJNGb3yA3vfVK8276Q+aeoUnlk1nk9fAAMVpdQf60Fk4oukS7HoGuJ92+9rsCSv+FuFdgaLJtJU2V0mVx+CtDHI/VpW4O4mX8NonMbcCBijGv0CfSuYdC7/C3ufyhmAfiq+9Qq2vr6uZmRl1dnamrQ9KpZKanp5W+Xzea510CBlMMcEsb83JRbfh3t6e2traUpOTk1rgCDU1NaW2t7fV7u6uWzPs5eYsFiUee4Hcx/YSbuLZbFYlEglVKBQCwwnU0dGR6u7uVuPj425McJYhA1kqYG+cJdykOzs71dLSUmA4J9TCwoLq6OBLty/5x0LXQYO8+Rqnp6fG8PCw0d/fb4ZMu5VisWgMDQ2Z946Ojhr4v7q9tV45ssQUfvrqlfBy3Q9cCFBich//Y2lfDnfc5HVYah5+DmtUmmDcTdIibuFChiJLL8F6tFBZldwE1wQoWtLDiYMPjwmmdAoXba5vXAq4JHD2vLy8NNcpmdIDzn6NzC0QrIgSoTz02uG6urrU1dWVOj4+NtepEKEIXCLYb0QeMBWGEG5iYkLRS5RkMml6L8A65cbMC/7HQhUOP3pKhGl0piRDCwl2HlbtMlFw+NFTHI70nK5nywZ2n4cGJlAyUSwvL6uVlZXAj18NYOxZZYIV7Fd0xJ1Qi4uLKh6Pq5uWAh1tW3UcEoyfcrRJPShpoElwBwTj9yktchOUNNIEuH1tD8HOB9pyuYzJr7H4eXBuXGMlt49ggV9b/ECJCU64k5MTyfIbmq8tbdbmR06GidfQ7fCrV69zWHJrALD1iru5npMNHXot5ad7gnjK2Z5Gz6VIz8mD8hn6w4x5+FldXTUXXO5RyJTu4faqok7PsW4fQgay/Bf0IL/5epKNjQ1jfn7ecDNRuK2YnpudnTVyuZzbW+zlBoWIm6SmIJfx1tswtf5wWYvzLgbZyqQB6+U/ZoIgg3vfnrdgI9ALecv2iimVoShXMCSTiLfeZySQc6tgAMqPalEX2jhg2Vxla9VQlBwU3ER8TNIRDscsW72ZiGEZxRMDMr37+7jOLkAN9yIKF+w4hPgXcK11gEXALO+lAdhaR44EEGBJaGsdEhM4y3sZALbOsT4HHF9QW+sgZg3AFCAjdXT22iOV3WivccCxPudh5wSu8aAzlcIN2tAPO/8FRjPCGsSmKjwAAAAASUVORK5CYII=') no-repeat center center;
    background-size: 54/@rem 54/@rem; 
  }
  .modal-header, .modal-section {
    padding: 0 30/@rem;
  }
  .modal-header {
    height: 198/@rem;
    overflow: hidden;
    box-sizing: border-box;
    .fontSize(28);
    color: @com_red;
  }
  .modal-footer {
    border-top: solid #c8c8c8 1px;
    .fontSize(28);
  }
  .modal-footer span {
    display: inline-block;
    text-align: center;
  }
  .modal-footer span:active {
    background-color: #dfdfdf;
  }
  .modal-true {
    color: #fe4b4b;
    &.percent-100 {
      width: 100%;
    }
  }
  .modal-false {
    margin-left: -1px;
    border-right: solid #c8c8c8 1px;
    color: #969696;
  }
  .alert {
    .modal-header {
      line-height: 2.64rem;
      text-align: center;
    }
    .modal-true.percent-100 {
      line-height: 1rem;
    }
  }
  .loading{
    .modal-dialog{
      box-sizing: border-box;
      padding-top: 61/@rem;
    }
    .modal-header{
      img{
        margin-left: 183/@rem;
        height: 92/@rem;
        animation: 3s linear infinite CDturn
      }
    }
    .modal-title{
      color:#fe4b4b;
      margin-top: 45/@rem;
      text-align: center;
      .fontSize(28);
    }
  }
  .hint{
    .modal-header{
      text-align: center;
      line-height: 245/@rem;
      height: 100%;
    }
  }
  .confirm{
    .title{
      .fontSize(28);
      color:#fe4b4b;
      text-align: center;
    }
    .modal-header{
      padding-top: 63/@rem;
    }
    .modal-footer{
      span{
        height: 79/@rem;
        line-height: 79/@rem;
        width: 49%;
      }
    }
    .subtitle{
      .fontSize(24);
      color:#969696;
      margin-top: 9/@rem;
      text-align: center;
    }
  }
  .message{
    .modal-dialog{
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      padding: 92/@rem 0 50/@rem 0;
      &.success{
        color: #fe4b4b;
      }
      &.error{
        color: #969696;
      }
    }
    .modal-header{
      img{
        height: 61/@rem;
      }
    }
    .modal-footer{
      border-top: none;
    }
  }

  .popup{
    .modal-popup{
      position: fixed;
      top: 50%;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 99;
    }
  }
  @keyframes CDturn{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
</style>
