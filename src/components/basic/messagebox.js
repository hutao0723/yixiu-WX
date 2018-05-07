import Vue from 'vue';

var MessageBoxConstructor = Vue.extend(require('./Modal.vue'));

var MessageBox = function (options) {
  const body = document.body;
  var instance = new MessageBoxConstructor({
    el: document.createElement('div'),
    propsData: {
      title: options.title,
      messageType: options.type,
      type: 'message',
      show: false
    }
  });
  instance.$watch('show', function (val) {
    if (val) {
      this.show = true;
      this.showInit();
    }
    setTimeout(() => {
      this.close();
      this.$nextTick(function () {
        this.$el.remove();
      });
      this.show = false;
    }, options.time || 1500);
  });
  setTimeout(function () {
    instance.show = true;
    body.appendChild(instance.$el);
  }, 200);
};

export default MessageBox;
