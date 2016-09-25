var KeyValueItem = require('./key_value_item.jsx');

var KeyValueForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    return (
      <div>
        <label className="control-label">{rq}{this.props.title}</label>
        <div>
          {this.props.data.map(function(data, index) {
            return (
              <KeyValueItem
                parentIndex={this.props.index}
                index={index}
                handleDel={this.props.handleDel}
                handleUpd={this.props.handleUpd}
                placeholderKey={this.props.placeholderKey}
                placeholderValue={this.props.placeholderValue}
                data={data} />
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
