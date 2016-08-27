var DemoboxClient = {
  sendMail: function(requestParam, success, failure) {
    console.log('DemoClient.sendMail()');
    $.ajax({
      url: '/sendhoge',
      dataType: 'json',
      type: 'POST',
      data: requestParam,
      success: success,
      error: failure,
    });
  }
};

module.exports = DemoboxClient;
