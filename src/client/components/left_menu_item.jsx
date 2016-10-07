var LeftMenuItem = React.createClass({
  propTypes: {
    pageId: React.PropTypes.string.isRequired,
    href: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function() {
    this.props.onSelectPage(this.props.pageId);
  },
  getActive: function(pageId, activePage) {
    if (pageId === activePage) return 'active';
    else return '';
  },
  render: function() {
    return(
      <li
        id={this.props.pageId}
        className={this.getActive(this.props.pageId, this.props.activePage)}>
        <a href={this.props.href} className="subtree-name"
          onClick={this._onSelectPage}>{this.props.text}</a>
      </li>
    );
  }
});
module.exports = LeftMenuItem;
