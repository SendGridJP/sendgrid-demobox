var constants = require("../constants.js");

var DemoboxStore = Fluxxor.createStore({
  initialize: function() {
    this.mailData = {
      personalizations: [],
      subject: "Mail From Demobox",
      from: null,
      "reply-to": null,
      content: [
        {type: "text/plain", value:"hoge"},
        {type: "text/html", value: "fuga"}
      ],
      attachments: [],
      template_id: null,
      sections: [],
      headers: [],
      categories: [],
      custom_args: [],
      send_at: null,
      asm: null,
      ip_pool_name: null,
      mail_settings: {
        bcc: null,
        bypass_list_management: null,
        footer: null,
        sandbox_mode: null,
        spam_check: null,
      },
      tracking_settings: {
        click_tracking: null,
        open_tracking: null,
        subscription_tracking: null,
        ganalytics: null,
      }
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
      constants.UPD_TO_INPERSONAL, this.onUpdToInpersonal,
      constants.ADD_CC_INPERSONAL, this.onAddCcInpersonal,
      constants.DEL_CC_INPERSONAL, this.onDelCcInpersonal,
      constants.UPD_CC_INPERSONAL, this.onUpdCcInpersonal,
      constants.ADD_BCC_INPERSONAL, this.onAddBccInpersonal,
      constants.DEL_BCC_INPERSONAL, this.onDelBccInpersonal,
      constants.UPD_BCC_INPERSONAL, this.onUpdBccInpersonal,
      constants.ADD_SUBJECT_INPERSONAL, this.onAddSubjectInpersonal,
      constants.DEL_SUBJECT_INPERSONAL, this.onDelSubjectInpersonal,
      constants.UPD_SUBJECT_INPERSONAL, this.onUpdSubjectInpersonal,
      constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal,
      constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal,
      constants.UPD_HEADER_INPERSONAL, this.onUpdHeaderInpersonal,
      constants.ADD_SUBSTITUTION_INPERSONAL, this.onAddSubstitutionInpersonal,
      constants.DEL_SUBSTITUTION_INPERSONAL, this.onDelSubstitutionInpersonal,
      constants.UPD_SUBSTITUTION_INPERSONAL, this.onUpdSubstitutionInpersonal,
      constants.ADD_CUSTOMARG_INPERSONAL, this.onAddCustomargInpersonal,
      constants.DEL_CUSTOMARG_INPERSONAL, this.onDelCustomargInpersonal,
      constants.UPD_CUSTOMARG_INPERSONAL, this.onUpdCustomargInpersonal,
      constants.ADD_SEND_AT_INPERSONAL, this.onAddSendAtInpersonal,
      constants.DEL_SEND_AT_INPERSONAL, this.onDelSendAtInpersonal,
      constants.UPD_SEND_AT_INPERSONAL, this.onUpdSendAtInpersonal,
      constants.ADD_REPLYTO, this.onAddReplyto,
      constants.DEL_REPLYTO, this.onDelReplyto,
      constants.UPD_REPLYTO, this.onUpdReplyto,
      constants.UPD_FROM, this.onUpdFrom,
      constants.ADD_SUBJECT, this.onAddSubject,
      constants.DEL_SUBJECT, this.onDelSubject,
      constants.UPD_SUBJECT, this.onUpdSubject,
      constants.ADD_CONTENT, this.onAddContent,
      constants.DEL_CONTENT, this.onDelContent,
      constants.UPD_CONTENT, this.onUpdContent,
      constants.ADD_ATTACHMENT, this.onAddAttachment,
      constants.DEL_ATTACHMENT, this.onDelAttachment,
      constants.UPD_ATTACHMENT, this.onUpdAttachment,
      constants.ADD_TEMPLATE_ID, this.onAddTemplateId,
      constants.DEL_TEMPLATE_ID, this.onDelTemplateId,
      constants.UPD_TEMPLATE_ID, this.onUpdTemplateId,
      constants.ADD_SECTIONS, this.onAddSections,
      constants.DEL_SECTIONS, this.onDelSections,
      constants.UPD_SECTIONS, this.onUpdSections,
      constants.ADD_HEADERS, this.onAddHeaders,
      constants.DEL_HEADERS, this.onDelHeaders,
      constants.UPD_HEADERS, this.onUpdHeaders,
      constants.ADD_CATEGORIES, this.onAddCategories,
      constants.DEL_CATEGORIES, this.onDelCategories,
      constants.UPD_CATEGORIES, this.onUpdCategories,
      constants.ADD_CUSTOM_ARGS, this.onAddCustomArgs,
      constants.DEL_CUSTOM_ARGS, this.onDelCustomArgs,
      constants.UPD_CUSTOM_ARGS, this.onUpdCustomArgs,
      constants.ADD_SEND_AT, this.onAddSendAt,
      constants.DEL_SEND_AT, this.onDelSendAt,
      constants.UPD_SEND_AT, this.onUpdSendAt,
      constants.ADD_BATCH_ID, this.onAddBatchId,
      constants.DEL_BATCH_ID, this.onDelBatchId,
      constants.UPD_BATCH_ID, this.onUpdBatchId,
      constants.ADD_ASM, this.onAddAsm,
      constants.DEL_ASM, this.onDelAsm,
      constants.UPD_GROUP_ID, this.onUpdGroupId,
      constants.ADD_GROUPS_TO_DISPLAY, this.onAddGroupsToDisplay,
      constants.DEL_GROUPS_TO_DISPLAY, this.onDelGroupsToDisplay,
      constants.UPD_GROUPS_TO_DISPLAY, this.onUpdGroupsToDisplay,
      constants.ADD_IP_POOL_NAME, this.onAddIpPoolName,
      constants.DEL_IP_POOL_NAME, this.onDelIpPoolName,
      constants.UPD_IP_POOL_NAME, this.onUpdIpPoolName,
      constants.UPD_MAIL_SETTINGS, this.onUpdMailSettings,
      constants.ADD_MAIL_SETTINGS_ITEM, this.onAddMailSettingsItem,
      constants.DEL_MAIL_SETTINGS_ITEM, this.onDelMailSettingsItem,
      constants.UPD_TRACKING_SETTINGS, this.onUpdTrackingSettings,
      constants.ADD_TRACKING_SETTINGS_ITEM, this.onAddTrackingSettingsItem,
      constants.DEL_TRACKING_SETTINGS_ITEM, this.onDelTrackingSettingsItem,

      constants.GET_SEND_INIT_SUCCESS, this.onGetSendInitSuccess,
      constants.GET_SEND_INIT_FAIL, this.onGetSendInitFail,

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
    this.mailData.personalizations[index].to.push({email: "", name: ""});
    this.emit("change");
  },

  onDelToInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].to.splice(payload.index, 1);
    this.emit("change");
  },

  onUpdToInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].to[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddCcInpersonal: function(index) {
    this.mailData.personalizations[index].cc.push({email: "", name: ""});
    this.emit("change");
  },

  onDelCcInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].cc.splice(payload.index, 1);
    this.emit("change");
  },

  onUpdCcInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].cc[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddBccInpersonal: function(index) {
    this.mailData.personalizations[index].bcc.push({email: "", name: ""});
    this.emit("change");
  },
  onDelBccInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].bcc.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdBccInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].bcc[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddSubjectInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].subject = "";
    this.emit("change");
  },
  onDelSubjectInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].subject = null;
    this.emit("change");
  },
  onUpdSubjectInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].subject = payload.value;
    this.emit("change");
  },

  onAddHeaderInpersonal: function(index) {
    this.mailData.personalizations[index].headers.push({"": ""});
    this.emit("change");
  },
  onDelHeaderInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].headers.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdHeaderInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].headers[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddSubstitutionInpersonal: function(index) {
    this.mailData.personalizations[index].substitutions.push({"": ""});
    this.emit("change");
  },

  onDelSubstitutionInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].substitutions.splice(payload.index, 1);
    this.emit("change");
  },

  onUpdSubstitutionInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].substitutions[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddCustomargInpersonal: function(index) {
    this.mailData.personalizations[index].custom_args.push({"": ""});
    this.emit("change");
  },

  onDelCustomargInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].custom_args.splice(payload.index, 1);
    this.emit("change");
  },

  onUpdCustomargInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].custom_args[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddSendAtInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].send_at = "";
    this.emit("change");
  },
  onDelSendAtInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].send_at = null;
    this.emit("change");
  },
  onUpdSendAtInpersonal: function(payload) {
    this.mailData.personalizations[payload.parentIndex].send_at = payload.value;
    this.emit("change");
  },

  onUpdFrom: function(payload) {
    console.log("onUpdFrom: " + JSON.stringify(payload));
    this.mailData.from[payload.key] = payload.value;
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

  onUpdReplyto: function(payload) {
    this.mailData["reply-to"][payload.key] = payload.value;
    this.emit("change");
  },

  onAddSubject: function() {
    this.mailData.subject = "";
    this.emit("change");
  },
  onDelSubject: function() {
    this.mailData.subject = null;
    this.emit("change");
  },
  onUpdSubject: function(payload) {
    this.mailData.subject = payload.value;
    this.emit("change");
  },

  onAddContent: function() {
    var type = "";
    var existHtml = this.mailData.content.some(function(content) {
      return content.type == "text/html";
    });
    if (!existHtml) type = "text/html";

    var existPlain = this.mailData.content.some(function(content) {
      return content.type == "text/plain";
    });
    if (!existPlain) type = "text/plain";

    if (type !== "")
      this.mailData.content.push({type: type, value:""});
    this.emit("change");
  },
  onDelContent: function(payload) {
    for (var i = 0; i < this.mailData.content.length; i++) {
      if (this.mailData.content[i].type === payload.type) {
        this.mailData.content.splice(i, 1);
        break;
      }
    }
    this.emit("change");
  },
  onUpdContent: function(payload) {
    for (var i = 0; i < this.mailData.content.length; i++) {
      if (this.mailData.content[i].type === payload.type) {
        this.mailData.content[i].value = payload.value;
        break;
      }
    }
    this.emit("change");
  },

  onAddAttachment: function() {
    this.mailData.attachments.push(
      {
        content: "",
        type: "",
        filename: "",
        disposition: "",
        content_id: ""
      }
    );
    this.emit("change");

  },
  onDelAttachment: function(payload) {
    this.mailData.attachments.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdAttachment: function(payload) {
    this.mailData.attachments[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddTemplateId: function() {
    this.mailData.template_id = "";
    this.emit("change");
  },
  onDelTemplateId: function() {
    this.mailData.template_id = null;
    this.emit("change");
  },
  onUpdTemplateId: function(payload) {
    this.mailData.template_id = payload.value;
    this.emit("change");
  },

  onAddSections: function() {
    this.mailData.sections.push({"": ""});
    this.emit("change");
  },
  onDelSections: function(payload) {
    this.mailData.sections.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdSections: function(payload) {
    this.mailData.sections[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddHeaders: function() {
    this.mailData.headers.push({"": ""});
    this.emit("change");
  },
  onDelHeaders: function(payload) {
    this.mailData.headers.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdHeaders: function(payload) {
    this.mailData.headers[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddCategories: function() {
    this.mailData.categories.push("");
    this.emit("change");
  },
  onDelCategories: function(payload) {
    this.mailData.categories.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdCategories: function(payload) {
    this.mailData.categories[payload.index] = payload.value;
    this.emit("change");
  },

  onAddCustomArgs: function() {
    this.mailData.custom_args.push({"": ""});
    this.emit("change");
  },
  onDelCustomArgs: function(payload) {
    this.mailData.custom_args.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdCustomArgs: function(payload) {
    this.mailData.custom_args[payload.index][payload.key] = payload.value;
    this.emit("change");
  },

  onAddSendAt: function() {
    this.mailData.send_at = "";
    this.emit("change");
  },
  onDelSendAt: function() {
    this.mailData.send_at = null;
    this.emit("change");
  },
  onUpdSendAt: function(payload) {
    this.mailData.send_at = payload.value;
    this.emit("change");
  },

  onAddBatchId: function() {
    this.mailData.batch_id = "";
    this.emit("change");
  },
  onDelBatchId: function() {
    this.mailData.batch_id = null;
    this.emit("change");
  },
  onUpdBatchId: function(payload) {
    this.mailData.batch_id = payload.value;
    this.emit("change");
  },

  onAddAsm: function() {
    this.mailData.asm = {group_id: "", groups_to_display: [""]};
    this.emit("change");
  },
  onDelAsm: function() {
    this.mailData.asm = null;
    this.emit("change");
  },

  onUpdGroupId: function(payload) {
    this.mailData.asm.group_id = payload.value;
    this.emit("change");
  },

  onAddGroupsToDisplay: function() {
    this.mailData.asm.groups_to_display.push("");
    this.emit("change");
  },
  onDelGroupsToDisplay: function(payload) {
    this.mailData.asm.groups_to_display.splice(payload.index, 1);
    this.emit("change");
  },
  onUpdGroupsToDisplay: function(payload) {
    this.mailData.asm.groups_to_display[payload.index] = payload.value;
    this.emit("change");
  },

  onAddIpPoolName: function() {
    this.mailData.ip_pool_name = "";
    this.emit("change");
  },
  onDelIpPoolName: function() {
    this.mailData.ip_pool_name = null;
    this.emit("change");
  },
  onUpdIpPoolName: function(payload) {
    this.mailData.ip_pool_name = payload.value;
    this.emit("change");
  },

  onUpdMailSettings: function(payload) {
    this.mailData.mail_settings[payload.parent][payload.name] = payload.value;
    this.emit("change");
  },
  onAddMailSettingsItem: function(payload) {
    var value = {};
    switch (payload.parent) {
      case "bcc":
        value = {enable: false, email: ""};
        break;
      case "bypass_list_management":
        value = {enable: false};
        break;
      case "footer":
        value = {enable: false, text: "", html: ""};
        break;
      case "sandbox_mode":
        value = {enable: false};
        break;
      case "spam_check":
        value = {enable: false, threshold: 5, post_to_url: ""};
        break;
    }
    this.mailData.mail_settings[payload.parent] = value;
    this.emit("change");
  },
  onDelMailSettingsItem: function(payload) {
    this.mailData.mail_settings[payload.parent] = null;
    this.emit("change");
  },

  onUpdTrackingSettings: function(payload) {
    this.mailData.tracking_settings[payload.parent][payload.name] = payload.value;
    this.emit("change");
  },
  onAddTrackingSettingsItem: function(payload) {
    var value = {};
    switch (payload.parent) {
      case "click_tracking":
        value = {enable: false, enable_text: false};
        break;
      case "open_tracking":
        value = {enable: false, substitution_tag: ""};
        break;
      case "subscription_tracking":
        value = {enable: false, text: "", html: "", substitution_tag: ""};
        break;
      case "ganalytics":
        value = {enable: false};
        break;
    }
    this.mailData.tracking_settings[payload.parent] = value;
    this.emit("change");
  },
  onDelTrackingSettingsItem: function(payload) {
    this.mailData.tracking_settings[payload.parent] = null;
    this.emit("change");
  },

  onGetSendInitSuccess: function(payload) {
    this.mailData.from = {email: payload.result.from, name: ""};
    this.mailData.personalizations.push(
      {
        to: [{email: payload.result.to, name: ""}],
        cc: [],
        bcc: [],
        headers: [],
        substitutions: [],
        custom_args: []
      }
    );
    this.emit("change");
  },

  onGetSendInitFail: function(payload) {

  },

  onSendMail: function(payload) {
    this.status = '送信中...';
    this.request = payload.param;
    this.responseCode = '';
    this.responseBody = '';
    this.emit("change");
  },

  onSendMailSuccess: function(payload) {
    this.status = '送信完了';
    //this.request = payload.result.request;
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
