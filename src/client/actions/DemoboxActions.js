var constants = require('../constants.js');
var DemoboxClient = require('../libs/DemoboxClient.js');

var actions = {
  addPersonalization: function() {
    this.dispatch(
      constants.ADD_PERSONALIZATION,
      {to: [{email: "", name: ""}]}
    );
  },

  delPersonalization: function(index) {
    this.dispatch(constants.DEL_PERSONALIZATION, index);
  },

  addHeaderInpersonal: function(index) {
    this.dispatch(constants.ADD_HEADER_INPERSONAL, index);
  },

  delHeaderInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_HEADER_INPERSONAL,
      {parentIndex: parentIndex, index: index}
    );
  },

  sendMail: function(param) {
    var requestParam = JSON.stringify(param);
    this.dispatch(constants.SEND_MAIL);
    DemoboxClient.sendMail(
      requestParam,
      function(result) {
        this.dispatch(constants.SEND_MAIL_SUCCESS, {result: result});
      }.bind(this),
      function(xhr, status, err) {
        this.dispatch(
          constants.SEND_MAIL_FAIL,
          {
            responseCode: xhr.status,
            responseBody: err.message
          }
        );
      }.bind(this)
    );
  },

  toggleShowEvent: function(buttonId) {
    // console.log("DemoboxAction#toggleShowEvent() " + buttonId);
    this.dispatch(constants.TOGGLE_SHOW_EVENT, {buttonId: buttonId});
  },

  addEvents: function(events) {
    // console.log("DemoboxAction#addEvents() " + events);
    this.dispatch(constants.ADD_EVENTS, {events: events});
  }
};

module.exports = actions;
