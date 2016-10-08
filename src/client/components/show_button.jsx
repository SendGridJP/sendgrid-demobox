var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ShowButton = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      showEvent: store.showEvent
    }
  },

  propTypes: {
    buttonId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired
  },

  handleClick: function(e) {
    e.preventDefault();
    this.getFlux().actions.toggleShowEvent(this.props.buttonId);
  },

  getActive: function(buttonId, active) {
    if (buttonId === active) return 'btn btn-default active';
    else return 'btn btn-default';
  },

  render: function() {
    return(
      <button
        className={this.getActive(this.props.buttonId, this.state.showEvent)}
        id={this.props.buttonId}
        onClick={this.handleClick}>{this.props.text}</button>
    );
  }
});
module.exports = ShowButton;
