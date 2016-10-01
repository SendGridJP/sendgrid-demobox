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
    mailData2.sections = this.array2hash(mailData.sections);
    mailData2.headers = this.array2hash(mailData.headers);

    console.log(JSON.stringify(mailData));
    this.removeEmpty(mailData2);

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
  },

  removeEmpty: function(element) {
    // Array
    if (_.isArray(element)) {
      // Loop with element and recursive call removeEmpty()
      _.each(element, function(e) {
        this.removeEmpty(e);
      }.bind(this));
    }
    // Object
    if (_.isObject(element)) {
      // Loop with object property
      _.each(_.keys(element), function(key) {
        // delete property if the property value is null,[],{}
        if ((element[key] === null) || (_.isObject(element[key]) && _.isEmpty(element[key])) ){
          delete element[key];
        } else {
          this.removeEmpty(element[key]);
        }
      }.bind(this));
    }
  }
};

module.exports = DemoboxClient;
