var KeyValueItem = React.createClass({
  propTypes: {
    parentIndex: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
    };
  },

  handleDel: function() {
    this.props.handleDel(this.props.parentIndex, this.props.index);
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="fixed">
          <a href="javascript:void(0)" onClick={this.handleDel}
            className="removeIcon">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </div>
        <div className="flex">
          <input
            type="text"
            name="key"
            id={this.props.index}
            className="form-control"
            placeholder={this.props.placeholderKey}
            defaultValue={this.props.data.key}
            onChange={this.props.handleUpd} />
          <input
            type="text"
            name="value"
            id={this.props.index}
            className="form-control"
            placeholder={this.props.placeholderValue}
            defaultValue={this.props.data.value}
            onChange={this.props.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = KeyValueItem;
