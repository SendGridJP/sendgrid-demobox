var SendPage = require('./send_page.jsx');
var ReceivePage = require('./receive_page.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Article = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      activePage: store.activePage
    }
  },

  propTypes: {
  },

  render: function() {
    if (this.state.activePage === 'send') {
      return (
        <SendPage />
      );
    } else if (this.state.activePage === 'receive') {
      return (
        <ReceivePage />
      );
    }
  }
});
module.exports = Article;
