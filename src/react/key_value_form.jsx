var KeyValueForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    valueKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    valueValue: React.PropTypes.string.isRequired
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
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.key'}
              className="form-control"
              placeholder={this.props.placeholderKey}
              defaultValue={this.props.valueKey}
              disabled={this._getDisabled()} />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.value'}
              className="form-control"
              placeholder={this.props.placeholderValue}
              defaultValue={this.props.valueValue}
              disabled={this._getDisabled()} />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = KeyValueForm;
