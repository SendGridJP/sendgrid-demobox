var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var LeftMenuItem = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      activePage: store.activePage
    }
  },

  propTypes: {
    pageId: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  },

  getActive: function(pageId, activePage) {
    if (pageId === activePage) return 'active';
    else return '';
  },

  render: function() {
    return(
      <li
        id={this.props.pageId}
        className={this.getActive(this.props.pageId, this.state.activePage)}>
        <a
          className="subtree-name"
          href={this.props.href}>
          {this.props.text}
        </a>
      </li>
    );
  }
});
module.exports = LeftMenuItem;
