var KeyValueItem = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    valueKey: React.PropTypes.string.isRequired,
    valueValue: React.PropTypes.string.isRequired,
    nameKey: React.PropTypes.string,
    nameValue: React.PropTypes.string,
    placeholderKey: React.PropTypes.string,
    placeholderValue: React.PropTypes.string,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      nameKey: "key",
      nameValue: "value",
      placeholderKey: "Key",
      placeholderValue: "Value",
    };
  },

  getInitialState: function() {
    return {
    };
  },

  handleDel: function(e) {
    e.preventDefault();
    this.props.handleDel(this.props.index);
  },

  handleUpd: function(e) {
    e.preventDefault();
    this.props.handleUpd(this.props.index, e.target.name, e.target.value);
  },

  render: function() {
    var del;
    if (typeof(this.props.handleDel) == "function") {
      del = (
        <a href="javascript:void(0)" onClick={this.handleDel}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      );
    }
    return (
      <div className="wrapper">
        <div className="fixed">
          {del}
        </div>
        <div className="flex">
          <input
            type="text"
            name={this.props.nameKey}
            className="form-control"
            placeholder={this.props.placeholderKey}
            defaultValue={this.props.valueKey}
            onChange={this.handleUpd} />
          <input
            type="text"
            name={this.props.nameValue}
            className="form-control"
            placeholder={this.props.placeholderValue}
            defaultValue={this.props.valueValue}
            onChange={this.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = KeyValueItem;
