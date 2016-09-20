var EmailForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholderEmail: React.PropTypes.string.isRequired,
    valueEmail: React.PropTypes.string.isRequired,
    placeholderName: React.PropTypes.string.isRequired,
    valueName: React.PropTypes.string.isRequired
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
      <div className="container-fluid">
        <label className="control-label">{rq}{this.props.title}</label>
        <div className="form-inline">
          <input
            type="text"
            name={this.props.paramName + '.email'}
            className="form-control"
            placeholder={this.props.placeholderEmail}
            defaultValue={this.props.valueEmail}
            disabled={this._getDisabled()} />
          <input
            type="text"
            name={this.props.paramName + '.name'}
            className="form-control"
            placeholder={this.props.placeholderName}
            defaultValue={this.props.valueName}
            disabled={this._getDisabled()} />
        </div>
      </div>
    );
  }
});
module.exports = EmailForm;
