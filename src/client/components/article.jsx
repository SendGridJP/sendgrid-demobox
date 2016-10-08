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
    };
  },

  propTypes: {
  },

  render: function() {
    var page = "";
    if (this.state.activePage === 'send') {
      page = (<SendPage />);
    } else if (this.state.activePage === 'receive') {
      page = (<ReceivePage />);
    }
    return page;
  }
});
module.exports = Article;
