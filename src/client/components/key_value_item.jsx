var KeyValueItem = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired
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
            className="form-control"
            placeholder="Key"
            defaultValue={this.props.data.key}
            onChange={this.handleUpd} />
          <input
            type="text"
            name="value"
            className="form-control"
            placeholder="Value"
            defaultValue={this.props.data.value}
            onChange={this.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = KeyValueItem;
