var constants = require('../constants.js');
var DemoboxClient = require('../libs/DemoboxClient.js');

var actions = {
  updActivePage: function(activePage) {
    this.dispatch(constants.UPD_ACTIVE_PAGE, {activePage: activePage});
  },

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

  addTemplateId: function() {
    this.dispatch(constants.ADD_TEMPLATE_ID);
  },
  delTemplateId: function() {
    this.dispatch(constants.DEL_TEMPLATE_ID);
  },
  updTemplateId: function(value) {
    this.dispatch(constants.UPD_TEMPLATE_ID, {value: value});
  },

  addSections: function() {
    this.dispatch(constants.ADD_SECTIONS);
  },
  delSections: function(index) {
    this.dispatch(constants.DEL_SECTIONS, {index: index});
  },
  updSections: function(index, key, value) {
    this.dispatch(constants.UPD_SECTIONS, {index: index, key: key, value: value});
  },

  addHeaders: function() {
    this.dispatch(constants.ADD_HEADERS);
  },
  delHeaders: function(index) {
    this.dispatch(constants.DEL_HEADERS, {index: index});
  },
  updHeaders: function(index, key, value) {
    this.dispatch(constants.UPD_HEADERS, {index: index, key: key, value: value});
  },

  addCategories: function() {
    this.dispatch(constants.ADD_CATEGORIES);
  },
  delCategories: function(index) {
    this.dispatch(constants.DEL_CATEGORIES, {index: index});
  },
  updCategories: function(index, value) {
    this.dispatch(constants.UPD_CATEGORIES, {index: index, value: value});
  },

  addCustomArgs: function() {
    this.dispatch(constants.ADD_CUSTOM_ARGS);
  },
  delCustomArgs: function(index) {
    this.dispatch(constants.DEL_CUSTOM_ARGS, {index: index});
  },
  updCustomArgs: function(index, key, value) {
    this.dispatch(constants.UPD_CUSTOM_ARGS, {index: index, key: key, value: value});
  },

  addSendAt: function() {
    this.dispatch(constants.ADD_SEND_AT);
  },
  delSendAt: function() {
    this.dispatch(constants.DEL_SEND_AT);
  },
  updSendAt: function(value) {
    this.dispatch(constants.UPD_SEND_AT, {value: value});
  },

  addBatchId: function() {
    this.dispatch(constants.ADD_BATCH_ID);
  },
  delBatchId: function() {
    this.dispatch(constants.DEL_BATCH_ID);
  },
  updBatchId: function(value) {
    this.dispatch(constants.UPD_BATCH_ID, {value: value});
  },

  addAsm: function() {
    this.dispatch(constants.ADD_ASM);
  },
  delAsm: function() {
    this.dispatch(constants.DEL_ASM);
  },

  updGroupId: function(value) {
    this.dispatch(constants.UPD_GROUP_ID, {value: value});
  },

  addGroupsToDisplay: function() {
    this.dispatch(constants.ADD_GROUPS_TO_DISPLAY);
  },
  delGroupsToDisplay: function(index) {
    this.dispatch(constants.DEL_GROUPS_TO_DISPLAY, {index: index});
  },
  updGroupsToDisplay: function(index, value) {
    this.dispatch(constants.UPD_GROUPS_TO_DISPLAY, {index: index, value: value});
  },

  addIpPoolName: function() {
    this.dispatch(constants.ADD_IP_POOL_NAME);
  },
  delIpPoolName: function() {
    this.dispatch(constants.DEL_IP_POOL_NAME);
  },
  updIpPoolName: function(value) {
    this.dispatch(constants.UPD_IP_POOL_NAME, {value: value});
  },

  addMailSettingsItem: function(parent) {
    this.dispatch(constants.ADD_MAIL_SETTINGS_ITEM, {parent: parent});
  },
  delMailSettingsItem: function(parent) {
    this.dispatch(constants.DEL_MAIL_SETTINGS_ITEM, {parent: parent});
  },
  updMailSettings: function(parent, name, value) {
    this.dispatch(constants.UPD_MAIL_SETTINGS, {parent: parent, name: name, value: value});
  },

  addTrackingSettingsItem: function(parent) {
    this.dispatch(constants.ADD_TRACKING_SETTINGS_ITEM, {parent: parent});
  },
  delTrackingSettingsItem: function(parent) {
    this.dispatch(constants.DEL_TRACKING_SETTINGS_ITEM, {parent: parent});
  },
  updTrackingSettings: function(parent, name, value) {
    this.dispatch(constants.UPD_TRACKING_SETTINGS, {parent: parent, name: name, value: value});
  },

  getSendInit: function() {
    DemoboxClient.getFromServer(
      '/send_init',
      function(result) {
        this.dispatch(constants.GET_SEND_INIT_SUCCESS, {result: result});
      }.bind(this),
      function(xhr, status, err) {
        this.dispatch(
          constants.GET_SEND_INIT_FAIL,
          {
            responseCode: xhr.status,
            responseBody: err.message
          }
        );
      }.bind(this)
    );
  },

  getReceiveInit: function() {
    DemoboxClient.getFromServer(
      '/receive_init',
      function(result) {
        this.dispatch(constants.GET_RECEIVE_INIT_SUCCESS, {result: result});
      }.bind(this),
      function(xhr, status, err) {
        this.dispatch(
          constants.GET_RECEIVE_INIT_FAIL,
          {
            responseCode: xhr.status,
            responseBody: err.message
          }
        );
      }.bind(this)
    );
  },

  sendMail: function(mailData) {
    var param = DemoboxClient.makeParam(mailData);
    this.dispatch(constants.SEND_MAIL, {param: param});
    DemoboxClient.sendMail(
      param,
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
  },

  addReceiveMail: function(receiveMail) {
    this.dispatch(constants.ADD_RECEIVE_MAIL, {receiveMail: receiveMail});
  }
};

module.exports = actions;
