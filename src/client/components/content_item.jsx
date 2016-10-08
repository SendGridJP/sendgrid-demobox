var ContentItem = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
  },

  handleDel: function() {
    this.props.handleDel(this.props.data.type);
  },

  handleUpd: function(e) {
    e.preventDefault();
    this.props.handleUpd(this.props.data.type, e.target.value);
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
          <label>{this.props.data.type}</label>
          <textarea
            name={this.props.data.type}
            className="form-control"
            defaultValue={this.props.data.value}
            onChange={this.handleUpd} >
          </textarea>
        </div>
      </div>
    );
  }
});
module.exports = ContentItem;
