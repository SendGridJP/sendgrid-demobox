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

      constants.ADD_EVENTS, this.onAddEvents
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

  onAddEvents: function(payload) {
    console.log("DemoboxStore#onAddEvents()1: " + payload.events);
    var events = JSON.parse(payload.events);
    console.log("DemoboxStore#onAddEvents()2: " + events);
    events.map(function(event) {
      this.events.unshift(event);
    }.bind(this));
    console.log(JSON.stringify(this.events));
    this.emit("change");
  }
});

module.exports = DemoboxStore;
