var LeftMenuItem = require('./left_menu_item.jsx');

var LeftMenu = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function(pageId) {
    this.props.onSelectPage(pageId);
  },
  render: function() {
    return(
      <ul className="nav navbar-nav">
        <LeftMenuItem
          pageId="send"
          activePage={this.props.activePage}
          href="/index.html"
          text="メールを送る"
          onSelectPage={this._onSelectPage} />
        <LeftMenuItem
          pageId="receive"
          activePage={this.props.activePage}
          href="/parse.html"
          text="メールを受ける"
          onSelectPage={this._onSelectPage} />
      </ul>
    );
  }
});
module.exports = LeftMenu;
