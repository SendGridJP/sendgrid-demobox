var LeftMenuItem = require('./left_menu_item.jsx');

var LeftMenu = React.createClass({
  render: function() {
    return(
      <ul className="nav navbar-nav">
        <LeftMenuItem
          pageId="send"
          href="/index.html?p=send"
          text="メールを送る" />
        <LeftMenuItem
          pageId="receive"
          href="/index.html?p=receive"
          text="メールを受ける" />
      </ul>
    );
  }
});
module.exports = LeftMenu;
