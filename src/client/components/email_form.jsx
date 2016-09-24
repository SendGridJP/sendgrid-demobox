var EmailItem = require('./email_item.jsx');

var EmailForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number,
    handleAdd: React.PropTypes.func,
    handleDel: React.PropTypes.func,
    handleUpd: React.PropTypes.func,
    max: React.PropTypes.number
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
    var add;
    var items;
    if (Array.isArray(this.props.data)) {
      items = this.props.data.map(function(data, index) {
        return (
          <EmailItem
            parentIndex={this.props.index}
            index={index}
            data={data}
            handleDel={this.props.handleDel} />
        );
      }.bind(this));
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}
          className="pull-right">
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      )
    } else {
      if (this.props.data != null) {
        items = <EmailItem
          data={this.props.data}
          handleDel={this.props.handleDel}
          handleUpd={this.props.handleUpd} />
      }
      if (this.props.data == null && this.props.max == 1) {
        add = (
          <a href="javascript:void(0)" onClick={this.props.handleAdd}
            className="pull-right">
            <span className="glyphicon glyphicon-plus"></span>
          </a>
        )
      }
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
module.exports = EmailForm;
