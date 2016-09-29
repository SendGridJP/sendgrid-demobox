var DemoboxClient = {
  sendMail: function(mailData, success, failure) {
    $.ajax({
      url: '/send',
      dataType: 'json',
      type: 'POST',
      data: this.makeParam(mailData),
      success: success,
      error: failure,
    });
  },

  makeParam: function(mailData) {
    var mailData2 = $.extend(true, {}, mailData);
    for (var i = 0; i < mailData.personalizations.length; i++) {
      mailData2.personalizations[i].headers = this.array2hash(mailData.personalizations[i].headers);
      mailData2.personalizations[i].substitutions = this.array2hash(mailData.personalizations[i].substitutions);
      mailData2.personalizations[i].custom_args = this.array2hash(mailData.personalizations[i].custom_args);
      if (mailData2.personalizations[i].cc.length === 0) {
        delete mailData2.personalizations[i].cc;
      }
      if (mailData2.personalizations[i].bcc.length === 0) {
        delete mailData2.personalizations[i].bcc;
      }
      if (mailData2.personalizations[i].subject === null) {
        delete mailData2.personalizations[i].subject;
      }
      if (mailData2.personalizations[i].headers === null) {
        delete mailData2.personalizations[i].headers;
      }
      if (mailData2.personalizations[i].substitutions === null) {
        delete mailData2.personalizations[i].substitutions;
      }
      if (mailData2.personalizations[i].custom_args === null) {
        delete mailData2.personalizations[i].custom_args;
      }
      if (mailData2.personalizations[i].send_at === null) {
        delete mailData2.personalizations[i].send_at;
      }
    }
    if (mailData2.subject === null) {
      delete mailData2.subject;
    }
    if (mailData2["reply-to"] === null) {
      delete mailData2["reply-to"];
    }

    var requestParam = JSON.stringify(mailData2);
    console.log(requestParam);
    return requestParam;
  },

  array2hash: function(array) {
    var hash = null;
    for (var j = 0; j < array.length; j++) {
      hash[array[j].key] = array[j].value;
    }
    return hash;
  }
};

module.exports = DemoboxClient;
