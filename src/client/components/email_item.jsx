var EmailItem = React.createClass({
  propTypes: {
    parentIndex: React.PropTypes.number,
    index: React.PropTypes.number,
    data: React.PropTypes.array.isRequired,
    handleDel: React.PropTypes.func,
    handleUpd: React.PropTypes.func
  },
  getInitialState: function() {
    return {
    };
  },

  handleDel: function() {
    this.props.handleDel(this.props.parentIndex, this.props.index);
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
            name="email"
            className="form-control"
            placeholder="email"
            defaultValue={this.props.data.email}
            onChange={this.props.handleUpd} />
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="name"
            defaultValue={this.props.data.name}
            onChange={this.props.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = EmailItem;
