var SimpleTextItem = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      name: "value",
      placeholder: "Value",
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
    this.props.handleUpd(this.props.index, e.target.value);
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
    var className="wrapper " + ((this.props.index % 2 == 0) ? "even" : "odd");
    return (
      <div className={className}>
        <div className="fixed">
          {del}
        </div>
        <div className="flex">
          <input
            type="text"
            name={this.props.name}
            className="form-control"
            placeholder={this.props.placeholder}
            defaultValue={this.props.value}
            onChange={this.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = SimpleTextItem;
