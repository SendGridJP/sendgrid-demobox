$(function(){

  $("#nav-send").removeClass("active");
  $("#nav-receive").addClass("active");

  str2array = function(str) {
      var array = [],i,il=str.length;
      for(i=0;i<il;i++) array.push(str.charCodeAt(i));
      return array;
  };

  decode = function(text, encode){
    if (encode.toLowerCase() == "ISO-2022-JP".toLowerCase()) {  // あえて==で比較してみる
      orgArray = str2array(text);
      var convArray = Encoding.convert(orgArray, 'UNICODE', "JIS");
      return Encoding.codeToString(convArray);
    }
    return text;
  };

  getRow = function(receive){
    var charsets = ("charsets" in receive)? receive.charsets : "";
    var cs = JSON.parse(receive.charsets);

    var to = ("to" in receive)? decode(receive.to, cs.to) : "";
    var from = ("from" in receive)? decode(receive.from, cs.from) : "";
    var subject = ("subject" in receive)? decode(receive.subject, cs.subject) : "";
    var text = ("text" in receive)? decode(receive.text, cs.text) : "";
    var html = ("html" in receive)? decode(receive.html, cs.html) : "";
    var attachments = ("attachments" in receive)? receive.attachments : "";
    var envelope = ("envelope" in receive)? receive.envelope : "";
    var sender_ip = ("sender_ip" in receive)? receive.sender_ip : "";
    var dkim = ("dkim" in receive)? receive.dkim : "";
    var SPF = ("SPF" in receive)? receive.SPF : "";
    var headers = ("headers" in receive)? receive.headers : "";
    var row = "<tr>";
    row += "<td>" + escapeHTML(to) + "</td>";
    row += "<td>" + escapeHTML(from) + "</td>";
    row += "<td>" + escapeHTML(subject) + "</td>";
    row += "<td>" + escapeHTML(text) + "</td>";
    row += "<td>" + escapeHTML(html) + "</td>";
    row += "<td>" + escapeHTML(charsets) + "</td>";
    row += "<td>" + escapeHTML(attachments) + "</td>";
    row += "<td>" + escapeHTML(envelope) + "</td>";
    row += "<td>" + escapeHTML(sender_ip) + "</td>";
    row += "<td>" + escapeHTML(dkim) + "</td>";
    row += "<td>" + escapeHTML(SPF) + "</td>";
    row += "<td>" + escapeHTML(headers) + "</td>";
    row += "</tr>";
    return row;
  };

  io = new RocketIO().connect();
  io.on("receive", function(value){
    var receive = JSON.parse(value);
    $("#receive-table").prepend(getRow(receive));
  });

});
