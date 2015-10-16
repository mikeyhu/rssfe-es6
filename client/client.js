var Story = React.createClass({
  render: function() {
    var click = `/goto?url=${encodeURIComponent(this.props._id)}}`;
    return (
      <div className="story">
        <h3><a href={click}>{this.props.title}</a></h3>
        <p>
          <span>From: {this.props.channelTitle}</span>
          <span class="story-date">Published: {this.props.datePublished}</span>
        </p>
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
        <Story {...story}></Story>
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