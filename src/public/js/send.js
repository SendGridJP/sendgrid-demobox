$(function(){

  // 初期状態
  $("#event-table").hide();
  $("#nav-send").addClass("active");
  $("#nav-receive").removeClass("active");

  getRow = function(event){
    var email = ("email" in event)? event.email : "";
    var smtp_id = ("smtp-id" in event)? event["smtp-id"] : "";
    var timestamp = ("timestamp" in event)? event.timesamp : "";
    var response = ("response" in event)? event.response : "";
    var sg_event_id = ("sg_event_id" in event)? event.sg_event_id : "";
    var sg_message_id = ("sg_message_id" in event)? event.sg_message_id : "";
    var event_type = ("event" in event)? event.event : "";
    var useragent = ("useragent" in event)? event.useragent : "";
    var ip = ("ip" in event)? event.ip : "";
    var attempt = ("attempt" in event)? event.attempt : "";
    var category = ("category" in event)? event.category : "";
    var url = ("url" in event)? event.url : "";
    var status = ("status" in event)? event.status : "";
    var reason = ("reason" in event)? event.reason : "";
    var type = ("type" in event)? event.type : "";
    var send_at = ("send_at" in event)? event.send_at : "";
    var row = "<tr>";
    row += "<td>" + escapeHTML(email) + "</td>";
    row += "<td>" + escapeHTML(smtp_id) + "</td>";
    row += "<td>" + escapeHTML(timestamp) + "</td>";
    row += "<td>" + escapeHTML(response) + "</td>";
    row += "<td>" + escapeHTML(sg_event_id) + "</td>";
    row += "<td>" + escapeHTML(sg_message_id) + "</td>";
    row += "<td>" + escapeHTML(event_type) + "</td>";
    row += "<td>" + escapeHTML(useragent) + "</td>";
    row += "<td>" + escapeHTML(ip) + "</td>";
    row += "<td>" + escapeHTML(attempt) + "</td>";
    row += "<td>" + escapeHTML(category) + "</td>";
    row += "<td>" + escapeHTML(url) + "</td>";
    row += "<td>" + escapeHTML(status) + "</td>";
    row += "<td>" + escapeHTML(reason) + "</td>";
    row += "<td>" + escapeHTML(type) + "</td>";
    row += "<td>" + escapeHTML(send_at) + "</td>";
    row += "</tr>";
    return row;
  };

  var escapeHTML = function(val) {
    return $('<div />').text(val).html();
  };

  io = new RocketIO().connect(); // WebSocketとCometの適当な方が使われる
  io.on("event", function(value){
    var event = JSON.parse(value);
    $("#event-table").prepend(getRow(event));
    $("#event-json").prepend("<tr><td>"+value+"</td></tr>");
  });

  $("#send").click(
    function(){
      $("#result").html("sending...");
      var param = $("#param").serializeArray();
      $.post(
        "/send",
        JSON.stringify(param),
        function(data) {
          $("#result").html(data);
        }
      );
    }
  );

  $("#usesub").click(
    function(){
      var checked = $("#usesub:checked").val() == "true";
      $("#subkey").attr("disabled", !checked);
      $("#subval").attr("disabled", !checked);
    }
  );

  $("#usebcc").click(
    function(){
      var checked = $("#usebcc:checked").val() == "true";
      $("#bcc").attr("disabled", !checked);
    }
  );

  $("#usecategory").click(
    function(){
      var checked = $("#usecategory:checked").val() == "true";
      $("#category").attr("disabled", !checked);
    }
  );

  $("#useuniqueargs").click(
    function(){
      var checked = $("#useuniqueargs:checked").val() == "true";
      $("#uniquekey").attr("disabled", !checked);
      $("#uniqueval").attr("disabled", !checked);
    }
  );

  $("#usetemplate").click(
    function(){
      var checked = $("#usetemplate:checked").val() == "true";
      $("#template").attr("disabled", !checked);
    }
  );

  $("#show-table").click(
    function(){
      $("#event-table").show(200);
      $("#event-json").hide();
      $("#show-json").removeClass("active");
    }
  );

  $("#show-json").click(
    function(){
      $("#event-table").hide();
      $("#event-json").show(200);
      $("#show-table").removeClass("active");
    }
  );

});
