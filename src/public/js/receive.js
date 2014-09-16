$(function(){

  $("#nav-send").removeClass("active");
  $("#nav-receive").addClass("active");

  str2array = function(str) {
      var array = [],i,il=str.length;
      for(i=0;i<il;i++) array.push(str.charCodeAt(i));
      return array;
  };

  decode = function(text, encode){
    if (encode == "ISO-2022-JP") {
      alert("iso");
      var arr = Encoding.convert(text, 'JIS');
      return Encoding.codeToString(arr);
    }
    return text;
  };

  getRow = function(receive){
    var charsets = ("charsets" in receive)? receive.charsets : "";
    var cs = JSON.parse(receive.charsets);

    var to = ("to" in receive)? decode(receive.to, cs.to) : "";
    var from = ("from" in receive)? decode(receive.from, cs.from) : "";
    var subject = ("subject" in receive)? decode(receive.subject, cs.subject) : "";
    var text = ("text" in receive)? decode(str2array(receive.text), cs.text) : "";
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
