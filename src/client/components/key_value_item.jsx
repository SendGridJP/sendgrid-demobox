var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var KeyValueItem = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    parentIndex: React.PropTypes.number.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    valueKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    valueValue: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
    }
  },

  handleDelHeaderInpersonal: function() {
    this.getFlux().actions.delHeaderInpersonal(this.props.parentIndex, this.props.index);
  },

  render: function() {
    return (
      <div className="form-inline">
        <a href="javascript:void(0)" onClick={this.handleDelHeaderInpersonal}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        <input
          type="text"
          name={this.props.paramName + '.key'}
          className="form-control"
          placeholder={this.props.placeholderKey}
          defaultValue={this.props.valueKey} />
        <input
          type="text"
          name={this.props.paramName + '.value'}
          className="form-control"
          placeholder={this.props.placeholderValue}
          defaultValue={this.props.valueValue} />
      </div>
    );
  }
});
module.exports = KeyValueItem;
