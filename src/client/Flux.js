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
  flux.actions.addEvents(value);
});

io.on("receive", function(value) {
  flux.actions.addReceiveMail(value);
});

module.exports = flux;
