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
    row += "<td><div style='display:none'>" + escapeHTML(to) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(from) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(subject) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(text) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(html) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(charsets) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(attachments) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(envelope) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(sender_ip) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(dkim) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(SPF) + "</div></td>";
    row += "<td><div style='display:none'>" + escapeHTML(headers) + "</div></td>";
    row += "</tr>";
    return row;
  };

  io = new RocketIO().connect();
  io.on("receive", function(value){
    var receive = JSON.parse(value);
    $("#receive-table").prepend(getRow(receive));
    $("#receive-table td div").slideDown(500);
  });

});
