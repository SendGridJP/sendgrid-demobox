var Header = require('./components/header.jsx');
var Article = require('./components/article.jsx');
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

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Root = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  _onSelectPage: function(pageId) {
    this.setState({activePage: pageId});
  },

  getInitialState: function() {
    return {activePage: 'send'};
  },

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      sending: store.sending,
      error: store.error,
      result: store.result
    }
  },

  render: function() {
    return (
      <div className="Root">
        <Header
          activePage={this.state.activePage}
          onSelectPage={this._onSelectPage} />
        <Article activePage={this.state.activePage} />
      </div>
    );
  }
});

var io = new RocketIO().connect(); // WebSocketとCometの適当な方が使われる
io.on("event", function(value){
  // var event = JSON.parse(value);
  // $("#event-table").prepend(getRow(event));
  // $("#event-table td div").slideDown(500);
  // $("#event-json").prepend("<tr><td><small><div style='display:none'>"+value+"</div></small></td></tr>");
  // $("#event-json td div").slideDown(500);
});

ReactDOM.render(
  <Root flux={flux} />,
  document.getElementById('root')
);
