<template>
  <modal v-if="show" :show.sync="show" type="popup" class-name="m_popup" :compensate="-40">
    <template slot="modal-body">
      <div class="modal-body">
        <a href="javascript:;" @click="onpress">
          <img :src="src">
        </a>
        <div class="modal-footer">
          <span href="javascript:;" @click="modalClose" class="popup-close"></span>
        </div>
      </div>
    </template>
  </modal>
</template>
<script>
  import modal from './Modal.vue';
  export default {
    components: {
      modal
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      onpress: {
        type: Function,
        default: () => {}
      },
      src: {
        type: String,
        default: ''
      }
    },
    methods: {
      modalClose: function () {
        this.$emit('update:show', false);
      }
    }
  };
</script>
<style lang="less">
  @import '../../less/tool.less';
  .m_popup{
    .modal-body{
      width: 630/@rem;
      margin: 0 auto;
      a{
        display: inline-block;
        width: 100%;
      }
      img{
         width: 100%;
      }
    }
    .modal-footer{
      width: 100%;
      border-top: none;
      span{
        margin: 0 auto;
      }
    }
    .popup-close{
      display: block;
      width: 75/@rem;
      height: 70/@rem;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABFCAMAAAA1muuoAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMAevvrEw3W7vjyYsQk038JH/XPubF26IpvRkPfMKohGRfIalwqv7RSqKCCXwZdUGEwQQsAAAKoSURBVFjDnNTnjptAAEXhyxiGYry44d7ibYoT5bz/20XaXYEoHsr3FzhCmgtyuuVrGxoATGjX+U0jfU5j6uLppwa7rBcA8ezs7dNMWbr3zrMYYLG+aIi3KYB9XFV1fViAX2/qy38Hwm2gNsE2BN599eIZ2CR6LtmA8dTNtxDt5LaLwHa+2iGCVaAuwQqig5zuYBL18cfAXQ4vMJmrn/kEXvRUDvav+sqOkOuJBJYaYgmJWh0MRw1zxBxaxxAxCTRMMCHy1WQxcw01N9jWI0w0XNJymDfDSmOsMDdVTYkyjZFFTFVxgp3G2cGptpSNxtpUV5lCorESSFX6IFTNv5D4rppg2favCflQKWKrqtQAeI1pQnNQWyIVXiFQ1W++eM0UqCaA13IQWLW38JopVGcpZ7HAU82JIlZPWdV5LPTjAn7zehGrpcLmvT7Mi8diyRlzp6S4eP01MzljXSnNio/ZcpY71pHSmWOxNU/uWOxOKSculrqXO9aR0h6jb4ZUjlh3SqdidJDJEetO6UrZ0nMPfiz+12JGOQjCQBANRYzGUsWIhk8jHxjE3v92Wv2YhEl2ScnuAV6g3c7uDFBc6nehr9Bn+nd5EQWYfl4udjqKYXyP3F+MYhj3F/peRpU3glHf4z3KqA2pBr9H6ISCYglinYB+ySgFVkG/SFcJRTDSVUnvz0DRc+r5uA7SHHJAEWyQ5hDmI1hAEezJ81Gc23eg5jDneW6L+0T1hdV8u4+9K9/SPrF+zzHZv9bvhSb7KvboMQM1xhiM9nv4jusr23ewH9pm+CFLn5bvH819Lfz2tAg1wW+LOcBR/z/kAMb5BCosyk2CfZ7D1f9ktQ6UM4VayJnU/GtoO5+Ut2uHf/61u/icXK6J82qEXE6pU5HyQpcGRsoLCzmR+wC4xItsJoZWjAAAAABJRU5ErkJggg==') no-repeat center center;
      background-size: cover;
      margin-top: 33/@rem;
    }
  }
</style>
