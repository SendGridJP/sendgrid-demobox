var LeftMenu = require('./left_menu.jsx');

var Header = React.createClass({
  propTypes: {
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
          <LeftMenu />
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
