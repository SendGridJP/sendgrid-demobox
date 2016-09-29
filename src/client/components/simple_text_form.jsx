var SimpleTextForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
    max: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      disabled: true
    };
  },

  handleDel: function(e) {
    e.preventDefault();
    this.props.handleDel();
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

    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    var add;
    var items;
    if (this.props.value != null) {
      items = (
        <div className="wrapper">
          <div className="fixed">
            {del}
          </div>
          <div className="flex">
            <input
              type="text"
              name={this.props.paramName}
              className="form-control"
              placeholder={this.props.placeholder}
              defaultValue={this.props.value}
              onChange={this.handleUpd} />
          </div>
        </div>
      );
    }
    if (this.props.value == null && this.props.max == 1) {
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}
          className="pull-right">
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      )
    }
    return (
      <div>
        <label className="control-label">{rq}{this.props.title}</label>
        <div>
          {items}
        </div>
        {add}
      </div>
    );
  }
});
module.exports = SimpleTextForm;
