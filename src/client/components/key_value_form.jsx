var KeyValueItem = require('./key_value_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var KeyValueForm = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    datas: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    valueKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    valueValue: React.PropTypes.string.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      datas: this.props.datas
    }
  },

  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    return (
      <div className="container-fluid">
        <label className="control-label">{rq}{this.props.title}</label>
        <div className="form-inline">
          {this.props.datas.map(function(data, index) {
            return (
              <KeyValueItem
                parentIndex={this.props.index}
                index={index}
                handleDel={this.props.handleDel} />
            );
          }.bind(this))}
        </div>
        <a href="javascript:void(0)" onClick={this.props.handleAdd}
          className="pull-right">
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      </div>
    );
  }
});
module.exports = KeyValueForm;
