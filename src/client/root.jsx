var Header = require('./components/header.jsx');
var Article = require('./components/article.jsx');
var flux = require("./Flux.js");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Root = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

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

  componentDidMount: function() {
    this.handleRouting(window.location.href);
    this.getFlux().actions.getSendInit();
  },

  handleRouting: function(href) {
    var uri = new URI(href);
    var activePage = "send";
    var p = uri.search(true).p;
    if (p != null) {
      activePage = p;
    }
    this.getFlux().actions.updActivePage(activePage);
  },

  render: function() {
    return (
      <div className="Root">
        <Header />
        <Article activePage={this.state.activePage} />
      </div>
    );
  }
});

ReactDOM.render(
  <Root flux={flux} />,
  document.getElementById('root')
);
