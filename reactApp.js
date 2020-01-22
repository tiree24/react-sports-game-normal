class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0
    };
    this.shotSound = new Audio('/Users/tireejackson/Downloads/Swish+2.mp3')
    this.scoreSound = new Audio('/Users/tireejackson/Downloads/Swish+2.mp3')
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play()

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(()=>{
        this.scoreSound.play()
      }, 100)


    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }));
  };

  render() {
    const shotPercentage = this.state.score / this.state.shots


    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>
        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

      <div><strong> Shooting %: {shotPercentage}</strong>
      </div>


        <button onClick={this.shotHandler}>Shoot!</button>{" "}
      </div>
    );
  }
}

// Deafault App component that all other compents are rendered through
function App(props) {
  return (
    <div className="App">
      <div className="stats">
        <Team
          name="Russiaville Raccoons"
          logo="https://cdn.mos.cms.futurecdn.net/YYH9o4wmSXJfvbzRTq5BTY-320-80.jpg"
        />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team
          name="Sheridan Squirrels"
          logo="https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s800-c85.jpg"
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
