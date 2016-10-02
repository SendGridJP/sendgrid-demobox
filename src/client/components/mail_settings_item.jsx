var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MailSettingsItem = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    data: React.PropTypes.array.isRequired,
    parent: React.PropTypes.string.isRequired,
  },

  getStateFromFlux: function() {
    return {
    }
  },

  handleAdd: function(e) {
    e.preventDefault();
    this.getFlux().actions.addMailSettingsItem(this.props.parent);
  },

  handleDel: function(e) {
    e.preventDefault();
    this.getFlux().actions.delMailSettingsItem(this.props.parent);
  },

  handleUpdEnable: function(e) {
    e.preventDefault();
    this.getFlux().actions.updMailSettings(
      this.props.parent, e.target.name, e.target.value == 'true'
    );
  },

  handleUpdMailSettings: function(e) {
    e.preventDefault();
    var value = e.target.value;
    if (this.props.name === "enable") {
      value = e.target.value == "true";
    }
    if (this.props.parent === "spam_check" && e.target.name === "threshold") {
      value = Number(e.target.value);
    }
    this.getFlux().actions.updMailSettings(
      this.props.parent, e.target.name, value
    );
  },

  render: function() {
    var add;
    var del;
    if (this.props.data[this.props.parent] === null) {
      add = (
        <a href="javascript:void(0)" onClick={this.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      );
    } else {
      var items
      switch(this.props.parent) {
        case "bcc" :
          items = (
            <input type="text"
              name="email"
              className="form-control"
              placeholder="email"
              defaultValue={this.props.data[this.props.parent].email}
              onChange={this.handleUpdMailSettings} />
          );
          break;
        case "footer":
          items = (
            <div>
              <input type="text"
                name="text"
                className="form-control"
                placeholder="text"
                defaultValue={this.props.data[this.props.parent].text}
                onChange={this.handleUpdMailSettings} />
              <input type="text"
                name="html"
                className="form-control"
                placeholder="html"
                defaultValue={this.props.data[this.props.parent].html}
                onChange={this.handleUpdMailSettings} />
            </div>
          );
          break;
        case "spam_check":
          items = (
            <div>
              <input type="text"
                name="threshold"
                className="form-control"
                placeholder="threshold"
                defaultValue={this.props.data[this.props.parent].threshold}
                onChange={this.handleUpdMailSettings} />
              <input type="text"
                name="post_to_url"
                className="form-control"
                placeholder="post_to_url"
                defaultValue={this.props.data[this.props.parent].post_to_url}
                onChange={this.handleUpdMailSettings} />
            </div>
          );
          break;
      }
      var form = (
        <div className="flex">
          <select className="form-control" name="enable"
            value={this.props.data[this.props.parent].enable}
            onChange={this.handleUpdEnable}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
          {items}
        </div>
      );
      del = (
        <a href="javascript:void(0)" onClick={this.handleDel}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      );
    }
    return (
      <div>
        <label className="control-label">{this.props.parent}</label>
        <div className="wrapper">
          <div className="fixed">
            {del}
          </div>
          {form}
        </div>
        {add}
      </div>
    );
  }
});
module.exports = MailSettingsItem;
