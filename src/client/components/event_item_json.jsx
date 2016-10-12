var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EventItemJson = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render: function() {
    var key = this.props.event.event + String(this.props.event.timestamp);
    return (
      <tr key={key}>
        <td>
          <div>
            <small>{JSON.stringify(this.props.event)}</small>
          </div>
        </td>
      </tr>
    );
  }
});
module.exports = EventItemJson;
