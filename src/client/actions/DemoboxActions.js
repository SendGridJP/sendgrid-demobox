var constants = require('../constants.js');
var DemoboxClient = require('../libs/DemoboxClient.js');

var actions = {
  addPersonalization: function() {
    this.dispatch(
      constants.ADD_PERSONALIZATION, {to: [{email: "", name: ""}]}
    );
  },
  delPersonalization: function(index) {
    this.dispatch(constants.DEL_PERSONALIZATION, index);
  },

  addToInpersonal: function(index) {
    this.dispatch(constants.ADD_TO_INPERSONAL, index);
  },
  delToInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_TO_INPERSONAL, {parentIndex: parentIndex, index: index}
    );
  },
  updToInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_TO_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addCcInpersonal: function(index) {
    this.dispatch(constants.ADD_CC_INPERSONAL, index);
  },
  delCcInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_CC_INPERSONAL, {parentIndex: parentIndex, index: index}
    );
  },
  updCcInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_CC_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addBccInpersonal: function(index) {
    this.dispatch(constants.ADD_BCC_INPERSONAL, index);
  },
  delBccInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_BCC_INPERSONAL, {parentIndex: parentIndex, index: index}
    );
  },
  updBccInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_BCC_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addSubjectInpersonal: function(parentIndex) {
    this.dispatch(
      constants.ADD_SUBJECT_INPERSONAL, {parentIndex: parentIndex}
    );
  },
  delSubjectInpersonal: function(parentIndex) {
    this.dispatch(
      constants.DEL_SUBJECT_INPERSONAL, {parentIndex: parentIndex}
    );
  },
  updSubjectInpersonal: function(parentIndex, value) {
    this.dispatch(
      constants.UPD_SUBJECT_INPERSONAL,
      {parentIndex: parentIndex, value: value}
    );
  },

  addSubstitutionInpersonal: function(index) {
    this.dispatch(constants.ADD_SUBSTITUTION_INPERSONAL, index);
  },
  delSubstitutionInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_SUBSTITUTION_INPERSONAL,
      {parentIndex: parentIndex, index: index}
    );
  },
  updSubstitutionInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_SUBSTITUTION_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addHeaderInpersonal: function(index) {
    this.dispatch(constants.ADD_HEADER_INPERSONAL, index);
  },
  delHeaderInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_HEADER_INPERSONAL, {parentIndex: parentIndex, index: index}
    );
  },
  updHeaderInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_HEADER_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addCustomargInpersonal: function(index) {
    this.dispatch(constants.ADD_CUSTOMARG_INPERSONAL, index);
  },
  delCustomargInpersonal: function(parentIndex, index) {
    this.dispatch(
      constants.DEL_CUSTOMARG_INPERSONAL,
      {parentIndex: parentIndex, index: index}
    );
  },
  updCustomargInpersonal: function(parentIndex, index, key, value) {
    this.dispatch(
      constants.UPD_CUSTOMARG_INPERSONAL,
      {parentIndex: parentIndex, index: index, key: key, value: value}
    );
  },

  addSendAtInpersonal: function(parentIndex) {
    this.dispatch(
      constants.ADD_SEND_AT_INPERSONAL, {parentIndex: parentIndex}
    );
  },
  delSendAtInpersonal: function(parentIndex) {
    this.dispatch(
      constants.DEL_SEND_AT_INPERSONAL, {parentIndex: parentIndex}
    );
  },
  updSendAtInpersonal: function(parentIndex, value) {
    this.dispatch(
      constants.UPD_SEND_AT_INPERSONAL, {parentIndex: parentIndex, value: value}
    );
  },

  updFrom: function(key, value) {
    this.dispatch(constants.UPD_FROM, {key: key, value: value});
  },

  addReplyto: function() {
    this.dispatch(constants.ADD_REPLYTO);
  },
  delReplyto: function() {
    this.dispatch(constants.DEL_REPLYTO);
  },
  updReplyto: function(key, value) {
    this.dispatch(constants.UPD_REPLYTO, {key: key, value: value});
  },

  addSubject: function() {
    this.dispatch(constants.ADD_SUBJECT);
  },
  delSubject: function() {
    this.dispatch(constants.DEL_SUBJECT);
  },
  updSubject: function(value) {
    this.dispatch(constants.UPD_SUBJECT, {value: value});
  },

  addContent: function() {
    this.dispatch(constants.ADD_CONTENT);
  },
  delContent: function(type) {
    this.dispatch(constants.DEL_CONTENT, {type: type});
  },
  updContent: function(type, value) {
    this.dispatch(constants.UPD_CONTENT, {type: type, value: value});
  },

  addAttachment: function() {
    this.dispatch(constants.ADD_ATTACHMENT);
  },
  delAttachment: function(index) {
    this.dispatch(constants.DEL_ATTACHMENT, {index: index});
  },
  updAttachment: function(index, key, value) {
    this.dispatch(constants.UPD_ATTACHMENT, {index: index, key: key, value: value});
  },

  // sendMail: function(param) {
  //   var requestParam = JSON.stringify(param);
  //   this.dispatch(constants.SEND_MAIL);
  //   DemoboxClient.sendMail(
  //     requestParam,
  //     function(result) {
  //       this.dispatch(constants.SEND_MAIL_SUCCESS, {result: result});
  //     }.bind(this),
  //     function(xhr, status, err) {
  //       this.dispatch(
  //         constants.SEND_MAIL_FAIL,
  //         {
  //           responseCode: xhr.status,
  //           responseBody: err.message
  //         }
  //       );
  //     }.bind(this)
  //   );
  // },
  sendMail: function(mailData) {
    this.dispatch(constants.SEND_MAIL);
    DemoboxClient.sendMail(
      mailData,
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
    this.dispatch(constants.TOGGLE_SHOW_EVENT, {buttonId: buttonId});
  },

  addEvents: function(events) {
    this.dispatch(constants.ADD_EVENTS, {events: events});
  }
};

module.exports = actions;
