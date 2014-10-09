$(function(){

  // 初期状態
  $("#event-table").hide();
  $("#nav-send").addClass("active");
  $("#nav-receive").removeClass("active");

  getRow = function(event){
    var timestamp = ("timestamp" in event)? event.timestamp : "";
    var event_type = ("event" in event)? event.event : "";
    var email = ("email" in event)? event.email : "";
    var smtp_id = ("smtp-id" in event)? event["smtp-id"] : "";
    var response = ("response" in event)? event.response : "";
    var sg_event_id = ("sg_event_id" in event)? event.sg_event_id : "";
    var sg_message_id = ("sg_message_id" in event)? event.sg_message_id : "";
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
    row += "<td><small><div style='display:none'>" + escapeHTML(timestamp) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(event_type) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(email) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(smtp_id) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(response) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(sg_event_id) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(sg_message_id) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(useragent) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(ip) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(attempt) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(category) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(url) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(status) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(reason) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(type) + "</div></small></td>";
    row += "<td><small><div style='display:none'>" + escapeHTML(send_at) + "</div></small></td>";
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
    $("#event-table td div").slideDown(500);
    $("#event-json").prepend("<tr><td><small><div style='display:none'>"+value+"</div></small></td></tr>");
    $("#event-json td div").slideDown(500);
  });

  $("#send").click(
    function(){
      $("#send").addClass("btn-default");
      $("#send").removeClass("btn-primary");
      $("#send").text("送信中");
      $("#result").html("sending...");
      var param = $("#param").serializeArray();
      $.post(
        "/send",
        JSON.stringify(param),
        function(data) {
          $("#send").removeClass("btn-default");
          $("#send").addClass("btn-primary");
          $("#send").text("送信");
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

  $("#usesendat").click(
    function(){
      var checked = $("#usesendat:checked").val() == "true";
      $(".sendat" ).attr("disabled", !checked); // idでセレクトできないためclassでセレクトしている
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

  $('.clockpicker').clockpicker();

});
