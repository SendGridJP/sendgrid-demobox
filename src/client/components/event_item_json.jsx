var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var EventItemJson = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <tr>
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
