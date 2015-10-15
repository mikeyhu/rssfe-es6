var Story = React.createClass({
  render: function() {
    return (
      <div className="story">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
});

var StoryList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var storyNodes = this.state.data.map(function (story) {
      return (
        <Story title={story.title}>
        </Story>
      );
    });
    return (
      <div className="storyList">
        <h1>Stories</h1>
        {storyNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <StoryList url="/api/latest"/>,
  document.getElementById('example')
);