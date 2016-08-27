var constants = require("../constants.js");

var BuzzwordStore = Fluxxor.createStore({
  initialize: function() {
    this.status = '';
    this.request = '';
    this.reponseCode = '';
    this.responseBody = '';
    this.error = null;
    this.result = "";

    this.bindActions(
      constants.SEND_MAIL, this.onSendMail,
      constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess,
      constants.SEND_MAIL_FAIL, this.onSendMailFail
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
  }
});

module.exports = BuzzwordStore;
