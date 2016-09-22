var constants = require("../constants.js");

var DemoboxStore = Fluxxor.createStore({
  initialize: function() {
    this.mailData = {
      personalizations: [
        {
          to: [{email: "", name: ""}],
          cc: [],
          bcc: [],
          headers: [],
          substitutions: [],
          custom_args: [],
        }
      ],
      from: {email: "", name: ""},
      "reply-to": null
    };
    this.status = '';
    this.request = '';
    this.reponseCode = '';
    this.responseBody = '';
    this.error = null;
    this.result = "";

    this.showEvent = "json";

    this.events = [];

    this.bindActions(
      constants.ADD_PERSONALIZATION, this.onAddPersonalization,
      constants.DEL_PERSONALIZATION, this.onDelPersonalization,
      constants.ADD_TO_INPERSONAL, this.onAddToInpersonal,
      constants.DEL_TO_INPERSONAL, this.onDelToInpersonal,
      constants.ADD_CC_INPERSONAL, this.onAddCcInpersonal,
      constants.DEL_CC_INPERSONAL, this.onDelCcInpersonal,
      constants.ADD_BCC_INPERSONAL, this.onAddBccInpersonal,
      constants.DEL_BCC_INPERSONAL, this.onDelBccInpersonal,
      constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal,
      constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal,
      constants.ADD_SUBSTITUTION_INPERSONAL, this.onAddSubstitutionInpersonal,
      constants.DEL_SUBSTITUTION_INPERSONAL, this.onDelSubstitutionInpersonal,
      constants.ADD_CUSTOMARG_INPERSONAL, this.onAddCustomargInpersonal,
      constants.DEL_CUSTOMARG_INPERSONAL, this.onDelCustomargInpersonal,
      constants.ADD_REPLYTO, this.onAddReplyto,
      constants.DEL_REPLYTO, this.onDelReplyto,
      constants.SEND_MAIL, this.onSendMail,
      constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess,
      constants.SEND_MAIL_FAIL, this.onSendMailFail,

      constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent,

      constants.ADD_EVENTS, this.onAddEvents
    );
  },

  onAddPersonalization: function() {
    this.mailData.personalizations.push(
      {
        to: [{email: "", name: ""}],
        cc: [],
        bcc: [],
        headers: [],
        substitutions: [],
        custom_args: []
      }
    );
    this.emit("change");
  },

  onDelPersonalization: function(index) {
    this.mailData.personalizations.splice(index, 1);
    this.emit("change");
  },

  onAddToInpersonal: function(index) {
    this.mailData.personalizations[index].to.push(
      {email: "", name: ""}
    );
    this.emit("change");
  },

  onDelToInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].to.splice(payload.index, 1);
    this.emit("change");
  },

  onAddCcInpersonal: function(index) {
    this.mailData.personalizations[index].cc.push(
      {email: "", name: ""}
    );
    this.emit("change");
  },

  onDelCcInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].cc.splice(payload.index, 1);
    this.emit("change");
  },

  onAddBccInpersonal: function(index) {
    this.mailData.personalizations[index].bcc.push(
      {email: "", name: ""}
    );
    this.emit("change");
  },

  onDelBccInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].bcc.splice(payload.index, 1);
    this.emit("change");
  },

  onAddHeaderInpersonal: function(index) {
    this.mailData.personalizations[index].headers.push(
      {"": ""}
    );
    this.emit("change");
  },

  onDelHeaderInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].headers.splice(payload.index, 1);
    this.emit("change");
  },

  onAddSubstitutionInpersonal: function(index) {
    this.mailData.personalizations[index].substitutions.push(
      {"": ""}
    );
    this.emit("change");
  },

  onDelSubstitutionInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].substitutions.splice(payload.index, 1);
    this.emit("change");
  },

  onAddCustomargInpersonal: function(index) {
    this.mailData.personalizations[index].custom_args.push(
      {"": ""}
    );
    this.emit("change");
  },

  onDelCustomargInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].custom_args.splice(payload.index, 1);
    this.emit("change");
  },

  onAddReplyto: function() {
    this.mailData["reply-to"] = {email: "", name: ""};
    this.emit("change");
  },

  onDelReplyto: function() {
    this.mailData["reply-to"] = null;
    this.emit("change");
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
    // console.log("DemoboxStore#onToggleShowEvent()1: " + payload.buttonId);
    this.showEvent = payload.buttonId;
    this.emit("change");
  },

  onAddEvents: function(payload) {
    // console.log("DemoboxStore#onAddEvents()1: " + payload.events);
    var events = JSON.parse(payload.events);
    // console.log("DemoboxStore#onAddEvents()2: " + events);
    events.map(function(event) {
      this.events.unshift(event);
    }.bind(this));
    // console.log(JSON.stringify(this.events));
    this.emit("change");
  }
});

module.exports = DemoboxStore;
