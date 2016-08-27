var SendPage = require('./send_page.jsx');
var ReceivePage = require('./receive_page.jsx');

var Article = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired
  },
  render: function() {
    if (this.props.activePage === 'send') {
      return (
        <SendPage />
      );
    } else if (this.props.activePage === 'receive') {
      return (
        <ReceivePage />
      );
    }
  }
});
module.exports = Article;
