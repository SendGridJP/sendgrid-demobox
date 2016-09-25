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
    }
    var requestParam = JSON.stringify(mailData2);
    console.log(requestParam);
    return requestParam;
  },

  array2hash: function(array) {
    var hash = {};
    for (var j = 0; j < array.length; j++) {
      hash[array[j].key] = array[j].value;
    }
    return hash;
  }
};

module.exports = DemoboxClient;
