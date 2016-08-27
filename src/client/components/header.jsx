var LeftMenu = require('./left_menu.jsx');

var Header = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function(pageId) {
    this.props.onSelectPage(pageId);
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".target">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="">DemoBox</a>
        </div>

        <div className="collapse navbar-collapse target">
          <LeftMenu
            activePage={this.props.activePage}
            onSelectPage={this._onSelectPage} />
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="https://sendgrid.com/account/overview" target="_blank">
                sendgrid.com
              </a>
            </li>
            <li>
              <a href="https://sendgrid.com/statistics" target="_blank">
                Statistics
              </a>
            </li>
            <li>
              <a href="https://sendgrid.com/templates" target="_blank">
                Templates
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});
module.exports = Header;
