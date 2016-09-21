var SimpleTextForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      disabled: true
    };
  },
  _onChangeUse: function(e) {
    this.setState({disabled: !e.target.checked});
  },
  _getDisabled: function() {
    if (this.props.required) {
      return false;
    } else {
      return this.state.disabled;
    }
  },
  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    } else {
      rq = <input type="checkbox" onChange={this._onChangeUse} />;
    }
    return (
      <div className="col-md-12">
        <label className="control-label">{rq}{this.props.title}</label>
        <input
          type="text"
          name={this.props.paramName}
          className="form-control"
          placeholder={this.props.placeholder}
          defaultValue={this.props.value}
          disabled={this._getDisabled()} />
      </div>
    );
  }
});
module.exports = SimpleTextForm;