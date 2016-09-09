var DemoboxStore = require("./stores/DemoboxStore.js");
var DemoboxActions = require("./actions/DemoboxActions.js");

var stores = {
  DemoboxStore: new DemoboxStore()
};
var actions = DemoboxActions;
var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var io = new RocketIO().connect(); // WebSocketとCometの適当な方が使われる
io.on("event", function(value){
  console.log("RocketIOReceiver event: " + value);
  flux.actions.addEvents(value);
  // var event = JSON.parse(value);
  // $("#event-table").prepend(getRow(event));
  // $("#event-table td div").slideDown(500);
  // $("#event-json").prepend("<tr><td><small><div style='display:none'>"+value+"</div></small></td></tr>");
  // $("#event-json td div").slideDown(500);
});

module.exports = flux;
