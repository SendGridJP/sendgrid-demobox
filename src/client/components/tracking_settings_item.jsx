var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrackingSettingsItem = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    data: React.PropTypes.array.isRequired,
    parent: React.PropTypes.string.isRequired,
  },

  getDefaultProps: function() {
    return {
      key: _.uniqueId('tracking_settings_item')
    }
  },

  getStateFromFlux: function() {
    return {
    }
  },

  handleAdd: function(e) {
    e.preventDefault();
    this.getFlux().actions.addTrackingSettingsItem(this.props.parent);
  },

  handleDel: function(e) {
    e.preventDefault();
    this.getFlux().actions.delTrackingSettingsItem(this.props.parent);
  },

  handleUpdEnable: function(e) {
    e.preventDefault();
    this.getFlux().actions.updTrackingSettings(
      this.props.parent, e.target.name, e.target.value == 'true'
    );
  },

  handleUpdTrackingSettings: function(e) {
    e.preventDefault();
    var value = e.target.value;
    if (this.props.name === "enable") {
      value = e.target.value == "true";
    }
    this.getFlux().actions.updTrackingSettings(
      this.props.parent, e.target.name, value
    );
  },

  render: function() {
    var add;
    var form;
    if (this.props.data[this.props.parent] === null) {
      add = (
        <a href="javascript:void(0)" onClick={this.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      );
    } else {
      var items
      switch(this.props.parent) {
        case "click_tracking" :
          items = (
            <select className="form-control" name="enable_text"
              value={this.props.data[this.props.parent].enable_text}
              onChange={this.handleUpdTrackingSettings}>
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          );
          break;
        case "open_tracking":
          items = (
            <div>
              <input type="text"
                name="substitution_tag"
                className="form-control"
                placeholder="substitution_tag"
                defaultValue={this.props.data[this.props.parent].substitution_tag}
                onChange={this.handleUpdTrackingSettings} />
            </div>
          );
          break;
        case "subscription_tracking":
          items = (
            <div>
              <input type="text"
                name="text"
                className="form-control"
                placeholder="text"
                defaultValue={this.props.data[this.props.parent].text}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="html"
                className="form-control"
                placeholder="html"
                defaultValue={this.props.data[this.props.parent].html}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="substitution_tag"
                className="form-control"
                placeholder="substitution_tag"
                defaultValue={this.props.data[this.props.parent].substitution_tag}
                onChange={this.handleUpdTrackingSettings} />
            </div>
          );
          break;
        case "ganalytics":
          items = (
            <div>
              <input type="text"
                name="utm_source"
                className="form-control"
                placeholder="utm_source"
                defaultValue={this.props.data[this.props.parent].utm_source}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="utm_medium"
                className="form-control"
                placeholder="utm_medium"
                defaultValue={this.props.data[this.props.parent].utm_medium}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="utm_term"
                className="form-control"
                placeholder="utm_term"
                defaultValue={this.props.data[this.props.parent].utm_term}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="utm_content"
                className="form-control"
                placeholder="utm_content"
                defaultValue={this.props.data[this.props.parent].utm_content}
                onChange={this.handleUpdTrackingSettings} />
              <input type="text"
                name="utm_campaign"
                className="form-control"
                placeholder="utm_campaign"
                defaultValue={this.props.data[this.props.parent].utm_campaign}
                onChange={this.handleUpdTrackingSettings} />
            </div>
          );
      }
      form = (
        <div className="wrapper" key={this.props.key}>
          <div className="fixed">
            <a href="javascript:void(0)" onClick={this.handleDel}
              className="removeIcon">
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </div>
          <div className="flex">
            <div>
              <select className="form-control" name="enable"
                value={this.props.data[this.props.parent].enable}
                onChange={this.handleUpdEnable}>
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
              {items}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <label className="control-label">{this.props.parent}</label>
        <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
          {form}
        </FlipMove>
        {add}
      </div>
    );
  }
});
module.exports = TrackingSettingsItem;
