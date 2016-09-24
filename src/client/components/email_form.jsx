var EmailItem = require('./email_item.jsx');

var EmailForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    datas: React.PropTypes.array.isRequired,
    index: React.PropTypes.number,
    placeholderEmail: React.PropTypes.string.isRequired,
    valueEmail: React.PropTypes.string.isRequired,
    placeholderName: React.PropTypes.string.isRequired,
    valueName: React.PropTypes.string.isRequired,
    handleAdd: React.PropTypes.func,
    handleDel: React.PropTypes.func,
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
    if (Array.isArray(this.props.datas)) {
      items = this.props.datas.map(function(data, index) {
        return (
          <EmailItem
            parentIndex={this.props.index}
            index={index}
            handleDel={this.props.handleDel}
            placeholderEmail={this.props.placeholderEmail}
            placeholderName={this.props.placeholderName} />
        );
      }.bind(this));
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}
          className="pull-right">
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      )
    } else {
      if (this.props.datas != null) {
        items = <EmailItem
          handleDel={this.props.handleDel}
          placeholderEmail={this.props.placeholderEmail}
          placeholderName={this.props.placeholderName}
           />
      }
      if (this.props.datas == null && this.props.max == 1) {
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
