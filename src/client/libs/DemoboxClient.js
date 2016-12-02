var DemoboxClient = {
  sendMail: function(mailData, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
         if (xhr.status == 200) {
           success(JSON.parse(xhr.responseText));
         } else {
           failure(xhr, xhr.status, xhr.responseText);
         }
      }
    }.bind(this);
    xhr.open( 'POST', '/send' );
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(mailData);
  },

  makeParam: function(mailData) {
    var mailData2 = $.extend(true, {}, mailData);
    for (var i = 0; i < mailData.personalizations.length; i++) {
      if (mailData.personalizations[i] !== undefined) {
        mailData2.personalizations[i].headers = this.array2hash(mailData.personalizations[i].headers);
        mailData2.personalizations[i].substitutions = this.array2hash(mailData.personalizations[i].substitutions);
        mailData2.personalizations[i].custom_args = this.array2hash(mailData.personalizations[i].custom_args);
      }
    }
    mailData2.sections = this.array2hash(mailData.sections);
    mailData2.headers = this.array2hash(mailData.headers);
    mailData2.custom_args = this.array2hash(mailData.custom_args);

    // remove empty element in array
    var mailData3 = this.deepCompact(mailData2);

    // remove empty value in object
    this.removeEmpty(mailData3);

    var requestParam = JSON.stringify(mailData3);
    return requestParam;
  },

  array2hash: function(array) {
    var hash = {};
    for (var j = 0; j < array.length; j++) {
      if (!_.isEmpty(array[j])) {
        hash[array[j].key] = array[j].value;
      }
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
        if (
          (element[key] === undefined) ||
          (element[key] === null) ||
          (_.isObject(element[key]) && _.isEmpty(element[key])) ||
          (element[key] === "")
        ){
          // delete property if the property value is null,[],{},""
          delete element[key];
        } else if (_.isObject(element[key]) && _.reject(_.values(element[key]), function(value) {return value === null;}).length === 0) {
          // delete property if the values of object are all null
          delete element[key];
        } else {
          this.removeEmpty(element[key]);
        }
      }.bind(this));
    }
  },

  deepCompact: function(mailData) {
    var mailData3 = $.extend(true, {}, mailData);
    mailData3.personalizations = _.compact(mailData.personalizations);
    for (var i = 0; i < mailData3.personalizations.length; i++) {
      if (mailData.personalizations[i] !== undefined) {
        mailData3.personalizations[i].to = _.compact(mailData.personalizations[i].to);
        mailData3.personalizations[i].cc = _.compact(mailData.personalizations[i].cc);
        mailData3.personalizations[i].bcc = _.compact(mailData.personalizations[i].bcc);
      }
    }
    mailData3.content = _.compact(mailData.content);
    mailData3.attachments = _.compact(mailData.attachments);
    mailData3.categories = _.compact(mailData.categories);
    if (mailData.asm !== null) {
      mailData3.asm.groups_to_display = _.compact(mailData.asm.groups_to_display);
    }
    return mailData3;
  },

  getFromServer: function(url, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
         if (xhr.status == 200) {
           success(JSON.parse(xhr.responseText));
         } else {
           failure(xhr, xhr.status, xhr.responseText);
         }
      }
    }.bind(this);
    xhr.open( 'GET', url );
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(null);
  }
};

module.exports = DemoboxClient;
