var EmailItem = React.createClass({
  propTypes: {
    parentIndex: React.PropTypes.number,
    index: React.PropTypes.number,
    placeholderEmail: React.PropTypes.string.isRequired,
    valueEmail: React.PropTypes.string.isRequired,
    placeholderName: React.PropTypes.string.isRequired,
    valueName: React.PropTypes.string.isRequired,
    handleDel: React.PropTypes.func
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
      <div className="form-inline">
        {del}
        <input
          type="text"
          name={this.props.paramName + '.email'}
          className="form-control"
          placeholder={this.props.placeholderEmail}
          defaultValue={this.props.valueEmail} />
        <input
          type="text"
          name={this.props.paramName + '.name'}
          className="form-control"
          placeholder={this.props.placeholderName}
          defaultValue={this.props.valueName} />
      </div>
    );
  }
});
module.exports = EmailItem;
