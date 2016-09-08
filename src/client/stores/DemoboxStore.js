var constants = require("../constants.js");

var DemoboxStore = Fluxxor.createStore({
  initialize: function() {
    this.status = '';
    this.request = '';
    this.reponseCode = '';
    this.responseBody = '';
    this.error = null;
    this.result = "";

    this.showEvent = "json";

    this.events = [];

    this.bindActions(
      constants.SEND_MAIL, this.onSendMail,
      constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess,
      constants.SEND_MAIL_FAIL, this.onSendMailFail,

      constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent,

      constants.ADD_EVENT, this.onAddEvent
    );
  },

  onSendMail: function() {
    this.status = '送信中...';
    this.request = '';
    this.responseCode = '';
    this.responseBody = '';
    this.emit("change");
  },

  onSendMailSuccess: function(payload) {
    this.status = '送信完了';
    this.request = payload.result.request;
    this.responseCode = payload.result.responseCode;
    this.responseBody = payload.result.responseBody;
    this.emit("change");
  },

  onSendMailFail: function(payload) {
    this.status = '送信失敗';
    this.responseCode = payload.responseCode;
    this.responseBody = payload.responseBody;
    this.emit("change");
  },

  onToggleShowEvent: function(payload) {
    console.log("DemoboxStore#onToggleShowEvent()1: " + payload.buttonId);
    this.showEvent = payload.buttonId;
    this.emit("change");
  },

  onAddEvent: function(payload) {
    console.log("DemoboxStore#onAddEvent()1: " + payload.event);
    var event = JSON.parse(payload.event);
    console.log("DemoboxStore#onAddEvent()2: " + event);
    this.events.push(JSON.parse(event));
    console.log(this.events);
    this.emit("change");
  }
});

module.exports = DemoboxStore;
